import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import logoImg from "../provi.png";

const navy = "#0F2C59";
const gold = "#D4AF37";

function CollegeLogo() {
  return (
    <div
      style={{
        width: 68,
        height: 68,
        margin: "0 auto 12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={logoImg}
        alt="Providence Logo"
        style={{
          width: 68,
          height: 68,
          borderRadius: "50%",
          objectFit: "contain",
          border: `2px solid ${gold}`,
          padding: 2,
        }}
      />
    </div>
  );
}

export default function Signup() {
  const navigate = useNavigate();
  const auth = useAuth();
  const signup = auth ? auth.signup : null;

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    matricNumber: "",
    programme: "",
    department: "",
    level: "100L",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Load draft from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("pice_signup_draft");
      if (raw) setForm(JSON.parse(raw));
    } catch (e) {
      console.error("Failed to load draft:", e);
    }
  }, []);

  // Persist draft to localStorage on form changes
  useEffect(() => {
    try {
      localStorage.setItem("pice_signup_draft", JSON.stringify(form));
    } catch (e) {
      console.error("Failed to save draft:", e);
    }
  }, [form]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Form Validations
    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match.");
    }
    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    setLoading(true);

    try {
      const payload = {
        fullName: form.fullName.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        matricNumber: form.matricNumber.trim(),
        programme: form.programme,
        department: form.department,
        level: form.level,
        password: form.password,
      };

      if (signup) {
        // Delegate signup directly to AuthContext / localDB
        await signup(payload);
      } else {
        // Direct local storage fallback if AuthContext is unavailable
        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const isDuplicate = existingUsers.some(
          (u) =>
            (u.email && u.email.toLowerCase() === payload.email) ||
            (u.matricNumber &&
              u.matricNumber.toLowerCase() === payload.matricNumber.toLowerCase())
        );

        if (isDuplicate) {
          throw new Error("An account with this email or matric number already exists.");
        }

        const newUser = { ...payload, id: Date.now().toString() };
        existingUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(existingUsers));
        localStorage.setItem("currentUser", JSON.stringify(newUser));
      }

      // Clear draft storage after successful creation
      localStorage.removeItem("pice_signup_draft");

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      if (err && err.code === "NOT_ELIGIBLE") {
        navigate("/not-eligible", { state: { matricNumber: form.matricNumber } });
        return;
      }
      if (err && err.code === "INVALID_MATRIC_DUPLICATE") {
        setError("Matric number appears multiple times in the registry. Please contact ICT.");
        return;
      }
      setError(err?.message || "An unexpected error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${navy}, #163a73)`,
        padding: "30px 20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          width: "100%",
          maxWidth: "720px",
          padding: "clamp(20px, 4vw, 40px)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 26 }}>
          <CollegeLogo />
          <h4 style={{ color: navy, fontWeight: 700, marginBottom: 4 }}>
            Student Portal Registration
          </h4>
          <p style={{ color: "#6c757d", fontSize: 14, margin: 0 }}>
            Providence International College of Education
          </p>
        </div>

        {error && (
          <div
            className="alert alert-danger py-2 px-3"
            style={{
              fontSize: 13.5,
              borderRadius: 8,
              backgroundColor: "#fef2f2",
              color: "#991b1b",
              border: "1px solid #fecaca",
              marginBottom: 20,
            }}
          >
            ⚠ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <Field
              label="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="e.g. John Adewale Doe"
            />
            <Field
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
            <Field
              label="Phone Number"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="080XXXXXXXX"
            />
            <Field
              label="Matric Number"
              name="matricNumber"
              value={form.matricNumber}
              onChange={handleChange}
              placeholder="PICE/2026/0001"
            />
            <Field
              label="Programme"
              name="programme"
              value={form.programme}
              onChange={handleChange}
              placeholder="e.g. Early Childhood Education"
            />
            <Field
              label="Department"
              name="department"
              value={form.department}
              onChange={handleChange}
              placeholder="e.g. Arts and Social Sciences"
            />
            <div className="col-12 col-md-6 col-lg-4">
              <label style={labelStyle}>Level</label>
              <select
                name="level"
                value={form.level}
                onChange={handleChange}
                className="form-select"
                style={inputStyle}
              >
                <option value="100L">100L</option>
                <option value="200L">200L</option>
                <option value="300L">300L</option>
                <option value="400L">400L</option>
              </select>
            </div>
            <Field
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
            />
            <Field
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: navy,
              color: "#fff",
              border: "none",
              padding: "14px 0",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 16,
              marginTop: 28,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "opacity 0.2s ease",
              opacity: loading ? 0.75 : 1,
            }}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 14,
            color: "#6c757d",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: gold, fontWeight: 600, textDecoration: "none" }}
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

function Field({ label, name, value, onChange, type = "text", placeholder }) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        name={name}
        required
        value={value}
        onChange={onChange}
        className="form-control"
        style={inputStyle}
        placeholder={placeholder}
      />
    </div>
  );
}

const labelStyle = {
  fontSize: 13,
  fontWeight: 600,
  color: navy,
  display: "block",
  marginBottom: 6,
  textTransform: "uppercase",
  letterSpacing: "0.02em",
};

const inputStyle = {
  borderRadius: 8,
  border: "1px solid #d1d5db",
  padding: "10px 12px",
  fontSize: 14,
  width: "100%",
  backgroundColor: "#f9fafb",
  boxSizing: "border-box",
};