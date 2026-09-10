import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const institution = {
    name: 'Providence International College of Education',
    shortName: 'Providence College of Education',
    established: 2017,
    about: 'Providence International College of Education is dedicated to excellence in teaching, learning and research.',
    aboutExtended: 'The College places strong emphasis on academic excellence, professional competence, character development, innovation and service.'
};

const faculties = [
    { id: 'arts-social-sciences', name: 'Faculty of Arts and Social Sciences', description: 'Prepares educators in the humanities and social sciences.', departments: [] },
    { id: 'sciences-education', name: 'Faculty of Sciences Education', description: 'Trains competent science educators equipped for modern classroom instruction.', departments: [] },
    { id: 'languages', name: 'Faculty of Languages', description: 'Develops fluency and teaching competence in indigenous and foreign languages.', departments: [] },
    { id: 'vocational-technical', name: 'Faculty of Vocational and Technical Education', description: 'Equips educators with hands-on technical and vocational teaching skills.', departments: [] },
    { id: 'early-childhood-primary', name: 'Faculty of Early Childhood Care & Primary Education', description: 'Specializes in early childhood development, foundation learning, and primary education delivery.', departments: [] }
];

const strengths = [
    'Quality and professionally oriented teacher education',
    'Experienced and dedicated faculty',
    'Modern learning facilities and ICT resources',
    'A conducive environment for learning and research',
    'Holistic development of mind, character and leadership',
    'Commitment to community and national development'
];

const newsItems = [
    { id: 1, title: 'Providence College Holds Maiden Matriculation Ceremony for 2026/2027 Session', date: 'September 2, 2026', category: 'Academics', excerpt: 'The College welcomed its newest batch of NCE students in a ceremony attended by principal officers and parents.' },
    { id: 2, title: 'College Signs MoU with Local Basic Schools for Teaching Practice', date: 'August 18, 2026', category: 'Partnerships', excerpt: 'The agreement expands placement opportunities for students undergoing supervised teaching practice.' },
    { id: 3, title: 'ICT Resource Centre Upgrade Completed', date: 'July 30, 2026', category: 'Facilities', excerpt: 'New computers and learning software have been installed to strengthen digital literacy training.' }
];

const events = [
    { id: 1, title: 'Matriculation Ceremony 2026/2027', date: 'October 14, 2026', venue: 'College Main Auditorium', description: 'Formal admission ceremony for newly enrolled students.' },
    { id: 2, title: 'Annual Career & Teaching Practice Fair', date: 'November 5, 2026', venue: 'College Sports Complex', description: 'An event connecting students with schools and organisations offering teaching practice.' },
    { id: 3, title: 'Founders\' Day Celebration', date: 'December 2, 2026', venue: 'College Main Auditorium', description: 'A celebration marking the founding of the College.' }
];

const galleryPhotos = [
    { id: 1, caption: 'Matriculation Ceremony', category: 'Events' },
    { id: 2, caption: 'Science Laboratory Session', category: 'Campus Activities' },
    { id: 3, caption: 'Library and ICT Centre', category: 'Facilities' },
    { id: 4, caption: 'Sports Day', category: 'Campus Activities' }
];

export default function Home() {
    const slides = [
        {
            title: institution.name,
            subtitle: `Established ${institution.established} · Ibadan, Oyo State`,
            text: institution.about,
            image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1400&q=80',
            primaryBtnText: 'Apply Now',
            primaryBtnLink: '/admissions',
            secondaryBtnText: 'Learn More',
            secondaryBtnLink: '/about'
        },
        {
            title: 'Excellence in Teacher Education',
            subtitle: 'NCCE Accredited Standards',
            text: 'Empowering future educators with practical training, strong character, and modern learning infrastructure.',
            image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1400&q=80',
            primaryBtnText: 'Explore Academics',
            primaryBtnLink: '/faculties',
            secondaryBtnText: 'Our Story',
            secondaryBtnLink: '/about'
        },
        {
            title: 'Admissions Open',
            subtitle: `Session ${new Date().getFullYear()}/${new Date().getFullYear() + 1}`,
            text: 'Take the first step toward a rewarding career in education. Join our vibrant academic community today.',
            image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1400&q=80',
            primaryBtnText: 'Start Application',
            primaryBtnLink: '/admissions',
            secondaryBtnText: 'View Events',
            secondaryBtnLink: '/events'
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const colors = {
        navy: '#0F2C59',
        gold: '#D4AF37',
        burgundy: '#4A0E17',
        parchment: '#F9F6F0',
        warmCream: '#F2ECE1',
        slateLight: '#EBF0F5',
        sageLight: '#E8EFEA',
        textMuted: '#4A5568',
        white: '#FFFFFF',
        border: '#E2E8F0'
    };

    const styles = {
        marqueeContainer: {
            backgroundColor: colors.burgundy,
            color: colors.white,
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            borderBottom: `2px solid ${colors.gold}`
        },
        marqueeBadge: {
            backgroundColor: colors.gold,
            color: colors.navy,
            fontWeight: '700',
            padding: '0.5rem 1rem',
            fontSize: '0.8rem',
            zIndex: 2,
            letterSpacing: '0.05em',
            flexShrink: 0
        },
        marqueeTrack: {
            display: 'inline-block',
            paddingLeft: '100%',
            animation: 'marquee 25s linear infinite',
            fontSize: '0.85rem',
            fontWeight: '500'
        },

        // Hero Section
        heroSection: {
            position: 'relative',
            minHeight: '480px',
            color: colors.white,
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            backgroundImage: `linear-gradient(to right, rgba(15, 44, 89, 0.85) 0%, rgba(15, 44, 89, 0.4) 100%), url(${slides[currentSlide].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'background-image 0.8s ease-in-out',
            padding: '3rem 1rem'
        },
        eyebrow: {
            color: colors.gold,
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontSize: '0.8rem',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.6)'
        },
        heroTitle: {
            fontWeight: '800',
            color: colors.white,
            textShadow: '0 3px 8px rgba(0, 0, 0, 0.7)'
        },
        heroText: {
            color: colors.white,
            maxWidth: '65ch',
            textShadow: '0 2px 6px rgba(0, 0, 0, 0.8)',
            backgroundColor: 'rgba(15, 44, 89, 0.35)',
            padding: '0.5rem 0.75rem',
            borderRadius: '6px',
            backdropFilter: 'blur(2px)'
        },
        btnPrimary: {
            backgroundColor: colors.gold,
            color: colors.navy,
            fontWeight: '700',
            padding: '0.65rem 1.4rem',
            borderRadius: '6px',
            textDecoration: 'none',
            border: 'none',
            display: 'inline-block',
            textAlign: 'center'
        },
        btnOutline: {
            backgroundColor: 'rgba(15, 44, 89, 0.5)',
            color: colors.white,
            border: `2px solid ${colors.white}`,
            fontWeight: '600',
            padding: '0.65rem 1.4rem',
            borderRadius: '6px',
            textDecoration: 'none',
            display: 'inline-block',
            backdropFilter: 'blur(4px)',
            textAlign: 'center'
        },
        carouselDots: {
            position: 'absolute',
            bottom: '15px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            zIndex: 3
        },
        dot: (isActive) => ({
            width: isActive ? '24px' : '8px',
            height: '8px',
            borderRadius: '4px',
            backgroundColor: isActive ? colors.gold : 'rgba(255, 255, 255, 0.7)',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        }),

        welcomeSection: { backgroundColor: colors.parchment, padding: '3.5rem 1rem' },
        aboutSection: { backgroundColor: colors.warmCream, padding: '3.5rem 1rem' },
        facultiesSection: { backgroundColor: colors.slateLight, padding: '3.5rem 1rem' },
        whySection: { backgroundColor: colors.sageLight, padding: '3.5rem 1rem' },
        newsSection: { backgroundColor: colors.parchment, padding: '3.5rem 1rem' },
        eventsSection: { backgroundColor: colors.warmCream, padding: '3.5rem 1rem' },
        gallerySection: { backgroundColor: colors.slateLight, padding: '3.5rem 1rem' },
        ctaSection: { backgroundColor: colors.burgundy, color: colors.white, padding: '3.5rem 1rem' },

        pceTag: {
            display: 'inline-block',
            backgroundColor: 'rgba(212, 175, 55, 0.2)',
            color: colors.navy,
            padding: '0.35rem 0.85rem',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            marginBottom: '0.5rem'
        },
        sectionTitle: {
            fontWeight: '700',
            color: colors.navy,
            fontSize: '1.75rem'
        },
        goldUnderline: {
            width: '50px',
            height: '4px',
            backgroundColor: colors.gold,
            margin: '0.5rem 0 1.25rem 0',
            borderRadius: '2px'
        },
        pceCard: {
            backgroundColor: colors.white,
            border: `1px solid ${colors.border}`,
            borderRadius: '10px',
            padding: '1.25rem',
            boxShadow: '0 4px 12px rgba(15, 44, 89, 0.05)',
            height: '100%',
            overflow: 'hidden'
        },
        imageBlock: {
            width: '100%',
            objectFit: 'cover',
            borderRadius: '8px'
        },
        iconCircle: {
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'rgba(15, 44, 89, 0.1)',
            color: colors.navy,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '700',
            marginBottom: '0.85rem'
        },
        textMuted: {
            color: colors.textMuted,
            lineHeight: '1.6',
            fontSize: '0.95rem'
        },
        linkBlue: {
            color: colors.navy,
            textDecoration: 'none',
            fontWeight: '600'
        }
    };

    return (
        <>
            <style>
                {`
          @keyframes marquee {
            0% { transform: translate(0, 0); }
            100% { transform: translate(-100%, 0); }
          }
          @media (max-width: 576px) {
            .responsive-btn-group {
              flex-direction: column;
              width: 100%;
            }
            .responsive-btn-group a {
              width: 100%;
            }
          }
        `}
            </style>

            {/* Marquee Banner */}
            <div style={styles.marqueeContainer}>
                <div style={styles.marqueeBadge}>ANNOUNCEMENTS</div>
                <div style={styles.marqueeTrack}>
                    Admissions for the {new Date().getFullYear()}/{new Date().getFullYear() + 1} Academic Session are currently ongoing! &nbsp;&nbsp;|&nbsp;&nbsp; 🗓️ Upcoming Event: Annual Academic Convocation Ceremony &nbsp;&nbsp;|&nbsp;&nbsp; 🏆 NCCE Re-accreditation Status Confirmed.
                </div>
            </div>

            {/* Hero Carousel */}
            <section style={styles.heroSection}>
                <div className="container position-relative" style={{ zIndex: 2 }}>
                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            <div className="mb-2" style={styles.eyebrow}>
                                {slides[currentSlide].subtitle}
                            </div>
                            <h1 className="mb-3 display-5 display-md-4" style={styles.heroTitle}>
                                {slides[currentSlide].title}
                            </h1>
                            <p className="lead mb-4" style={styles.heroText}>
                                {slides[currentSlide].text}
                            </p>
                            <div className="d-flex responsive-btn-group gap-3">
                                <Link to={slides[currentSlide].primaryBtnLink} style={styles.btnPrimary}>
                                    {slides[currentSlide].primaryBtnText}
                                </Link>
                                <Link to={slides[currentSlide].secondaryBtnLink} style={styles.btnOutline}>
                                    {slides[currentSlide].secondaryBtnText}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={styles.carouselDots}>
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            style={styles.dot(currentSlide === index)}
                            onClick={() => setCurrentSlide(index)}
                        />
                    ))}
                </div>
            </section>

            {/* Welcome Message */}
            <section style={styles.welcomeSection}>
                <div className="container">
                    <div className="row align-items-center g-4">
                        <div className="col-lg-6">
                            <div style={styles.pceTag}>Welcome</div>
                            <h2 style={styles.sectionTitle}>A Message to Our Students, Staff &amp; Visitors</h2>
                            <div style={styles.goldUnderline}></div>
                            <p style={styles.textMuted}>
                                Welcome to {institution.shortName}. Whether you are a prospective student, a parent, a staff
                                member, or simply exploring what we stand for, we are glad to have you here.
                            </p>
                        </div>
                        <div className="col-lg-6">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQst6Vm38r9_50T3D4l6L098lE7H17RLg38q4TaxtYQtA&s=10"
                                alt="College Campus"
                                style={{ ...styles.imageBlock, height: '280px' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* About Preview */}
            <section style={styles.aboutSection}>
                <div className="container">
                    <div className="row g-4 align-items-center">
                        <div className="col-lg-6 order-lg-2">
                            <div style={styles.pceTag}>About the Institution</div>
                            <h2 style={styles.sectionTitle}>Committed to Excellence in Teacher Education</h2>
                            <div style={styles.goldUnderline}></div>
                            <p style={styles.textMuted}>{institution.aboutExtended}</p>
                            <Link to="/about" style={styles.linkBlue}>Read our full story &rarr;</Link>
                        </div>
                        <div className="col-lg-6 order-lg-1">
                            <div className="row g-3">
                                <div className="col-6">
                                    <div className="text-center" style={styles.pceCard}>
                                        <h3 className="mb-0" style={{ color: colors.gold, fontWeight: '700' }}>{new Date().getFullYear() - institution.established}+</h3>
                                        <p className="small mb-0" style={styles.textMuted}>Years Active</p>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="text-center" style={styles.pceCard}>
                                        <h3 className="mb-0" style={{ color: colors.gold, fontWeight: '700' }}>{faculties.length}</h3>
                                        <p className="small mb-0" style={styles.textMuted}>Faculties</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Faculties */}
            <section style={styles.facultiesSection}>
                <div className="container">
                    <div style={styles.pceTag}>Academics</div>
                    <h2 style={styles.sectionTitle}>Our Faculties</h2>
                    <p className="mb-4" style={styles.textMuted}>Five faculties offering NCCE-standard programmes.</p>
                    <div className="row g-4">
                        {faculties.map((f) => (
                            <div className="col-sm-6 col-lg-4" key={f.id}>
                                <div style={styles.pceCard}>
                                    <div style={styles.iconCircle}>{f.name.charAt(11)}</div>
                                    <h5 style={{ color: colors.navy, fontWeight: '600' }}>{f.name.replace('Faculty of ', '')}</h5>
                                    <p className="small mb-3" style={styles.textMuted}>{f.description}</p>
                                    <Link to="/faculties" className="small" style={styles.linkBlue}>View Departments &rarr;</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section style={styles.whySection}>
                <div className="container">
                    <div style={styles.pceTag}>Why Choose Us</div>
                    <h2 style={styles.sectionTitle}>What Sets Providence Apart</h2>
                    <div style={styles.goldUnderline}></div>
                    <div className="row g-3 mt-2">
                        {strengths.slice(0, 6).map((s, idx) => (
                            <div className="col-sm-6 col-lg-4" key={idx}>
                                <div className="d-flex gap-3 align-items-center">
                                    <div className="flex-shrink-0" style={{ ...styles.iconCircle, width: 32, height: 32, fontSize: '0.85rem', marginBottom: 0 }}>✓</div>
                                    <p className="mb-0" style={{ color: '#2D3748', fontWeight: '500', fontSize: '0.9rem' }}>{s}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Latest News */}
            <section style={styles.newsSection}>
                <div className="container">
                    <div className="d-flex justify-content-between align-items-end mb-2 flex-wrap gap-2">
                        <div>
                            <div style={styles.pceTag}>Newsroom</div>
                            <h2 className="mb-0" style={styles.sectionTitle}>Latest News</h2>
                        </div>
                        <Link to="/news" style={styles.linkBlue}>View All News &rarr;</Link>
                    </div>
                    <div className="row g-4 mt-2">
                        {newsItems.slice(0, 3).map((n, idx) => (
                            <div className="col-md-4" key={n.id}>
                                <div className="d-flex flex-column" style={styles.pceCard}>
                                    <img
                                        src={`https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=500&q=80&sig=${idx}`}
                                        alt={n.title}
                                        style={{ ...styles.imageBlock, height: '150px', marginBottom: '1rem' }}
                                    />
                                    <div style={styles.pceTag}>{n.category}</div>
                                    <h6 style={{ color: colors.navy, fontWeight: '600' }}>{n.title}</h6>
                                    <p className="small flex-grow-1" style={styles.textMuted}>{n.excerpt}</p>
                                    <Link to={`/news/${n.id}`} className="small" style={styles.linkBlue}>Read More</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Preview */}
            <section style={styles.gallerySection}>
                <div className="container">
                    <div className="d-flex justify-content-between align-items-end mb-2 flex-wrap gap-2">
                        <div>
                            <div style={styles.pceTag}>Campus Life</div>
                            <h2 className="mb-0" style={styles.sectionTitle}>Gallery Preview</h2>
                        </div>
                        <Link to="/gallery" style={styles.linkBlue}>View Full Gallery &rarr;</Link>
                    </div>
                    <div className="row g-3 mt-2">
                        {galleryPhotos.slice(0, 4).map((g, idx) => (
                            <div className="col-6 col-md-3" key={g.id}>
                                <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
                                    <img
                                        src={`https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80&sig=${idx}`}
                                        alt={g.caption}
                                        style={{ ...styles.imageBlock, height: '140px' }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section style={styles.ctaSection}>
                <div className="container text-center">
                    <h2 className="mb-3" style={{ fontWeight: '700', color: '#F8F2E9' }}>Ready to Begin Your Journey?</h2>
                    <p className="mb-4" style={{ color: '#F1E7D9', maxWidth: '60ch', marginInline: 'auto' }}>
                        Admissions for the {new Date().getFullYear()}/{new Date().getFullYear() + 1} session are open.
                    </p>
                    <Link to="/admissions" style={styles.btnPrimary}>Apply Now</Link>
                </div>
            </section>
        </>
    );
}