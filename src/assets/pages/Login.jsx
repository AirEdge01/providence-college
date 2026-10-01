import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import proviLogo from "../provi.png";

const navy = "#0F2C59";
const gold = "#D4AF37";

export default function Login() {
  const navigate = useNavigate();
  const auth = useAuth();
  const login = auth ? auth.login : null;

  const [form, setForm] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const identifier = form.identifier.trim();
    const password = form.password;

    try {
      if (login) {
        // Primary login attempt via AuthContext
        await login(identifier, password);
        navigate("/dashboard");
        return;
      }

      // Secondary fallback for raw localStorage authentication
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const foundUser = storedUsers.find((u) => {
        const idLower = identifier.toLowerCase();
        const matchesEmail = u.email && u.email.toLowerCase() === idLower;
        const matchesMatric = u.matricNumber && u.matricNumber.toLowerCase() === idLower;
        return (matchesEmail || matchesMatric) && u.password === password;
      });

      if (foundUser) {
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        navigate("/dashboard");
      } else {
        setError("Invalid Matric Number/Email or Password.");
      }
    } catch (err) {
      setError(err?.message || "Login failed. Please check your credentials.");
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
          maxWidth: "520px",
          padding: "clamp(24px, 4vw, 44px)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 26 }}>
          <img
            src={proviLogo}
            alt="Providence Logo"
            style={{
              width: 68,
              height: 68,
              borderRadius: "50%",
              objectFit: "contain",
              marginBottom: 8,
              border: `2px solid ${gold}`,
              padding: 2,
            }}
          />
          <h4 style={{ color: navy, fontWeight: 700, marginBottom: 4, fontSize: 22 }}>
            Student Portal Login
          </h4>
          <p style={{ color: "#6c757d", fontSize: 13.5, margin: 0 }}>
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
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label style={labelStyle}>Matric Number / Email Address</label>
            <input
              type="text"
              required
              value={form.identifier}
              onChange={(e) => setForm({ ...form, identifier: e.target.value })}
              className="form-control"
              style={inputStyle}
              placeholder="e.g. PICE/2026/0001 or you@example.com"
            />
          </div>

          <div className="mb-3">
            <label style={labelStyle}>Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="form-control"
                style={{ ...inputStyle, paddingRight: 45 }}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "#6c757d",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: navy,
              color: "#fff",
              border: "none",
              padding: "13px 0",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 15,
              marginTop: 12,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "opacity 0.2s ease",
              opacity: loading ? 0.75 : 1,
            }}
          >
            {loading ? "Signing in..." : "Log In"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 22, fontSize: 14, color: "#6c757d" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: gold, fontWeight: 600, textDecoration: "none" }}>
            Sign up
          </Link>
        </p>
      </div>
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
  padding: "10px 14px",
  fontSize: 14,
  width: "100%",
  backgroundColor: "#f9fafb",
  boxSizing: "border-box",
};