import React, { useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';

const institution = {
    name: 'Providence International College of Education',
    shortName: 'Providence International College of Education',
    address: 'No. 1, Adeojo, Boluwaji, Lagos-Ibadan Expressway, Ibadan, Oyo State, Nigeria',
    phone: '+234 800 000 0000',
    email: 'info@providencecollege.edu.ng',
    social: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
        youtube: '#'
    }
};

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate submission delay
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
            setForm({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' });
        }, 1000);
    };

    return (
        <>
            <PageHeader
                title="Contact Us"
                subtitle="Get in touch with Providence International College of Education for admissions, campus visits, or academic enquiries."
                breadcrumb="Home / Contact"
            />

            <section className="pce-section pce-bg-white py-5">
                <div className="container">
                    {/* Top Quick Contact Cards */}
                    <div className="row g-4 mb-5">
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm p-4 rounded-4 bg-light">
                                <div className="d-flex align-items-center gap-3">
                                    <span className="fs-2">📍</span>
                                    <div>
                                        <h6 className="fw-bold mb-1 text-dark">Campus Address</h6>
                                        <p className="small text-secondary mb-0">{institution.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm p-4 rounded-4 bg-light">
                                <div className="d-flex align-items-center gap-3">
                                    <span className="fs-2">📞</span>
                                    <div>
                                        <h6 className="fw-bold mb-1 text-dark">Phone Lines</h6>
                                        <p className="small text-secondary mb-0">{institution.phone}</p>
                                        <span className="small text-muted">Mon - Fri: 8:00 AM - 4:00 PM</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm p-4 rounded-4 bg-light">
                                <div className="d-flex align-items-center gap-3">
                                    <span className="fs-2">✉️</span>
                                    <div>
                                        <h6 className="fw-bold mb-1 text-dark">Email Enquiries</h6>
                                        <p className="small text-secondary mb-0">{institution.email}</p>
                                        <span className="small text-muted">24/7 Digital Support</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row g-5">
                        {/* Form Section */}
                        <div className="col-lg-7">
                            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
                                <div className="mb-4">
                                    <span className="badge bg-primary-subtle text-primary text-uppercase px-3 py-2 fw-semibold rounded-pill">
                                        Send a Message
                                    </span>
                                    <h3 className="h4 fw-bold mt-2 text-dark">We’d love to hear from you</h3>
                                    <p className="text-secondary small">Fill out the form below and our administrative team will respond within 24 hours.</p>
                                </div>

                                {submitted && (
                                    <div className="alert alert-success alert-dismissible fade show border-0 shadow-sm rounded-3 mb-4" role="alert">
                                        <strong>Message Sent!</strong> Thank you for reaching out to Providence International College of Education. We will get back to you shortly.
                                        <button type="button" className="btn-close" onClick={() => setSubmitted(false)}></button>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label small fw-semibold text-dark">Full Name *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control bg-light border-0 py-2 px-3 rounded-3"
                                                placeholder="John Doe"
                                                value={form.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label small fw-semibold text-dark">Email Address *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control bg-light border-0 py-2 px-3 rounded-3"
                                                placeholder="john@example.com"
                                                value={form.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label small fw-semibold text-dark">Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                className="form-control bg-light border-0 py-2 px-3 rounded-3"
                                                placeholder="+234..."
                                                value={form.phone}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label small fw-semibold text-dark">Subject</label>
                                            <select
                                                name="subject"
                                                className="form-select bg-light border-0 py-2 px-3 rounded-3"
                                                value={form.subject}
                                                onChange={handleChange}
                                            >
                                                <option value="General Enquiry">General Enquiry</option>
                                                <option value="Admissions">Admissions & Entry</option>
                                                <option value="Faculties & Programmes">Faculties & Programmes</option>
                                                <option value="Proprietor Office">Proprietor's Office</option>
                                            </select>
                                        </div>

                                        <div className="col-12">
                                            <label className="form-label small fw-semibold text-dark">Message *</label>
                                            <textarea
                                                name="message"
                                                className="form-control bg-light border-0 py-2 px-3 rounded-3"
                                                rows="5"
                                                placeholder="Type your message here..."
                                                value={form.message}
                                                onChange={handleChange}
                                                required
                                            ></textarea>
                                        </div>

                                        <div className="col-12 mt-4">
                                            <button
                                                type="submit"
                                                className="btn btn-primary fw-bold px-4 py-2 rounded-3 w-100 w-md-auto"
                                                disabled={loading}
                                            >
                                                {loading ? 'Sending...' : 'Send Message'}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Sidebar / Social Links */}
                        <div className="col-lg-5">
                            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-dark text-white mb-4">
                                <h5 className="fw-bold text-white mb-3">Connect With Us</h5>
                                <p className="small text-white-50 mb-4">
                                    Stay updated with official college announcements, campus news, and matriculation events through our social media channels.
                                </p>

                                <div className="d-flex flex-column gap-3">
                                    <a href={institution.social.facebook} className="d-flex align-items-center gap-3 text-white text-decoration-none bg-secondary bg-opacity-25 p-3 rounded-3 transition-all">
                                        <span className="badge bg-primary p-2">FB</span>
                                        <span className="fw-semibold small">Facebook Page</span>
                                    </a>
                                    <a href={institution.social.twitter} className="d-flex align-items-center gap-3 text-white text-decoration-none bg-secondary bg-opacity-25 p-3 rounded-3 transition-all">
                                        <span className="badge bg-dark border p-2">X</span>
                                        <span className="fw-semibold small">Twitter / X</span>
                                    </a>
                                    <a href={institution.social.instagram} className="d-flex align-items-center gap-3 text-white text-decoration-none bg-secondary bg-opacity-25 p-3 rounded-3 transition-all">
                                        <span className="badge bg-danger p-2">IG</span>
                                        <span className="fw-semibold small">Instagram Handle</span>
                                    </a>
                                    <a href={institution.social.youtube} className="d-flex align-items-center gap-3 text-white text-decoration-none bg-secondary bg-opacity-25 p-3 rounded-3 transition-all">
                                        <span className="badge bg-danger p-2">YT</span>
                                        <span className="fw-semibold small">YouTube Channel</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Map Section */}
                    <div className="mt-5">
                        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                            <div className="card-header bg-white border-0 p-4">
                                <h5 className="fw-bold mb-0 text-dark">Find Our Campus</h5>
                                <p className="small text-muted mb-0">{institution.address}</p>
                            </div>
                            <div className="ratio ratio-21x9" style={{ minHeight: '350px' }}>
                                <iframe
                                    title="Providence College Location"
                                    src="https://maps.google.com/maps?q=Adeojo%20Boluwaji%20Lagos%20Ibadan%20Expressway%20Ibadan&t=&z=14&ie=UTF8&iwloc=&output=embed"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}