import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';

const events = [
    { id: 1, title: 'Matriculation Ceremony 2026/2027', date: 'October 14, 2026', venue: 'College Main Auditorium', description: 'Formal admission ceremony for newly enrolled students, including oath-taking and matriculation number allocation.' },
    { id: 2, title: 'Annual Career & Teaching Practice Fair', date: 'November 5, 2026', venue: 'College Sports Complex', description: 'An event connecting students with schools and organisations offering teaching practice and career opportunities.' },
    { id: 3, title: 'Founders\' Day Celebration', date: 'December 2, 2026', venue: 'College Main Auditorium', description: 'A celebration marking the founding of the College, featuring alumni, staff and community guests.' }
];

export default function Events() {
    return (
        <>
            <PageHeader
                title="Events"
                subtitle="Upcoming ceremonies, fairs and celebrations at Providence College."
                breadcrumb="Home / Events"
            />

            <section className="pce-section pce-bg-white">
                <div className="container">
                    <div className="row g-4">
                        {events.map((e) => (
                            <div className="col-md-6 col-lg-4" key={e.id}>
                                <div className="pce-card">
                                    <div className="pce-tag">Upcoming</div>
                                    <h6>{e.title}</h6>
                                    <p className="small pce-text-muted mb-1"><strong>Date:</strong> {e.date}</p>
                                    <p className="small pce-text-muted mb-3"><strong>Venue:</strong> {e.venue}</p>
                                    <Link to={`/events/${e.id}`} className="small fw-semibold" style={{ color: 'var(--pce-blue)' }}>Event Details &rarr;</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}