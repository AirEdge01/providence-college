import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import provi1Img from '../provi1.jpg';
// import provi2Img from '../provi2.jpg';


// Fallback SVG data URL in case network blocks external image source
const fallbackImg = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22600%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20600%22%20preserveAspectRatio%3D%22none%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%230F2C59%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%23D4AF37%22%20font-family%3D%22sans-serif%22%20font-size%3D%2228%22%20font-weight%3D%22bold%22%3EProvidence%20College%20News%3C%2Ftext%3E%3C%2Fsvg%3E";

const newsItems = [
    {
        id: 1,
        title: 'Providence College Holds Maiden Matriculation Ceremony for 2026/2027 Session',
        date: 'September 2, 2026',
        category: 'Academics',
        readTime: '3 min read',
            image: provi1Img,
        excerpt: 'The College welcomed its newest batch of NCE students in a colorful ceremony attended by principal officers, distinguished guests, and proud parents.',
        featured: true
    },
    {
        id: 2,
        title: 'College Signs MoU with Local Basic Schools for Teaching Practice',
        date: 'August 18, 2026',
        category: 'Partnerships',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop',
        excerpt: 'The agreement expands practical placement opportunities for students undergoing supervised teaching practice across partner institutions.',
        featured: false
    },
    {
        id: 3,
        title: 'ICT Resource Centre Upgrade Completed',
        date: 'July 30, 2026',
        category: 'Facilities',
        readTime: '2 min read',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
        excerpt: 'New high-performance computers and modern educational learning software have been installed to strengthen digital literacy training.',
        featured: false
    },
    {
        id: 4,
        title: 'Providence College Students Excel at Inter-College Debate',
        date: 'July 10, 2026',
        category: 'Student Life',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop',
        excerpt: 'Students from the Faculty of Arts and Social Sciences placed first overall in a regional tertiary education debate competition.',
        featured: false
    }
];

const categories = ['All', ...new Set(newsItems.map((n) => n.category))];

export default function News() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filtered = activeCategory === 'All'
        ? newsItems
        : newsItems.filter((n) => n.category === activeCategory);

    const featuredArticle = newsItems.find((n) => n.featured) || newsItems[0];
    const showFeaturedBanner = activeCategory === 'All' && featuredArticle;

    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = fallbackImg;
    };

    return (
        <>
            <style>{`
        .pce-news-card {
          border-radius: 16px;
          border: 1px solid rgba(15, 44, 89, 0.08);
          background-color: #ffffff;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .pce-news-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 30px -10px rgba(15, 44, 89, 0.12) !important;
        }
        .pce-news-card:hover .pce-img-scale {
          transform: scale(1.06);
        }
        .pce-img-scale {
          transition: transform 0.5s ease;
        }
        .pce-category-pill {
          transition: all 0.25s ease;
        }
        .pce-category-pill:hover {
          transform: translateY(-1px);
        }
      `}</style>

            <PageHeader
                title="News & Media"
                subtitle="Stay up to date with announcements, academic achievements, and developments at Providence College."
                breadcrumb={<><Link to="/" className="text-white text-decoration-none">Home</Link><span className="mx-2">/</span><span>News</span></>}
            />

            <section className="pce-section py-5" style={{ backgroundColor: '#FAF9F6' }}>
                <div className="container py-3">

                    {/* Centered Category Pill Filter */}
                    <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
                        {categories.map((c) => {
                            const isActive = activeCategory === c;
                            return (
                                <button
                                    key={c}
                                    onClick={() => setActiveCategory(c)}
                                    className="btn pce-category-pill px-4 py-2 fw-semibold"
                                    style={{
                                        borderRadius: '50px',
                                        border: isActive ? 'none' : '1px solid #E2E8F0',
                                        backgroundColor: isActive ? 'var(--pce-blue, #0F2C59)' : '#FFFFFF',
                                        color: isActive ? '#FFFFFF' : 'var(--pce-text, #4A5568)',
                                        fontSize: '0.875rem',
                                        boxShadow: isActive ? '0 10px 20px -5px rgba(15, 44, 89, 0.3)' : '0 2px 6px rgba(0,0,0,0.02)'
                                    }}
                                >
                                    {c}
                                </button>
                            );
                        })}
                    </div>

                    {/* Featured Article Spotlight */}
                    {showFeaturedBanner && (
                        <div className="mb-5">
                            <div
                                className="card border-0 overflow-hidden pce-news-card"
                                style={{
                                    borderRadius: '20px',
                                    boxShadow: '0 12px 32px -8px rgba(15, 44, 89, 0.08)'
                                }}
                            >
                                <div className="row g-0 align-items-stretch">
                                    <div className="col-lg-7 position-relative overflow-hidden" style={{ minHeight: '360px' }}>
                                        <img
                                            src={featuredArticle.image}
                                            alt={featuredArticle.title}
                                            onError={handleImageError}
                                            className="w-100 h-100 object-fit-cover pce-img-scale"
                                            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        <div
                                            style={{
                                                position: 'absolute',
                                                inset: 0,
                                                background: 'linear-gradient(to top, rgba(15,44,89,0.4) 0%, transparent 60%)'
                                            }}
                                        />
                                        <span
                                            className="badge position-absolute top-0 start-0 m-4 px-3 py-2"
                                            style={{
                                                backgroundColor: 'var(--pce-gold, #D4AF37)',
                                                color: '#0F2C59',
                                                fontWeight: '700',
                                                letterSpacing: '0.5px',
                                                borderRadius: '30px',
                                                boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                                            }}
                                        >
                                            FEATURED STORY
                                        </span>
                                    </div>

                                    <div className="col-lg-5 p-4 p-md-5 d-flex flex-column justify-content-center">
                                        <div className="d-flex align-items-center gap-2 mb-3 text-muted small">
                                            <span className="fw-bold text-uppercase" style={{ color: 'var(--pce-gold, #D4AF37)', letterSpacing: '1px' }}>
                                                {featuredArticle.category}
                                            </span>
                                            <span>•</span>
                                            <span>{featuredArticle.date}</span>
                                        </div>

                                        <h3 className="h3 fw-bold mb-3" style={{ color: 'var(--pce-blue, #0F2C59)', lineHeight: '1.3' }}>
                                            {featuredArticle.title}
                                        </h3>

                                        <p className="text-secondary mb-4" style={{ fontSize: '0.95rem', lineHeight: '1.7' }}>
                                            {featuredArticle.excerpt}
                                        </p>

                                        <div>
                                            <Link
                                                to={`/news/${featuredArticle.id}`}
                                                className="btn fw-semibold px-4 py-2"
                                                style={{
                                                    backgroundColor: 'var(--pce-blue, #0F2C59)',
                                                    color: '#FFFFFF',
                                                    borderRadius: '8px',
                                                    boxShadow: '0 4px 12px rgba(15, 44, 89, 0.2)'
                                                }}
                                            >
                                                Read Full Story &rarr;
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* News Card Grid */}
                    <div className="row g-4">
                        {filtered.map((n) => (
                            <div className="col-md-6 col-lg-4 d-flex" key={n.id}>
                                <div className="pce-news-card card border-0 w-100 d-flex flex-column">

                                    {/* Image Container */}
                                    <div className="position-relative overflow-hidden" style={{ height: '220px', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
                                        <img
                                            src={n.image}
                                            alt={n.title}
                                            onError={handleImageError}
                                            className="w-100 h-100 object-fit-cover pce-img-scale"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        <span
                                            className="badge position-absolute top-0 start-0 m-3 px-3 py-1"
                                            style={{
                                                backgroundColor: 'rgba(15, 44, 89, 0.85)',
                                                color: '#FFFFFF',
                                                backdropFilter: 'blur(8px)',
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                borderRadius: '20px'
                                            }}
                                        >
                                            {n.category}
                                        </span>
                                    </div>

                                    {/* Body Content */}
                                    <div className="card-body p-4 d-flex flex-column">
                                        <div className="d-flex justify-content-between align-items-center mb-3 text-muted small">
                                            <span style={{ fontSize: '0.8rem', fontWeight: '500' }}>{n.date}</span>
                                            <span style={{ fontSize: '0.8rem' }}>{n.readTime}</span>
                                        </div>

                                        <h5 className="card-title fw-bold mb-3" style={{ color: 'var(--pce-blue, #0F2C59)', fontSize: '1.15rem', lineHeight: '1.4' }}>
                                            {n.title}
                                        </h5>

                                        <p className="card-text text-secondary small mb-4 flex-grow-1" style={{ lineHeight: '1.6', fontSize: '0.875rem' }}>
                                            {n.excerpt}
                                        </p>

                                        <div className="pt-3 border-top mt-auto d-flex justify-content-between align-items-center" style={{ borderColor: '#F1F5F9' }}>
                                            <Link
                                                to={`/news/${n.id}`}
                                                className="fw-bold small text-decoration-none d-flex align-items-center gap-1"
                                                style={{ color: 'var(--pce-blue, #0F2C59)' }}
                                            >
                                                Read Article <span>&rarr;</span>
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </>
    );
}