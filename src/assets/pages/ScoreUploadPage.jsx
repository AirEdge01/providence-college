import React, { useState, useEffect } from "react";
import { getCurrentStaff, getAllocationsForStaff, getExistingSubmission, submitScores, gradeFromTotal } from "../utils/staffDB";

const navy = "#0F2C59";
const gold = "#D4AF37";

export default function ScoreUploadPage() {
    const staff = getCurrentStaff();
    const allocations = getAllocationsForStaff(staff.id);
    const [selectedCourse, setSelectedCourse] = useState(allocations[0]?.courseCode || "");
    const [scores, setScores] = useState({});
    const [message, setMessage] = useState("");

    const students = JSON.parse(localStorage.getItem("pice_students") || "[]");
    const course = allocations.find((a) => a.courseCode === selectedCourse);

    const roster = course
        ? students.filter((s) =>
            (s.courses || []).some((c) => c.courseCode === course.courseCode && c.session === course.session)
        )
        : [];

    const existingSubmission = course
        ? getExistingSubmission(staff.id, course.courseCode, course.session, course.semester)
        : null;
    const isLocked = existingSubmission?.locked;

    useEffect(() => {
        if (existingSubmission) {
            const preset = {};
            existingSubmission.scores.forEach((entry) => {
                preset[entry.matricNumber] = { ca: entry.ca, exam: entry.exam, assignment: entry.assignment };
            });
            setScores(preset);
        } else {
            setScores({});
        }
        setMessage("");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCourse]);

    const updateField = (matricNumber, field, value) => {
        setScores((prev) => ({
            ...prev,
            [matricNumber]: { ...prev[matricNumber], [field]: Number(value) },
        }));
    };

    const computeTotal = (matricNumber) => {
        const entry = scores[matricNumber] || {};
        return (entry.ca || 0) + (entry.exam || 0) + (entry.assignment || 0);
    };

    const handleSubmit = () => {
        if (!course) return;
        if (isLocked) {
            setMessage("This result is locked. Ask your HOD to allow resubmission.");
            return;
        }

        const entries = roster
            .filter((s) => scores[s.matricNumber])
            .map((s) => {
                const total = computeTotal(s.matricNumber);
                const { grade } = gradeFromTotal(total);
                return {
                    matricNumber: s.matricNumber,
                    ca: scores[s.matricNumber].ca || 0,
                    exam: scores[s.matricNumber].exam || 0,
                    assignment: scores[s.matricNumber].assignment || 0,
                    total,
                    grade,
                };
            });

        if (entries.length === 0) {
            setMessage("Please enter at least one score before submitting.");
            return;
        }

        try {
            submitScores({
                staffId: staff.id,
                staffName: `${staff.firstName} ${staff.surname}`,
                department: course.department,
                courseCode: course.courseCode,
                courseTitle: course.courseTitle,
                creditUnit: course.creditUnit,
                level: course.level,
                session: course.session,
                semester: course.semester,
                scores: entries,
            });
            setMessage("Scores submitted to your HOD for confirmation.");
        } catch (err) {
            setMessage(err.message);
        }
    };

    if (allocations.length === 0) {
        return (
            <div>
                <h4 style={{ color: navy, fontWeight: 700, marginBottom: 18 }}>Score Upload</h4>
                <div style={cardStyle}>
                    <div style={{ textAlign: "center", padding: "30px 0", color: "#adb5bd" }}>
                        Your HOD has not allocated any courses to you yet.
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h4 style={{ color: navy, fontWeight: 700, marginBottom: 18 }}>Score Upload</h4>

            <div style={cardStyle}>
                <div className="mb-3">
                    <label style={labelStyle}>Course</label>
                    <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} className="form-select" style={inputStyle}>
                        {allocations.map((a) => (
                            <option key={a.id} value={a.courseCode}>{a.courseCode} - {a.courseTitle}, {a.semester} Semester</option>
                        ))}
                    </select>
                </div>

                {message && <div className={`alert ${isLocked ? "alert-warning" : "alert-info"} py-2`}>{message}</div>}

                {existingSubmission && (
                    <div className="alert alert-light border py-2" style={{ fontSize: 13.5 }}>
                        Current status: <strong>{existingSubmission.status}</strong>
                        {isLocked && " — your HOD has locked this result. Ask them to switch on resubmission if a correction is needed."}
                    </div>
                )}

                {roster.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "30px 0", color: "#adb5bd" }}>No students found for this course.</div>
                ) : (
                    <>
                        <div className="table-responsive">
                            <table className="table align-middle">
                                <thead>
                                    <tr style={{ fontSize: 13 }}>
                                        <th>Matric Number</th><th>Name</th><th>CA (0-30)</th><th>Exam (0-60)</th><th>Assignment (0-10)</th><th>Total</th><th>Grade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roster.map((s) => {
                                        const total = computeTotal(s.matricNumber);
                                        const { grade } = gradeFromTotal(total);
                                        return (
                                            <tr key={s.id} style={{ fontSize: 14 }}>
                                                <td style={{ fontWeight: 600, color: navy }}>{s.matricNumber}</td>
                                                <td>{s.fullName}</td>
                                                <td><input type="number" min="0" max="30" disabled={isLocked} value={scores[s.matricNumber]?.ca ?? ""} onChange={(e) => updateField(s.matricNumber, "ca", e.target.value)} style={{ width: 70, borderRadius: 6, border: "1px solid #ddd", padding: "4px 6px" }} /></td>
                                                <td><input type="number" min="0" max="60" disabled={isLocked} value={scores[s.matricNumber]?.exam ?? ""} onChange={(e) => updateField(s.matricNumber, "exam", e.target.value)} style={{ width: 70, borderRadius: 6, border: "1px solid #ddd", padding: "4px 6px" }} /></td>
                                                <td><input type="number" min="0" max="10" disabled={isLocked} value={scores[s.matricNumber]?.assignment ?? ""} onChange={(e) => updateField(s.matricNumber, "assignment", e.target.value)} style={{ width: 70, borderRadius: 6, border: "1px solid #ddd", padding: "4px 6px" }} /></td>
                                                <td style={{ fontWeight: 700 }}>{total}</td>
                                                <td><span className="badge" style={{ background: gold, color: navy }}>{grade}</span></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <button onClick={handleSubmit} disabled={isLocked} style={{ background: isLocked ? "#ccc" : navy, color: "#fff", border: "none", padding: "10px 24px", borderRadius: 8, fontWeight: 700, cursor: isLocked ? "not-allowed" : "pointer" }}>
                            {existingSubmission ? "Resubmit to HOD" : "Submit for HOD Approval"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

const cardStyle = { background: "#fff", borderRadius: 14, padding: 24, boxShadow: "0 4px 14px rgba(15,44,89,0.06)" };
const labelStyle = { fontSize: 13.5, fontWeight: 600, color: navy, display: "block", marginBottom: 4 };
const inputStyle = { borderRadius: 8, border: "1px solid #ddd", padding: "10px 12px", fontSize: 14.5 };