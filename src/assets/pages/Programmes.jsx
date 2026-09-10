import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';

const programmeCategories = [
    {
        name: 'Undergraduate Programmes (NCE)',
        items: [
            { title: 'NCE English/Social Studies', duration: '3 Years (Full-Time)', faculty: 'Arts and Social Sciences' },
            { title: 'NCE Integrated Science/Biology', duration: '3 Years (Full-Time)', faculty: 'Sciences Education' },
            { title: 'NCE Mathematics/Computer Science', duration: '3 Years (Full-Time)', faculty: 'Sciences Education' },
            { title: 'NCE Yoruba/English', duration: '3 Years (Full-Time)', faculty: 'Languages' },
            { title: 'NCE Business Education/Economics', duration: '3 Years (Full-Time)', faculty: 'Vocational and Technical Education' }
        ]
    },
    {
        name: 'Academic & Professional Development',
        items: [
            { title: 'Post-NCE Diploma in Education', duration: '1 Year', faculty: 'Cross-Faculty' },
            { title: 'Professional Diploma in Education (PDE)', duration: '1 Year', faculty: 'Cross-Faculty' }
        ]
    },
    {
        name: 'Short Courses & Certifications',
        items: [
            { title: 'Basic ICT for Educators', duration: '6 Weeks', faculty: 'Sciences Education' },
            { title: 'Classroom Management Certificate', duration: '4 Weeks', faculty: 'Cross-Faculty' }
        ]
    }
];

export default function Programmes() {
    return (
        <>
            <PageHeader
                title="Programmes"
                subtitle="Undergraduate NCE programmes, professional development tracks and short courses offered at Providence."
                breadcrumb="Home / Programmes"
            />

            <section className="pce-section pce-bg-white">
                <div className="container">
                    {programmeCategories.map((cat, idx) => (
                        <div key={cat.name} className={idx !== programmeCategories.length - 1 ? 'mb-5' : ''}>
                            <div className="pce-tag">{idx === 0 ? 'Undergraduate' : 'Continuing Education'}</div>
                            <h3 className="mb-4">{cat.name}</h3>
                            <div className="table-responsive">
                                <table className="table align-middle">
                                    <thead>
                                        <tr style={{ color: 'var(--pce-text-muted)', fontSize: '0.85rem' }}>
                                            <th>Programme</th>
                                            <th>Faculty</th>
                                            <th>Duration</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cat.items.map((p) => (
                                            <tr key={p.title}>
                                                <td className="fw-semibold">{p.title}</td>
                                                <td className="pce-text-muted">{p.faculty}</td>
                                                <td className="pce-text-muted">{p.duration}</td>
                                                <td className="text-end">
                                                    <Link to="/admissions" className="small fw-semibold" style={{ color: 'var(--pce-blue)' }}>
                                                        Programme Details &rarr;
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="pce-cta">
                <div className="container text-center">
                    <h2 className="mb-3">Not Sure Which Programme Is Right for You?</h2>
                    <p className="mb-4" style={{ color: '#C9D5EA' }}>Our Admissions Office can guide you to the best fit based on your interests and qualifications.</p>
                    <Link to="/contact" className="btn btn-pce-primary">Contact Admissions</Link>
                </div>
            </section>
        </>
    );
}