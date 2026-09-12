import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';

// Inline SVG fallback for network resilient image rendering
const fallbackImg = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%221200%22%20height%3D%22675%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201200%20675%22%20preserveAspectRatio%3D%22none%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%230F2C59%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%23D4AF37%22%20font-family%3D%22sans-serif%22%20font-size%3D%2236%22%20font-weight%3D%22bold%22%3EProvidence%20College%20Media%3C%2Ftext%3E%3C%2Fsvg%3E";

const newsItems = [
    {
        id: 1,
        title: 'Providence College Holds Maiden Matriculation Ceremony for 2026/2027 Session',
        date: 'September 2, 2026',
        category: 'Academics',
        author: 'College Communications',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop',
        excerpt: 'The College welcomed its newest batch of NCE students in a colorful ceremony attended by principal officers, distinguished guests, and proud parents.',
        content: [
            'Providence College officially welcomed hundreds of newly admitted students into its various Nigeria Certificate in Education (NCE) programs during its historic maiden matriculation ceremony held at the main campus auditorium.',
            'Delivering the keynote address, the Provost emphasized the institution’s commitment to academic excellence, moral integrity, and modern pedagogical training. "You are entering a transformational phase of your professional journey. Our goal is not merely to confer certificates, but to raise standard-bearers for basic education," the Provost stated.',
            'The event featured the solemn administration of the matriculation oath, address by principal officers, and dynamic cultural performances by student groups representing various academic faculties.'
        ]
    },
    {
        id: 2,
        title: 'College Signs MoU with Local Basic Schools for Teaching Practice',
        date: 'August 18, 2026',
        category: 'Partnerships',
        author: 'Directorate of Academic Planning',
        readTime: '3 min read',
        image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop',
        excerpt: 'The agreement expands practical placement opportunities for students undergoing supervised teaching practice across partner institutions.',
        content: [
            'Providence College has finalized a Memorandum of Understanding (MoU) with twenty leading basic and junior secondary schools across the region to bolster practical teacher training.',
            'This strategic partnership guarantees dedicated placement slots for Providence College students undergoing mandatory teaching practice, complete with structured mentorship from senior school educators.',
            'The agreement also opens pathways for joint educational workshops, resource sharing, and community literacy outreach projects initiated by the college faculty.'
        ]
    },
    {
        id: 3,
        title: 'ICT Resource Centre Upgrade Completed',
        date: 'July 30, 2026',
        category: 'Facilities',
        author: 'ICT Unit',
        readTime: '3 min read',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
        excerpt: 'New high-performance computers and modern educational learning software have been installed to strengthen digital literacy training.',
        content: [
            'In line with its digital transformation roadmap, Providence College has officially commissioned its modernized ICT Resource Centre equipped with over 150 high-performance computer workstations.',
            'The upgraded facility features high-speed fiber-optic internet connectivity, interactive e-learning software, and dedicated testing terminals for computer-based examinations.',
            'Speaking at the commissioning, the Head of ICT noted that the facility will serve both students and faculty members, ensuring seamless digital research and interactive classroom delivery.'
        ]
    },
    {
        id: 4,
        title: 'Providence College Students Excel at Inter-College Debate',
        date: 'July 10, 2026',
        category: 'Student Life',
        author: 'Student Affairs Division',
        readTime: '3 min read',
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop',
        excerpt: 'Students from the Faculty of Arts and Social Sciences placed first in a regional tertiary education debate competition.',
        content: [
            'The student debate team representing Providence College emerged overall champions at the annual Regional Tertiary Education Debate Tournament held over the weekend.',
            'Speaking on topics surrounding educational reform and digital equity, the Providence team impressed the panel of judges with compelling arguments, analytical rigor, and confident delivery.',
            'The victory earns the college team an automatic slot at the national collegiate championship set to take place later this academic year.'
        ]
    }
];

export default function NewsArticle() {
    const { id } = useParams();
    const article = newsItems.find((n) => String(n.id) === id);

    const relatedArticles = newsItems
        .filter((n) => String(n.id) !== id)
        .slice(0, 3);

    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = fallbackImg;
    };

    if (!article) {
        return (
            <div className="container py-5 text-center my-5">
                <div
                    className="p-5 mx-auto rounded-4 shadow-sm"
                    style={{ maxWidth: 500, backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }}
                >
                    <div className="mb-3" style={{ fontSize: '3rem' }}>📰</div>
                    <h3 className="fw-bold mb-2" style={{ color: 'var(--pce-blue, #0F2C59)' }}>Article Not Found</h3>
                    <p className="text-secondary small mb-4">The article you are looking for might have been moved or removed.</p>
                    <Link
                        to="/news"
                        className="btn fw-semibold px-4 py-2"
                        style={{ backgroundColor: 'var(--pce-blue, #0F2C59)', color: '#FFFFFF', borderRadius: '8px' }}
                    >
                        &larr; Return to News Center
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <style>{`
        .pce-article-wrapper {
          background-color: #FAF9F6;
        }
        .pce-article-card {
          border-radius: 20px;
          border: 1px solid rgba(15, 44, 89, 0.08);
          background-color: #ffffff;
          box-shadow: 0 12px 32px -8px rgba(15, 44, 89, 0.06);
        }
        .pce-related-card {
          border-radius: 12px;
          border: 1px solid #E2E8F0;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .pce-related-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 20px -6px rgba(15, 44, 89, 0.1) !important;
        }
        .pce-dropcap::first-letter {
          font-size: 3.5rem;
          font-weight: 800;
          float: left;
          line-height: 0.8;
          margin-right: 0.75rem;
          color: var(--pce-blue, #0F2C59);
        }
      `}</style>

            <PageHeader
                title={article.title}
                subtitle={`${article.category} • ${article.date}`}
                breadcrumb={<><Link to="/" className="text-white text-decoration-none">Home</Link><span className="mx-2">/</span><Link to="/news" className="text-white text-decoration-none">News</Link><span className="mx-2">/</span><span>Article</span></>}
            />

            <section className="pce-article-wrapper py-5">
                <div className="container py-3">
                    <div className="row justify-content-center">
                        <div className="col-lg-10 col-xl-9">

                            {/* Main Article Container */}
                            <article className="pce-article-card p-4 p-md-5 mb-5">

                                {/* Meta Badge Bar */}
                                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 pb-3 border-bottom" style={{ borderColor: '#F1F5F9' }}>
                                    <div className="d-flex align-items-center gap-2">
                                        <span
                                            className="badge px-3 py-2"
                                            style={{
                                                backgroundColor: 'var(--pce-blue, #0F2C59)',
                                                color: '#FFFFFF',
                                                borderRadius: '20px',
                                                fontSize: '0.8rem'
                                            }}
                                        >
                                            {article.category}
                                        </span>
                                        <span className="text-muted small">• {article.readTime}</span>
                                    </div>
                                    <div className="text-muted small">
                                        Published: <strong style={{ color: '#0F2C59' }}>{article.date}</strong>
                                    </div>
                                </div>

                                {/* Hero Feature Image */}
                                <div
                                    className="position-relative overflow-hidden mb-4"
                                    style={{ borderRadius: '16px', maxHeight: '460px', minHeight: '260px' }}
                                >
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        onError={handleImageError}
                                        className="w-100 h-100 object-fit-cover"
                                        style={{ objectFit: 'cover', width: '100%', maxHeight: '460px' }}
                                    />
                                </div>

                                {/* Lead Excerpt Box */}
                                <div
                                    className="p-4 mb-4 rounded-3"
                                    style={{
                                        backgroundColor: 'rgba(212, 175, 55, 0.08)',
                                        borderLeft: '4px solid var(--pce-gold, #D4AF37)'
                                    }}
                                >
                                    <p className="mb-0 fw-medium" style={{ color: '#0F2C59', fontSize: '1.1rem', lineHeight: '1.6' }}>
                                        {article.excerpt}
                                    </p>
                                </div>

                                {/* Article Prose Paragraphs */}
                                <div className="article-body text-secondary mb-5" style={{ fontSize: '1.05rem', lineHeight: '1.85' }}>
                                    {article.content ? (
                                        article.content.map((paragraph, idx) => (
                                            <p key={idx} className={idx === 0 ? 'pce-dropcap mb-4' : 'mb-4'}>
                                                {paragraph}
                                            </p>
                                        ))
                                    ) : (
                                        <p className="pce-dropcap mb-4">{article.excerpt}</p>
                                    )}
                                </div>

                                {/* Article Footer & Navigation */}
                                <div className="pt-4 border-top d-flex justify-content-between align-items-center" style={{ borderColor: '#F1F5F9' }}>
                                    <Link
                                        to="/news"
                                        className="btn fw-semibold px-4 py-2 d-inline-flex align-items-center gap-2"
                                        style={{
                                            border: '1px solid #E2E8F0',
                                            backgroundColor: '#FFFFFF',
                                            color: 'var(--pce-blue, #0F2C59)',
                                            borderRadius: '30px'
                                        }}
                                    >
                                        <span>&larr;</span> Back to All News
                                    </Link>

                                    <div className="text-muted small">
                                        By <span className="fw-semibold text-dark">{article.author}</span>
                                    </div>
                                </div>

                            </article>

                            {/* Related Articles Section */}
                            <div className="mt-5">
                                <h4 className="fw-bold mb-4" style={{ color: 'var(--pce-blue, #0F2C59)' }}>
                                    More Stories & Updates
                                </h4>

                                <div className="row g-4">
                                    {relatedArticles.map((rel) => (
                                        <div className="col-md-4 d-flex" key={rel.id}>
                                            <div className="pce-related-card card border-0 w-100 bg-white overflow-hidden d-flex flex-column">
                                                <div style={{ height: '140px', overflow: 'hidden' }}>
                                                    <img
                                                        src={rel.image}
                                                        alt={rel.title}
                                                        onError={handleImageError}
                                                        className="w-100 h-100 object-fit-cover"
                                                    />
                                                </div>
                                                <div className="p-3 d-flex flex-column flex-grow-1">
                                                    <span className="text-muted small mb-1" style={{ fontSize: '0.75rem' }}>{rel.date}</span>
                                                    <h6 className="fw-bold mb-2" style={{ color: '#0F2C59', fontSize: '0.95rem', lineHeight: '1.4' }}>
                                                        {rel.title}
                                                    </h6>
                                                    <Link
                                                        to={`/news/${rel.id}`}
                                                        className="mt-auto fw-semibold small text-decoration-none pt-2"
                                                        style={{ color: 'var(--pce-blue, #0F2C59)' }}
                                                    >
                                                        Read Story &rarr;
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}