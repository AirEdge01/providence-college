import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';

const institution = {
    name: 'Providence International College of Education',
    shortName: 'Providence College of Education',
    established: 2017,
    history: 'Providence International College of Education was established in 2017 in Ibadan, Oyo State, with the primary goal of producing motivated and competent educators.',
    about: 'Providence International College of Education is dedicated to excellence in teaching, learning and research.',
    aboutExtended: 'The College places strong emphasis on academic excellence, professional competence, character development, innovation and service.',
    vision: 'To be a leading College of Education renowned for academic excellence, innovation and character development.',
    mission: 'To provide quality teacher education that empowers learners to become competent, innovative and value-driven educators.',
    philosophy: 'We believe that every individual has the potential to learn, grow and make a positive impact in society through quality education and moral values.',
    commitment: 'Providence is committed to raising competent, innovative and value-driven educators who will make a positive impact in their communities.'
};

const coreValues = [
    { name: 'Excellence', desc: 'Pursuing the highest standards in teaching, learning and professional practice.' },
    { name: 'Integrity', desc: 'Upholding honesty and strong moral principle in all we do.' },
    { name: 'Innovation', desc: 'Encouraging creative thinking and modern approaches to education.' },
    { name: 'Discipline', desc: 'Instilling order, consistency and responsibility in staff and students.' },
    { name: 'Service', desc: 'Committing to community and national development.' }
];

const strengths = [
    'Quality and professionally oriented teacher education',
    'Experienced and dedicated faculty',
    'Modern learning facilities and ICT resources',
    'A conducive environment for learning and research',
    'Holistic development of mind, character and leadership',
    'Commitment to community and national development'
];

// Updated Staff / Leadership Dataset with Photo Links
const staffList = [
    {
        id: 1,
        name: "Prof. Abiodun Gbolagade",
        role: "Proprietor",
        category: "Principal Officer",
        department: "Chairman Governing Council",
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF1sQuyKCbG9avPp876B73xbc_3820YE_s-y9CEzWb2f7QYRNSLCAa7fQ&s21"
    },
    {
        id: 2,
        name: "Dr. Badiru Dauda Kolapo",
        role: "Provost",
        category: "Principal Officer",
        department: "Chairman Of Academic Board",
        photo: "https://pcoed.com/wp-content/uploads/2026/05/provost.jpeg"
    },
    {
        id: 3,
        name: "Dr.Kolapo",
        role: "Deputy Provost, Academics",
        category: "Principal Officer",
        department: "Academic Affairs",
        photo: "..."
    },
    {
        id: 4,
        name: "Mrs. Grace Nwachukwu",
        role: "Registrar",
        category: "Principal Officer",
        department: "Registry",
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 5,
        name: "Dr. Kunle Fashina",
        role: "Senior Lecturer",
        category: "Academic Staff",
        department: "Department of English Education",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 6,
        name: "Mrs. Bisi Alao",
        role: "Lecturer II",
        category: "Academic Staff",
        department: "Department of Integrated Science",
        photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 7,
        name: "Mr. Azeez Ademola Oladimeji",
        role: "ICT Officer",
        category: "Non-Academic Staff",
        department: "ICT Unit",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 8,
        name: "Mrs. Folake Adeyemi",
        role: "Head, Student Affairs",
        category: "Non-Academic Staff",
        department: "Student Affairs",
        photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80"
    }
];

// Color Palette Constants
const COLORS = {
    navy: '#0F2C59',
    gold: '#D4AF37',
    burgundy: '#4A0E17',
    parchment: '#F9F6F0',
    warmCream: '#F2ECE1',
    textMuted: '#4A5568',
    white: '#FFFFFF',
    border: '#E2E8F0'
};

const STYLES = {
    section: (bg) => ({
        backgroundColor: bg,
        padding: '4rem 1rem',
        position: 'relative'
    }),
    tag: {
        display: 'inline-block',
        backgroundColor: 'rgba(212, 175, 55, 0.15)',
        color: COLORS.navy,
        border: `1px solid ${COLORS.gold}`,
        padding: '0.35rem 0.85rem',
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: '0.75rem'
    },
    sectionTitle: {
        fontWeight: '800',
        color: COLORS.navy,
        fontSize: '2rem',
        lineHeight: '1.2'
    },
    goldUnderline: {
        width: '60px',
        height: '4px',
        backgroundColor: COLORS.gold,
        margin: '0.75rem 0 1.5rem 0',
        borderRadius: '2px'
    },
    card: {
        backgroundColor: COLORS.white,
        border: `1px solid ${COLORS.border}`,
        borderRadius: '12px',
        padding: '1.75rem 1.5rem',
        boxShadow: '0 10px 25px -5px rgba(15, 44, 89, 0.05)',
        height: '100%',
        transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)'
    },
    iconCircle: (bg = COLORS.navy, color = COLORS.gold) => ({
        width: '50px',
        height: '50px',
        borderRadius: '12px',
        backgroundColor: bg,
        color: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '800',
        fontSize: '1.2rem',
        marginBottom: '1rem',
        boxShadow: '0 4px 10px rgba(0,0,0,0.08)'
    }),
    textMuted: {
        color: COLORS.textMuted,
        lineHeight: '1.7',
        fontSize: '0.95rem'
    },
    officerImg: {
        width: '110px',
        height: '110px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: `3px solid ${COLORS.gold}`,
        boxShadow: '0 6px 16px rgba(15, 44, 89, 0.15)',
        marginBottom: '1rem'
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 44, 89, 0.8)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '1rem'
    },
    modalContent: {
        backgroundColor: COLORS.white,
        borderRadius: '16px',
        maxWidth: '600px',
        width: '100%',
        padding: '2rem',
        position: 'relative',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
    }
};

export default function About() {
    const [selectedOfficer, setSelectedOfficer] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All');

    // Dynamic list filtering
    const categories = ['All', 'Principal Officer', 'Academic Staff', 'Non-Academic Staff'];
    const filteredStaff = activeCategory === 'All'
        ? staffList
        : staffList.filter(s => s.category === activeCategory);

    // Calculate dynamic operational years based on establishment date
    const currentYear = new Date().getFullYear();
    const yearsOfExcellence = institution?.established
        ? currentYear - Number(institution.established)
        : 0;

    return (
        <>
            <style>{`
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(15, 44, 89, 0.1) !important;
        }
        .history-image-wrapper {
          position: relative;
        }
        .history-image-wrapper::before {
          content: '';
          position: absolute;
          top: -15px;
          left: -15px;
          right: 15px;
          bottom: 15px;
          border: 3px solid ${COLORS.gold};
          border-radius: 12px;
          z-index: 0;
        }
        .btn-proprietor-address {
          background: linear-gradient(135deg, #0F2C59 0%, #1A365D 100%);
          color: #D4AF37 !important;
          border: 1px solid #D4AF37;
          box-shadow: 0 4px 12px rgba(15, 44, 89, 0.2);
          transition: all 0.3s ease;
        }
        .btn-proprietor-address:hover {
          background: #D4AF37;
          color: #0F2C59 !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(212, 175, 55, 0.4);
        }
      `}</style>

            {/* Dynamic Header */}
            <PageHeader
                title={`About ${institution?.shortName || institution?.name || 'Our College'}`}
                subtitle={institution?.about || "Discover our rich history, mission, institutional values, and administrative leadership."}
                breadcrumb={<><Link to="/" className="text-white text-decoration-none">Home</Link> / About</>}
            />

            {/* 1. History Section */}
            <section style={STYLES.section(COLORS.white)}>
                <div className="container">
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-6">
                            <div style={STYLES.tag}>Our Story</div>
                            <h2 style={STYLES.sectionTitle}>A Legacy of Educational Excellence</h2>
                            <div style={STYLES.goldUnderline}></div>
                            <p style={{ ...STYLES.textMuted, fontSize: '1.05rem' }}>
                                {institution?.history}
                            </p>
                            {institution?.aboutExtended && (
                                <p style={STYLES.textMuted}>
                                    {institution.aboutExtended}
                                </p>
                            )}

                            {/* Action Link to Academics / Programmes */}
                            <div className="mt-4">
                                <Link
                                    to="/programmes"
                                    className="btn px-4 py-2 fw-bold text-white"
                                    style={{ backgroundColor: COLORS.navy, borderRadius: '6px' }}
                                >
                                    Explore Academic Programmes &rarr;
                                </Link>
                            </div>

                            <div className="d-flex gap-4 mt-4 pt-2 border-top">
                                {yearsOfExcellence > 0 && (
                                    <div>
                                        <h3 className="fw-bold mb-0" style={{ color: COLORS.navy }}>{yearsOfExcellence}+</h3>
                                        <small style={STYLES.textMuted}>Years of Excellence</small>
                                    </div>
                                )}
                                {yearsOfExcellence > 0 && <div className="border-end"></div>}
                                <div>
                                    <h3 className="fw-bold mb-0" style={{ color: COLORS.navy }}>100%</h3>
                                    <small style={STYLES.textMuted}>NCCE Accredited</small>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="history-image-wrapper">
                                <img
                                    src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80"
                                    alt={`${institution?.name || 'College'} Campus`}
                                    className="img-fluid rounded-3 shadow-lg position-relative"
                                    style={{ zIndex: 1, objectFit: 'cover', width: '100%', maxHeight: '420px' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Vision, Mission & Philosophy */}
            <section style={STYLES.section(COLORS.parchment)}>
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-5">
                        <div style={STYLES.tag}>Foundational Pillars</div>
                        <h2 style={STYLES.sectionTitle}>Guided by Purpose &amp; Vision</h2>
                        <div style={{ ...STYLES.goldUnderline, margin: '0.75rem auto 0 auto' }}></div>
                    </div>

                    <div className="row g-4">
                        {institution?.vision && (
                            <div className="col-md-4">
                                <div style={STYLES.card} className="hover-lift">
                                    <div style={STYLES.iconCircle(COLORS.navy, COLORS.gold)}>👁️</div>
                                    <h4 style={{ color: COLORS.navy, fontWeight: '700' }}>Our Vision</h4>
                                    <div style={{ width: '30px', height: '2px', backgroundColor: COLORS.gold, margin: '0.75rem 0' }}></div>
                                    <p style={STYLES.textMuted}>{institution.vision}</p>
                                </div>
                            </div>
                        )}

                        {institution?.mission && (
                            <div className="col-md-4">
                                <div style={STYLES.card} className="hover-lift">
                                    <div style={STYLES.iconCircle(COLORS.burgundy, COLORS.gold)}>🎯</div>
                                    <h4 style={{ color: COLORS.navy, fontWeight: '700' }}>Our Mission</h4>
                                    <div style={{ width: '30px', height: '2px', backgroundColor: COLORS.gold, margin: '0.75rem 0' }}></div>
                                    <p style={STYLES.textMuted}>{institution.mission}</p>
                                </div>
                            </div>
                        )}

                        {institution?.philosophy && (
                            <div className="col-md-4">
                                <div style={STYLES.card} className="hover-lift">
                                    <div style={STYLES.iconCircle(COLORS.navy, COLORS.gold)}>💡</div>
                                    <h4 style={{ color: COLORS.navy, fontWeight: '700' }}>Our Philosophy</h4>
                                    <div style={{ width: '30px', height: '2px', backgroundColor: COLORS.gold, margin: '0.75rem 0' }}></div>
                                    <p style={STYLES.textMuted}>{institution.philosophy}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 3. Core Values Grid */}
            {coreValues && coreValues.length > 0 && (
                <section style={STYLES.section(COLORS.white)}>
                    <div className="container">
                        <div className="row mb-5 align-items-end">
                            <div className="col-lg-8">
                                <div style={STYLES.tag}>What We Stand For</div>
                                <h2 style={STYLES.sectionTitle}>Our Core Values</h2>
                                {institution?.commitment && (
                                    <p style={{ ...STYLES.textMuted, marginBottom: 0 }}>{institution.commitment}</p>
                                )}
                            </div>
                        </div>

                        <div className="row g-4">
                            {coreValues.map((v, idx) => (
                                <div className="col-sm-6 col-lg-3" key={v.name || idx}>
                                    <div style={{ ...STYLES.card, borderTop: `4px solid ${COLORS.gold}` }} className="hover-lift">
                                        <span className="badge rounded-pill bg-light text-dark mb-2" style={{ border: `1px solid ${COLORS.border}` }}>
                                            Value 0{idx + 1}
                                        </span>
                                        <h5 style={{ color: COLORS.navy, fontWeight: '700' }} className="mt-2 mb-2">{v.name}</h5>
                                        <p style={STYLES.textMuted} className="small mb-0">{v.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 4. Institutional Strengths */}
            {strengths && strengths.length > 0 && (
                <section style={STYLES.section(COLORS.warmCream)}>
                    <div className="container">
                        <div className="row g-4 align-items-center">
                            <div className="col-lg-5">
                                <div style={STYLES.tag}>Why Choose Us</div>
                                <h2 style={STYLES.sectionTitle}>Key Institutional Strengths</h2>
                                <div style={STYLES.goldUnderline}></div>
                                <p style={STYLES.textMuted}>
                                    Our institution provides a comprehensive, modern learning ecosystem engineered to produce leaders in contemporary pedagogy.
                                </p>
                            </div>

                            <div className="col-lg-7">
                                <div className="row g-3">
                                    {strengths.map((s, idx) => (
                                        <div className="col-md-6" key={idx}>
                                            <div className="d-flex align-items-start gap-3 p-3 rounded-3 bg-white shadow-sm hover-lift">
                                                <div className="flex-shrink-0" style={STYLES.iconCircle(COLORS.navy, COLORS.gold)}>
                                                    ✓
                                                </div>
                                                <div>
                                                    <h6 style={{ color: COLORS.navy, fontWeight: '700', marginBottom: '0.25rem' }}>
                                                        Excellence Standard
                                                    </h6>
                                                    <p style={{ ...STYLES.textMuted, fontSize: '0.85rem', marginBottom: 0 }}>{s}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* 5. Principal Officers / Leadership */}
            <section style={STYLES.section(COLORS.white)}>
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-4">
                        <div style={STYLES.tag}>Leadership &amp; Governance</div>
                        <h2 style={STYLES.sectionTitle}>Principal Officers &amp; Leadership</h2>
                        <p style={STYLES.textMuted}>Meet the dedicated leaders and academic personnel guiding governance and educational excellence.</p>
                        <div style={{ ...STYLES.goldUnderline, margin: '0.75rem auto 0 auto' }}></div>
                    </div>

                    {/* Category Filter Tabs */}
                    <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className="btn btn-sm px-3 py-2 rounded-pill"
                                style={{
                                    backgroundColor: activeCategory === cat ? COLORS.navy : 'transparent',
                                    color: activeCategory === cat ? COLORS.white : COLORS.navy,
                                    border: `1px solid ${COLORS.navy}`,
                                    fontWeight: '600',
                                    transition: 'all 0.2s ease'
                                }}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="row g-4">
                        {filteredStaff.map((p) => {
                            const isProprietor = p.role.toLowerCase().includes('proprietor');
                            return (
                                <div className="col-md-6 col-lg-3" key={p.id}>
                                    <div style={STYLES.card} className="text-center hover-lift d-flex flex-column justify-content-between">
                                        <div>
                                            <img
                                                src={p.photo}
                                                alt={p.name}
                                                style={STYLES.officerImg}
                                            />
                                            <h6 style={{ color: COLORS.navy, fontWeight: '700' }} className="mb-1">{p.name}</h6>
                                            <p className="small fw-semibold mb-1" style={{ color: COLORS.gold }}>{p.role}</p>
                                            <p style={{ ...STYLES.textMuted, fontSize: '0.85rem' }} className="mb-2">
                                                {p.department}
                                            </p>
                                        </div>
                                        <div>
                                            <span
                                                className="badge mb-3"
                                                style={{
                                                    backgroundColor: 'rgba(15, 44, 89, 0.08)',
                                                    color: COLORS.navy,
                                                    fontSize: '0.75rem'
                                                }}
                                            >
                                                {p.category}
                                            </span>
                                            <div className="d-flex flex-column gap-2">
                                                <button
                                                    className="btn btn-sm w-100"
                                                    style={{
                                                        border: `1px solid ${COLORS.navy}`,
                                                        color: COLORS.navy,
                                                        fontWeight: '600',
                                                        borderRadius: '6px'
                                                    }}
                                                    onClick={() => setSelectedOfficer(p)}
                                                >
                                                    View Profile
                                                </button>

                                                {/* Proprietor Address Button */}
                                                {isProprietor && (
                                                    <Link
                                                        to="/address"
                                                        className="btn btn-sm w-100 fw-bold rounded-2 btn-proprietor-address d-flex align-items-center justify-content-center gap-1"
                                                    >
                                                         View Proprietor Address
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 6. Accreditation & Recognition Banner */}
            <section style={STYLES.section(COLORS.navy)}>
                <div className="container">
                    <div className="p-4 p-md-5 rounded-4" style={{ border: `1px solid ${COLORS.gold}`, backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
                        <div className="row align-items-center g-4">
                            <div className="col-lg-8">
                                <div className="d-inline-block px-3 py-1 rounded-pill mb-3" style={{ backgroundColor: COLORS.gold, color: COLORS.navy, fontWeight: '700', fontSize: '0.8rem' }}>
                                    RECOGNITION &amp; STANDARDS
                                </div>
                                <h3 className="text-white fw-bold mb-3">National Commission for Colleges of Education (NCCE)</h3>
                                <p className="text-white-50 mb-3" style={{ lineHeight: '1.7', fontSize: '0.95rem' }}>
                                    {institution?.name || 'The College'} operates under full alignment with the regulatory provisions of the
                                    National Commission for Colleges of Education (NCCE). All academic programmes undergo rigorous quality assurance to deliver global competitiveness.
                                </p>

                                {/* Admission / Application Link */}
                                <Link
                                    to="/apply"
                                    className="btn px-4 py-2 fw-bold"
                                    style={{ backgroundColor: COLORS.gold, color: COLORS.navy, borderRadius: '6px' }}
                                >
                                    Apply For Admission &rarr;
                                </Link>
                            </div>
                            <div className="col-lg-4 text-center text-lg-end">
                                <div className="d-inline-flex flex-column align-items-center justify-content-center p-4 rounded-circle bg-white shadow-lg" style={{ width: '130px', height: '130px', border: `4px solid ${COLORS.gold}` }}>
                                    <span className="fw-bold fs-4" style={{ color: COLORS.navy }}>NCCE</span>
                                    <span className="small text-muted fw-semibold">APPROVED</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Officer Bio Modal */}
            {selectedOfficer && (
                <div style={STYLES.modalOverlay} onClick={() => setSelectedOfficer(null)}>
                    <div style={STYLES.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button
                            style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
                            onClick={() => setSelectedOfficer(null)}
                        >
                            ✕
                        </button>
                        <div className="text-center mb-3">
                            <img
                                src={selectedOfficer.photo}
                                alt={selectedOfficer.name}
                                style={{ ...STYLES.officerImg, width: '120px', height: '120px' }}
                            />
                            <h5 style={{ color: COLORS.navy, fontWeight: '700' }} className="mb-1">{selectedOfficer.name}</h5>
                            <span className="badge bg-warning text-dark mb-2">{selectedOfficer.role}</span>
                            <p className="text-muted small mb-0">{selectedOfficer.department}</p>
                        </div>
                        <hr />
                        <div className="mb-3">
                            <p className="small text-muted mb-1"><strong>Category:</strong> {selectedOfficer.category}</p>
                            <p className="small text-muted mb-0"><strong>Department/Unit:</strong> {selectedOfficer.department}</p>
                        </div>

                        {/* Special CTA inside Modal for Proprietor */}
                        {selectedOfficer.role.toLowerCase().includes('proprietor') && (
                            <div className="p-3 my-3 rounded-3 text-center" style={{ backgroundColor: COLORS.parchment, border: `1px solid ${COLORS.gold}` }}>
                                <p className="small fw-semibold text-dark mb-2">Need to contact or locate the Proprietor's office?</p>
                                <Link
                                    to="/address"
                                    className="btn btn-sm px-4 py-2 fw-bold btn-proprietor-address d-inline-flex align-items-center gap-2"
                                >
                                    📍 View Proprietor Address
                                </Link>
                            </div>
                        )}

                        <div className="text-end mt-4">
                            <button
                                className="btn btn-secondary px-4"
                                onClick={() => setSelectedOfficer(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}