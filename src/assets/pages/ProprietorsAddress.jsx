import React from 'react';
import PageHeader from '../components/PageHeader.jsx';
import { Link } from 'react-router-dom';

export default function ProprietorsAddress() {
  const COLORS = {
    navy: '#0F2C59',
    gold: '#D4AF37',
    burgundy: '#4A0E17',
    ivory: '#FDFBF7',
    lightGray: '#F8FAFC',
    textDark: '#1E293B',
    textMuted: '#475569',
    white: '#FFFFFF',
    border: '#E2E8F0'
  };

  const proprietorData = {
    name: "Prof. Abiodun Gbolagade",
    title: "Proprietor & Chairman of Governing Council",
    qualifications: "Ph.D., F.I.C.A., M.N.I.M.",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
    keyQuote: "Education is not merely the transmission of academic knowledge, but the deliberate shaping of character, purpose, and pedagogical mastery.",
    speechParagraphs: [
        "It is with great pleasure and a profound sense of responsibility that I welcome you to this institution through the pages of this Student Handbook. The establishment of this College was driven by a singular, visionary mandate: to build a premier citadel of learning where academic rigor, professional teacher training, and exemplary character development intersect to produce the next generation of educators and societal leaders.",

        "This handbook is designed to serve as your foundational roadmap. As an institution, we have spared no effort in providing the essential infrastructure, modern learning tools, and highly qualified personnel necessary to support your intellectual and personal growth. From a well-stocked College",

        "Library designed to cultivate your research skills to our administrative, bursary, and student affairs teams working tirelessly for your welfare, the platform for your success has been firmly established.",

        "Education remains the most potent instrument for national development and societal transformation. As prospective professionals and leaders, the responsibility resting on your shoulders is vast. I urge you to maximize the resources detailed in this handbook, respect the institution's values, and commit yourself to a legacy of honor, integrity, and distinct service.",

        "May your journey through this College be rewarding, transformative, and remarkably successful.",
    ]
  };

  const STYLES = {
    section: {
      backgroundColor: COLORS.ivory,
      padding: '4rem 1rem'
    },
    cardWrapper: {
      backgroundColor: COLORS.white,
      borderRadius: '20px',
      border: `1px solid ${COLORS.border}`,
      boxShadow: '0 20px 40px -15px rgba(15, 44, 89, 0.07)',
      overflow: 'hidden'
    },
    imageBorder: {
      position: 'relative',
      borderRadius: '16px',
      padding: '8px',
      background: `linear-gradient(135deg, ${COLORS.gold} 0%, ${COLORS.navy} 100%)`,
      boxShadow: '0 12px 30px rgba(15, 44, 89, 0.15)'
    },
    image: {
      width: '100%',
      maxHeight: '520px',
      objectFit: 'cover',
      borderRadius: '12px',
      display: 'block'
    },
    badge: {
      display: 'inline-block',
      backgroundColor: 'rgba(212, 175, 55, 0.15)',
      color: COLORS.navy,
      border: `1px solid ${COLORS.gold}`,
      padding: '0.4rem 1rem',
      borderRadius: '30px',
      fontSize: '0.8rem',
      fontWeight: '700',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      marginBottom: '1rem'
    },
    title: {
      color: COLORS.navy,
      fontWeight: '800',
      fontSize: '2.2rem',
      lineHeight: '1.2'
    },
    goldDivider: {
      width: '70px',
      height: '4px',
      backgroundColor: COLORS.gold,
      margin: '1.25rem 0',
      borderRadius: '2px'
    },
    quoteBox: {
      borderLeft: `4px solid ${COLORS.gold}`,
      backgroundColor: COLORS.lightGray,
      padding: '1.5rem',
      borderRadius: '0 12px 12px 0',
      margin: '2rem 0',
      fontStyle: 'italic',
      color: COLORS.navy,
      fontSize: '1.1rem',
      fontWeight: '600'
    },
    signatureBlock: {
      borderTop: `1px solid ${COLORS.border}`,
      paddingTop: '1.5rem',
      marginTop: '2.5rem'
    }
  };

  return (
    <>
      <style>{`
        .speech-p {
          color: ${COLORS.textMuted};
          line-height: 1.85;
          font-size: 1.05rem;
          margin-bottom: 1.25rem;
        }
        .speech-p:first-letter {
          font-size: 2.8rem;
          font-weight: 800;
          color: ${COLORS.navy};
          float: left;
          line-height: 1;
          margin-right: 0.5rem;
          margin-top: 0.1rem;
        }
        .signature-font {
          font-family: 'Georgia', serif;
          font-style: italic;
          color: ${COLORS.navy};
          font-size: 1.3rem;
          font-weight: bold;
        }
      `}</style>

      {/* Page Header Component */}
      <PageHeader
        title="Proprietor's Address"
        subtitle="A vision of leadership, academic distinction, and character building from the Chairman of Governing Council."
        breadcrumb="Proprietor's Address"
      />

      <section style={STYLES.section}>
        <div className="container">
          <div style={STYLES.cardWrapper} className="p-4 p-md-5">
            <div className="row g-5 align-items-start">
              
              {/* Photo & Profile Sidebar */}
              <div className="col-lg-5 col-xl-4 sticky-top" style={{ top: '100px', zIndex: 1 }}>
                <div style={STYLES.imageBorder}>
                  <img
                    src={proprietorData.photo}
                    alt={proprietorData.name}
                    style={STYLES.image}
                  />
                </div>

                <div className="text-center text-lg-start mt-4">
                  <h4 className="fw-bold mb-1" style={{ color: COLORS.navy }}>
                    {proprietorData.name}
                  </h4>
                  <p className="fw-semibold mb-1" style={{ color: COLORS.gold, fontSize: '0.95rem' }}>
                    {proprietorData.title}
                  </p>
                  <p className="text-muted small mb-3">{proprietorData.qualifications}</p>
                  
                  <div className="p-3 rounded-3 bg-light border text-center">
                    <span className="small text-muted d-block fw-semibold">Governance Office</span>
                    <strong style={{ color: COLORS.navy, fontSize: '0.85rem' }}>
                      Office of the Governing Council Chairman
                    </strong>
                  </div>
                </div>
              </div>

              {/* Speech Body Content */}
              <div className="col-lg-7 col-xl-8">
                <div style={STYLES.badge}>Proprietor Speech &amp; Welcome Address</div>
                <h1 style={STYLES.title}>Welcome to a Legacy of Academic and Professional Excellence</h1>
                <div style={STYLES.goldDivider}></div>

                {/* Pull Quote */}
                <div style={STYLES.quoteBox}>
                  "{proprietorData.keyQuote}"
                </div>

                {/* Speech Paragraphs */}
                {proprietorData.speechParagraphs.map((paragraph, idx) => (
                  <p key={idx} className={idx === 0 ? "speech-p" : "speech-p"}>
                    {paragraph}
                  </p>
                ))}

                {/* Signature & Closing */}
                <div style={STYLES.signatureBlock} className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                  <div>
                    <span className="text-muted small d-block">Warmest Regards,</span>
                    <span className="signature-font">{proprietorData.name}</span>
                    <span className="d-block text-muted small mt-1">Proprietor / Chairman Governing Council</span>
                  </div>

                  <div>
                    <Link
                      to="/admissions"
                      className="btn btn-lg px-4"
                      style={{
                        backgroundColor: COLORS.navy,
                        color: COLORS.white,
                        fontWeight: '700',
                        fontSize: '0.95rem',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(15, 44, 89, 0.2)'
                      }}
                    >
                      Join Our Community &rarr;
                    </Link>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}