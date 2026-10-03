import React from "react";
import { Link } from "react-router-dom";
import { sharedStyles } from "./LecturerDashboard";

export default function BursaryDashboard() {
  return (
    <div>
      <style>{sharedStyles}</style>

      <div className="sp-hero dash-anim">
        <h4 style={{ fontWeight: 700, marginBottom: 6, fontSize: "clamp(18px, 3vw, 24px)" }}>Bursary and Financial Control</h4>
        <p style={{ opacity: 0.88, fontSize: 14.5, marginBottom: 0 }}>Financial clearance tools for the institution.</p>
      </div>

      <div className="sp-card dash-anim" style={{ animationDelay: "0.05s" }}>
        <div className="sp-card-empty">No clearance items pending at this time.</div>
      </div>

      <div className="sp-quicklinks dash-anim" style={{ animationDelay: "0.1s" }}>
        <Link to="/staff-portal/bursary" className="sp-quicklink">
          <i className="bi bi-cash-coin"></i> Open Bursary Clearance
        </Link>
      </div>
    </div>
  );
}