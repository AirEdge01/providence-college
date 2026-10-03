import React from "react";
import { Link } from "react-router-dom";
import { getCurrentStaff, getAllocationsForStaff, getSubmissionsForStaff } from "../utils/staffDB";

const navy = "#0F2C59";

export default function LecturerDashboard() {
    const staff = getCurrentStaff();
    const allocations = getAllocationsForStaff(staff.staffId);
    const submissions = getSubmissionsForStaff(staff.staffId);
    const pending = submissions.filter((s) => s.status === "Pending HOD").length;
    const confirmed = submissions.filter((s) => s.status !== "Pending HOD").length;

    return (
        <div>
            <style>{sharedStyles}</style>

            <div className="sp-hero dash-anim">
                <h4 style={{ fontWeight: 700, marginBottom: 6, fontSize: "clamp(18px, 3vw, 24px)" }}>Welcome, {staff.firstName} {staff.surname}</h4>
                <p style={{ opacity: 0.88, fontSize: 14.5, marginBottom: 0 }}>Lecturer, {staff.department}</p>
            </div>

            <div className="sp-stat-grid dash-anim" style={{ animationDelay: "0.05s" }}>
                <StatCard icon="bi-journal-plus" label="Courses Allocated to Me" value={allocations.length} />
                <StatCard icon="bi-hourglass-split" label="Awaiting HOD Confirmation" value={pending} />
                <StatCard icon="bi-check2-circle" label="Confirmed or Further Along" value={confirmed} />
            </div>

            <QuickLinks items={[
                { label: "View My Roster", path: "/staff-portal/roster", icon: "bi-people" },
                { label: "Upload Scores", path: "/staff-portal/score-upload", icon: "bi-cloud-upload" },
            ]} />
        </div>
    );
}

function StatCard({ icon, label, value }) {
    return (
        <div className="sp-stat-card">
            <div className="sp-stat-icon"><i className={`bi ${icon}`}></i></div>
            <div>
                <div className="sp-stat-label">{label}</div>
                <div className="sp-stat-value">{value}</div>
            </div>
        </div>
    );
}

function QuickLinks({ items }) {
    return (
        <div className="sp-quicklinks dash-anim" style={{ animationDelay: "0.1s" }}>
            {items.map((item) => (
                <Link key={item.path} to={item.path} className="sp-quicklink">
                    <i className={`bi ${item.icon}`}></i> {item.label}
                </Link>
            ))}
        </div>
    );
}

export const sharedStyles = `
  @keyframes dashFadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
  .dash-anim { animation: dashFadeUp 0.5s ease both; }
  .sp-hero {
    background: linear-gradient(120deg, #0F2C59, #163a73);
    border-radius: 18px; padding: clamp(20px, 4vw, 30px) clamp(20px, 4vw, 32px);
    color: #fff; margin-bottom: 24px; box-shadow: 0 10px 30px rgba(15,44,89,0.18);
  }
  .sp-stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
  .sp-stat-card {
    background: #fff; border-radius: 16px; padding: 20px; display: flex; align-items: center; gap: 14px;
    box-shadow: 0 4px 16px rgba(15,44,89,0.08); border: 1px solid #eef1f6;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .sp-stat-card:hover { transform: translateY(-4px); box-shadow: 0 10px 24px rgba(15,44,89,0.14); }
  .sp-stat-icon {
    width: 48px; height: 48px; border-radius: 12px; flex-shrink: 0;
    background: linear-gradient(135deg, #0F2C5918, #0F2C5908);
    display: flex; align-items: center; justify-content: center; color: #0F2C59; font-size: 21px;
  }
  .sp-stat-label { font-size: 12.5px; color: #6c757d; margin-bottom: 2px; }
  .sp-stat-value { font-size: 23px; font-weight: 800; color: #0F2C59; line-height: 1.1; }
  .sp-quicklinks { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 22px; }
  .sp-quicklink {
    display: flex; align-items: center; gap: 8px; padding: 11px 18px; border-radius: 10px;
    background: #fff; border: 1px solid #e2e8f0; color: #0F2C59; text-decoration: none;
    font-weight: 600; font-size: 13.5; transition: all 0.2s ease; box-shadow: 0 2px 8px rgba(15,44,89,0.05);
  }
  .sp-quicklink:hover { background: #0F2C59; color: #fff; border-color: #0F2C59; transform: translateY(-2px); }
  .sp-card {
    background: #fff; border-radius: 16px; padding: 22px; box-shadow: 0 4px 16px rgba(15,44,89,0.07);
    border: 1px solid #eef1f6; margin-bottom: 16px;
  }
  .sp-card-empty { text-align: center; padding: 28px 10px; color: #a3abb8; font-size: 14px; }
  .sp-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .sp-badge-gold { background: #D4AF37; color: #0F2C59; font-weight: 700; padding: 3px 10px; border-radius: 20px; font-size: 12px; }
`;