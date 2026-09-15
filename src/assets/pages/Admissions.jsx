import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';

const programmeCategories = [
    {
        name: 'Undergraduate Programmes (NCE)',
        count: 12,
        badge: '3-Year Full Time',
        desc: 'National Certificate in Education across Sciences, Arts, Languages, and Vocational Studies.'
    },
    {
        name: 'Early Childhood & Primary Education',
        count: 2,
        badge: 'Specialized NCE',
        desc: 'Foundational child development and multi-disciplinary primary teaching methods.'
    },
    {
        name: 'Academic & Professional Development',
        count: 2,
        badge: '1-Year Fast Track',
        desc: 'Post-NCE Diploma and Professional Diploma in Education (PDE) for teaching mastery.'
    }
];

const admissionsData = {
    generalRequirements: [
        "Five (5) O'Level credit passes including English Language and Mathematics at not more than two (2) sittings in SSCE/WAEC/NECO/NABTEB.",
        "Minimum acceptable score in the Joint Admissions and Matriculation Board (JAMB) UTME where applicable.",
        "Duly completed Providence International College of Education online application form.",
        "Recent passport photograph with a clean, neutral background.",
        "Valid Birth Certificate or official Declaration of Age.",
        "State/Local Government Area of Origin identification letter."
    ],
    schoolRequirements: [
        { school: 'School of Science Education', req: 'Credits must include Mathematics, primary subject (e.g. Computer Science/Biology), and Physics or Chemistry.' },
        { school: 'School of Languages', req: 'Credit in English Language is mandatory. Specific language majors require credit in that language (Yoruba, French, Arabic).' },
        { school: 'School of Arts & Social Sciences', req: 'Credits must include at least two humanities/social science subjects (Government, Economics, CRS/IRS, History).' },
        { school: 'School of Vocational & Technical Ed.', req: 'Credits must include relevant technical, commercial, or agricultural subjects (Agric Science, Accounting, Fine Arts).' },
        { school: 'School of Early Childhood & Primary Ed.', req: 'General entry rules apply. Credit in any Science subject or Fine Arts is an added advantage.' }
    ],
    applicationSteps: [
        {
            step: '01',
            title: 'Portal Registration',
            desc: 'Create an applicant account on the official portal with your valid email and telephone number.'
        },
        {
            step: '02',
            title: 'Complete Form',
            desc: 'Fill in accurate personal details, academic qualifications, and select your preferred NCE programme.'
        },
        {
            step: '03',
            title: 'Document Upload',
            desc: 'Scan and upload your O’Level results, JAMB slip, birth certificate, and passport photographs.'
        },
        {
            step: '04',
            title: 'Fee Payment & Screening',
            desc: 'Pay the non-refundable application fee securely online and schedule your physical or virtual screening.'
        }
    ],
    importantDates: [
        { label: 'Application Opens', value: 'January 15', status: 'Active' },
        { label: 'Application Closes', value: 'August 31', status: 'Upcoming' },
        { label: 'Screening & Interview', value: 'September 10 - 20', status: 'Scheduled' },
        { label: 'Orientation & Resumption', value: 'October 15', status: 'Scheduled' }
    ],
    faqs: [
        {
            q: 'Can I apply with awaiting O’Level results?',
            a: 'Yes, awaiting-result candidates can apply, provided the results are uploaded prior to the final matriculation screening.'
        },
        {
            q: 'Is JAMB UTME compulsory for all NCE programmes?',
            a: 'A JAMB score is required for standard full-time NCE admissions, though direct portal screening options exist for specific diploma/certificate pathways.'
        },
        {
            q: 'How long does the admission screening take?',
            a: 'The document verification and brief interview session typically take less than one business day.'
        }
    ]
};

export default function Admissions() {
    const [activeTab, setActiveTab] = useState('general');

    return (
        <>
            <PageHeader
                title="Admissions & Entry Pathways"
                subtitle="Step-by-step guidance on entry requirements, application procedures, and key deadlines for prospective students."
                breadcrumb={<><Link to="/" className="text-white text-decoration-none">Home</Link><span className="mx-2">/</span><span>Admissions</span></>}
            />

            {/* Quick Overview Hero Strip */}
            <section className="py-4 bg-primary text-white border-bottom">
                <div className="container">
                    <div className="row g-3 text-center text-md-start align-items-center">
                        <div className="col-md-8">
                            <span className="badge bg-warning text-dark me-2">Session Open</span>
                            <span className="fw-semibold">Applications are actively ongoing for the upcoming academic session.</span>
                        </div>
                        <div className="col-md-4 text-md-end">
                            <a href="#apply-now" className="btn btn-light text-primary fw-bold btn-sm px-4 rounded-pill shadow-sm">
                                Start Application &rarr;
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="pce-section pce-bg-white py-5">
                <div className="container">
                    <div className="row g-5">
                        {/* Left Content Column */}
                        <div className="col-lg-7">
                            {/* Requirements Tabs Header */}
                            <div className="mb-4">
                                <span className="badge bg-primary-subtle text-primary text-uppercase px-3 py-2 fw-semibold rounded-pill">
                                    Eligibility Criteria
                                </span>
                                <h2 className="h3 mt-2 fw-bold text-dark">Admission Requirements</h2>
                                <p className="text-muted">Ensure you meet both general institutional guidelines and school-specific criteria.</p>
                            </div>

                            {/* Tab Navigation Buttons */}
                            <ul className="nav nav-pills mb-4 bg-light p-1 rounded-3 gap-2">
                                <li className="nav-item flex-fill">
                                    <button
                                        className={`nav-link w-100 fw-semibold ${activeTab === 'general' ? 'active shadow-sm' : 'text-secondary'}`}
                                        onClick={() => setActiveTab('general')}
                                    >
                                        General Requirements
                                    </button>
                                </li>
                                <li className="nav-item flex-fill">
                                    <button
                                        className={`nav-link w-100 fw-semibold ${activeTab === 'schools' ? 'active shadow-sm' : 'text-secondary'}`}
                                        onClick={() => setActiveTab('schools')}
                                    >
                                        School Prerequisites
                                    </button>
                                </li>
                            </ul>

                            {/* Tab Contents */}
                            {activeTab === 'general' ? (
                                <div className="card border-0 shadow-sm rounded-4 p-4 bg-light mb-5">
                                    <ul className="list-unstyled mb-0">
                                        {admissionsData.generalRequirements.map((req, idx) => (
                                            <li key={idx} className="d-flex align-items-start gap-3 mb-3">
                                                <span className="badge bg-success-subtle text-success rounded-circle p-2 fs-6">✓</span>
                                                <span className="text-secondary leading-relaxed">{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <div className="d-flex flex-column gap-3 mb-5">
                                    {admissionsData.schoolRequirements.map((item, idx) => (
                                        <div key={idx} className="p-3 bg-light rounded-3 border-start border-4 border-primary shadow-sm">
                                            <h6 className="fw-bold text-dark mb-1">{item.school}</h6>
                                            <p className="small text-secondary mb-0">{item.req}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Application Process Walkthrough */}
                            <div className="mt-5">
                                <span className="badge bg-primary-subtle text-primary text-uppercase px-3 py-2 fw-semibold rounded-pill">
                                    Application Guide
                                </span>
                                <h2 className="h3 mt-2 fw-bold text-dark mb-4">How to Apply</h2>

                                <div className="row g-3">
                                    {admissionsData.applicationSteps.map((step) => (
                                        <div key={step.step} className="col-md-6">
                                            <div className="card border-0 shadow-sm rounded-4 p-3 h-100 bg-white">
                                                <div className="d-flex align-items-center justify-content-between mb-2">
                                                    <span className="badge bg-primary text-white fw-bold px-2 py-1 fs-6">{step.step}</span>
                                                    <span className="text-muted small">Step</span>
                                                </div>
                                                <h6 className="fw-bold text-dark mb-1">{step.title}</h6>
                                                <p className="small text-muted mb-0">{step.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div className="col-lg-5">
                            {/* Important Dates Widget */}
                            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
                                <div className="d-flex align-items-center gap-2 mb-3">
                                    <span className="fs-5">📅</span>
                                    <h5 className="fw-bold mb-0 text-dark">Important Dates</h5>
                                </div>
                                <div className="d-flex flex-column gap-3">
                                    {admissionsData.importantDates.map((item) => (
                                        <div key={item.label} className="d-flex align-items-center justify-content-between p-2 rounded bg-light">
                                            <div>
                                                <span className="d-block small text-muted">{item.label}</span>
                                                <strong className="text-dark small">{item.value}</strong>
                                            </div>
                                            <span className="badge bg-secondary-subtle text-dark border small">{item.status}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Available Programmes Widget */}
                            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <h5 className="fw-bold mb-0 text-dark">Programmes Breakdown</h5>
                                    <span className="badge bg-info-subtle text-info fw-semibold">2026/2027</span>
                                </div>
                                <div className="d-flex flex-column gap-3 mb-3">
                                    {programmeCategories.map((cat) => (
                                        <div key={cat.name} className="border-bottom pb-2">
                                            <div className="d-flex align-items-center justify-content-between mb-1">
                                                <span className="fw-semibold text-dark small">{cat.name}</span>
                                                <span className="badge bg-light text-dark border">{cat.badge}</span>
                                            </div>
                                            <p className="small text-muted mb-0">{cat.desc}</p>
                                        </div>
                                    ))}
                                </div>
                                <Link to="/programmes" className="btn btn-outline-primary btn-sm w-100 fw-semibold rounded-2">
                                    Explore Full Programmes Catalog &rarr;
                                </Link>
                            </div>

                            {/* Call to Action Box */}
                            <div id="apply-now" className="card border-0 shadow rounded-4 p-4 bg-dark text-white text-center">
                                <span className="fs-2 mb-2">🎓</span>
                                <h5 className="fw-bold text-white mb-2">Ready to Join Us?</h5>
                                <p className="small text-white-50 mb-4">
                                    Take the first step toward a fulfilling teaching career at Providence International College of Education.
                                </p>
                                <a href="/admission" className="btn btn-warning fw-bold text-dark py-2 rounded-3 shadow-sm">
                                    Apply Online Now
                                </a>
                                <span className="small text-white-50 mt-2 d-block" style={{ fontSize: '0.75rem' }}>
                                    Need support? Email info@providencecollege.edu.ng
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-5 bg-light border-top">
                <div className="container">
                    <div className="text-center mb-4">
                        <span className="badge bg-primary-subtle text-primary text-uppercase px-3 py-2 fw-semibold rounded-pill">
                            Have Questions?
                        </span>
                        <h2 className="h3 mt-2 fw-bold text-dark">Admissions FAQs</h2>
                        <p className="text-muted">Quick answers to standard questions from prospective applicants.</p>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="accordion d-flex flex-column gap-3" id="admissionsFaq">
                                {admissionsData.faqs.map((faq, index) => (
                                    <div key={index} className="accordion-item border-0 shadow-sm rounded-3 overflow-hidden">
                                        <h2 className="accordion-header">
                                            <button
                                                className={`accordion-button ${index !== 0 ? 'collapsed' : ''} fw-semibold`}
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#faq-${index}`}
                                            >
                                                {faq.q}
                                            </button>
                                        </h2>
                                        <div
                                            id={`faq-${index}`}
                                            className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                                            data-bs-parent="#admissionsFaq"
                                        >
                                            <div className="accordion-body text-secondary small leading-relaxed bg-white">
                                                {faq.a}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center mt-4">
                                <Link to="/faq" className="btn btn-link text-primary text-decoration-none fw-semibold">
                                    View Complete FAQs Page &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}