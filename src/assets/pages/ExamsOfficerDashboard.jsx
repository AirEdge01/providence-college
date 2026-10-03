import React from "react";
import { Link } from "react-router-dom";
import { getPendingForExamOfficer } from "../utils/staffDB";
import { sharedStyles } from "./LecturerDashboard";

export default function ExamsOfficerDashboard() {
    const pending = getPendingForExamOfficer();

    return (
        <div>
            <style>{sharedStyles}</style>

            <div className="sp-hero dash-anim">
                <h4 style={{ fontWeight: 700, marginBottom: 6, fontSize: "clamp(18px, 3vw, 24px)" }}>Exams and Records Officer</h4>
                <p style={{ opacity: 0.88, fontSize: 14.5, marginBottom: 0 }}>Overview of results awaiting your audit and publication.</p>
            </div>

            <div className="sp-stat-grid dash-anim" style={{ animationDelay: "0.05s" }}>
                <div className="sp-stat-card">
                    <div className="sp-stat-icon"><i className="bi bi-clipboard-check"></i></div>
                    <div>
                        <div className="sp-stat-label">Awaiting Your Audit</div>
                        <div className="sp-stat-value">{pending.length}</div>
                    </div>
                </div>
            </div>

            <div className="sp-quicklinks dash-anim" style={{ animationDelay: "0.1s" }}>
                <Link to="/staff-portal/exam-audit" className="sp-quicklink">
                    <i className="bi bi-clipboard-check"></i> Open Audit Queue
                </Link>
            </div>
        </div>
    );
}