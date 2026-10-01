import React, { useState } from "react";
import {
  getCurrentStaff,
  allocateCourse,
  getAllocationsForDepartment,
  getAllocationsForStaff,
  getLecturersInDepartment,
  STAFF_ROLES,
} from "../utils/staffDB";
import Sidebar from "../components/Sidebar";

// Slate Dashboard Theme Colors
const DASHBOARD_THEME = {
  navy: "#0f172a",          // Main slate navy accent
  cardBg: "#ffffff",
  bodyBg: "#f8fafc",
  border: "#e2e8f0",
  textPrimary: "#1e293b",
  textMuted: "#64748b",
  accentBlue: "#2563eb",
  successBg: "#f0fdf4",
  successText: "#166534",
  successBorder: "#bbf7d0",
};
<Sidebar/>
export default function CourseAllocationPage() {
  const staff = getCurrentStaff();
  const isHOD =
    staff.role === STAFF_ROLES.HOD || staff.role === STAFF_ROLES.SUPER_ADMIN;
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
  const displayedAllocations = isHOD ? departmentAllocations : myAllocations;

  const handleSubmit = (e) => {
    e.preventDefault();
    allocateCourse({ ...form, creditUnit: Number(form.creditUnit) });
    setMessage("Course allocated successfully.");
    setForm({
      ...form,
      staffId: "",
      courseCode: "",
      courseTitle: "",
    });

    // Automatically hide success notification after 4 seconds
    setTimeout(() => setMessage(""), 4000);
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "10px 0" }}>
      {/* Page Header */}
      <div style={headerContainerStyle}>
        <div>
          <h4 style={headerTitleStyle}>Course Allocation</h4>
          <p style={headerSubTitleStyle}>
            {isHOD
              ? `Manage and assign teaching workloads for the ${staff.department} department.`
              : "Overview of your assigned courses for the academic session."}
          </p>
        </div>
        <span style={departmentBadgeStyle}>{staff.department}</span>
      </div>

      {/* Form Section (Visible to HOD / Super Admin) */}
      {isHOD && (
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>
            <h6 style={cardTitleStyle}>Allocate a Course to a Lecturer</h6>
            <p style={cardSubTitleStyle}>
              Select an academic staff member and enter the course details below.
            </p>
          </div>

          {message && (
            <div style={alertStyle}>
              <i className="bi bi-check-circle-fill me-2"></i>
              {message}
            </div>
          )}

          {lecturers.length === 0 ? (
            <div style={emptyLecturerWarningStyle}>
              No lecturers found yet in the <strong>{staff.department}</strong>{" "}
              department. Ask them to sign up with role "Lecturer / Academic
              Staff" and this department name.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label style={labelStyle}>Lecturer</label>
                  <select
                    required
                    value={form.staffId}
                    onChange={(e) =>
                      setForm({ ...form, staffId: e.target.value })
                    }
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
                    onChange={(e) =>
                      setForm({ ...form, session: e.target.value })
                    }
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
                    onChange={(e) =>
                      setForm({ ...form, courseCode: e.target.value })
                    }
                    className="form-control"
                    style={inputStyle}
                    placeholder="e.g. CSC 101"
                  />
                </div>

                <div className="col-md-8">
                  <label style={labelStyle}>Course Title</label>
                  <input
                    type="text"
                    required
                    value={form.courseTitle}
                    onChange={(e) =>
                      setForm({ ...form, courseTitle: e.target.value })
                    }
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
                    <option value="100L">100L</option>
                    <option value="200L">200L</option>
                    <option value="300L">300L</option>
                    <option value="400L">400L</option>
                    <option value="500L">500L</option>
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
                    onChange={(e) =>
                      setForm({ ...form, creditUnit: e.target.value })
                    }
                    className="form-control"
                    style={inputStyle}
                  />
                </div>

                <div className="col-md-4">
                  <label style={labelStyle}>Semester</label>
                  <select
                    value={form.semester}
                    onChange={(e) =>
                      setForm({ ...form, semester: e.target.value })
                    }
                    className="form-select"
                    style={inputStyle}
                  >
                    <option value="First">First Semester</option>
                    <option value="Second">Second Semester</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: 20, textAlign: "right" }}>
                <button type="submit" style={buttonStyle}>
                  Allocate Course
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Allocation Data Table */}
      <div style={{ ...cardStyle, marginTop: 24 }}>
        <div style={cardHeaderStyle}>
          <h6 style={cardTitleStyle}>
            {isHOD ? "All Department Allocations" : "My Allocated Courses"}
          </h6>
          <p style={cardSubTitleStyle}>
            Showing total of <strong>{displayedAllocations.length}</strong> course allocation(s)
          </p>
        </div>

        <div className="table-responsive">
          <table className="table align-middle" style={{ marginBottom: 0 }}>
            <thead>
              <tr style={tableHeaderStyle}>
                <th style={thStyle}>Staff ID</th>
                <th style={thStyle}>Code</th>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Level</th>
                <th style={thStyle}>Unit</th>
                <th style={thStyle}>Semester</th>
                <th style={thStyle}>Session</th>
              </tr>
            </thead>
            <tbody>
              {displayedAllocations.length === 0 ? (
                <tr>
                  <td colSpan="7" style={emptyTableTdStyle}>
                    No course allocations recorded yet.
                  </td>
                </tr>
              ) : (
                displayedAllocations.map((a) => (
                  <tr key={a.id} style={trStyle}>
                    <td style={{ ...tdStyle, fontWeight: 500 }}>{a.staffId}</td>
                    <td style={tdStyle}>
                      <span style={codeBadgeStyle}>{a.courseCode}</span>
                    </td>
                    <td style={{ ...tdStyle, color: DASHBOARD_THEME.textPrimary, fontWeight: 500 }}>
                      {a.courseTitle}
                    </td>
                    <td style={tdStyle}>{a.level}</td>
                    <td style={tdStyle}>
                      <span style={unitBadgeStyle}>{a.creditUnit} Units</span>
                    </td>
                    <td style={tdStyle}>{a.semester}</td>
                    <td style={{ ...tdStyle, color: DASHBOARD_THEME.textMuted }}>
                      {a.session}
                    </td>
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

// Inline Styles matching Dashboard Theme Palette
const headerContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 20,
  paddingBottom: 12,
  borderBottom: `1px solid ${DASHBOARD_THEME.border}`,
};

const headerTitleStyle = {
  color: DASHBOARD_THEME.navy,
  fontWeight: 700,
  fontSize: 22,
  margin: 0,
};

const headerSubTitleStyle = {
  color: DASHBOARD_THEME.textMuted,
  fontSize: 13.5,
  margin: "4px 0 0 0",
};

const departmentBadgeStyle = {
  backgroundColor: DASHBOARD_THEME.navy,
  color: "#ffffff",
  fontWeight: 600,
  fontSize: 12,
  padding: "6px 12px",
  borderRadius: 20,
};

const cardStyle = {
  background: DASHBOARD_THEME.cardBg,
  borderRadius: 12,
  padding: 24,
  border: `1px solid ${DASHBOARD_THEME.border}`,
  boxShadow: "0 1px 3px rgba(15, 23, 42, 0.05)",
};

const cardHeaderStyle = {
  marginBottom: 18,
};

const cardTitleStyle = {
  color: DASHBOARD_THEME.navy,
  fontWeight: 700,
  fontSize: 16,
  margin: 0,
};

const cardSubTitleStyle = {
  color: DASHBOARD_THEME.textMuted,
  fontSize: 13,
  margin: "3px 0 0 0",
};

const labelStyle = {
  fontSize: 12,
  fontWeight: 700,
  color: DASHBOARD_THEME.navy,
  display: "block",
  marginBottom: 6,
  textTransform: "uppercase",
  letterSpacing: "0.02em",
};

const inputStyle = {
  borderRadius: 8,
  border: `1px solid ${DASHBOARD_THEME.border}`,
  padding: "9px 12px",
  fontSize: 14,
  color: DASHBOARD_THEME.textPrimary,
  backgroundColor: DASHBOARD_THEME.bodyBg,
};

const buttonStyle = {
  background: DASHBOARD_THEME.navy,
  color: "#ffffff",
  border: "none",
  padding: "10px 22px",
  borderRadius: 8,
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
};

const alertStyle = {
  backgroundColor: DASHBOARD_THEME.successBg,
  color: DASHBOARD_THEME.successText,
  border: `1px solid ${DASHBOARD_THEME.successBorder}`,
  padding: "10px 14px",
  borderRadius: 8,
  fontSize: 13.5,
  fontWeight: 500,
  marginBottom: 18,
};

const emptyLecturerWarningStyle = {
  color: DASHBOARD_THEME.textMuted,
  fontSize: 13.5,
  backgroundColor: DASHBOARD_THEME.bodyBg,
  padding: 16,
  borderRadius: 8,
  border: `1px solid ${DASHBOARD_THEME.border}`,
};

const tableHeaderStyle = {
  backgroundColor: DASHBOARD_THEME.bodyBg,
  borderBottom: `2px solid ${DASHBOARD_THEME.border}`,
};

const thStyle = {
  fontSize: 11.5,
  fontWeight: 700,
  color: DASHBOARD_THEME.textMuted,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  padding: "12px 14px",
};

const trStyle = {
  borderBottom: `1px solid ${DASHBOARD_THEME.border}`,
};

const tdStyle = {
  padding: "12px 14px",
  fontSize: 13.5,
  color: DASHBOARD_THEME.textMuted,
};

const emptyTableTdStyle = {
  padding: 24,
  textAlign: "center",
  color: DASHBOARD_THEME.textMuted,
  fontSize: 13.5,
};

const codeBadgeStyle = {
  backgroundColor: "#e0e7ff",
  color: "#3730a3",
  padding: "3px 8px",
  borderRadius: 6,
  fontWeight: 700,
  fontSize: 12.5,
};

const unitBadgeStyle = {
  backgroundColor: DASHBOARD_THEME.bodyBg,
  border: `1px solid ${DASHBOARD_THEME.border}`,
  color: DASHBOARD_THEME.navy,
  padding: "2px 8px",
  borderRadius: 6,
  fontSize: 12,
  fontWeight: 600,
};