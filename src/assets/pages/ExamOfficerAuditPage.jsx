import React, { useState } from "react";
import { getPendingForExamOfficer, publishSubmission, publishAllPending } from "../utils/staffDB";

const navy = "#0F2C59";
const gold = "#D4AF37";

export default function ExamOfficerAuditPage() {
    const [, setTick] = useState(0);
    const refresh = () => setTick((t) => t + 1);
    const [message, setMessage] = useState("");
    const pending = getPendingForExamOfficer();

    const handlePublish = (id) => { publishSubmission(id); refresh(); };

    const handlePublishAll = () => {
        const count = publishAllPending();
        setMessage(`Published ${count} result sheet(s) to student portals across all departments.`);
        refresh();
        setTimeout(() => setMessage(""), 5000);
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
                <h4 style={{ color: navy, fontWeight: 700, margin: 0 }}>Exams Officer Audit</h4>
                {pending.length > 0 && (
                    <button onClick={handlePublishAll} style={{ background: gold, color: navy, border: "none", padding: "10px 20px", borderRadius: 8, fontWeight: 700 }}>
                        Publish All ({pending.length}) to Students
                    </button>
                )}
            </div>
            {message && <div className="alert alert-success py-2">{message}</div>}
            <p style={{ color: "#6c757d", fontSize: 14, marginBottom: 20 }}>
                Publishing sends the result straight to each student's portal under My Results, where they can view and download it.
            </p>
            {pending.length === 0 ? (
                <div style={cardStyle}><div style={{ textAlign: "center", padding: "30px 0", color: "#adb5bd" }}>Nothing pending audit.</div></div>
            ) : (
                pending.map((sub) => (
                    <div key={sub.id} style={{ ...cardStyle, marginBottom: 16 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                            <h6 style={{ color: navy, fontWeight: 700 }}>{sub.courseCode}, {sub.courseTitle}</h6>
                            <span style={{ fontSize: 13, color: "#6c757d" }}>{sub.department}, confirmed from {sub.staffName}</span>
                        </div>
                        <table className="table align-middle mb-3">
                            <thead><tr style={{ fontSize: 13 }}><th>Matric</th><th>CA</th><th>Exam</th><th>Assignment</th><th>Total</th><th>Grade</th></tr></thead>
                            <tbody>
                                {sub.scores.map((s, i) => (
                                    <tr key={i} style={{ fontSize: 14 }}><td>{s.matricNumber}</td><td>{s.ca}</td><td>{s.exam}</td><td>{s.assignment}</td><td style={{ fontWeight: 700 }}>{s.total}</td><td>{s.grade}</td></tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={() => handlePublish(sub.id)} style={{ background: gold, color: navy, border: "none", padding: "8px 18px", borderRadius: 8, fontWeight: 700 }}>
                            Publish to Student Portal
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

const cardStyle = { background: "#fff", borderRadius: 14, padding: 24, boxShadow: "0 4px 14px rgba(15,44,89,0.06)" };