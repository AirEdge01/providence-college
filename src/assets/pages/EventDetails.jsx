import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';

const events = [
    { id: 1, title: 'Matriculation Ceremony 2026/2027', date: 'October 14, 2026', venue: 'College Main Auditorium', description: 'Formal admission ceremony for newly enrolled students, including oath-taking and matriculation number allocation.' },
    { id: 2, title: 'Annual Career & Teaching Practice Fair', date: 'November 5, 2026', venue: 'College Sports Complex', description: 'An event connecting students with schools and organisations offering teaching practice and career opportunities.' },
    { id: 3, title: 'Founders\' Day Celebration', date: 'December 2, 2026', venue: 'College Main Auditorium', description: 'A celebration marking the founding of the College, featuring alumni, staff and community guests.' }
];

export default function EventDetails() {
    const { id } = useParams();
    const event = events.find((e) => String(e.id) === id);

    if (!event) {
        return (
            <div className="container pce-section text-center">
                <h3>Event Not Found</h3>
                <Link to="/events" className="btn btn-pce-primary mt-3">Back to Events</Link>
            </div>
        );
    }

    return (
        <>
            <PageHeader title={event.title} subtitle={`${event.date} · ${event.venue}`} breadcrumb={<><Link to="/" className="text-white text-decoration-none">Home</Link><span className="mx-2">/</span><Link to="/events" className="text-white text-decoration-none">Events</Link><span className="mx-2">/</span><span>Details</span></>} />

            <section className="pce-section pce-bg-white">
                <div className="container" style={{ maxWidth: 820 }}>
                    <div className="pce-media-block mb-4" style={{ minHeight: 260 }}>Event Image</div>
                    <div className="row g-3 mb-4">
                        <div className="col-md-6">
                            <div className="pce-card">
                                <span className="small pce-text-muted d-block">Date</span>
                                <span className="fw-semibold">{event.date}</span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="pce-card">
                                <span className="small pce-text-muted d-block">Venue</span>
                                <span className="fw-semibold">{event.venue}</span>
                            </div>
                        </div>
                    </div>
                    <p className="pce-text-muted">{event.description}</p>
                    <Link to="/events" className="fw-semibold" style={{ color: 'var(--pce-blue)' }}>&larr; Back to All Events</Link>
                </div>
            </section>
        </>
    );
}