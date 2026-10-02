import React, { useState } from "react";
import {
    getAllStaff, adminUpdateStaff, adminDeleteStaff,
    getAllAllocations, deleteAllocation,
    getAllSubmissions, adminSetSubmissionStatus, adminDeleteSubmission, adminPublishSubmission,
    getAllStudents, adminUpdateStudent, STAFF_ROLES,
} from "../utils/staffDB";

const navy = "#0F2C59";
const gold = "#D4AF37";

const SUBMISSION_STAGES = ["Pending HOD", "HOD Confirmed", "Sent to Exams Officer", "Published"];

export default function SuperAdminPage() {
    const [tab, setTab] = useState("staff");
    const [, setTick] = useState(0);
    const refresh = () => setTick((t) => t + 1);

    return (
        <div>
            <h4 style={{ color: navy, fontWeight: 700, marginBottom: 6 }}>Super Admin Control Center</h4>
            <p style={{ color: "#6c757d", fontSize: 14, marginBottom: 20 }}>
                Full control over every staff account, course allocation, result submission, and student record in the system.
            </p>

            <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
                {["staff", "allocations", "submissions", "students"].map((t) => (
                    <button key={t} onClick={() => setTab(t)} style={{
                        background: tab === t ? navy : "#fff", color: tab === t ? "#fff" : navy,
                        border: `1px solid ${navy}`, padding: "8px 18px", borderRadius: 30, fontWeight: 600, fontSize: 13.5, textTransform: "capitalize",
                    }}>
                        {t}
                    </button>
                ))}
            </div>

            {tab === "staff" && <StaffTab refresh={refresh} />}
            {tab === "allocations" && <AllocationsTab refresh={refresh} />}
            {tab === "submissions" && <SubmissionsTab refresh={refresh} />}
            {tab === "students" && <StudentsTab refresh={refresh} />}
        </div>
    );
}

function StaffTab({ refresh }) {
    const staff = getAllStaff();
    const [editing, setEditing] = useState(null);

    const handleSave = (id, updates) => {
        adminUpdateStaff(id, updates);
        setEditing(null);
        refresh();
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this staff account? This cannot be undone.")) {
            adminDeleteStaff(id);
            refresh();
        }
    };

    return (
        <div style={cardStyle}>
            <h6 style={{ color: navy, fontWeight: 700, marginBottom: 16 }}>All Staff Accounts ({staff.length})</h6>
            <table className="table align-middle">
                <thead><tr style={{ fontSize: 13 }}><th>Staff ID</th><th>Name</th><th>Role</th><th>Department</th><th>Email</th><th></th></tr></thead>
                <tbody>
                    {staff.map((s) => (
                        <tr key={s.id} style={{ fontSize: 14 }}>
                            <td>{s.staffId}</td>
                            {editing === s.id ? (
                                <EditableRow staff={s} onSave={(updates) => handleSave(s.id, updates)} onCancel={() => setEditing(null)} />
                            ) : (
                                <>
                                    <td>{s.fullName}</td>
                                    <td><span className="badge" style={{ background: "#EAF1FB", color: navy }}>{s.role}</span></td>
                                    <td>{s.department}</td>
                                    <td>{s.email}</td>
                                    <td>
                                        <button onClick={() => setEditing(s.id)} className="btn btn-sm btn-outline-primary me-2">Edit</button>
                                        <button onClick={() => handleDelete(s.id)} className="btn btn-sm btn-outline-danger">Delete</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function EditableRow({ staff, onSave, onCancel }) {
    const [role, setRole] = useState(staff.role);
    const [department, setDepartment] = useState(staff.department);

    return (
        <>
            <td>{staff.fullName}</td>
            <td>
                <select value={role} onChange={(e) => setRole(e.target.value)} className="form-select form-select-sm">
                    {Object.values(STAFF_ROLES).map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
            </td>
            <td><input value={department} onChange={(e) => setDepartment(e.target.value)} className="form-control form-control-sm" /></td>
            <td>{staff.email}</td>
            <td>
                <button onClick={() => onSave({ role, department })} className="btn btn-sm btn-success me-2">Save</button>
                <button onClick={onCancel} className="btn btn-sm btn-secondary">Cancel</button>
            </td>
        </>
    );
}

function AllocationsTab({ refresh }) {
    const allocations = getAllAllocations();

    const handleDelete = (id) => {
        if (window.confirm("Delete this course allocation?")) {
            deleteAllocation(id);
            refresh();
        }
    };

    return (
        <div style={cardStyle}>
            <h6 style={{ color: navy, fontWeight: 700, marginBottom: 16 }}>All Course Allocations ({allocations.length})</h6>
            <table className="table align-middle">
                <thead><tr style={{ fontSize: 13 }}><th>Staff ID</th><th>Code</th><th>Title</th><th>Department</th><th>Level</th><th>Session</th><th></th></tr></thead>
                <tbody>
                    {allocations.map((a) => (
                        <tr key={a.id} style={{ fontSize: 14 }}>
                            <td>{a.staffId}</td><td style={{ fontWeight: 600, color: navy }}>{a.courseCode}</td><td>{a.courseTitle}</td><td>{a.department}</td><td>{a.level}</td><td>{a.session}</td>
                            <td><button onClick={() => handleDelete(a.id)} className="btn btn-sm btn-outline-danger">Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function SubmissionsTab({ refresh }) {
    const submissions = getAllSubmissions();

    const handleStatusChange = (id, status) => { adminSetSubmissionStatus(id, status); refresh(); };
    const handlePublish = (id) => { adminPublishSubmission(id); refresh(); };
    const handleDelete = (id) => {
        if (window.confirm("Delete this submission permanently?")) {
            adminDeleteSubmission(id);
            refresh();
        }
    };

    return (
        <div style={cardStyle}>
            <h6 style={{ color: navy, fontWeight: 700, marginBottom: 16 }}>All Result Submissions ({submissions.length})</h6>
            <p style={{ color: "#6c757d", fontSize: 13, marginBottom: 16 }}>
                Change the stage dropdown to undo a submission back to an earlier step, or forward it, at any time.
            </p>
            <table className="table align-middle">
                <thead><tr style={{ fontSize: 13 }}><th>Course</th><th>Department</th><th>Lecturer</th><th>Stage</th><th></th></tr></thead>
                <tbody>
                    {submissions.map((s) => (
                        <tr key={s.id} style={{ fontSize: 14 }}>
                            <td style={{ fontWeight: 600, color: navy }}>{s.courseCode}</td>
                            <td>{s.department}</td>
                            <td>{s.staffName}</td>
                            <td>
                                <select value={s.status} onChange={(e) => handleStatusChange(s.id, e.target.value)} className="form-select form-select-sm">
                                    {SUBMISSION_STAGES.map((stage) => <option key={stage} value={stage}>{stage}</option>)}
                                </select>
                            </td>
                            <td style={{ whiteSpace: "nowrap" }}>
                                {s.status !== "Published" && (
                                    <button onClick={() => handlePublish(s.id)} className="btn btn-sm btn-outline-success me-2">Publish Now</button>
                                )}
                                <button onClick={() => handleDelete(s.id)} className="btn btn-sm btn-outline-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function StudentsTab({ refresh }) {
    const students = getAllStudents();
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({});

    const startEdit = (student) => {
        setEditing(student.id);
        setForm({ level: student.level, courseOfStudy: student.courseOfStudy, department: student.department });
    };

    const handleSave = (id) => {
        adminUpdateStudent(id, form);
        setEditing(null);
        refresh();
    };

    return (
        <div style={cardStyle}>
            <h6 style={{ color: navy, fontWeight: 700, marginBottom: 16 }}>All Students ({students.length})</h6>
            <table className="table align-middle">
                <thead><tr style={{ fontSize: 13 }}><th>Matric</th><th>Name</th><th>Level</th><th>Course of Study</th><th>Department</th><th></th></tr></thead>
                <tbody>
                    {students.map((s) => (
                        <tr key={s.id} style={{ fontSize: 14 }}>
                            <td style={{ fontWeight: 600, color: navy }}>{s.matricNumber}</td>
                            <td>{s.fullName}</td>
                            {editing === s.id ? (
                                <>
                                    <td><input value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className="form-control form-control-sm" style={{ width: 80 }} /></td>
                                    <td><input value={form.courseOfStudy} onChange={(e) => setForm({ ...form, courseOfStudy: e.target.value })} className="form-control form-control-sm" /></td>
                                    <td><input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="form-control form-control-sm" /></td>
                                    <td>
                                        <button onClick={() => handleSave(s.id)} className="btn btn-sm btn-success me-2">Save</button>
                                        <button onClick={() => setEditing(null)} className="btn btn-sm btn-secondary">Cancel</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{s.level}</td>
                                    <td>{s.courseOfStudy}</td>
                                    <td>{s.department}</td>
                                    <td><button onClick={() => startEdit(s)} className="btn btn-sm btn-outline-primary">Edit</button></td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const cardStyle = { background: "#fff", borderRadius: 14, padding: 24, boxShadow: "0 4px 14px rgba(15,44,89,0.06)" };