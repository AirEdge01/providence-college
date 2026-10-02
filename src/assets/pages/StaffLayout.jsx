import React from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { staffLogout, getCurrentStaff } from "../utils/staffDB";
import Sidebar from "../components/Sidebar";

export default function StaffLayout() {
  const navigate = useNavigate();
  const staff = getCurrentStaff();

  if (!staff) return <Navigate to="/staff/login" replace />;

  const handleLogout = () => {
    staffLogout();
    navigate("/staff/login");
  };

  return (
    <div className="container-fluid py-4" style={{ background: "#F5F6F8", minHeight: "100vh" }}>
      <div className="row">
        <aside className="col-md-3 col-lg-2 mb-4">
          <Sidebar onLogout={handleLogout} staff={staff} />
        </aside>
        <main className="col-md-9 col-lg-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}