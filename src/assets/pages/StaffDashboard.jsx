import React from "react";
import { Link } from "react-router-dom";
import {
    getCurrentStaff, STAFF_ROLES,
    getAllocationsForStaff, getSubmissionsForStaff,
    getLecturersInDepartment, getPendingForHOD, getConfirmedForHOD,
    getPendingForExamOfficer, getAllStaff, getAllAllocations, getAllSubmissions,
} from "../utils/staffDB";

const navy = "#0F2C59";

export default function StaffDashboard() {
    const staff = getCurrentStaff();
    const isSuperAdmin = staff.role === STAFF_ROLES.SUPER_ADMIN;

    return (
        <div>
            <style>{`
        @keyframes dashFadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .dash-anim { animation: dashFadeUp 0.5s ease both; }
      `}</style>

            <div className="dash-anim" style={{ background: `linear-gradient(120deg, ${navy}, #163a73)`, borderRadius: 16, padding: "28px 30px", color: "#fff", marginBottom: 26 }}>
                <h4 style={{ fontWeight: 700, marginBottom: 6 }}>Welcome, {staff.firstName} {staff.surname}</h4>
                <p style={{ opacity: 0.85, fontSize: 14.5, marginBottom: 0 }}>{staff.role}{staff.department ? `, ${staff.department} Department` : ""}</p>
            </div>

            {(staff.role === STAFF_ROLES.LECTURER || isSuperAdmin) && <LecturerSection staff={staff} delay={0.05} />}
            {(staff.role === STAFF_ROLES.HOD || isSuperAdmin) && <HodSection staff={staff} delay={0.1} />}
            {(staff.role === STAFF_ROLES.EXAMS_OFFICER || isSuperAdmin) && <ExamsOfficerSection delay={0.15} />}
            {isSuperAdmin && <SuperAdminSection delay={0.2} />}
        </div>
    );
}

function SectionHeading({ children }) {
    return <h6 style={{ color: navy, fontWeight: 700, margin: "24px 0 14px" }}>{children}</h6>;
}

function LecturerSection({ staff, delay }) {
    const allocations = getAllocationsForStaff(staff.staffId);
    const submissions = getSubmissionsForStaff(staff.staffId);
    const pending = submissions.filter((s) => s.status === "Pending HOD").length;
    const confirmed = submissions.filter((s) => s.status !== "Pending HOD").length;

    return (
        <div className="dash-anim" style={{ animationDelay: `${delay}s` }}>
            <SectionHeading>Lecturer Overview</SectionHeading>
            <div className="row g-3">
                <StatCard icon="bi-journal-plus" label="Courses Allocated to Me" value={allocations.length} />
                <StatCard icon="bi-hourglass-split" label="Awaiting HOD Confirmation" value={pending} />
                <StatCard icon="bi-check2-circle" label="Confirmed or Further Along" value={confirmed} />
            </div>
            <QuickLinks items={[
                { label: "View My Roster", path: "/staff-portal/roster", icon: "bi-people" },
                { label: "Upload Scores", path: "/staff-portal/score-upload", icon: "bi-cloud-upload" },
            ]} />
        </div>
    );
}

function HodSection({ staff, delay }) {
    const lecturers = getLecturersInDepartment(staff.department);
    const pending = getPendingForHOD(staff.department);
    const confirmed = getConfirmedForHOD(staff.department);

    return (
        <div className="dash-anim" style={{ animationDelay: `${delay}s` }}>
            <SectionHeading>Head of Department Overview</SectionHeading>
            <div className="row g-3">
                <StatCard icon="bi-person-lines-fill" label="Lecturers in My Department" value={lecturers.length} />
                <StatCard icon="bi-hourglass-split" label="Pending My Vetting" value={pending.length} />
                <StatCard icon="bi-send-check" label="Confirmed, Ready to Send" value={confirmed.length} />
            </div>
            <QuickLinks items={[
                { label: "Allocate Courses", path: "/staff-portal/course-allocation", icon: "bi-journal-plus" },
                { label: "Vetting Queue", path: "/staff-portal/hod-vetting", icon: "bi-check2-square" },
            ]} />
        </div>
    );
}

function ExamsOfficerSection({ delay }) {
    const pending = getPendingForExamOfficer();
    return (
        <div className="dash-anim" style={{ animationDelay: `${delay}s` }}>
            <SectionHeading>Exams Officer Overview</SectionHeading>
            <div className="row g-3">
                <StatCard icon="bi-clipboard-check" label="Awaiting Your Audit" value={pending.length} />
            </div>
            <QuickLinks items={[{ label: "Open Audit Queue", path: "/staff-portal/exam-audit", icon: "bi-clipboard-check" }]} />
        </div>
    );
}

function SuperAdminSection({ delay }) {
    const allStaff = getAllStaff();
    const allAllocations = getAllAllocations();
    const allSubmissions = getAllSubmissions();

    return (
        <div className="dash-anim" style={{ animationDelay: `${delay}s` }}>
            <SectionHeading>System-Wide Overview, Super Admin Access</SectionHeading>
            <div className="row g-3">
                <StatCard icon="bi-people-fill" label="Total Staff Accounts" value={allStaff.length} />
                <StatCard icon="bi-journal-plus" label="Total Course Allocations" value={allAllocations.length} />
                <StatCard icon="bi-file-earmark-text" label="Total Score Submissions" value={allSubmissions.length} />
            </div>
            <QuickLinks items={[{ label: "Open Super Admin Control", path: "/staff-portal/super-admin", icon: "bi-shield-lock" }]} />
        </div>
    );
}

function StatCard({ icon, label, value }) {
    return (
        <div className="col-md-4">
            <div style={{ background: "#fff", borderRadius: 14, padding: 22, boxShadow: "0 4px 14px rgba(15,44,89,0.08)", display: "flex", alignItems: "center", gap: 14, transition: "transform 0.2s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>
                <div style={{ width: 50, height: 50, borderRadius: 10, background: "#0F2C5912", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <i className={`bi ${icon}`} style={{ fontSize: 22, color: navy }}></i>
                </div>
                <div>
                    <div style={{ fontSize: 13, color: "#6c757d" }}>{label}</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: navy }}>{value}</div>
                </div>
            </div>
        </div>
    );
}

function QuickLinks({ items }) {
    return (
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
            {items.map((item) => (
                <Link key={item.path} to={item.path} style={{
                    display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 8,
                    background: "#fff", border: "1px solid #e2e8f0", color: navy, textDecoration: "none", fontWeight: 600, fontSize: 13.5,
                }}>
                    <i className={`bi ${item.icon}`}></i> {item.label}
                </Link>
            ))}
        </div>
    );
}