import React, { useState } from "react";
import { getCurrentStaff, allocateCourse, getAllocationsForDepartment, getLecturersInDepartment } from "../utils/staffDB";
import { getCoursesForDepartment } from "../data/staffRegistry";
import { sharedStyles } from "./LecturerDashboard";

const navy = "#0F2C59";

export default function DepartmentAllocationView({ department }) {
    const lecturers = getLecturersInDepartment(department);
    const catalog = getCoursesForDepartment(department);
    const allocations = getAllocationsForDepartment(department);

    const [form, setForm] = useState({ staffId: "", courseCode: "", session: "2025/2026" });
    const [message, setMessage] = useState("");
    const [, setTick] = useState(0);
    const refresh = () => setTick((t) => t + 1);

    const handleSubmit = (e) => {
        e.preventDefault();
        const course = catalog.find((c) => c.code === form.courseCode);
        if (!course) {
            setMessage("Please select a course from the list.");
            return;
        }
        allocateCourse({
            staffId: form.staffId,
            department,
            session: form.session,
            courseCode: course.code,
            courseTitle: course.title,
            creditUnit: course.unit,
            level: course.level,
            semester: course.semester,
        });
        setMessage("Course allocated successfully.");
        setForm({ ...form, staffId: "", courseCode: "" });
        refresh();
        setTimeout(() => setMessage(""), 4000);
    };

    return (
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <style>{sharedStyles}</style>

            <div className="dash-anim" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22, paddingBottom: 14, borderBottom: "1px solid #e2e8f0", flexWrap: "wrap", gap: 10 }}>
                <div>
                    <h4 style={{ color: navy, fontWeight: 700, margin: 0, fontSize: "clamp(18px, 3vw, 22px)" }}>Course Allocation</h4>
                    <p style={{ color: "#64748b", fontSize: 13.5, margin: "4px 0 0" }}>Assign courses to lecturers in this department.</p>
                </div>
                <span style={{ background: navy, color: "#fff", fontWeight: 600, fontSize: 12, padding: "7px 14px", borderRadius: 20 }}>{department}</span>
            </div>

            <div className="sp-card dash-anim" style={{ animationDelay: "0.05s" }}>
                <h6 style={{ color: navy, fontWeight: 700, marginBottom: 16 }}>Allocate a Course to a Lecturer</h6>
                {message && <div className="alert alert-success py-2" style={{ borderRadius: 10 }}>{message}</div>}
                {lecturers.length === 0 ? (
                    <div style={{ color: "#6c757d", fontSize: 14, padding: 18, background: "#f8fafc", borderRadius: 12, border: "1px solid #e2e8f0" }}>
                        No lecturers are listed in the registry for this department.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label style={labelStyle}>Lecturer</label>
                                <select required value={form.staffId} onChange={(e) => setForm({ ...form, staffId: e.target.value })} className="form-select" style={inputStyle}>
                                    <option value="">Select a lecturer</option>
                                    {lecturers.map((l) => (
                                        <option key={l.staffId} value={l.staffId}>{l.firstName} {l.surname} ({l.staffId})</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label style={labelStyle}>Session</label>
                                <input type="text" required value={form.session} onChange={(e) => setForm({ ...form, session: e.target.value })} className="form-control" style={inputStyle} />
                            </div>
                            <div className="col-md-12">
                                <label style={labelStyle}>Course</label>
                                <select required value={form.courseCode} onChange={(e) => setForm({ ...form, courseCode: e.target.value })} className="form-select" style={inputStyle}>
                                    <option value="">Select a course</option>
                                    {catalog.map((c) => (
                                        <option key={c.code} value={c.code}>{c.code}, {c.title}, {c.level} {c.semester} Semester, {c.unit} Unit(s)</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div style={{ marginTop: 18, textAlign: "right" }}>
                            <button type="submit" style={{ background: navy, color: "#fff", border: "none", padding: "11px 26px", borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                                Allocate Course
                            </button>
                        </div>
                    </form>
                )}
            </div>

            <div className="sp-card dash-anim" style={{ animationDelay: "0.1s" }}>
                <h6 style={{ color: navy, fontWeight: 700, marginBottom: 16 }}>All Allocations in This Department</h6>
                <div className="sp-table-wrap">
                    <table className="table align-middle" style={{ minWidth: 640 }}>
                        <thead><tr style={{ fontSize: 13.5, color: navy }}><th>Staff ID</th><th>Code</th><th>Title</th><th>Level</th><th>Unit</th><th>Semester</th><th>Session</th></tr></thead>
                        <tbody>
                            {allocations.length === 0 ? (
                                <tr><td colSpan="7" style={{ textAlign: "center", color: "#adb5bd", padding: 26 }}>No course allocations recorded yet.</td></tr>
                            ) : (
                                allocations.map((a) => (
                                    <tr key={a.id} style={{ fontSize: 14 }}>
                                        <td>{a.staffId}</td><td style={{ fontWeight: 600, color: navy }}>{a.courseCode}</td><td>{a.courseTitle}</td><td>{a.level}</td><td>{a.creditUnit}</td><td>{a.semester}</td><td>{a.session}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

const labelStyle = { fontSize: 13, fontWeight: 600, color: navy, display: "block", marginBottom: 5 };
const inputStyle = { borderRadius: 10, border: "1px solid #dde2ea", padding: "11px 13px", fontSize: 14.5 };