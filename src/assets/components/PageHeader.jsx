import React from "react";

const navy = "#0F2C59";
const gold = "#D4AF37";

export default function PageHeader({ title, subtitle, breadcrumb, titleColor = "#FFFFFF" }) {
  return (
    <div
      style={{
        background: `linear-gradient(120deg, ${navy}, #163a73)`,
        color: "#fff",
        padding: "50px 20px",
        textAlign: "center",
      }}
    >
      {breadcrumb && (
        <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>
          {breadcrumb}
        </div>
      )}
      <h2 style={{ fontWeight: 800, marginBottom: 8, color: titleColor }}>{title}</h2>
      {subtitle && (
        <p style={{ maxWidth: 650, margin: "0 auto", opacity: 0.85, fontSize: 15 }}>{subtitle}</p>
      )}
      <div style={{ width: 60, height: 4, background: gold, margin: "18px auto 0", borderRadius: 4 }} />
    </div>
  );
}