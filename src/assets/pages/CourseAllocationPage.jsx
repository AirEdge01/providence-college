import React, { useState } from "react";
import { getCurrentStaff, allocateCourse, getAllocationsForDepartment, getAllocationsForStaff, getLecturersInDepartment, STAFF_ROLES } from "../utils/staffDB";

const navy = "#0F2C59";

export default function CourseAllocationPage() {
  const staff = getCurrentStaff();
  const isHOD = staff.role === STAFF_ROLES.HOD || staff.role === STAFF_ROLES.SUPER_ADMIN;
  const lecturers = getLecturersInDepartment(staff.department);

  const [form, setForm] = useState({ staffId: "", courseCode: "", courseTitle: "", level: "100L", creditUnit: 2, department: staff.department, session: "2025/2026", semester: "First" });
  const [message, setMessage] = useState("");

  const departmentAllocations = getAllocationsForDepartment(staff.department);
  const myAllocations = getAllocationsForStaff(staff.id);
  const displayedAllocations = isHOD ? departmentAllocations : myAllocations;

  const handleSubmit = (e) => {
    e.preventDefault();
    allocateCourse({ ...form, creditUnit: Number(form.creditUnit) });
    setMessage("Course allocated successfully.");
    setForm({ ...form, staffId: "", courseCode: "", courseTitle: "" });
    setTimeout(() => setMessage(""), 4000);
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid #e2e8f0" }}>
        <div>
          <h4 style={{ color: navy, fontWeight: 700, margin: 0 }}>Course Allocation</h4>
          <p style={{ color: "#64748b", fontSize: 13.5, margin: "4px 0 0" }}>
            {isHOD ? `Manage and assign teaching workloads for the ${staff.department} department.` : "Overview of your assigned courses for the academic session."}
          </p>
        </div>
        <span style={{ background: navy, color: "#fff", fontWeight: 600, fontSize: 12, padding: "6px 12px", borderRadius: 20 }}>{staff.department}</span>
      </div>

      {isHOD && (
        <div style={cardStyle}>
          <h6 style={{ color: navy, fontWeight: 700, marginBottom: 16 }}>Allocate a Course to a Lecturer</h6>
          {message && <div className="alert alert-success py-2">{message}</div>}
          {lecturers.length === 0 ? (
            <div style={{ color: "#6c757d", fontSize: 14, padding: 16, background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0" }}>
              No lecturers are listed in the staff registry for the {staff.department} department yet.
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
                <div className="col-md-4">
                  <label style={labelStyle}>Course Code</label>
                  <input type="text" required value={form.courseCode} onChange={(e) => setForm({ ...form, courseCode: e.target.value })} className="form-control" style={inputStyle} />
                </div>
                <div className="col-md-4">
                  <label style={labelStyle}>Course Title</label>
                  <input type="text" required value={form.courseTitle} onChange={(e) => setForm({ ...form, courseTitle: e.target.value })} className="form-control" style={inputStyle} />
                </div>
                <div className="col-md-2">
                  <label style={labelStyle}>Level</label>
                  <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className="form-select" style={inputStyle}>
                    <option>100L</option><option>200L</option><option>300L</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label style={labelStyle}>Credit Unit</label>
                  <input type="number" required value={form.creditUnit} onChange={(e) => setForm({ ...form, creditUnit: e.target.value })} className="form-control" style={inputStyle} />
                </div>
                <div className="col-md-4">
                  <label style={labelStyle}>Semester</label>
                  <select value={form.semester} onChange={(e) => setForm({ ...form, semester: e.target.value })} className="form-select" style={inputStyle}>
                    <option>First</option><option>Second</option>
                  </select>
                </div>
              </div>
              <div style={{ marginTop: 16, textAlign: "right" }}>
                <button type="submit" style={{ background: navy, color: "#fff", border: "none", padding: "10px 24px", borderRadius: 8, fontWeight: 600 }}>
                  Allocate Course
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      <div style={{ ...cardStyle, marginTop: 20 }}>
        <h6 style={{ color: navy, fontWeight: 700, marginBottom: 16 }}>{isHOD ? "All Department Allocations" : "My Allocated Courses"}</h6>
        <table className="table align-middle">
          <thead><tr style={{ fontSize: 13.5, color: navy }}><th>Staff ID</th><th>Code</th><th>Title</th><th>Level</th><th>Unit</th><th>Semester</th><th>Session</th></tr></thead>
          <tbody>
            {displayedAllocations.length === 0 ? (
              <tr><td colSpan="7" style={{ textAlign: "center", color: "#adb5bd", padding: 24 }}>No course allocations recorded yet.</td></tr>
            ) : (
              displayedAllocations.map((a) => (
                <tr key={a.id} style={{ fontSize: 14 }}>
                  <td>{a.staffId}</td><td style={{ fontWeight: 600, color: navy }}>{a.courseCode}</td><td>{a.courseTitle}</td><td>{a.level}</td><td>{a.creditUnit}</td><td>{a.semester}</td><td>{a.session}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const cardStyle = { background: "#fff", borderRadius: 14, padding: 24, boxShadow: "0 4px 14px rgba(15,44,89,0.06)" };
const labelStyle = { fontSize: 13.5, fontWeight: 600, color: navy, display: "block", marginBottom: 4 };
const inputStyle = { borderRadius: 8, border: "1px solid #ddd", padding: "10px 12px", fontSize: 14.5 };