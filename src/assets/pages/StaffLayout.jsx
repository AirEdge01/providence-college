import React, { useState } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { staffLogout, getCurrentStaff } from "../utils/staffDB";
import Sidebar from "../components/Sidebar";

export default function StaffLayout() {
  const navigate = useNavigate();
  const staff = getCurrentStaff();
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (!staff) return <Navigate to="/staff/login" replace />;

  const handleLogout = () => {
    staffLogout();
    navigate("/staff/login");
  };

  return (
    <div style={{ background: "#F3F5F9", minHeight: "100vh" }}>
      <style>{`
        .sp-shell { display: flex; min-height: 100vh; }
        .sp-sidebar-col { width: 268px; flex-shrink: 0; padding: 20px; }
        .sp-main { flex: 1; min-width: 0; padding: 20px 24px 40px; }
        .sp-mobile-bar { display: none; }
        .sp-drawer-overlay { display: none; }

        @media (max-width: 900px) {
          .sp-sidebar-col { position: fixed; top: 0; left: 0; bottom: 0; width: 280px; z-index: 1200; padding: 16px; transform: translateX(-110%); transition: transform 0.28s ease; }
          .sp-sidebar-col.open { transform: translateX(0); }
          .sp-main { padding: 76px 16px 40px; }
          .sp-mobile-bar {
            display: flex; align-items: center; justify-content: space-between; gap: 12px;
            position: fixed; top: 0; left: 0; right: 0; z-index: 1100;
            background: #0F2C59; color: #fff; padding: 14px 18px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.15);
          }
          .sp-drawer-overlay.open { display: block; position: fixed; inset: 0; background: rgba(0,0,0,0.45); z-index: 1150; }
        }
      `}</style>

      <div className="sp-mobile-bar">
        <button onClick={() => setDrawerOpen(true)} style={{ background: "transparent", border: "none", color: "#fff", fontSize: 22, cursor: "pointer" }}>
          <i className="bi bi-list"></i>
        </button>
        <span style={{ fontWeight: 700, fontSize: 15 }}>Staff Portal</span>
        <div style={{ width: 22 }} />
      </div>

      <div className={`sp-drawer-overlay ${drawerOpen ? "open" : ""}`} onClick={() => setDrawerOpen(false)} />

      <div className="sp-shell">
        <aside className={`sp-sidebar-col ${drawerOpen ? "open" : ""}`}>
          <Sidebar staff={staff} onLogout={handleLogout} onNavigate={() => setDrawerOpen(false)} />
        </aside>
        <main className="sp-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}