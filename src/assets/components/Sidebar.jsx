import React from "react";
import { Link, useLocation } from "react-router-dom";
import { STAFF_ROLES } from "../utils/staffDB";

const navy = "#0F2C59";
const gold = "#D4AF37";

const ALL_NAV_ITEMS = [
  { label: "Dashboard", path: "/staff-portal/dashboard", icon: "bi-speedometer2", roles: [STAFF_ROLES.LECTURER, STAFF_ROLES.HOD, STAFF_ROLES.EXAMS_OFFICER, STAFF_ROLES.BURSARY] },
  { label: "My Profile", path: "/staff-portal/profile", icon: "bi-person-circle", roles: [STAFF_ROLES.LECTURER, STAFF_ROLES.HOD, STAFF_ROLES.EXAMS_OFFICER, STAFF_ROLES.BURSARY] },
  { label: "Course Allocation", path: "/staff-portal/course-allocation", icon: "bi-journal-plus", roles: [STAFF_ROLES.HOD, STAFF_ROLES.LECTURER] },
  { label: "My Roster", path: "/staff-portal/roster", icon: "bi-people", roles: [STAFF_ROLES.LECTURER] },
  { label: "Score Upload", path: "/staff-portal/score-upload", icon: "bi-cloud-upload", roles: [STAFF_ROLES.LECTURER] },
  { label: "HOD Vetting Queue", path: "/staff-portal/hod-vetting", icon: "bi-check2-square", roles: [STAFF_ROLES.HOD] },
  { label: "Exams Officer Audit", path: "/staff-portal/exam-audit", icon: "bi-clipboard-check", roles: [STAFF_ROLES.EXAMS_OFFICER] },
  { label: "Bursary Clearance", path: "/staff-portal/bursary", icon: "bi-cash-coin", roles: [STAFF_ROLES.BURSARY] },
  { label: "Super Admin Control", path: "/staff-portal/super-admin", icon: "bi-shield-lock", roles: [STAFF_ROLES.SUPER_ADMIN] },
];

export default function Sidebar({ staff, onLogout }) {
  const location = useLocation();
  const isSuperAdmin = staff?.role === STAFF_ROLES.SUPER_ADMIN;
  const navItems = isSuperAdmin ? ALL_NAV_ITEMS : ALL_NAV_ITEMS.filter((item) => item.roles.includes(staff?.role));

  return (
    <div style={{ background: navy, borderRadius: 14, padding: "20px 0", color: "#fff" }}>
      <div style={{ textAlign: "center", padding: "0 16px 18px", borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
        {staff?.photo ? (
          <img src={staff.photo} alt={staff.fullName} style={{ width: 54, height: 54, borderRadius: "50%", objectFit: "cover", margin: "0 auto 10px", display: "block", border: `2px solid ${gold}` }} />
        ) : (
          <div style={{ width: 54, height: 54, borderRadius: "50%", background: gold, margin: "0 auto 10px", display: "flex", alignItems: "center", justifyContent: "center", color: navy, fontWeight: 700 }}>
            {staff?.firstName?.charAt(0) || "S"}{staff?.surname?.charAt(0) || ""}
          </div>
        )}
        <div style={{ fontWeight: 700, fontSize: 13.5 }}>{staff?.firstName} {staff?.surname}</div>
        <div style={{ fontSize: 11.5, opacity: 0.8 }}>{staff?.title || staff?.role}</div>
        {isSuperAdmin && <span className="badge" style={{ background: gold, color: navy, marginTop: 6, display: "inline-block" }}>Full Access</span>}
      </div>

      <nav style={{ padding: "14px 10px" }}>
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 8, marginBottom: 4,
              color: active ? navy : "#fff", background: active ? gold : "transparent", textDecoration: "none",
              fontWeight: active ? 600 : 500, fontSize: 13.5,
            }}>
              <i className={`bi ${item.icon}`}></i>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: "10px" }}>
        <button onClick={onLogout} style={{
          width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 8,
          color: "#fff", background: "rgba(220,53,69,0.15)", border: "1px solid rgba(220,53,69,0.4)", fontWeight: 500, fontSize: 13.5,
        }}>
          <i className="bi bi-box-arrow-right"></i>
          Logout
        </button>
      </div>
    </div>
  );
}