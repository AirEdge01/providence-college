import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    getCurrentStaff, getLecturersInDepartment, getPendingForHOD, getConfirmedForHOD,
    confirmSubmission, toggleResubmission, sendAllConfirmedToExamOfficer,
} from "../utils/staffDB";
import { sharedStyles } from "./LecturerDashboard";

const navy = "#0F2C59";

export default function HodDashboard() {
    const staff = getCurrentStaff();
    const [, setTick] = useState(0);
    const refresh = () => setTick((t) => t + 1);
    const [message, setMessage] = useState("");

    const lecturers = getLecturersInDepartment(staff.department);
    const pending = getPendingForHOD(staff.department);
    const confirmed = getConfirmedForHOD(staff.department);

    const handleConfirm = (id) => { confirmSubmission(id); refresh(); };
    const handleToggle = (id, allow) => { toggleResubmission(id, allow); refresh(); };
    const handleSendAll = () => {
        const count = sendAllConfirmedToExamOfficer(staff.department);
        setMessage(`Sent ${count} collated result sheet(s) to the Exams Officer.`);
        refresh();
        setTimeout(() => setMessage(""), 4000);
    };

    return (
        <div>
            <style>{sharedStyles}</style>

            <div className="sp-hero dash-anim">
                <h4 style={{ fontWeight: 700, marginBottom: 6, fontSize: "clamp(18px, 3vw, 24px)" }}>Welcome, {staff.firstName} {staff.surname}</h4>
                <p style={{ opacity: 0.88, fontSize: 14.5, marginBottom: 0 }}>Head of Department, {staff.department}</p>
            </div>

            <div className="sp-stat-grid dash-anim" style={{ animationDelay: "0.05s" }}>
                <StatCard icon="bi-person-lines-fill" label="Lecturers in My Department" value={lecturers.length} />
                <StatCard icon="bi-hourglass-split" label="Pending My Confirmation" value={pending.length} />
                <StatCard icon="bi-send-check" label="Confirmed, Ready to Send" value={confirmed.length} />
            </div>

            <div className="sp-quicklinks dash-anim" style={{ animationDelay: "0.1s" }}>
                <Link to="/staff-portal/course-allocation" className="sp-quicklink">
                    <i className="bi bi-journal-plus"></i> Allocate Courses to Lecturers
                </Link>
            </div>

            {message && <div className="alert alert-success py-2" style={{ borderRadius: 10, marginTop: 20 }}>{message}</div>}

            <h6 style={{ color: navy, fontWeight: 700, margin: "26px 0 14px", fontSize: 15.5 }}>Received from Lecturers, Pending Your Confirmation</h6>
            {pending.length === 0 ? (
                <div className="sp-card"><div className="sp-card-empty">Nothing pending your confirmation right now.</div></div>
            ) : (
                pending.map((sub) => (
                    <div key={sub.id} className="sp-card">
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
                            <h6 style={{ color: navy, fontWeight: 700, margin: 0 }}>{sub.courseCode}, {sub.courseTitle}</h6>
                            <span style={{ fontSize: 13, color: "#6c757d" }}>Submitted by {sub.staffName}</span>
                        </div>
                        <div className="sp-table-wrap"><ScoreTable scores={sub.scores} /></div>
                        <button onClick={() => handleConfirm(sub.id)} style={btnPrimary}>
                            Confirm Result
                        </button>
                    </div>
                ))
            )}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "26px 0 14px", flexWrap: "wrap", gap: 10 }}>
                <h6 style={{ color: navy, fontWeight: 700, margin: 0, fontSize: 15.5 }}>Confirmed, Ready to Send to Exams Officer</h6>
                {confirmed.length > 0 && (
                    <button onClick={handleSendAll} style={btnGold}>
                        Send All Confirmed
                    </button>
                )}
            </div>
            {confirmed.length === 0 ? (
                <div className="sp-card"><div className="sp-card-empty">No confirmed results waiting to be sent.</div></div>
            ) : (
                confirmed.map((sub) => (
                    <div key={sub.id} className="sp-card">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
                            <h6 style={{ color: navy, fontWeight: 700, margin: 0 }}>{sub.courseCode}, {sub.courseTitle}</h6>
                            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#6c757d" }}>
                                <input type="checkbox" checked={!sub.locked} onChange={(e) => handleToggle(sub.id, e.target.checked)} />
                                Allow lecturer to resubmit
                            </label>
                        </div>
                        <div className="sp-table-wrap"><ScoreTable scores={sub.scores} /></div>
                    </div>
                ))
            )}
        </div>
    );
}

function ScoreTable({ scores }) {
    return (
        <table className="table align-middle mb-3" style={{ minWidth: 460 }}>
            <thead><tr style={{ fontSize: 13 }}><th>Matric</th><th>CA</th><th>Exam</th><th>Assignment</th><th>Total</th><th>Grade</th></tr></thead>
            <tbody>
                {scores.map((s, i) => (
                    <tr key={i} style={{ fontSize: 14 }}><td>{s.matricNumber}</td><td>{s.ca}</td><td>{s.exam}</td><td>{s.assignment}</td><td style={{ fontWeight: 700 }}>{s.total}</td><td>{s.grade}</td></tr>
                ))}
            </tbody>
        </table>
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

const btnPrimary = { background: navy, color: "#fff", border: "none", padding: "10px 20px", borderRadius: 10, fontWeight: 600, fontSize: 13.5, cursor: "pointer" };
const btnGold = { background: "#D4AF37", color: navy, border: "none", padding: "10px 20px", borderRadius: 10, fontWeight: 700, fontSize: 13.5, cursor: "pointer" };