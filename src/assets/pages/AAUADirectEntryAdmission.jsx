import React, { useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import degreeCourses from '../data/degreeCourses.js';
import { PaymentReceiptPrint, RegistrationSlipPrint } from './AdmissionPortal.jsx';

const DIRECT_ENTRY_FEE = 40000;

export default function AAUADirectEntryAdmission() {
    const [currentStep, setCurrentStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [applicationId, setApplicationId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [processingPayment, setProcessingPayment] = useState(false);
    const [printTarget, setPrintTarget] = useState('');

    const schools = Object.keys(degreeCourses);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        email: '',
        phone: '',
        dob: '',
        gender: 'Male',
        stateOfOrigin: '',
        localGovernment: '',
        address: '',

        paymentStatus: 'Pending',
        paymentReference: '',
        paymentDate: '',

        dePreviousInstitution: '',
        deQualification: 'NCE',
        deFinalCGPA: '',
        dePoints: '',
        deGraduationYear: '',

        faculty: schools[0],
        courseCombination: degreeCourses[schools[0]][0],

        passportPhoto: null,
        birthCert: null,
        deCertificate: null,
        localGovtId: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            const updated = { ...prev, [name]: value };
            if (name === 'faculty') {
                updated.courseCombination = degreeCourses[value][0];
            }
            return updated;
        });
        setErrorMessage('');
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
            setErrorMessage('');
        }
    };

    const handleSimulatedPayment = () => {
        setProcessingPayment(true);
        setErrorMessage('');
        setTimeout(() => {
            const reference = `AAUADE${Date.now()}`;
            setFormData((prev) => ({
                ...prev,
                paymentStatus: 'Paid',
                paymentReference: reference,
                paymentDate: new Date().toLocaleDateString('en GB', { day: '2 digit', month: 'long', year: 'numeric' }),
            }));
            setProcessingPayment(false);
        }, 1200);
    };

    const handlePrintReceipt = () => {
        setPrintTarget('receipt');
        setTimeout(() => window.print(), 150);
    };

    const handlePrintSlip = () => {
        setPrintTarget('slip');
        setTimeout(() => window.print(), 150);
    };

    const validateCurrentStep = () => {
        if (currentStep === 1) {
            if (
                !formData.firstName.trim() ||
                !formData.lastName.trim() ||
                !formData.email.trim() ||
                !formData.phone.trim() ||
                !formData.dob ||
                !formData.gender ||
                !formData.stateOfOrigin.trim() ||
                !formData.localGovernment.trim() ||
                !formData.address.trim()
            ) {
                setErrorMessage('Please complete all line items in the Personal Information section, including Local Government Area.');
                return false;
            }
        }

        // if (currentStep === 2) {
        //     if (formData.paymentStatus !== 'Paid') {
        //         setErrorMessage('Please complete your application fee payment before proceeding.');
        //         return false;
        //     }
        // }

        if (currentStep === 3) {
            if (
                !formData.dePreviousInstitution.trim() ||
                !formData.deQualification ||
                !formData.deFinalCGPA.trim() ||
                !formData.dePoints ||
                !formData.deGraduationYear.trim()
            ) {
                setErrorMessage('Please complete all Direct Entry prior qualification details, including your final CGPA and points.');
                return false;
            }

            const points = Number(formData.dePoints);
            if (points < 12) {
                setErrorMessage('A minimum of 12 points is required to apply for Direct Entry. Your entered points do not meet this requirement.');
                return false;
            }
        }

        if (currentStep === 4) {
            if (!formData.faculty || !formData.courseCombination) {
                setErrorMessage('Please complete School and Course of Study before proceeding.');
                return false;
            }
        }

        setErrorMessage('');
        return true;
    };

    const nextStep = () => {
        if (validateCurrentStep()) {
            if (!completedSteps.includes(currentStep)) {
                setCompletedSteps((prev) => [...prev, currentStep]);
            }
            setCurrentStep((prev) => Math.min(prev + 1, 5));
        }
    };

    const prevStep = () => {
        setErrorMessage('');
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.passportPhoto) { setErrorMessage('Passport photograph is required before submission.'); return; }
        if (!formData.birthCert) { setErrorMessage('Birth Certificate or Declaration of Age is required.'); return; }
        if (!formData.localGovtId) { setErrorMessage('Local Government Identification document is required.'); return; }
        if (!formData.deCertificate) {
            setErrorMessage('You must upload your NCE, ND or HND Certificate or Transcript as evidence of completion.');
            return;
        }

        const generatedId = `AAUA/DE/2026/${Math.floor(1000 + Math.random() * 9000)}`;
        setApplicationId(generatedId);
        setCompletedSteps([1, 2, 3, 4, 5]);
        setIsSubmitted(true);
    };

    const colors = {
        navy: '#0F2C59',
        gold: '#D4AF37',
        lightGold: '#FFFDF0',
        white: '#FFFFFF',
        textMuted: '#64748B',
        border: '#E2E8F0',
        bgLight: '#F8FAFC',
        errorBg: '#FEF2F2',
        errorText: '#DC2626',
        successBg: '#F0FDF4',
        successText: '#15803D',
    };

    const steps = ['Personal Info', 'Application Fee', 'Prior Qualification', 'School and Course', 'Uploads and Submit'];

    return (
        <>
            <style>
                {`
          .admission-card { background: ${colors.white}; border-radius: 16px; box-shadow: 0 10px 30px rgba(15, 44, 89, 0.08); border: 1px solid ${colors.border}; overflow: hidden; }
          .step-pill { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1.25rem; border-radius: 30px; background-color: ${colors.bgLight}; color: ${colors.textMuted}; font-weight: 600; font-size: 0.9rem; transition: all 0.3s ease; }
          .step-pill.active { background-color: ${colors.navy}; color: ${colors.white}; box-shadow: 0 4px 12px rgba(15, 44, 89, 0.2); }
          .step-pill.completed { background-color: ${colors.lightGold}; color: ${colors.navy}; border: 1px solid ${colors.gold}; }
          .step-num { width: 26px; height: 26px; border-radius: 50%; background-color: rgba(255, 255, 255, 0.2); display: flex; align-items: center; justify-content: center; font-size: 0.85rem; }
          .step-pill.active .step-num { background-color: ${colors.gold}; color: ${colors.navy}; font-weight: 800; }
          .step-pill.completed .step-num { background-color: #10B981; color: ${colors.white}; font-weight: 800; }
          .form-label-custom { font-weight: 700; color: ${colors.navy}; font-size: 0.9rem; margin-bottom: 0.4rem; }
          .form-input-custom { width: 100%; padding: 0.8rem 1rem; border: 1.5px solid ${colors.border}; border-radius: 8px; font-size: 0.95rem; transition: all 0.25s ease; outline: none; background-color: ${colors.white}; }
          .form-input-custom:focus { border-color: ${colors.gold}; box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.15); }
          .btn-gold { background-color: ${colors.gold}; color: ${colors.navy}; font-weight: 700; padding: 0.8rem 2rem; border-radius: 8px; border: none; cursor: pointer; transition: all 0.25s ease; }
          .btn-gold:hover { background-color: #e5bd3c; transform: translateY(-2px); }
          .btn-gold:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
          .btn-outline-navy { background-color: transparent; color: ${colors.navy}; font-weight: 700; padding: 0.8rem 2rem; border-radius: 8px; border: 2px solid ${colors.navy}; cursor: pointer; transition: all 0.25s ease; }
          .btn-outline-navy:hover { background-color: ${colors.navy}; color: ${colors.white}; }
          .file-upload-box { border: 2px dashed ${colors.gold}; border-radius: 12px; background-color: ${colors.lightGold}; padding: 1.25rem; text-align: center; transition: all 0.25s ease; }
          .file-upload-box.uploaded { border-color: #10B981; background-color: #F0FDF4; }
          .file-preview-img { width: 90px; height: 90px; object-fit: cover; border-radius: 50%; border: 3px solid ${colors.gold}; margin: 0 auto 0.75rem auto; display: block; }
          .print-only { display: none; }
          @media print {
            .no-print-page { display: none !important; }
            .print-only { display: block !important; }
          }
        `}
            </style>

            <div className="no-print-page">
                <PageHeader
                    title="Adekunle Ajasin University of Education, Akungba Degree Programme, Direct Entry"
                    
                    subtitle="Sandwich Degree Programme, in affiliation with Providence International College of Education, for candidates entering at 200L with a prior NCE, ND or HND qualification. Complete every required line item to register your application for the 2026/2027 academic session."
                    breadcrumb="Home / Admission Portal / AAUA Degree Programme / Direct Entry"
                />
                <section className="pce-section pce-bg-white py-5">
                    <div className="container" style={{ maxWidth: '1000px', }}>

                        <div
                            className="p-4 mb-4 rounded-4 d-flex align-items-center justify-content-between flex-wrap gap-3"
                            style={{ backgroundColor: colors.navy, color: colors.white, borderLeft: `6px solid ${colors.gold}` }}
                        >
                            <div>
                                <h5 style={{ fontWeight: 800, color: colors.gold, margin: 0 }}>
                                    2026/2027 AAUA Sandwich Degree Programme, Direct Entry Application
                                </h5>
                                <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.95rem', color: '#F1F5F9', fontWeight: 500, lineHeight: 1.6 }}>
                                    Adekunle Ajasin University of Education, Akungba, in affiliation with Providence International College of Education.
                                    Academic structure runs on Contact Sessions rather than standard semesters. Direct Entry candidates begin at 200L.
                                </p>
                            </div>
                            <div>
                                <span className="badge bg-warning text-dark px-3 py-2 fw-bold">
                                    Minimum Requirement: 12 Points
                                </span>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                            {steps.map((label, i) => {
                                const stepNum = i + 1;
                                return (
                                    <div key={label} className={`step-pill ${currentStep === stepNum ? 'active' : completedSteps.includes(stepNum) ? 'completed' : ''}`}>
                                        <div className="step-num">{completedSteps.includes(stepNum) ? 'Done' : stepNum}</div>
                                        <span>{label}</span>
                                    </div>
                                );
                            })}
                        </div>

                        {errorMessage && (
                            <div
                                className="p-3 mb-4 rounded-3 d-flex align-items-center gap-2"
                                style={{ backgroundColor: colors.errorBg, color: colors.errorText, border: `1px solid ${colors.errorText}`, fontWeight: 600 }}
                            >
                                <span>Notice:</span>
                                <span>{errorMessage}</span>
                            </div>
                        )}

                        {!isSubmitted ? (
                            <div className="admission-card p-4 p-md-5">
                                <form onSubmit={handleSubmit}>

                                    {currentStep === 1 && (
                                        <div>
                                            <h4 className="mb-4" style={{ color: colors.navy, fontWeight: 800 }}>Step 1: Personal Information</h4>
                                            <div className="row g-3">
                                                <div className="col-md-4">
                                                    <label className="form-label-custom">First Name *</label>
                                                    <input type="text" name="firstName" className="form-input-custom" placeholder="e.g. John" value={formData.firstName} onChange={handleInputChange} />
                                                </div>
                                                <div className="col-md-4">
                                                    <label className="form-label-custom">Middle Name</label>
                                                    <input type="text" name="middleName" className="form-input-custom" placeholder="e.g. Babatunde" value={formData.middleName} onChange={handleInputChange} />
                                                </div>
                                                <div className="col-md-4">
                                                    <label className="form-label-custom">Last Name / Surname *</label>
                                                    <input type="text" name="lastName" className="form-input-custom" placeholder="e.g. Adebayo" value={formData.lastName} onChange={handleInputChange} />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label-custom">Email Address *</label>
                                                    <input type="email" name="email" className="form-input-custom" placeholder="applicant@example.com" value={formData.email} onChange={handleInputChange} />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label-custom">Phone Number *</label>
                                                    <input type="tel" name="phone" className="form-input-custom" placeholder="+234 800 000 0000" value={formData.phone} onChange={handleInputChange} />
                                                </div>
                                                <div className="col-md-3">
                                                    <label className="form-label-custom">Date of Birth *</label>
                                                    <input type="date" name="dob" className="form-input-custom" value={formData.dob} onChange={handleInputChange} />
                                                </div>
                                                <div className="col-md-3">
                                                    <label className="form-label-custom">Gender *</label>
                                                    <select name="gender" className="form-input-custom" value={formData.gender} onChange={handleInputChange}>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-3">
                                                    <label className="form-label-custom">State of Origin *</label>
                                                    <input type="text" name="stateOfOrigin" className="form-input-custom" placeholder="e.g. Ondo State" value={formData.stateOfOrigin} onChange={handleInputChange} />
                                                </div>
                                                <div className="col-md-3">
                                                    <label className="form-label-custom">Local Government Area *</label>
                                                    <input type="text" name="localGovernment" className="form-input-custom" placeholder="e.g. Akoko South West" value={formData.localGovernment} onChange={handleInputChange} />
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label-custom">Residential Address *</label>
                                                    <textarea name="address" rows="2" className="form-input-custom" placeholder="Enter residential address" value={formData.address} onChange={handleInputChange}></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {currentStep === 2 && (
                                        <div>
                                            <h4 className="mb-4" style={{ color: colors.navy, fontWeight: 800 }}>Step 2: Application Fee Payment</h4>
                                            <div className="p-4 rounded-3 mb-4" style={{ backgroundColor: colors.bgLight, border: `1px solid ${colors.border}` }}>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                                                    <span style={{ color: colors.textMuted, fontSize: 14 }}>Direct Entry Application Fee</span>
                                                    <span style={{ color: colors.navy, fontWeight: 800, fontSize: 22 }}>
                                                        ₦{DIRECT_ENTRY_FEE.toLocaleString()}
                                                    </span>
                                                </div>

                                                {formData.paymentStatus === 'Paid' ? (
                                                    <div>
                                                        <div
                                                            className="p-3 rounded-3 d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3"
                                                            style={{ backgroundColor: colors.successBg, color: colors.successText, fontWeight: 700, border: `1px solid #10B981` }}
                                                        >
                                                            <span>Payment Confirmed</span>
                                                            <span style={{ fontFamily: 'monospace' }}>{formData.paymentReference}</span>
                                                        </div>
                                                        <button type="button" className="btn-outline-navy" onClick={handlePrintReceipt} style={{ width: '100%' }}>
                                                            Print Payment Receipt
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        className="btn-gold"
                                                        onClick={handleSimulatedPayment}
                                                        disabled={processingPayment}
                                                        style={{ width: '100%' }}
                                                    >
                                                        {processingPayment ? 'Processing payment' : `Pay ₦${DIRECT_ENTRY_FEE.toLocaleString()} Now`}
                                                    </button>
                                                )}
                                            </div>
                                            <p className="small text-muted mb-0">
                                                You will not be able to continue your application until payment is confirmed.
                                            </p>
                                        </div>
                                    )}

                                    {currentStep === 3 && (
                                        <div>
                                            <h4 className="mb-4" style={{ color: colors.navy, fontWeight: 800 }}>Step 3: Direct Entry Qualification Details</h4>
                                            <div className="p-3 p-md-4 rounded-3 border" style={{ backgroundColor: colors.lightGold }}>
                                                <p className="small mb-3" style={{ color: colors.textMuted }}>
                                                    Direct Entry applicants must have completed a Nigeria Certificate in Education, National Diploma or Higher National Diploma, with a minimum of 12 points, before applying.
                                                </p>
                                                <div className="row g-3">
                                                    <div className="col-md-6">
                                                        <label className="form-label-custom">Previous Institution Attended *</label>
                                                        <input type="text" name="dePreviousInstitution" className="form-input-custom" placeholder="e.g. Providence International College of Education" value={formData.dePreviousInstitution} onChange={handleInputChange} />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label-custom">Qualification Obtained *</label>
                                                        <select name="deQualification" className="form-input-custom" value={formData.deQualification} onChange={handleInputChange}>
                                                            <option value="NCE">NCE National Certificate in Education</option>
                                                            <option value="ND">ND National Diploma</option>
                                                            <option value="HND">HND Higher National Diploma</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="form-label-custom">Final CGPA *</label>
                                                        <input type="text" name="deFinalCGPA" className="form-input-custom" placeholder="e.g. 3.40" value={formData.deFinalCGPA} onChange={handleInputChange} />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="form-label-custom">Points Obtained *</label>
                                                        <input type="number" name="dePoints" className="form-input-custom" placeholder="Min: 12" value={formData.dePoints} onChange={handleInputChange} />
                                                        <span className="small text-muted d-block mt-1">Required minimum: <strong>12 points</strong></span>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="form-label-custom">Year of Graduation *</label>
                                                        <input type="number" name="deGraduationYear" className="form-input-custom" placeholder="e.g. 2025" value={formData.deGraduationYear} onChange={handleInputChange} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {currentStep === 4 && (
                                        <div>
                                            <h4 className="mb-4" style={{ color: colors.navy, fontWeight: 800 }}>Step 4: School and Course of Study</h4>
                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <label className="form-label-custom">School / Faculty *</label>
                                                    <select name="faculty" className="form-input-custom" value={formData.faculty} onChange={handleInputChange}>
                                                        {schools.map((f) => <option key={f} value={f}>{f}</option>)}
                                                    </select>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label-custom">Course of Study *</label>
                                                    <select name="courseCombination" className="form-input-custom" value={formData.courseCombination} onChange={handleInputChange}>
                                                        {degreeCourses[formData.faculty].map((c) => <option key={c} value={c}>{c}</option>)}
                                                    </select>
                                                </div>
                                                <div className="col-12">
                                                    <div className="p-3 rounded-3" style={{ background: colors.bgLight, fontSize: 13.5, color: colors.textMuted }}>
                                                        Direct Entry candidates begin at 200L and progress from 200L to 300L to 400L to 500L.
                                                        Each student studies one course, for example Biology Education or Physics Education, and does not combine two subjects.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {currentStep === 5 && (
                                        <div>
                                            <h4 className="mb-4" style={{ color: colors.navy, fontWeight: 800 }}>Step 5: Upload Mandatory Credentials</h4>
                                            <div className="row g-3 mb-4">
                                                <div className="col-md-6">
                                                    <div className={`file-upload-box ${formData.passportPhoto ? 'uploaded' : ''}`}>
                                                        {formData.passportPhoto ? (
                                                            <img src={URL.createObjectURL(formData.passportPhoto)} alt="Passport Preview" className="file-preview-img" />
                                                        ) : (
                                                            <div className="fs-6 text-muted mb-1">Passport Photograph</div>
                                                        )}
                                                        <h6 style={{ color: colors.navy, fontWeight: 700 }}>Passport Photograph *</h6>
                                                        <p className="small text-muted mb-2">Clear red or white background, max 2MB</p>
                                                        <input type="file" name="passportPhoto" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} id="passport-upload-aaua-de" />
                                                        <label htmlFor="passport-upload-aaua-de" className="btn btn-sm btn-outline-dark">
                                                            {formData.passportPhoto ? `Uploaded: ${formData.passportPhoto.name}` : 'Upload Passport'}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className={`file-upload-box ${formData.birthCert ? 'uploaded' : ''}`}>
                                                        <h6 style={{ color: colors.navy, fontWeight: 700 }}>Birth Certificate or Declaration *</h6>
                                                        <p className="small text-muted mb-2">PDF or JPEG format, max 5MB</p>
                                                        <input type="file" name="birthCert" accept=".pdf,image/*" onChange={handleFileChange} style={{ display: 'none' }} id="birth-upload-aaua-de" />
                                                        <label htmlFor="birth-upload-aaua-de" className="btn btn-sm btn-outline-dark">
                                                            {formData.birthCert ? `Uploaded: ${formData.birthCert.name}` : 'Upload Birth Certificate'}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className={`file-upload-box ${formData.localGovtId ? 'uploaded' : ''}`}>
                                                        <h6 style={{ color: colors.navy, fontWeight: 700 }}>Local Government Identification *</h6>
                                                        <p className="small text-muted mb-2">
                                                            A Local Government Identification letter or certificate confirming your Local Government Area. PDF or JPEG format, max 5MB.
                                                        </p>
                                                        <input type="file" name="localGovtId" accept=".pdf,image/*" onChange={handleFileChange} style={{ display: 'none' }} id="lg-upload-aaua-de" />
                                                        <label htmlFor="lg-upload-aaua-de" className="btn btn-sm btn-outline-dark">
                                                            {formData.localGovtId ? `Uploaded: ${formData.localGovtId.name}` : 'Upload Local Government ID'}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className={`file-upload-box ${formData.deCertificate ? 'uploaded' : ''}`}>
                                                        <h6 style={{ color: colors.navy, fontWeight: 700 }}>NCE, ND or HND Certificate or Transcript *</h6>
                                                        <p className="small text-muted mb-2">
                                                            Evidence of completion from a College of Education, Polytechnic, or equivalent institution, showing your final CGPA and points. PDF or JPEG format, max 5MB.
                                                        </p>
                                                        <input type="file" name="deCertificate" accept=".pdf,image/*" onChange={handleFileChange} style={{ display: 'none' }} id="de-cert-upload-aaua" />
                                                        <label htmlFor="de-cert-upload-aaua" className="btn btn-sm btn-outline-dark">
                                                            {formData.deCertificate ? `Uploaded: ${formData.deCertificate.name}` : 'Upload Certificate or Transcript'}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                                        {currentStep > 1 ? (
                                            <button type="button" className="btn-outline-navy" onClick={prevStep}>Back</button>
                                        ) : <div></div>}

                                        {currentStep < 5 ? (
                                            <button type="button" className="btn-gold" onClick={nextStep}>Next Step</button>
                                        ) : (
                                            <button type="submit" className="btn-gold" style={{ backgroundColor: colors.navy, color: colors.gold }}>Complete and Submit</button>
                                        )}
                                    </div>

                                </form>
                            </div>
                        ) : (
                            <div className="admission-card p-5 text-center">
                                <h3 style={{ color: colors.navy, fontWeight: 800 }}>Application Submitted Successfully</h3>
                                <p className="text-muted mb-3" style={{ maxWidth: '600px', margin: '0 auto' }}>
                                    Thank you, <strong>{formData.firstName} {formData.lastName}</strong>. Your Direct Entry application under the AAUA Degree Programme, in affiliation with Providence International College of Education, has been received.
                                </p>
                                <p className="text-muted mb-4" style={{ maxWidth: '600px', margin: '0 auto', fontWeight: 600 }}>
                                    Your admission decision will be sent to your registered email address, {formData.email}, once processing is complete.
                                </p>
                                <div className="p-3 rounded-3 d-inline-block mb-4" style={{ backgroundColor: colors.bgLight, border: `1px solid ${colors.gold}` }}>
                                    <span className="small text-muted d-block">Application Number</span>
                                    <strong style={{ fontSize: '1.4rem', color: colors.navy, letterSpacing: '1px' }}>{applicationId}</strong>
                                </div>
                                <div>
                                    <button className="btn-gold" onClick={handlePrintSlip}>Print Registration Slip</button>
                                </div>
                            </div>
                        )}

                    </div>
                </section>
            </div>

            <div className="print-only">
                {printTarget === 'receipt' && (
                    <PaymentReceiptPrint
                        schoolName="Providence International College of Education"
                        programme="AAUA Degree Programme, Direct Entry"
                        applicantName={`${formData.firstName} ${formData.middleName} ${formData.lastName}`.replace(/\s+/g, ' ').trim()}
                        email={formData.email}
                        phone={formData.phone}
                        amount={DIRECT_ENTRY_FEE}
                        reference={formData.paymentReference}
                        date={formData.paymentDate}
                    />
                )}

                {printTarget === 'slip' && isSubmitted && (
                    <RegistrationSlipPrint
                        schoolName="Providence International College of Education"
                        programme="Adekunle Ajasin University of Education Degree Programme"
                        applicationId={applicationId}
                        formData={formData}
                        entryLabel="Direct Entry Applicant"
                    />
                )}
            </div>
        </>
    );
}