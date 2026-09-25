import React from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";

const navy = "#0F2C59";
const gold = "#D4AF37";

export default function AdmissionLanding() {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader
        title={
          <span style={{ color: gold }}>
            Choose Your Admission Track
          </span>
        }
        subtitle="Providence International College of Education runs three academic tracks. Select the one you're applying for to begin your application."
        breadcrumb="Home / Admissions"
      />

      <section style={{ padding: "60px 20px", background: "#F8FAFC" }}>
        <div className="container" style={{ maxWidth: 1200 }}>
          <div className="row g-4">
            {/* NCE Direct Programme */}
            <div className="col-lg-4 col-md-6">
              <TrackCard
                title="Providence International College of Education"
                subtitle="NCE Direct Programme"
                description="Apply directly for the college's own Nigeria Certificate in Education (NCE) programme, offered across five schools with a wide range of subject combinations."
                badge="NCE"
                onClick={() => navigate("/admission")}
              />
            </div>

            {/* AAUA Regular (100L) */}
            <div className="col-lg-4 col-md-6">
              <TrackCard
                title="Adekunle Ajasin University, Akungba (AAUA)"
                subtitle="Degree Programme (100L Regular)"
                description="Apply for the 100-Level Sandwich Degree Programme run by Adekunle Ajasin University of Education in affiliation with Providence International College."
                badge="DEGREE 100L"
                onClick={() => navigate("/admission/aaua")}
              />
            </div>

            {/* AAUA Direct Entry (200L) */}
            <div className="col-lg-4 col-md-6">
              <TrackCard
                title="Adekunle Ajasin University, Akungba (AAUA)"
                subtitle="Degree Programme (200L Direct Entry)"
                description="Apply for Direct Entry (200L) into the AAUA Sandwich Degree Programme. Designed for candidates holding NCE, ND, or equivalent qualifications."
                badge="DIRECT ENTRY"
                onClick={() => navigate("/admission/aaua-direct")}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function TrackCard({ title, subtitle, description, badge, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "#fff",
        borderRadius: 18,
        padding: "32px 28px",
        height: "100%",
        boxShadow: "0 10px 30px rgba(15,44,89,0.08)",
        border: "1px solid #E2E8F0",
        cursor: "pointer",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 18px 40px rgba(15,44,89,0.16)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 10px 30px rgba(15,44,89,0.08)";
      }}
    >
      <span
        style={{
          alignSelf: "flex-start",
          background: gold,
          color: navy,
          fontWeight: 800,
          fontSize: 12,
          padding: "5px 14px",
          borderRadius: 20,
          marginBottom: 16,
          letterSpacing: 0.5,
        }}
      >
        {badge}
      </span>
      <h4 style={{ color: navy, fontWeight: 800, marginBottom: 6 }}>{title}</h4>
      <p style={{ color: "#64748B", fontSize: 14, fontWeight: 600, marginBottom: 14 }}>{subtitle}</p>
      <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.6, flex: 1 }}>{description}</p>
      <button
        style={{
          background: navy,
          color: "#fff",
          border: "none",
          padding: "12px 0",
          borderRadius: 10,
          fontWeight: 700,
          fontSize: 14.5,
          marginTop: 18,
          width: "100%",
        }}
      >
        Start Application →
      </button>
    </div>
  );
}