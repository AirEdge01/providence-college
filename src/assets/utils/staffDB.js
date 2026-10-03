import { upsertResult, getAllStudents as getAllStudentsFromLocalDB, updateStudent as updateStudentInLocalDB } from "./localDB";
import { findStaffByStaffId, getRegistryLecturersByDepartment } from "../data/staffRegistry";

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
  // PLACEHOLDER grading scale, replace with the school's official scale
  if (total >= 70) return { grade: "A", point: 4.0 };
  if (total >= 60) return { grade: "B", point: 3.0 };
  if (total >= 50) return { grade: "C", point: 2.0 };
  if (total >= 45) return { grade: "D", point: 1.0 };
  return { grade: "F", point: 0.0 };
}
export { gradeFromTotal };

function splitName(fullName) {
  const parts = String(fullName || "").trim().split(/\s+/);
  return { firstName: parts[0] || "", surname: parts.slice(1).join(" ") || "" };
}

// ---- Staff Auth, registry-validated ----
export function staffSignup(data) {
  const registryMatch = findStaffByStaffId(data.staffId);
  if (!registryMatch) {
    const err = new Error("This Staff ID was not found on the official staff registry. Please contact the ICT Unit.");
    err.code = "NOT_ELIGIBLE";
    throw err;
  }
  if (!registryMatch.portalRole) {
    const err = new Error("This staff role does not have portal access. Please contact the ICT Unit.");
    err.code = "NOT_ELIGIBLE";
    throw err;
  }

  const staff = getAll(STAFF_KEY);
  const exists = staff.find((s) => s.email === data.email || s.staffId === data.staffId);
  if (exists) throw new Error("An account with this email or staff ID already exists.");

  const { firstName, surname } = splitName(registryMatch.fullName);

  const newStaff = {
    id: Date.now().toString(),
    firstName,
    surname,
    fullName: registryMatch.fullName,
    email: data.email,
    staffId: registryMatch.staffId,
    password: data.password,
    role: registryMatch.portalRole,
    title: registryMatch.role,
    department: registryMatch.department,
    category: registryMatch.category,
    photo: registryMatch.photo || "",
  };

  staff.push(newStaff);
  saveAll(STAFF_KEY, staff);
  localStorage.setItem(STAFF_SESSION_KEY, newStaff.id);
  return newStaff;
}

export function staffLogin(identifier, password) {
  const staff = getAll(STAFF_KEY);
  const member = staff.find((s) => s.email === identifier || s.staffId === identifier);
  if (!member || member.password !== password) {
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
  return staff.find((s) => s.id === id) || null;
}

export function getAllStaff() {
  return getAll(STAFF_KEY);
}

// Pulls from the official registry, not just signed-up accounts, so HOD can
// allocate a course to a lecturer before that lecturer has even signed up.
export function getLecturersInDepartment(department) {
  return getRegistryLecturersByDepartment(department).map((l) => {
    const { firstName, surname } = splitName(l.fullName);
    return { id: l.id, staffId: l.staffId, firstName, surname, department: l.department };
  });
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

export function deleteAllocation(id) {
  saveAll(ALLOCATIONS_KEY, getAll(ALLOCATIONS_KEY).filter((a) => a.id !== id));
}

// ---- Score Submissions ----
// status moves: "Pending HOD" -> "HOD Confirmed" -> "Sent to Exams Officer" -> "Published"
export function getExistingSubmission(staffId, courseCode, session, semester) {
  return getAll(SUBMISSIONS_KEY).find(
    (s) => s.staffId === staffId && s.courseCode === courseCode && s.session === session && s.semester === semester
  );
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
  return getAll(SUBMISSIONS_KEY).filter((s) => s.status === "Sent to Exams Officer");
}

export function getAllSubmissions() {
  return getAll(SUBMISSIONS_KEY);
}

// Kept for compatibility with any page that imports it; returns an empty
// array unless something writes directly to this separate key.
export function getSemesterInputsForHOD() {
  return getAll("staff_semester_inputs");
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
  if (allow) submissions[index].status = "Pending HOD";
  saveAll(SUBMISSIONS_KEY, submissions);
  return submissions[index];
}

export function sendToExamOfficer(id) {
  const submissions = getAll(SUBMISSIONS_KEY);
  const index = submissions.findIndex((s) => s.id === id);
  if (index === -1) throw new Error("Submission not found.");
  submissions[index].status = "Sent to Exams Officer";
  saveAll(SUBMISSIONS_KEY, submissions);
  return submissions[index];
}

export function sendAllConfirmedToExamOfficer(department) {
  const submissions = getAll(SUBMISSIONS_KEY);
  let count = 0;
  submissions.forEach((s) => {
    if (s.department === department && s.status === "HOD Confirmed") {
      s.status = "Sent to Exams Officer";
      count++;
    }
  });
  saveAll(SUBMISSIONS_KEY, submissions);
  return count;
}

function publishOne(submission) {
  const students = getAllStudentsFromLocalDB();
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
}

export function publishSubmission(id) {
  const submissions = getAll(SUBMISSIONS_KEY);
  const index = submissions.findIndex((s) => s.id === id);
  if (index === -1) throw new Error("Submission not found.");
  publishOne(submissions[index]);
  submissions[index].status = "Published";
  saveAll(SUBMISSIONS_KEY, submissions);
  return submissions[index];
}

export function publishAllPending() {
  const submissions = getAll(SUBMISSIONS_KEY);
  let count = 0;
  submissions.forEach((s) => {
    if (s.status === "Sent to Exams Officer") {
      publishOne(s);
      s.status = "Published";
      count++;
    }
  });
  saveAll(SUBMISSIONS_KEY, submissions);
  return count;
}

// ---- Super Admin overrides (full access to everything) ----
export function adminUpdateStaff(id, updates) {
  const staff = getAll(STAFF_KEY);
  const index = staff.findIndex((s) => s.id === id);
  if (index === -1) throw new Error("Staff not found.");
  staff[index] = { ...staff[index], ...updates };
  saveAll(STAFF_KEY, staff);
  return staff[index];
}

export function adminDeleteStaff(id) {
  saveAll(STAFF_KEY, getAll(STAFF_KEY).filter((s) => s.id !== id));
}

export function adminDeleteSubmission(id) {
  saveAll(SUBMISSIONS_KEY, getAll(SUBMISSIONS_KEY).filter((s) => s.id !== id));
}

export function adminSetSubmissionStatus(id, status) {
  const submissions = getAll(SUBMISSIONS_KEY);
  const index = submissions.findIndex((s) => s.id === id);
  if (index === -1) throw new Error("Submission not found.");
  submissions[index].status = status;
  submissions[index].locked = status === "HOD Confirmed" || status === "Sent to Exams Officer" || status === "Published";
  saveAll(SUBMISSIONS_KEY, submissions);
  return submissions[index];
}

export function adminPublishSubmission(id) {
  return publishSubmission(id);
}

export function updateStaffPhoto(staffId, dataUrl) {
  const staff = getAll(STAFF_KEY);
  const index = staff.findIndex((s) => s.id === staffId);
  if (index === -1) throw new Error("Staff not found.");
  staff[index] = { ...staff[index], photo: dataUrl };
  saveAll(STAFF_KEY, staff);
  return staff[index];
}

export { getAllStudentsFromLocalDB as getAllStudents, updateStudentInLocalDB as adminUpdateStudent };