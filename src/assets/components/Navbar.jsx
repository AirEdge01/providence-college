import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImgSrc from '../provi.png';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    // Prevent background scrolling when mobile overlay is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const colors = {
        navy: '#0F2C59',
        gold: '#D4AF37',
        white: '#FFFFFF',
        overlayBg: 'rgba(15, 44, 89, 0.98)'
    };

    const styles = {
        navbar: {
            backgroundColor: colors.navy,
            borderBottom: `3px solid ${colors.gold}`,
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            padding: '0.6rem 1rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
        },
        navContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%'
        },
        brandContainer: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none'
        },
        logoImg: {
            height: '45px',
            width: 'auto',
            objectFit: 'contain'
        },
        logoPlaceholder: {
            height: '45px',
            width: '45px',
            borderRadius: '50%',
            backgroundColor: colors.gold,
            color: colors.navy,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '800',
            fontSize: '1.1rem',
            border: `2px solid ${colors.white}`
        },
        brandText: {
            color: colors.white,
            fontWeight: '800',
            fontSize: '1.2rem',
            lineHeight: '1.2'
        },
        toggleBtn: {
            background: 'transparent',
            border: `1px solid ${colors.gold}`,
            color: colors.gold,
            borderRadius: '6px',
            padding: '0.4rem 0.75rem',
            cursor: 'pointer',
            display: 'none',
            fontSize: '1.2rem',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1001
        },
        navLinks: {
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            listStyle: 'none',
            margin: 0,
            padding: 0
        },
        link: {
            color: colors.white,
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '0.95rem',
            position: 'relative',
            padding: '0.25rem 0'
        },
        applyBtn: {
            backgroundColor: colors.gold,
            color: colors.navy,
            fontWeight: '700',
            padding: '0.5.rem 1.25rem',
            borderRadius: '5px',
            textDecoration: 'none',
            fontSize: '0.9rem',
            display: 'inline-block',
            boxShadow: '0 4px 10px rgba(212, 175, 55, 0.3)'
        },
        mobileOverlay: {
            position: 'fixed',
            top: '65px', // Below sticky navbar
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: colors.overlayBg,
            backdropFilter: 'blur(8px)',
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem 1.5rem',
            gap: '1.25rem',
            zIndex: 999,
            overflowY: 'auto'
        }
    };

    return (
        <>
            <style>
                {`
          .nav-hover-link {
            transition: color 0.25s ease, transform 0.25s ease;
          }
          .nav-hover-link:hover {
            color: ${colors.gold} !important;
            transform: translateY(-2px);
          }
          .apply-hover-btn {
            transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
          }
          .apply-hover-btn:hover {
            transform: translateY(-2px) scale(1.03);
            box-shadow: 0 6px 18px rgba(212, 175, 55, 0.5) !important;
            background-color: #e5bd3c !important;
          }

          @media (max-width: 768px) {
            .desktop-nav {
              display: none !important;
            }
            .mobile-toggle-btn {
              display: flex !important;
            }
          }

          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-mobile-menu {
            animation: fadeInDown 0.25s ease-out forwards;
          }
        `}
            </style>

            <nav style={styles.navbar}>
                <div style={styles.navContainer}>
                    {/* Brand with Logo */}
                    <Link to="/" style={styles.brandContainer}>
                        <img
                            src={logoImgSrc}
                            alt="Providence College Logo"
                            style={styles.logoImg}
                            onError={(e) => {
                                e.target.style.display = 'none';
                                if (e.target.nextSibling) {
                                    e.target.nextSibling.style.display = 'flex';
                                }
                            }}
                        />
                        <div style={{ ...styles.logoPlaceholder, display: 'none' }}>P</div>

                        <div style={styles.brandText}>
                            <span style={{ color: colors.gold }}>PROVIDENCE </span> INTERNATIONAL <br /> COLLEGE OF EDUCATION
                        </div>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="desktop-nav">
                        <ul style={styles.navLinks}>
                            <li><Link to="/" style={styles.link} className="nav-hover-link">Home</Link></li>
                            <li><Link to="/about" style={styles.link} className="nav-hover-link">About</Link></li>
                            <li><Link to="/faculties" style={styles.link} className="nav-hover-link">Faculties</Link></li>
                            <li><Link to="/news" style={styles.link} className="nav-hover-link">News</Link></li>
                            <li><Link to="/events" style={styles.link} className="nav-hover-link">Events</Link></li>
                            <li><Link to="/faq" style={styles.link} className="nav-hover-link">FAQs</Link></li>
                            <li><Link to="/contact" style={styles.link} className="nav-hover-link">Contact</Link></li>
                            <li><Link to="/gallery" style={styles.link} className="nav-hover-link">Gallery</Link></li>
                            <li>
                                <Link to="/admissions" style={styles.applyBtn} className="apply-hover-btn">
                                    Apply Now
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Mobile Dropdown Button */}
                    <button
                        className="mobile-toggle-btn"
                        style={styles.toggleBtn}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle Navigation"
                    >
                        {isOpen ? '✕' : '☰'}
                    </button>
                </div>

                {/* Floating Mobile Dropdown Overlay */}
                {isOpen && (
                    <div style={styles.mobileOverlay} className="animate-mobile-menu">
                        <Link to="/" style={{ ...styles.link, fontSize: '1.1rem' }} className="nav-hover-link">Home</Link>
                        <Link to="/about" style={{ ...styles.link, fontSize: '1.1rem' }} className="nav-hover-link">About</Link>
                        <Link to="/faculties" style={{ ...styles.link, fontSize: '1.1rem' }} className="nav-hover-link">Faculties</Link>
                        <Link to="/news" style={{ ...styles.link, fontSize: '1.1rem' }} className="nav-hover-link">News</Link>
                        <Link to="/events" style={{ ...styles.link, fontSize: '1.1rem' }} className="nav-hover-link">Events</Link>
                        <Link to="/faq" style={{ ...styles.link, fontSize: '1.1rem' }} className="nav-hover-link">FAQs</Link>
                        <Link to="/contact" style={{ ...styles.link, fontSize: '1.1rem' }} className="nav-hover-link">Contact</Link>
                        <Link to="/gallery" style={{ ...styles.link, fontSize: '1.1rem' }} className="nav-hover-link">Gallery</Link>
                        <Link
                            to="/admissions"
                            style={{ ...styles.applyBtn, textAlign: 'center', marginTop: '1rem', padding: '0.75rem 1rem' }}
                            className="apply-hover-btn"
                        >
                            Apply Now
                        </Link>
                    </div>
                )}
            </nav>
        </>
    );
}