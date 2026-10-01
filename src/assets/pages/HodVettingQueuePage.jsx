import React, { useState } from "react";
import { getCurrentStaff, getPendingForHOD, getConfirmedForHOD, confirmSubmission, toggleResubmission, sendToExamOfficer } from "../utils/staffDB";

const navy = "#0F2C59";
const gold = "#D4AF37";

export default function HodVettingQueuePage() {
    const staff = getCurrentStaff();
    const [, setTick] = useState(0);
    const refresh = () => setTick((t) => t + 1);

    const pending = getPendingForHOD(staff.department);
    const confirmed = getConfirmedForHOD(staff.department);

    const handleConfirm = (id) => {
        confirmSubmission(id);
        refresh();
    };

    const handleToggle = (id, allow) => {
        toggleResubmission(id, allow);
        refresh();
    };

    const handleSend = (id) => {
        sendToExamOfficer(id);
        refresh();
    };

    return (
        <div>
            <h4 style={{ color: navy, fontWeight: 700, marginBottom: 18 }}>HOD Vetting Queue</h4>

            <h6 style={{ color: navy, fontWeight: 700, marginBottom: 12 }}>Pending Your Confirmation</h6>
            {pending.length === 0 ? (
                <div style={cardStyle}><div style={{ textAlign: "center", padding: "20px 0", color: "#adb5bd" }}>Nothing pending your confirmation.</div></div>
            ) : (
                pending.map((sub) => (
                    <div key={sub.id} style={{ ...cardStyle, marginBottom: 16 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                            <h6 style={{ color: navy, fontWeight: 700 }}>{sub.courseCode}, {sub.courseTitle}</h6>
                            <span style={{ fontSize: 13, color: "#6c757d" }}>Submitted by {sub.staffName}</span>
                        </div>
                        <ScoreTable scores={sub.scores} />
                        <button onClick={() => handleConfirm(sub.id)} style={{ background: navy, color: "#fff", border: "none", padding: "8px 18px", borderRadius: 8, fontWeight: 600 }}>
                            Confirm Result
                        </button>
                    </div>
                ))
            )}

            <h6 style={{ color: navy, fontWeight: 700, margin: "24px 0 12px" }}>Confirmed, Ready to Send</h6>
            {confirmed.length === 0 ? (
                <div style={cardStyle}><div style={{ textAlign: "center", padding: "20px 0", color: "#adb5bd" }}>No confirmed results waiting to be sent.</div></div>
            ) : (
                confirmed.map((sub) => (
                    <div key={sub.id} style={{ ...cardStyle, marginBottom: 16 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
                            <h6 style={{ color: navy, fontWeight: 700, margin: 0 }}>{sub.courseCode}, {sub.courseTitle}</h6>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#6c757d" }}>
                                    <input type="checkbox" checked={!sub.locked} onChange={(e) => handleToggle(sub.id, e.target.checked)} />
                                    Allow lecturer to resubmit
                                </label>
                            </div>
                        </div>
                        <ScoreTable scores={sub.scores} />
                        <button onClick={() => handleSend(sub.id)} style={{ background: gold, color: navy, border: "none", padding: "8px 18px", borderRadius: 8, fontWeight: 700 }}>
                            Send to Exams Officer
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

function ScoreTable({ scores }) {
    return (
        <table className="table align-middle mb-3">
            <thead><tr style={{ fontSize: 13 }}><th>Matric</th><th>CA</th><th>Exam</th><th>Assignment</th><th>Total</th><th>Grade</th></tr></thead>
            <tbody>
                {scores.map((s, i) => (
                    <tr key={i} style={{ fontSize: 14 }}>
                        <td>{s.matricNumber}</td><td>{s.ca}</td><td>{s.exam}</td><td>{s.assignment}</td><td style={{ fontWeight: 700 }}>{s.total}</td><td>{s.grade}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

const cardStyle = { background: "#fff", borderRadius: 14, padding: 24, boxShadow: "0 4px 14px rgba(15,44,89,0.06)" };