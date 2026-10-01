import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImgSrc from '../provi.png';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [portalOpen, setPortalOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsOpen(false);
        setPortalOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const navy = '#0F2C59';
    const gold = '#D4AF37';

    return (
        <nav style={{ backgroundColor: navy, borderBottom: `3px solid ${gold}`, position: 'sticky', top: 0, zIndex: 1000, padding: '0.6rem 2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
            <style>{`
                .nav-link { color: #fff; text-decoration: none; font-weight: 600; font-size: 0.92rem; transition: color 0.2s ease; }
                .nav-link:hover { color: ${gold}; }
                .portal-wrapper { position: relative; }
                .portal-menu { position: absolute; top: 100%; right: 0; background: #fff; min-width: 170px; border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); opacity: 0; visibility: hidden; transition: 0.2s ease; padding: 6px; border: 1px solid rgba(212,175,55,0.2); }
                .portal-wrapper:hover .portal-menu { opacity: 1; visibility: visible; transform: translateY(4px); }
                .portal-item { display: flex; align-items: center; gap: 8px; padding: 8px 12px; text-decoration: none; color: ${navy}; font-weight: 700; font-size: 0.88rem; border-radius: 6px; transition: background 0.2s; }
                .portal-item:hover { background: #f1f5f9; }
                .apply-btn { background: ${gold}; color: ${navy}; font-weight: 700; padding: 0.45rem 1.1rem; border-radius: 6px; text-decoration: none; font-size: 0.88rem; transition: background 0.2s; }
                .apply-btn:hover { background: #e5bd3c; }
                @media (max-width: 1024px) { .desktop-nav { display: none !important; } .mobile-btn { display: flex !important; } }
            `}</style>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                {/* Brand Section */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', textDecoration: 'none', flexShrink: 0 }}>
                    <img src={logoImgSrc} alt="Logo" style={{ height: '45px', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; }} />
                    <div style={{ color: '#fff', fontWeight: '800', fontSize: '1.1rem', lineHeight: '1.2' }}>
                        <span style={{ color: gold }}>PROVIDENCE </span> INTERNATIONAL <br /> COLLEGE OF EDUCATION
                    </div>
                </Link>

                {/* Desktop Nav Links Spaced Out */}
                <div className="desktop-nav" style={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    <ul style={{ display: 'flex', alignItems: 'center', gap: '1.8rem', listStyle: 'none', margin: 0, padding: 0 }}>
                        <li><Link to="/" className="nav-link">Home</Link></li>
                        <li><Link to="/about" className="nav-link">About</Link></li>
                        <li><Link to="/faculties" className="nav-link">Schools</Link></li>
                        <li><Link to="/news" className="nav-link">News</Link></li>
                        <li><Link to="/events" className="nav-link">Events</Link></li>

                        {/* E-PORTAL DROPDOWN */}
                        <li className="portal-wrapper">
                            <span className="nav-link" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                E-Portal <span style={{ fontSize: '0.65rem', color: gold }}>▼</span>
                            </span>
                            <div className="portal-menu">
                                <Link to="/login" className="portal-item">🎓 Student Portal</Link>
                                <Link to="/staff/login" className="portal-item">💼 Staff Portal</Link>
                            </div>
                        </li>

                        <li><Link to="/faq" className="nav-link">FAQs</Link></li>
                        <li><Link to="/gallery" className="nav-link">Gallery</Link></li>
                        <li><Link to="/contact" className="nav-link">Contact</Link></li>
                        <li><Link to="/admissions" className="apply-btn">Apply Now</Link></li>
                    </ul>
                </div>

                {/* Mobile Button */}
                <button className="mobile-btn" onClick={() => setIsOpen(!isOpen)} style={{ display: 'none', background: 'transparent', border: `1px solid ${gold}`, color: gold, borderRadius: 6, padding: '0.3rem 0.6rem', fontSize: '1.2rem', cursor: 'pointer' }}>
                    {isOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Mobile Overlay */}
            {isOpen && (
                <div style={{ position: 'fixed', top: '65px', left: 0, right: 0, bottom: 0, background: 'rgba(15,44,89,0.98)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', zIndex: 999 }}>
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/about" className="nav-link">About</Link>
                    <Link to="/faculties" className="nav-link">Schools</Link>
                    
                    <div>
                        <div onClick={() => setPortalOpen(!portalOpen)} className="nav-link" style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}>
                            <span>E-Portal</span>
                            <span style={{ color: gold }}>{portalOpen ? '▲' : '▼'}</span>
                        </div>
                        {portalOpen && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', paddingLeft: '1rem', marginTop: '0.8rem', borderLeft: `2px solid ${gold}` }}>
                                <Link to="/login" className="nav-link">🎓 Student Portal</Link>
                                <Link to="/staff/login" className="nav-link">💼 Staff Portal</Link>
                            </div>
                        )}
                    </div>

                    <Link to="/news" className="nav-link">News</Link>
                    <Link to="/events" className="nav-link">Events</Link>
                    <Link to="/faq" className="nav-link">FAQs</Link>
                    <Link to="/gallery" className="nav-link">Gallery</Link>
                    <Link to="/contact" className="nav-link">Contact</Link>
                    <Link to="/admissions" className="apply-btn" style={{ textAlign: 'center', marginTop: '0.5rem' }}>Apply Now</Link>
                </div>
            )}
        </nav>
    );
}