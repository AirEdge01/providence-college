import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentStaff, STAFF_ROLES } from "../utils/staffDB";

export default function StaffProtectedRoute({ allowedRoles, children }) {
  const staff = getCurrentStaff();

  if (!staff) {
    return <Navigate to="/staff/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(staff.role) && staff.role !== STAFF_ROLES.SUPER_ADMIN) {
    return <Navigate to="/staff-portal/dashboard" replace />;
  }

  return children;
}