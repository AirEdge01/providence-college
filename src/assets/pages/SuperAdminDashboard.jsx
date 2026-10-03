import React from "react";
import { Link } from "react-router-dom";
import { getAllStaff, getAllAllocations, getAllSubmissions } from "../utils/staffDB";
import { sharedStyles } from "./LecturerDashboard";

export default function SuperAdminDashboard() {
    const allStaff = getAllStaff();
    const allAllocations = getAllAllocations();
    const allSubmissions = getAllSubmissions();

    const links = [
        { label: "Super Admin Control Center", path: "/staff-portal/super-admin", icon: "bi-shield-lock" },
        { label: "Languages Allocation", path: "/staff-portal/allocation/languages", icon: "bi-journal-plus" },
        { label: "Education Allocation", path: "/staff-portal/allocation/education", icon: "bi-journal-plus" },
        { label: "Sciences Allocation", path: "/staff-portal/allocation/sciences", icon: "bi-journal-plus" },
        { label: "Arts and Social Sciences Allocation", path: "/staff-portal/allocation/arts-social", icon: "bi-journal-plus" },
        { label: "Vocational and Technical Allocation", path: "/staff-portal/allocation/vocational", icon: "bi-journal-plus" },
        { label: "ECCE Allocation", path: "/staff-portal/allocation/ecce", icon: "bi-journal-plus" },
    ];

    return (
        <div>
            <style>{sharedStyles}</style>

            <div className="sp-hero dash-anim">
                <h4 style={{ fontWeight: 700, marginBottom: 6, fontSize: "clamp(18px, 3vw, 24px)" }}>System-Wide Overview</h4>
                <p style={{ opacity: 0.88, fontSize: 14.5, marginBottom: 0 }}>Super Admin, full access across every department and role.</p>
            </div>

            <div className="sp-stat-grid dash-anim" style={{ animationDelay: "0.05s" }}>
                <StatCard icon="bi-people-fill" label="Total Staff Accounts" value={allStaff.length} />
                <StatCard icon="bi-journal-plus" label="Total Course Allocations" value={allAllocations.length} />
                <StatCard icon="bi-file-earmark-text" label="Total Score Submissions" value={allSubmissions.length} />
            </div>

            <div className="sp-quicklinks dash-anim" style={{ animationDelay: "0.1s" }}>
                {links.map((l) => (
                    <Link key={l.path} to={l.path} className="sp-quicklink">
                        <i className={`bi ${l.icon}`}></i> {l.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}

function StatCard({ icon, label, value }) {
    return (
        <div className="sp-stat-card">
            <div className="sp-stat-icon"><i className={`bi ${icon}`}></i></div>
            <div>
                <div className="sp-stat-label">{label}</div>
                <div className="sp-stat-value">{value}</div>
            </div>
        </div>
    );
}