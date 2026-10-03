import React, { useState, useRef } from "react";
import { getCurrentStaff, updateStaffPhoto } from "../utils/staffDB";
import { sharedStyles } from "./LecturerDashboard";

const navy = "#0F2C59";
const gold = "#D4AF37";

export default function StaffPortalProfile() {
  const [staff, setStaff] = useState(getCurrentStaff());
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  if (!staff) return <div className="p-4">No staff signed in.</div>;

  const handlePhotoChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        const updated = updateStaffPhoto(staff.id, dataUrl);
        setStaff(updated);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setUploading(false);
    }
  };

  return (
    <div>
      <style>{sharedStyles}</style>
      <h4 style={{ color: navy, fontWeight: 700, marginBottom: 20, fontSize: "clamp(18px, 3vw, 22px)" }} className="dash-anim">My Profile</h4>

      <div className="sp-card dash-anim" style={{ animationDelay: "0.05s" }}>
        <div style={{ display: "flex", gap: 28, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ textAlign: "center" }}>
            <img
              src={staff.photo || "https://via.placeholder.com/140"}
              alt={staff.fullName}
              style={{ width: 140, height: 140, borderRadius: "50%", objectFit: "cover", border: `4px solid ${gold}`, display: "block", marginBottom: 14, boxShadow: "0 6px 18px rgba(15,44,89,0.18)" }}
            />
            <input type="file" accept="image/*" ref={fileRef} style={{ display: "none" }} onChange={handlePhotoChange} />
            <button
              onClick={() => fileRef.current && fileRef.current.click()}
              disabled={uploading}
              style={{ background: "#fff", border: `1px solid ${navy}`, color: navy, padding: "8px 18px", borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: "pointer" }}
            >
              {uploading ? "Uploading..." : "Change Photo"}
            </button>
          </div>

          <div style={{ flex: 1, minWidth: 260 }}>
            <h5 style={{ color: navy, fontWeight: 700, marginBottom: 4 }}>{staff.fullName}</h5>
            <p style={{ color: "#6c757d", fontSize: 14, marginBottom: 20 }}>{staff.title || staff.role}</p>

            <div className="row g-3">
              <InfoField label="Staff ID" value={staff.staffId} />
              <InfoField label="Email Address" value={staff.email} />
              <InfoField label="Portal Role" value={staff.role} />
              <InfoField label="Department" value={staff.department} />
              <InfoField label="Category" value={staff.category} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoField({ label, value }) {
  return (
    <div className="col-md-6">
      <div style={{ fontSize: 12, color: "#6c757d", marginBottom: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.3 }}>{label}</div>
      <div style={{ fontSize: 15, fontWeight: 600, color: "#212529", padding: "10px 14px", background: "#f8fafc", borderRadius: 10, border: "1px solid #eef1f6" }}>{value || "Not set"}</div>
    </div>
  );
}