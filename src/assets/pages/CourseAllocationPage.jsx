import React, { useState } from "react";
import { 
  getCurrentStaff, 
  allocateCourse, 
  getAllocationsForDepartment, 
  getAllocationsForStaff, 
  getLecturersInDepartment, 
  STAFF_ROLES 
} from "../utils/staffDB";
import Sidebar from "../components/Sidebar";

// Dashboard Theme Palette
const THEME = {
  primary: "#0f172a",       // Dark slate primary
  accent: "#2563eb",        // Action blue
  bgSubtle: "#f8fafc",      // Subtle background
  cardBg: "#ffffff",        // Card background
  border: "#e2e8f0",        // Soft border
  textPrimary: "#1e293b",   // High-contrast text
  textMuted: "#64748b",     // Muted text
  successBg: "#f0fdf4",
  successText: "#15803d",
  successBorder: "#bbf7d0",
};
{/* <Sidebar/> */}

export default function CourseAllocationPage() {
  const staff = getCurrentStaff();
  const isHOD = staff.role === STAFF_ROLES.HOD || staff.role === STAFF_ROLES.SUPER_ADMIN;
  const lecturers = getLecturersInDepartment(staff.department);

  const [form, setForm] = useState({
    staffId: "",
    courseCode: "",
    courseTitle: "",
    level: "100L",
    creditUnit: 2,
    department: staff.department,
    session: "2025/2026",
    semester: "First",
  });
  const [message, setMessage] = useState("");

  const departmentAllocations = getAllocationsForDepartment(staff.department);
  const myAllocations = getAllocationsForStaff(staff.id);
  const activeAllocations = isHOD ? departmentAllocations : myAllocations;

  const handleSubmit = (e) => {
    e.preventDefault();
    allocateCourse({ ...form, creditUnit: Number(form.creditUnit) });
    setMessage("Course allocated successfully.");
    setForm((prev) => ({ ...prev, staffId: "", courseCode: "", courseTitle: "" }));
    
    // Auto-clear message after 4 seconds
    setTimeout(() => setMessage(""), 4000);
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "12px 0" }}>
      {/* Header Banner */}
      <div style={headerBannerStyle}>
        <div>
          <h2 style={headerTitleStyle}>Course Allocation</h2>
          <p style={headerSubtitleStyle}>
            {isHOD 
              ? `Manage and assign academic workloads for the ${staff.department} department.` 
              : "View your currently assigned teaching schedule and workload."}
          </p>
        </div>
        <div style={departmentBadgeStyle}>
          {staff.department}
        </div>
      </div>

      {/* Form Card (Visible to HOD / Super Admin) */}
      {isHOD && (
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>
            <h3 style={cardTitleStyle}>Assign New Allocation</h3>
            <p style={cardSubtitleStyle}>Fill in the course details and select an academic staff member.</p>
          </div>

          {message && <div style={successAlertStyle}>✓ {message}</div>}

          {lecturers.length === 0 ? (
            <div style={emptyLecturerBoxStyle}>
              <p style={{ margin: 0, fontWeight: 500 }}>No lecturers currently registered in this department.</p>
              <span style={{ fontSize: 13, opacity: 0.8 }}>
                Instruct staff members to register under the <strong>{staff.department}</strong> department with the "Lecturer / Academic Staff" role.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label style={labelStyle}>Lecturer</label>
                  <select
                    required
                    value={form.staffId}
                    onChange={(e) => setForm({ ...form, staffId: e.target.value })}
                    className="form-select"
                    style={inputStyle}
                  >
                    <option value="">Select a lecturer...</option>
                    {lecturers.map((l) => (
                      <option key={l.id} value={l.staffId}>
                        {l.firstName} {l.surname} ({l.staffId})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label style={labelStyle}>Academic Session</label>
                  <input
                    type="text"
                    required
                    value={form.session}
                    onChange={(e) => setForm({ ...form, session: e.target.value })}
                    className="form-control"
                    style={inputStyle}
                    placeholder="e.g. 2025/2026"
                  />
                </div>

                <div className="col-md-4">
                  <label style={labelStyle}>Course Code</label>
                  <input
                    type="text"
                    required
                    value={form.courseCode}
                    onChange={(e) => setForm({ ...form, courseCode: e.target.value })}
                    className="form-control"
                    style={inputStyle}
                    placeholder="e.g. CSC101"
                  />
                </div>

                <div className="col-md-8">
                  <label style={labelStyle}>Course Title</label>
                  <input
                    type="text"
                    required
                    value={form.courseTitle}
                    onChange={(e) => setForm({ ...form, courseTitle: e.target.value })}
                    className="form-control"
                    style={inputStyle}
                    placeholder="e.g. Introduction to Computer Science"
                  />
                </div>

                <div className="col-md-4">
                  <label style={labelStyle}>Level</label>
                  <select
                    value={form.level}
                    onChange={(e) => setForm({ ...form, level: e.target.value })}
                    className="form-select"
                    style={inputStyle}
                  >
                    <option value="100L">100 Level</option>
                    <option value="200L">200 Level</option>
                    <option value="300L">300 Level</option>
                    <option value="400L">400 Level</option>
                    <option value="500L">500 Level</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label style={labelStyle}>Credit Unit</label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    required
                    value={form.creditUnit}
                    onChange={(e) => setForm({ ...form, creditUnit: e.target.value })}
                    className="form-control"
                    style={inputStyle}
                  />
                </div>

                <div className="col-md-4">
                  <label style={labelStyle}>Semester</label>
                  <select
                    value={form.semester}
                    onChange={(e) => setForm({ ...form, semester: e.target.value })}
                    className="form-select"
                    style={inputStyle}
                  >
                    <option value="First">First Semester</option>
                    <option value="Second">Second Semester</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: 24, textAlign: "right" }}>
                <button type="submit" style={submitBtnStyle}>
                  Confirm Allocation
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Allocation List Table Card */}
      <div style={{ ...cardStyle, marginTop: 24 }}>
        <div style={cardHeaderStyle}>
          <h3 style={cardTitleStyle}>
            {isHOD ? "Departmental Course Allocations" : "My Assigned Workload"}
          </h3>
          <p style={cardSubtitleStyle}>
            Total Courses Allocated: <strong>{activeAllocations.length}</strong>
          </p>
        </div>

        <div className="table-responsive">
          <table className="table align-middle" style={{ marginBottom: 0 }}>
            <thead>
              <tr style={tableHeaderRowStyle}>
                <th style={thStyle}>Staff ID</th>
                <th style={thStyle}>Course Code</th>
                <th style={thStyle}>Course Title</th>
                <th style={thStyle}>Level</th>
                <th style={thStyle}>Units</th>
                <th style={thStyle}>Semester</th>
                <th style={thStyle}>Session</th>
              </tr>
            </thead>
            <tbody>
              {activeAllocations.length === 0 ? (
                <tr>
                  <td colSpan="7" style={emptyTableTdStyle}>
                    No course allocations recorded yet.
                  </td>
                </tr>
              ) : (
                activeAllocations.map((a) => (
                  <tr key={a.id} style={tableRowStyle}>
                    <td style={{ ...tdStyle, fontWeight: 600, color: THEME.textMuted }}>{a.staffId}</td>
                    <td style={tdStyle}>
                      <span style={codeBadgeStyle}>{a.courseCode}</span>
                    </td>
                    <td style={{ ...tdStyle, fontWeight: 500, color: THEME.textPrimary }}>{a.courseTitle}</td>
                    <td style={tdStyle}>{a.level}</td>
                    <td style={tdStyle}>
                      <span style={unitBadgeStyle}>{a.creditUnit} Units</span>
                    </td>
                    <td style={tdStyle}>{a.semester}</td>
                    <td style={{ ...tdStyle, color: THEME.textMuted }}>{a.session}</td>
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

// Inline Style Definitions
const headerBannerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 24,
  paddingBottom: 16,
  borderBottom: `1px solid ${THEME.border}`,
};

const headerTitleStyle = {
  color: THEME.primary,
  fontWeight: 800,
  fontSize: 24,
  margin: 0,
  letterSpacing: "-0.02em",
};

const headerSubtitleStyle = {
  color: THEME.textMuted,
  fontSize: 14,
  margin: "4px 0 0 0",
};

const departmentBadgeStyle = {
  backgroundColor: THEME.primary,
  color: "#ffffff",
  fontWeight: 600,
  fontSize: 12.5,
  padding: "6px 14px",
  borderRadius: 20,
  letterSpacing: "0.03em",
};

const cardStyle = {
  background: THEME.cardBg,
  borderRadius: 12,
  padding: 28,
  border: `1px solid ${THEME.border}`,
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
};

const cardHeaderStyle = {
  marginBottom: 20,
};

const cardTitleStyle = {
  color: THEME.primary,
  fontWeight: 700,
  fontSize: 17,
  margin: 0,
};

const cardSubtitleStyle = {
  color: THEME.textMuted,
  fontSize: 13.5,
  margin: "4px 0 0 0",
};

const labelStyle = {
  fontSize: 12.5,
  fontWeight: 600,
  color: THEME.primary,
  display: "block",
  marginBottom: 6,
  textTransform: "uppercase",
  letterSpacing: "0.02em",
};

const inputStyle = {
  borderRadius: 8,
  border: `1px solid ${THEME.border}`,
  padding: "10px 14px",
  fontSize: 14,
  color: THEME.textPrimary,
  backgroundColor: THEME.bgSubtle,
};

const submitBtnStyle = {
  background: THEME.primary,
  color: "#ffffff",
  border: "none",
  padding: "11px 26px",
  borderRadius: 8,
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
  transition: "background 0.2s ease",
};

const successAlertStyle = {
  backgroundColor: THEME.successBg,
  color: THEME.successText,
  border: `1px solid ${THEME.successBorder}`,
  borderRadius: 8,
  padding: "10px 16px",
  fontSize: 14,
  fontWeight: 500,
  marginBottom: 20,
};

const emptyLecturerBoxStyle = {
  backgroundColor: "#fffbebe",
  color: "#b45309",
  border: "1px solid #fef3c7",
  borderRadius: 8,
  padding: 16,
  fontSize: 14,
};

const tableHeaderRowStyle = {
  backgroundColor: THEME.bgSubtle,
  borderBottom: `2px solid ${THEME.border}`,
};

const thStyle = {
  fontSize: 11.5,
  fontWeight: 700,
  color: THEME.textMuted,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  padding: "12px 14px",
};

const tableRowStyle = {
  borderBottom: `1px solid ${THEME.border}`,
};

const tdStyle = {
  padding: "14px",
  fontSize: 14,
  color: THEME.textPrimary,
};

const emptyTableTdStyle = {
  padding: 32,
  textAlign: "center",
  color: THEME.textMuted,
  fontSize: 14,
};

const codeBadgeStyle = {
  backgroundColor: "#e0e7ff",
  color: "#3730a3",
  padding: "4px 8px",
  borderRadius: 6,
  fontWeight: 700,
  fontSize: 13,
};

const unitBadgeStyle = {
  backgroundColor: THEME.bgSubtle,
  border: `1px solid ${THEME.border}`,
  color: THEME.textMuted,
  padding: "3px 8px",
  borderRadius: 6,
  fontSize: 12.5,
  fontWeight: 600,
};