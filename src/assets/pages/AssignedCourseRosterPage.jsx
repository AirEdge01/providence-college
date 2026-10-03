import React, { useState } from "react";
import { getCurrentStaff, getAllocationsForStaff } from "../utils/staffDB";

const navy = "#0F2C59";

export default function AssignedCourseRosterPage() {
  const staff = getCurrentStaff();
  const allocations = getAllocationsForStaff(staff.staffId);
  const [selectedCourse, setSelectedCourse] = useState(allocations[0]?.courseCode || "");

  const students = JSON.parse(localStorage.getItem("pice_students") || "[]");
  const course = allocations.find((a) => a.courseCode === selectedCourse);

  const roster = course
    ? students.filter((s) =>
      (s.courses || []).some((c) => c.courseCode === course.courseCode && c.session === course.session)
    )
    : [];

  if (allocations.length === 0) {
    return (
      <div>
        <h4 style={{ color: navy, fontWeight: 700, marginBottom: 18 }}>My Course Roster</h4>
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
      <h4 style={{ color: navy, fontWeight: 700, marginBottom: 18 }}>My Course Roster</h4>

      <div style={cardStyle}>
        <div className="mb-3">
          <label style={labelStyle}>Select Course</label>
          <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} className="form-select" style={inputStyle}>
            {allocations.map((a) => (
              <option key={a.id} value={a.courseCode}>{a.courseCode} - {a.courseTitle} ({a.level})</option>
            ))}
          </select>
        </div>

        {roster.length === 0 ? (
          <div style={{ textAlign: "center", padding: "30px 0", color: "#adb5bd" }}>
            No students registered for this course yet.
          </div>
        ) : (
          <table className="table align-middle">
            <thead><tr style={{ fontSize: 13.5, color: navy }}><th>Matric Number</th><th>Name</th><th>Level</th></tr></thead>
            <tbody>
              {roster.map((s) => (
                <tr key={s.id} style={{ fontSize: 14 }}>
                  <td style={{ fontWeight: 600, color: navy }}>{s.matricNumber}</td>
                  <td>{s.fullName}</td>
                  <td>{s.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const cardStyle = { background: "#fff", borderRadius: 14, padding: 24, boxShadow: "0 4px 14px rgba(15,44,89,0.06)" };
const labelStyle = { fontSize: 13.5, fontWeight: 600, color: navy, display: "block", marginBottom: 4 };
const inputStyle = { borderRadius: 8, border: "1px solid #ddd", padding: "10px 12px", fontSize: 14.5 };