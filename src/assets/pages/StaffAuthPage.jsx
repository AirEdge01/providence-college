import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { staffLogin, staffSignup } from "../utils/staffDB";

export default function StaffAuthPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(location.pathname === "/staff/signup" ? "signup" : "signin");

    const [showSignInPassword, setShowSignInPassword] = useState(false);
    const [showSignUpPassword, setShowSignUpPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [signInData, setSignInData] = useState({ identifier: "", password: "" });
    const [signUpData, setSignUpData] = useState({ staffId: "", email: "", password: "", confirmPassword: "" });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignIn = (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            staffLogin(signInData.identifier, signInData.password);
            navigate("/staff-portal/dashboard");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        setError("");
        if (signUpData.password !== signUpData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setLoading(true);
        try {
            staffSignup(signUpData);
            navigate("/staff-portal/dashboard");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="staff-portal-wrapper min-vh-100 d-flex flex-column justify-content-between position-relative overflow-hidden">
            <style>{`
        .staff-portal-wrapper {
          background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #0f172a 100%);
          color: #f8fafc; font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
        .ambient-blob-1 { position: absolute; top: -100px; left: -100px; width: 400px; height: 400px; background: radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(0,0,0,0) 70%); border-radius: 50%; filter: blur(50px); pointer-events: none; }
        .ambient-blob-2 { position: absolute; bottom: -100px; right: -100px; width: 450px; height: 450px; background: radial-gradient(circle, rgba(168,85,247,0.2) 0%, rgba(0,0,0,0) 70%); border-radius: 50%; filter: blur(60px); pointer-events: none; }
        .marquee-wrapper { background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255, 255, 255, 0.08); overflow: hidden; white-space: nowrap; }
        .marquee-content { display: inline-block; animation: marqueeScroll 30s linear infinite; }
        .marquee-content:hover { animation-play-state: paused; }
        @keyframes marqueeScroll { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .logo-slide-down { animation: slideDownIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes slideDownIn { 0% { opacity: 0; transform: translateY(-40px) scale(0.9); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        .slide-in-left { animation: slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes slideInLeft { 0% { opacity: 0; transform: translateX(-120px); } 100% { opacity: 1; transform: translateX(0); } }
        .slide-in-right { animation: slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes slideInRight { 0% { opacity: 0; transform: translateX(120px); } 100% { opacity: 1; transform: translateX(0); } }
        .glass-auth-card { background: rgba(255, 255, 255, 0.04); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 1.25rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1); }
        .modern-glass-input { background: rgba(15, 23, 42, 0.5) !important; border: 1px solid rgba(255, 255, 255, 0.15) !important; color: #ffffff !important; border-radius: 0.5rem; transition: all 0.25s ease; }
        .modern-glass-input::placeholder { color: rgba(226, 232, 240, 0.4) !important; }
        .modern-glass-input:focus { background: rgba(15, 23, 42, 0.75) !important; border-color: #818cf8 !important; box-shadow: 0 0 0 0.25rem rgba(99, 102, 241, 0.25) !important; color: #ffffff !important; }
        .input-group-text-glass { background: rgba(15, 23, 42, 0.6) !important; border: 1px solid rgba(255, 255, 255, 0.15) !important; color: #94a3b8 !important; }
        .password-toggle-btn { cursor: pointer; transition: color 0.2s ease; }
        .password-toggle-btn:hover { color: #818cf8 !important; }
        .glass-tab-btn { transition: all 0.3s ease; border: 1px solid transparent; }
        .glass-tab-btn.active { background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%) !important; color: #ffffff !important; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.35); }
        .glass-tab-btn.inactive { background: transparent; color: #94a3b8; }
        .glass-tab-btn.inactive:hover { color: #f1f5f9; background: rgba(255, 255, 255, 0.05); }
        .tab-content-anim { animation: fadeInScale 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fadeInScale { from { opacity: 0; transform: translateY(12px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .btn-gradient-primary { background: linear-gradient(135deg, #4f46e5 0%, #2563eb 100%); border: none; color: #ffffff; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3); }
        .btn-gradient-primary:hover { background: linear-gradient(135deg, #4338ca 0%, #1d4ed8 100%); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(37, 99, 235, 0.45); }
      `}</style>

            <div className="ambient-blob-1"></div>
            <div className="ambient-blob-2"></div>

            <div className="marquee-wrapper py-2">
                <div className="marquee-content small">
                    <span className="me-5"><i className="bi bi-megaphone-fill text-warning me-2"></i><strong>NOTICE:</strong> First Contact Session result moderation closes Friday 11:59 PM.</span>
                    <span className="me-5"><i className="bi bi-shield-check text-success me-2"></i><strong>SECURITY:</strong> Always lock grade sheets before logging out of departmental devices.</span>
                    <span className="me-5"><i className="bi bi-info-circle-fill text-info me-2"></i><strong>WORKFLOW:</strong> Lecturer, then HOD, then Exams Officer, every result moves through all three stages.</span>
                </div>
            </div>

            <div className="container py-4 my-auto position-relative z-1">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-7 col-sm-11">

                        <div className="text-center mb-4 logo-slide-down">
                            <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-gradient p-3 rounded-circle shadow-lg mb-3 border border-light border-opacity-25">
                                <i className="bi bi-shield-lock-fill fs-1 text-white"></i>
                            </div>
                            <h2 className="fw-bold mb-1 text-white">PROVIDENCE COLLEGE</h2>
                            <p className="text-light opacity-75 small">Academic Staff and Admin Control Gateway</p>
                        </div>

                        <div className={`glass-auth-card p-4 p-md-5 ${activeTab === "signin" ? "slide-in-left" : "slide-in-right"}`} key={activeTab}>

                            <div className="d-flex bg-dark bg-opacity-50 p-1 rounded-3 mb-4 border border-light border-opacity-10">
                                <button type="button" className={`btn flex-fill fw-bold rounded-2 btn-sm py-2 glass-tab-btn ${activeTab === "signin" ? "active" : "inactive"}`} onClick={() => { setActiveTab("signin"); setError(""); }}>
                                    <i className="bi bi-box-arrow-in-right me-2"></i>Staff Sign In
                                </button>
                                <button type="button" className={`btn flex-fill fw-bold rounded-2 btn-sm py-2 glass-tab-btn ${activeTab === "signup" ? "active" : "inactive"}`} onClick={() => { setActiveTab("signup"); setError(""); }}>
                                    <i className="bi bi-person-plus me-2"></i>Register Account
                                </button>
                            </div>

                            {error && <div className="alert alert-danger py-2 small">{error}</div>}

                            {activeTab === "signin" ? (
                                <form onSubmit={handleSignIn} className="tab-content-anim">
                                    <div className="mb-3">
                                        <label className="form-label text-light fw-semibold small">Staff ID or Email</label>
                                        <div className="input-group">
                                            <span className="input-group-text input-group-text-glass border-end-0"><i className="bi bi-person-badge"></i></span>
                                            <input type="text" className="form-control modern-glass-input border-start-0" placeholder="e.g. PICE/LEC/0001" value={signInData.identifier} onChange={(e) => setSignInData({ ...signInData, identifier: e.target.value })} required />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label text-light fw-semibold small">Account Password</label>
                                        <div className="input-group">
                                            <span className="input-group-text input-group-text-glass border-end-0"><i className="bi bi-key"></i></span>
                                            <input type={showSignInPassword ? "text" : "password"} className="form-control modern-glass-input border-start-0 border-end-0" placeholder="Enter your password" value={signInData.password} onChange={(e) => setSignInData({ ...signInData, password: e.target.value })} required />
                                            <span className="input-group-text input-group-text-glass border-start-0 password-toggle-btn" onClick={() => setShowSignInPassword(!showSignInPassword)}>
                                                <i className={`bi ${showSignInPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i>
                                            </span>
                                        </div>
                                    </div>
                                    <button type="submit" disabled={loading} className="btn btn-gradient-primary w-100 py-2 rounded-3 mb-2 fs-6">
                                        <i className="bi bi-box-arrow-in-right me-2"></i> {loading ? "Signing in..." : "Access Staff Portal"}
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={handleSignUp} className="tab-content-anim">
                                    <p className="small text-light opacity-75 mb-3">
                                        Enter the Staff ID issued by the school. Your name, role and department are pulled automatically from the official staff registry.
                                    </p>
                                    <div className="mb-3">
                                        <label className="form-label text-light fw-semibold small">Staff ID</label>
                                        <input type="text" className="form-control modern-glass-input" placeholder="e.g. PICE/LEC/0001" value={signUpData.staffId} onChange={(e) => setSignUpData({ ...signUpData, staffId: e.target.value })} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label text-light fw-semibold small">Official Email</label>
                                        <input type="email" className="form-control modern-glass-input" placeholder="you@providence.edu" value={signUpData.email} onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })} required />
                                    </div>
                                    <div className="row g-2 mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label text-light fw-semibold small">Password</label>
                                            <div className="input-group">
                                                <input type={showSignUpPassword ? "text" : "password"} className="form-control modern-glass-input border-end-0" placeholder="Enter a password" value={signUpData.password} onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })} required />
                                                <span className="input-group-text input-group-text-glass border-start-0 password-toggle-btn" onClick={() => setShowSignUpPassword(!showSignUpPassword)}>
                                                    <i className={`bi ${showSignUpPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label text-light fw-semibold small">Confirm Password</label>
                                            <div className="input-group">
                                                <input type={showConfirmPassword ? "text" : "password"} className="form-control modern-glass-input border-end-0" placeholder="Re-enter password" value={signUpData.confirmPassword} onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })} required />
                                                <span className="input-group-text input-group-text-glass border-start-0 password-toggle-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                    <i className={`bi ${showConfirmPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" disabled={loading} className="btn btn-gradient-primary w-100 py-2 rounded-3 mb-2 fs-6">
                                        <i className="bi bi-person-check-fill me-2"></i> {loading ? "Creating account..." : "Register Account"}
                                    </button>
                                </form>
                            )}

                            <p className="text-center text-light opacity-75 small mt-3 mb-0">
                                {activeTab === "signin" ? (
                                    <>Need an account? <Link to="/staff/signup" className="text-decoration-none" style={{ color: "#818cf8" }} onClick={() => setActiveTab("signup")}>Register here</Link></>
                                ) : (
                                    <>Already registered? <Link to="/staff/login" className="text-decoration-none" style={{ color: "#818cf8" }} onClick={() => setActiveTab("signin")}>Sign in</Link></>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center py-3 text-white-50 small border-top border-light border-opacity-10 position-relative z-1">
                &copy; {new Date().getFullYear()} Providence International College of Education.
            </div>
        </div>
    );
}