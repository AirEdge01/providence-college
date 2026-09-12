import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';

const staffList = [
    { id: 1, name: 'Prof. Abiodun Gbolagade', role: 'Proprietor', category: 'Principal Officer', department: 'Chairman Governing Council', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
    { id: 2, name: 'Dr. Badiru Dauda Kolapo', role: 'Provost', category: 'Principal Officer', department: 'Academic Board', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80' },
    { id: 3, name: 'Dr. Kunle Fashina', role: 'Senior Lecturer', category: 'Academic Staff', department: 'Department of English Education', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
    { id: 4, name: 'Mrs. Bisi Alao', role: 'Lecturer II', category: 'Academic Staff', department: 'Department of Integrated Science', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' },
    { id: 5, name: 'Mr. Azeez Ademola Oladimeji', role: 'ICT Officer', category: 'Non-Academic Staff', department: 'ICT Unit', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
    { id: 6, name: 'Mrs. Folake Adeyemi', role: 'Head, Student Affairs', category: 'Non-Academic Staff', department: 'Student Affairs', photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80' }
];

export default function StaffProfile() {
    const { id } = useParams();
    const staff = staffList.find((s) => String(s.id) === id);

    if (!staff) {
        return (
            <div className="container pce-section text-center">
                <h3>Staff Profile Not Found</h3>
                <Link to="/staff" className="btn btn-pce-primary mt-3">Back to Staff</Link>
            </div>
        );
    }

    return (
        <>
            <PageHeader title={staff.name} subtitle={`${staff.role} · ${staff.department}`} breadcrumb={<><Link to="/" className="text-white text-decoration-none">Home</Link><span className="mx-2">/</span><Link to="/staff" className="text-white text-decoration-none">Staff</Link><span className="mx-2">/</span><span>Profile</span></>} />

            <section className="pce-section pce-bg-white">
                <div className="container" style={{ maxWidth: 820 }}>
                    <div className="row g-4 align-items-start">
                        <div className="col-md-4">
                            <div className="pce-media-block" style={{ minHeight: 220, borderRadius: '50%' }}>Photo</div>
                        </div>
                        <div className="col-md-8">
                            <div className="pce-tag">{staff.category}</div>
                            <h3 className="mb-1">{staff.name}</h3>
                            <p className="mb-3" style={{ color: 'var(--pce-gold)' }}>{staff.role}</p>
                            <p className="pce-text-muted">
                                {staff.name} serves in the {staff.department} at Providence International College of Education.
                                Replace this placeholder biography with the staff member's qualifications, experience and areas
                                of specialization.
                            </p>
                            <Link to="/staff" className="fw-semibold" style={{ color: 'var(--pce-blue)' }}>&larr; Back to Staff Directory</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}