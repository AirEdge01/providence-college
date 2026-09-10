import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';

const principalOfficers = [
    { name: 'Dr. (Mrs.) Adenike Oyelaran', title: 'Provost', bio: 'Leads the College\'s academic and administrative vision.' },
    { name: 'Prof. Femi Adebayo', title: 'Deputy Provost, Academics', bio: 'Oversees curriculum quality, accreditation and academic standards.' },
    { name: 'Mrs. Grace Nwachukwu', title: 'Registrar', bio: 'Manages student records, admissions administration and institutional governance.' },
    { name: 'Mr. Tunde Balogun', title: 'Bursar', bio: 'Responsible for financial planning and management of College resources.' }
];

const staffList = [
    { id: 1, name: 'Prof. Abiodun Gbolagade', role: 'Proprietor', category: 'Principal Officer', department: 'Chairman Governing Council', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
    { id: 2, name: 'Dr. Badiru Dauda Kolapo', role: 'Provost', category: 'Principal Officer', department: 'Academic Board', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80' },
    { id: 3, name: 'Dr. Kunle Fashina', role: 'Senior Lecturer', category: 'Academic Staff', department: 'Department of English Education', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
    { id: 4, name: 'Mrs. Bisi Alao', role: 'Lecturer II', category: 'Academic Staff', department: 'Department of Integrated Science', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' },
    { id: 5, name: 'Mr. Azeez Ademola Oladimeji', role: 'ICT Officer', category: 'Non-Academic Staff', department: 'ICT Unit', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
    { id: 6, name: 'Mrs. Folake Adeyemi', role: 'Head, Student Affairs', category: 'Non-Academic Staff', department: 'Student Affairs', photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80' }
];

const categories = ['All', 'Principal Officer', 'Academic Staff', 'Non-Academic Staff'];

export default function Staff() {
    const [active, setActive] = useState('All');

    const filtered = active === 'All' ? staffList : staffList.filter((s) => s.category === active);

    return (
        <>
            <PageHeader
                title="Staff & Leadership"
                subtitle="Meet the principal officers, academic staff and non-academic staff of Providence College."
                breadcrumb="Home / Staff"
            />

            <section className="pce-section pce-bg-white">
                <div className="container">
                    <div className="pce-tag">Leadership</div>
                    <h3 className="mb-4">Principal Officers</h3>
                    <div className="row g-4 mb-5">
                        {principalOfficers.map((p, idx) => (
                            <div className="col-md-6 col-lg-3" key={p.name}>
                                <div className="pce-card text-center">
                                    <div className="pce-media-block mx-auto mb-3" style={{ width: 90, height: 90, borderRadius: '50%', minHeight: 'auto' }}>Photo</div>
                                    <h6 className="mb-1">{p.name}</h6>
                                    <p className="small mb-0" style={{ color: 'var(--pce-gold)' }}>{p.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pce-tag">Directory</div>
                    <h3 className="mb-3">Staff Directory</h3>
                    <div className="d-flex flex-wrap gap-2 mb-4">
                        {categories.map((c) => (
                            <button
                                key={c}
                                onClick={() => setActive(c)}
                                className="btn btn-sm"
                                style={{
                                    borderRadius: 20,
                                    border: '1px solid var(--pce-border)',
                                    background: active === c ? 'var(--pce-blue)' : 'transparent',
                                    color: active === c ? '#fff' : 'var(--pce-text)'
                                }}
                            >
                                {c}
                            </button>
                        ))}
                    </div>

                    <div className="row g-4">
                        {filtered.map((s) => (
                            <div className="col-md-6 col-lg-4" key={s.id}>
                                <div className="pce-card d-flex align-items-center gap-3">
                                    <div className="pce-media-block flex-shrink-0" style={{ width: 64, height: 64, borderRadius: '50%', minHeight: 'auto', fontSize: '0.7rem' }}>Photo</div>
                                    <div>
                                        <h6 className="mb-0">{s.name}</h6>
                                        <p className="small pce-text-muted mb-1">{s.role} &middot; {s.department}</p>
                                        <Link to={`/staff/${s.id}`} className="small fw-semibold" style={{ color: 'var(--pce-blue)' }}>View Profile &rarr;</Link>
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