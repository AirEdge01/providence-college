import { upsertResult } from "./localDB";
import { findStaffByStaffId } from "../data/staffRegistry";

const STAFF_KEY = "pice_staff";
const STAFF_SESSION_KEY = "pice_staff_session";
const ALLOCATIONS_KEY = "pice_course_allocations";
const SUBMISSIONS_KEY = "pice_score_submissions";

export const STAFF_ROLES = {
    LECTURER: "Lecturer",
    HOD: "HOD",
    EXAMS_OFFICER: "Exams Officer",
    BURSARY: "Bursary",
    SUPER_ADMIN: "Super Admin",
};

const getAll = (key) => JSON.parse(localStorage.getItem(key) || "[]");
const saveAll = (key, data) => localStorage.setItem(key, JSON.stringify(data));

function gradeFromTotal(total) {
    if (total >= 70) return { grade: "A", point: 4.0 };
    if (total >= 60) return { grade: "B", point: 3.0 };
    if (total >= 50) return { grade: "C", point: 2.0 };
    if (total >= 45) return { grade: "D", point: 1.0 };
    return { grade: "F", point: 0.0 };
}
export { gradeFromTotal };

// ---- Staff Auth ----
export function staffSignup(data) {
    // Only allow signup if staff is registered in the official staff registry
    const registryEntry = findStaffByStaffId(data.staffId);
    if (!registryEntry) throw new Error("This staff ID is not authorized to register. Contact admin.");

    const staff = getAll(STAFF_KEY);
    const exists = staff.find((s) => s.email === data.email || s.staffId === data.staffId);
    if (exists) throw new Error("An account with this email or staff ID already exists.");

    const newStaff = {
        id: Date.now().toString(),
        firstName: data.firstName,
        surname: data.surname,
        fullName: `${data.firstName} ${data.surname}`.trim(),
        email: data.email,
        staffId: data.staffId,
        password: data.password,
        role: data.role,
        department: data.department || "",
    };

    staff.push(newStaff);
    saveAll(STAFF_KEY, staff);
    return newStaff;
}

export function staffLogin(identifier, password) {
    // Require the identifier (staffId or email) to belong to a registered staff
    const registryEntry = findStaffByStaffId(identifier) || null;
    if (!registryEntry) {
        // allow login by email as well if the email matches an existing staff account
        const staff = getAll(STAFF_KEY);
        const byEmail = staff.find((s) => s.email === identifier);
        if (!byEmail || byEmail.password !== password) throw new Error("Invalid login credentials.");
        localStorage.setItem(STAFF_SESSION_KEY, byEmail.id);
        return byEmail;
    }

    const staff = getAll(STAFF_KEY);
    const member = staff.find((s) => s.staffId === registryEntry.staffId && s.password === password);
    if (!member) {
        throw new Error("Invalid login credentials.");
    }
    localStorage.setItem(STAFF_SESSION_KEY, member.id);
    return member;
}

export function staffLogout() {
    localStorage.removeItem(STAFF_SESSION_KEY);
}

export function getCurrentStaff() {
    const id = localStorage.getItem(STAFF_SESSION_KEY);
    if (!id) return null;
    const staff = getAll(STAFF_KEY);
    const member = staff.find((s) => s.id === id) || null;
    if (!member) return null;
    // enrich with registry data when available
    try {
        const registryEntry = findStaffByStaffId(member.staffId);
        if (registryEntry) {
            return {
                ...member,
                fullName: registryEntry.fullName || member.fullName,
                photo: registryEntry.photo || member.photo || null,
                category: registryEntry.category || member.category || null,
                // keep existing firstName/surname if present
            };
        }
    } catch (e) {
        // ignore registry lookup errors
    }
    return member;
}

export function getAllStaff() {
    return getAll(STAFF_KEY);
}

export function hasStaffAccounts() {
    return getAll(STAFF_KEY).length > 0;
}

export function getLecturersInDepartment(department) {
    return getAll(STAFF_KEY).filter((s) => s.role === STAFF_ROLES.LECTURER && s.department === department);
}

// ---- Course Allocations ----
export function allocateCourse(allocation) {
    const allocations = getAll(ALLOCATIONS_KEY);
    const newAllocation = { id: Date.now().toString(), ...allocation };
    allocations.push(newAllocation);
    saveAll(ALLOCATIONS_KEY, allocations);
    return newAllocation;
}

export function getAllocationsForStaff(staffId) {
    return getAll(ALLOCATIONS_KEY).filter((a) => a.staffId === staffId);
}

export function getAllocationsForDepartment(department) {
    return getAll(ALLOCATIONS_KEY).filter((a) => a.department === department);
}

export function getAllAllocations() {
    return getAll(ALLOCATIONS_KEY);
}

// ---- Score Submissions ----
function findExistingSubmission(staffId, courseCode, session, semester) {
    const submissions = getAll(SUBMISSIONS_KEY);
    return submissions.find(
        (s) => s.staffId === staffId && s.courseCode === courseCode && s.session === session && s.semester === semester
    );
}

export function getExistingSubmission(staffId, courseCode, session, semester) {
    return findExistingSubmission(staffId, courseCode, session, semester);
}

export function submitScores(payload) {
    const submissions = getAll(SUBMISSIONS_KEY);
    const existingIndex = submissions.findIndex(
        (s) =>
            s.staffId === payload.staffId &&
            s.courseCode === payload.courseCode &&
            s.session === payload.session &&
            s.semester === payload.semester
    );

    if (existingIndex >= 0) {
        const existing = submissions[existingIndex];
        if (existing.locked) {
            throw new Error("This submission is locked by the HOD and cannot be resubmitted.");
        }
        submissions[existingIndex] = {
            ...existing,
            scores: payload.scores,
            status: "Pending HOD",
            locked: false,
            submittedAt: new Date().toISOString(),
        };
        saveAll(SUBMISSIONS_KEY, submissions);
        return submissions[existingIndex];
    }

    const newSubmission = {
        id: Date.now().toString(),
        status: "Pending HOD",
        locked: false,
        submittedAt: new Date().toISOString(),
        ...payload,
    };
    submissions.push(newSubmission);
    saveAll(SUBMISSIONS_KEY, submissions);
    return newSubmission;
}

export function getSubmissionsForStaff(staffId) {
    return getAll(SUBMISSIONS_KEY).filter((s) => s.staffId === staffId);
}

export function getPendingForHOD(department) {
    return getAll(SUBMISSIONS_KEY).filter((s) => s.status === "Pending HOD" && s.department === department);
}

export function getConfirmedForHOD(department) {
    return getAll(SUBMISSIONS_KEY).filter((s) => s.status === "HOD Confirmed" && s.department === department);
}

export function getPendingForExamOfficer() {
    return getAll(SUBMISSIONS_KEY).filter((s) => s.status === "Sent to Exam Officer");
}

export function getAllSubmissions() {
    return getAll(SUBMISSIONS_KEY);
}

export function confirmSubmission(id) {
    const submissions = getAll(SUBMISSIONS_KEY);
    const index = submissions.findIndex((s) => s.id === id);
    if (index === -1) throw new Error("Submission not found.");
    submissions[index].status = "HOD Confirmed";
    submissions[index].locked = true;
    saveAll(SUBMISSIONS_KEY, submissions);
    return submissions[index];
}

export function toggleResubmission(id, allow) {
    const submissions = getAll(SUBMISSIONS_KEY);
    const index = submissions.findIndex((s) => s.id === id);
    if (index === -1) throw new Error("Submission not found.");
    submissions[index].locked = !allow;
    if (allow) {
        submissions[index].status = "Pending HOD";
    }
    saveAll(SUBMISSIONS_KEY, submissions);
    return submissions[index];
}

export function sendToExamOfficer(id) {
    const submissions = getAll(SUBMISSIONS_KEY);
    const index = submissions.findIndex((s) => s.id === id);
    if (index === -1) throw new Error("Submission not found.");
    submissions[index].status = "Sent to Exam Officer";
    saveAll(SUBMISSIONS_KEY, submissions);
    return submissions[index];
}

export function publishSubmission(id) {
    const submissions = getAll(SUBMISSIONS_KEY);
    const index = submissions.findIndex((s) => s.id === id);
    if (index === -1) throw new Error("Submission not found.");
    const submission = submissions[index];

    const students = JSON.parse(localStorage.getItem("pice_students") || "[]");
    submission.scores.forEach((entry) => {
        const student = students.find((s) => s.matricNumber === entry.matricNumber);
        if (student) {
            upsertResult(student.id, {
                session: submission.session,
                semester: submission.semester,
                level: submission.level,
                courseCode: submission.courseCode,
                courseTitle: submission.courseTitle,
                creditUnit: submission.creditUnit,
                score: entry.total,
                grade: entry.grade,
            });
        }
    });

    submissions[index].status = "Published";
    saveAll(SUBMISSIONS_KEY, submissions);
    return submissions[index];
}

// Default export for compatibility
export default {
    STAFF_ROLES,
    getCurrentStaff,
    staffLogin,
    staffSignup,
    staffLogout,
    getAllStaff,
    getLecturersInDepartment,
    allocateCourse,
    getAllocationsForStaff,
    getAllocationsForDepartment,
    getAllAllocations,
    getExistingSubmission,
    submitScores,
    getSubmissionsForStaff,
    getPendingForHOD,
    getConfirmedForHOD,
    getPendingForExamOfficer,
    getAllSubmissions,
    confirmSubmission,
    toggleResubmission,
    sendToExamOfficer,
    publishSubmission,
    gradeFromTotal,
};