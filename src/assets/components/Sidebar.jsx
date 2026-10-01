import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

// Dashboard Palette
const DASHBOARD_NAV_THEME = {
  sidebarBg: "#0f172a",       // Dark slate navy background
  border: "#1e293b",          // Dark border accent
  textMuted: "#94a3b8",        // Inactive item text
  textActive: "#ffffff",       // Active item text
  activeBg: "#1e293b",         // Active item background highlight
  accentBorder: "#2563eb",     // Active indicator bar
  dangerText: "#f87171",       // Logout button hover/text
  dangerHoverBg: "#450a0a",    // Logout button hover background
};

export default function Sidebar({ onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to log out?")) {
      if (onLogout) {
        onLogout();
      } else {
        // Default logout navigation fallback
        localStorage.removeItem("currentUser");
        navigate("/login");
      }
    }
  };

  const navItems = [
    { to: "dashboard", label: "Overview", end: true },
    { to: "profile", label: "My Profile" },
    { to: "course-allocation", label: "Course Allocation" },
    { to: "roster", label: "My Roster" },
    { to: "score-upload", label: "Upload Scores" },
    { to: "hod-vetting", label: "HOD Vetting" },
    { to: "exam-audit", label: "Exam Audit" },
    { to: "bursary", label: "Bursary" },
  ];

  return (
    <aside style={sidebarContainerStyle}>
      {/* Optional Brand Header */}
      <div style={brandHeaderStyle}>
        <span style={brandTitleStyle}>Staff Portal</span>
      </div>

      {/* Navigation List */}
      <nav className="list-group" style={{ gap: 4 }}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            style={({ isActive }) =>
              isActive ? activeNavLinkStyle : navLinkStyle
            }
          >
            {({ isActive }) => (
              <div style={linkContentStyle}>
                {isActive && <div style={activeIndicatorStyle} />}
                <span>{item.label}</span>
              </div>
            )}
          </NavLink>
        ))}

        {/* Logout Button */}
        <button
          type="button"
          onClick={handleLogoutClick}
          style={logoutButtonStyle}
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}

// Styling definitions
const sidebarContainerStyle = {
  width: "240px",
  minHeight: "100vh",
  backgroundColor: DASHBOARD_NAV_THEME.sidebarBg,
  padding: "20px 14px",
  borderRight: `1px solid ${DASHBOARD_NAV_THEME.border}`,
  display: "flex",
  flexDirection: "column",
};

const brandHeaderStyle = {
  paddingBottom: 18,
  marginBottom: 14,
  borderBottom: `1px solid ${DASHBOARD_NAV_THEME.border}`,
  paddingLeft: 12,
};

const brandTitleStyle = {
  color: "#ffffff",
  fontWeight: 700,
  fontSize: 16,
  letterSpacing: "-0.01em",
};

const navLinkStyle = {
  display: "block",
  padding: "10px 14px",
  borderRadius: 8,
  color: DASHBOARD_NAV_THEME.textMuted,
  fontSize: 14,
  fontWeight: 500,
  textDecoration: "none",
  transition: "all 0.15s ease",
};

const activeNavLinkStyle = {
  ...navLinkStyle,
  backgroundColor: DASHBOARD_NAV_THEME.activeBg,
  color: DASHBOARD_NAV_THEME.textActive,
  fontWeight: 600,
};

const linkContentStyle = {
  display: "flex",
  alignItems: "center",
  position: "relative",
};

const activeIndicatorStyle = {
  position: "absolute",
  left: -14,
  top: "50%",
  transform: "translateY(-50%)",
  width: 4,
  height: 18,
  backgroundColor: DASHBOARD_NAV_THEME.accentBorder,
  borderRadius: "0 4px 4px 0",
};

const logoutButtonStyle = {
  marginTop: 16,
  width: "100%",
  textAlign: "left",
  padding: "10px 14px",
  borderRadius: 8,
  backgroundColor: "transparent",
  border: "none",
  color: DASHBOARD_NAV_THEME.dangerText,
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
  transition: "background 0.15s ease",
};