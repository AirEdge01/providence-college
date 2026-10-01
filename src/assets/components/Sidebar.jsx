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

export default function Sidebar({ onLogout, staff }) {
    const navigate = useNavigate();

    const handleLogoutClick = (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to log out?")) {
            if (onLogout) {
                onLogout();
            } else {
                // Default logout navigation fallback
                localStorage.removeItem("pice_staff_session");
                navigate("/login");
            }
        }
    };

    const navItems = [
        { to: "dashboard", label: "Overview", icon: "bi-speedometer2", end: true },
        { to: "profile", label: "My Profile", icon: "bi-person" },
        { to: "course-allocation", label: "Course Allocation", icon: "bi-book" },
        { to: "roster", label: "My Roster", icon: "bi-people" },
        { to: "score-upload", label: "Upload Scores", icon: "bi-cloud-upload" },
        { to: "hod-vetting", label: "HOD Vetting", icon: "bi-person-check" },
        { to: "exam-audit", label: "Exam Audit", icon: "bi-file-earmark-text" },
        { to: "bursary", label: "Bursary", icon: "bi-cash-stack" },
    ];

    return (
        <aside style={sidebarContainerStyle}>
            {/* Profile Header */}
            <div style={profileHeaderStyle}>
                <img src={staff?.photo || "https://via.placeholder.com/80"} alt={staff?.fullName || "Staff"} style={avatarStyle} />
                <div style={{ marginTop: 10 }}>
                    <div style={profileNameStyle}>{staff?.fullName || "Staff Member"}</div>
                    <div style={profileIdStyle}>{staff?.staffId || staff?.id || "-"}</div>
                </div>
            </div>

            <nav style={{ padding: '10px 8px', flex: 1 }}>
                {navItems.map((item) => (
                    <NavLink key={item.to} to={item.to} end={item.end} style={({ isActive }) => ({
                        display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, marginBottom: 6,
                        color: isActive ? DASHBOARD_NAV_THEME.sidebarBg : '#fff', background: isActive ? DASHBOARD_NAV_THEME.accentBorder : 'transparent', textDecoration: 'none', fontWeight: isActive ? 700 : 600,
                    })}>
                        <i className={`bi ${item.icon}`} style={{ width: 20, textAlign: 'center', fontSize: 16 }} />
                        <span style={{ fontSize: 14 }}>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div style={{ padding: 12 }}>
                <button onClick={handleLogoutClick} style={staffLogoutStyle}>
                    <i className="bi bi-box-arrow-right"></i>
                    <span style={{ marginLeft: 8 }}>Logout</span>
                </button>
            </div>
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

// New styles for student-like sidebar
const profileHeaderStyle = {
    textAlign: 'center',
    padding: '20px 12px',
    borderBottom: `1px solid ${DASHBOARD_NAV_THEME.border}`,
};

const avatarStyle = {
    width: 80,
    height: 80,
    borderRadius: '50%',
    objectFit: 'cover',
    border: `3px solid ${DASHBOARD_NAV_THEME.accentBorder}`,
};

const profileNameStyle = {
    color: '#fff',
    fontWeight: 700,
    fontSize: 14,
};

const profileIdStyle = {
    color: DASHBOARD_NAV_THEME.textMuted,
    fontSize: 12,
    marginTop: 2,
};

const staffLogoutStyle = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 12px',
    borderRadius: 8,
    color: '#fff',
    background: 'rgba(220,53,69,0.12)',
    border: '1px solid rgba(220,53,69,0.25)',
    fontWeight: 600,
};