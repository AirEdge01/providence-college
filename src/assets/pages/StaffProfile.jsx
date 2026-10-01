import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import { findStaffById } from '../data/staffRegistry';

export default function StaffProfile() {
    const { id } = useParams();
    const staff = findStaffById(id);

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
            <PageHeader title={staff.fullName} subtitle={`${staff.role} · ${staff.department}`} breadcrumb={<><Link to="/" className="text-white text-decoration-none">Home</Link><span className="mx-2">/</span><Link to="/staff" className="text-white text-decoration-none">Staff</Link><span className="mx-2">/</span><span>Profile</span></>} />

            <section className="pce-section pce-bg-white">
                <div className="container" style={{ maxWidth: 820 }}>
                    <div className="row g-4 align-items-start">
                        <div className="col-md-4">
                            <div className="pce-media-block" style={{ minHeight: 220, borderRadius: '50%' }}>
                                <img src={staff.photo} alt={staff.fullName} style={{ width: '100%', borderRadius: '50%' }} />
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="pce-tag">{staff.category}</div>
                            <h3 className="mb-1">{staff.fullName}</h3>
                            <p className="mb-3" style={{ color: 'var(--pce-gold)' }}>{staff.role}</p>
                            <p className="pce-text-muted">
                                {staff.fullName} serves in the {staff.department} at Providence International College of Education.
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