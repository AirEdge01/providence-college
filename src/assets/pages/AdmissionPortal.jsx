import React, { useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';

export default function AdmissionPortal() {
    const [currentStep, setCurrentStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [applicationId, setApplicationId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Form State
    const [formData, setFormData] = useState({
        // Step 1: Personal Details
        firstName: '',
        lastName: '',
        middleName: '',
        email: '',
        phone: '',
        dob: '',
        gender: 'Male',
        stateOfOrigin: '',
        address: '',

        // Step 2: Academic Background & JAMB
        qualification: 'SSCE / WAEC / NECO',
        schoolName: '',
        graduationYear: '',
        jambRegNumber: '',
        jambScore: '',

        // DE Details (Conditional for Direct Entry)
        dePreviousSchool: '',
        deQualification: 'NCE',
        deGradePoints: '',
        deGraduationYear: '',

        // Step 3: Programme Selection
        programmeType: 'NCE', // 'NCE' or 'Degree'
        entryMode: 'Full-Time (100L)', // 'Full-Time (100L)' or 'Direct Entry (200L)'
        faculty: 'Early Childhood Care & Primary Education',
        firstChoiceCourse: '',
        secondChoiceCourse: '',

        // Step 4: Document Uploads
        passportPhoto: null,
        oLevelCert: null,
        jambResult: null,
        birthCert: null,
        deTranscript: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            const updated = { ...prev, [name]: value };

            // Reset entryMode if programmeType changes
            if (name === 'programmeType') {
                if (value === 'NCE') {
                    updated.entryMode = 'Full-Time';
                } else {
                    updated.entryMode = 'Full-Time (100L)';
                }
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

    // Step Validation Logic
    const validateCurrentStep = () => {
        // STEP 1: Personal Information Validation
        if (currentStep === 1) {
            if (
                !formData.firstName.trim() ||
                !formData.lastName.trim() ||
                !formData.email.trim() ||
                !formData.phone.trim() ||
                !formData.dob ||
                !formData.gender ||
                !formData.stateOfOrigin.trim() ||
                !formData.address.trim()
            ) {
                setErrorMessage('Please complete all line items in the Personal Information section.');
                return false;
            }
        }

        // STEP 2: Academic History & JAMB Score Enforcement
        if (currentStep === 2) {
            if (
                !formData.qualification ||
                !formData.schoolName.trim() ||
                !formData.graduationYear.trim() ||
                !formData.jambRegNumber.trim() ||
                !formData.jambScore
            ) {
                setErrorMessage('Please fill in all required secondary school and JAMB details.');
                return false;
            }

            const score = Number(formData.jambScore);

            // NCE Cut-off Validation (Minimum 150)
            if (formData.programmeType === 'NCE' && score < 150) {
                setErrorMessage('JAMB score cut-off for NCE programmes is 150. Your score is below 150, so you cannot proceed.');
                return false;
            }

            // Degree Cut-off Validation (Minimum 180)
            if (formData.programmeType === 'Degree' && score < 180) {
                setErrorMessage('JAMB score cut-off for Degree programmes is 180. Your score is below 180, so you cannot proceed.');
                return false;
            }

            // DE Specific Validation
            if (formData.programmeType === 'Degree' && formData.entryMode === 'Direct Entry (200L)') {
                if (
                    !formData.dePreviousSchool.trim() ||
                    !formData.deQualification ||
                    !formData.deGradePoints.trim() ||
                    !formData.deGraduationYear.trim()
                ) {
                    setErrorMessage('Please complete all Direct Entry prior qualification details.');
                    return false;
                }
            }
        }

        // STEP 3: Programme Choice Validation
        if (currentStep === 3) {
            if (
                !formData.programmeType ||
                !formData.entryMode ||
                !formData.faculty ||
                !formData.firstChoiceCourse.trim() ||
                !formData.secondChoiceCourse.trim()
            ) {
                setErrorMessage('Please complete all fields in Programme Choice before proceeding.');
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
            setCurrentStep((prev) => Math.min(prev + 1, 4));
        }
    };

    const prevStep = () => {
        setErrorMessage('');
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.passportPhoto) {
            setErrorMessage('Passport photograph is required before submission.');
            return;
        }
        if (!formData.oLevelCert) {
            setErrorMessage('O’Level Result document is required before submission.');
            return;
        }
        if (!formData.birthCert) {
            setErrorMessage('Birth Certificate or Declaration of Age is required.');
            return;
        }
        if (!formData.jambResult) {
            setErrorMessage('JAMB Result Slip is mandatory for all applicants.');
            return;
        }
        if (formData.entryMode === 'Direct Entry (200L)' && !formData.deTranscript) {
            setErrorMessage('Direct Entry applicants must upload an NCE/ND/HND Transcript or Certificate.');
            return;
        }

        const generatedId = `PICE-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        setApplicationId(generatedId);
        setCompletedSteps([1, 2, 3, 4]);
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
        errorText: '#DC2626'
    };

    return (
        <>
            <style>
                {`
          .admission-card {
            background: ${colors.white};
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(15, 44, 89, 0.08);
            border: 1px solid ${colors.border};
            overflow: hidden;
          }

          .step-pill {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem 1.25rem;
            border-radius: 30px;
            background-color: ${colors.bgLight};
            color: ${colors.textMuted};
            font-weight: 600;
            font-size: 0.9rem;
            transition: all 0.3s ease;
          }
          .step-pill.active {
            background-color: ${colors.navy};
            color: ${colors.white};
            box-shadow: 0 4px 12px rgba(15, 44, 89, 0.2);
          }
          .step-pill.completed {
            background-color: ${colors.lightGold};
            color: ${colors.navy};
            border: 1px solid ${colors.gold};
          }

          .step-num {
            width: 26px;
            height: 26px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.85rem;
          }
          .step-pill.active .step-num {
            background-color: ${colors.gold};
            color: ${colors.navy};
            font-weight: 800;
          }
          .step-pill.completed .step-num {
            background-color: #10B981;
            color: ${colors.white};
            font-weight: 800;
          }

          .form-label-custom {
            font-weight: 700;
            color: ${colors.navy};
            font-size: 0.9rem;
            margin-bottom: 0.4rem;
          }

          .form-input-custom {
            width: 100%;
            padding: 0.8rem 1rem;
            border: 1.5px solid ${colors.border};
            border-radius: 8px;
            font-size: 0.95rem;
            transition: all 0.25s ease;
            outline: none;
            background-color: ${colors.white};
          }
          .form-input-custom:focus {
            border-color: ${colors.gold};
            box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.15);
          }

          .btn-gold {
            background-color: ${colors.gold};
            color: ${colors.navy};
            font-weight: 700;
            padding: 0.8rem 2rem;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            transition: all 0.25s ease;
          }
          .btn-gold:hover {
            background-color: #e5bd3c;
            transform: translateY(-2px);
          }

          .btn-outline-navy {
            background-color: transparent;
            color: ${colors.navy};
            font-weight: 700;
            padding: 0.8rem 2rem;
            border-radius: 8px;
            border: 2px solid ${colors.navy};
            cursor: pointer;
            transition: all 0.25s ease;
          }
          .btn-outline-navy:hover {
            background-color: ${colors.navy};
            color: ${colors.white};
          }

          .file-upload-box {
            border: 2px dashed ${colors.gold};
            border-radius: 12px;
            background-color: ${colors.lightGold};
            padding: 1.25rem;
            text-align: center;
            transition: all 0.25s ease;
          }
          .file-upload-box.uploaded {
            border-color: #10B981;
            background-color: #F0FDF4;
          }

          .file-preview-img {
            width: 90px;
            height: 90px;
            object-fit: cover;
            border-radius: 50%;
            border: 3px solid ${colors.gold};
            margin: 0 auto 0.75rem auto;
            display: block;
          }
        `}
            </style>
        
            <PageHeader
                title="Admission Application Portal"
                subtitle="Complete every required line item to register your application for the 2026/2027 academic session."
                breadcrumb="Home / Admission Portal"
            />

            <section className="pce-section pce-bg-white py-5">
                <div className="container" style={{ maxWidth: '1000px' }}>

                    {/* Header Banner */}
                    <div
                        className="p-4 mb-4 rounded-4 d-flex align-items-center justify-content-between flex-wrap gap-3"
                        style={{
                            backgroundColor: colors.navy,
                            color: colors.white,
                            borderLeft: `6px solid ${colors.gold}`
                        }}
                    >
                        <div>
                            <h5 style={{ fontWeight: 800, color: colors.gold, margin: 0 }}>
                                2026/2027 Academic Session Application
                            </h5>
                            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', color: '#CBD5E1' }}>
                                All lines in each section must be completed before advancing to the next section.
                            </p>
                        </div>
                        <div>
                            <span className="badge bg-warning text-dark px-3 py-2 fw-bold">
                                Cut-off: NCE (150) | Degree (180)
                            </span>
                        </div>
                    </div>

                    {/* Step Progress Tracker */}
                    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                        <div className={`step-pill ${currentStep === 1 ? 'active' : completedSteps.includes(1) ? 'completed' : ''}`}>
                            <div className="step-num">{completedSteps.includes(1) ? '✓' : '1'}</div>
                            <span>Personal Info</span>
                        </div>

                        <div className={`step-pill ${currentStep === 2 ? 'active' : completedSteps.includes(2) ? 'completed' : ''}`}>
                            <div className="step-num">{completedSteps.includes(2) ? '✓' : '2'}</div>
                            <span>Academic History</span>
                        </div>

                        <div className={`step-pill ${currentStep === 3 ? 'active' : completedSteps.includes(3) ? 'completed' : ''}`}>
                            <div className="step-num">{completedSteps.includes(3) ? '✓' : '3'}</div>
                            <span>Programme Choice</span>
                        </div>

                        <div className={`step-pill ${currentStep === 4 ? 'active' : completedSteps.includes(4) ? 'completed' : ''}`}>
                            <div className="step-num">{completedSteps.includes(4) ? '✓' : '4'}</div>
                            <span>Uploads & Submit</span>
                        </div>
                    </div>

                    {/* Validation Error Banner */}
                    {errorMessage && (
                        <div
                            className="p-3 mb-4 rounded-3 d-flex align-items-center gap-2"
                            style={{
                                backgroundColor: colors.errorBg,
                                color: colors.errorText,
                                border: `1px solid ${colors.errorText}`,
                                fontWeight: 600
                            }}
                        >
                            <span>⚠️</span>
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    {/* Form Container */}
                    {!isSubmitted ? (
                        <div className="admission-card p-4 p-md-5">
                            <form onSubmit={handleSubmit}>

                                {/* STEP 1: Personal Information */}
                                {currentStep === 1 && (
                                    <div>
                                        <h4 className="mb-4" style={{ color: colors.navy, fontWeight: 800 }}>
                                            Step 1: Personal Information
                                        </h4>
                                        <div className="row g-3">
                                            <div className="col-md-4">
                                                <label className="form-label-custom">First Name *</label>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    className="form-input-custom"
                                                    placeholder="e.g. John"
                                                    value={formData.firstName}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <label className="form-label-custom">Middle Name</label>
                                                <input
                                                    type="text"
                                                    name="middleName"
                                                    className="form-input-custom"
                                                    placeholder="e.g. Babatunde"
                                                    value={formData.middleName}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <label className="form-label-custom">Last Name / Surname *</label>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    className="form-input-custom"
                                                    placeholder="e.g. Adebayo"
                                                    value={formData.lastName}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label-custom">Email Address *</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-input-custom"
                                                    placeholder="applicant@example.com"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label-custom">Phone Number *</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    className="form-input-custom"
                                                    placeholder="+234 800 000 0000"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <label className="form-label-custom">Date of Birth *</label>
                                                <input
                                                    type="date"
                                                    name="dob"
                                                    className="form-input-custom"
                                                    value={formData.dob}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <label className="form-label-custom">Gender *</label>
                                                <select
                                                    name="gender"
                                                    className="form-input-custom"
                                                    value={formData.gender}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                            </div>

                                            <div className="col-md-4">
                                                <label className="form-label-custom">State of Origin *</label>
                                                <input
                                                    type="text"
                                                    name="stateOfOrigin"
                                                    className="form-input-custom"
                                                    placeholder="e.g. Oyo State"
                                                    value={formData.stateOfOrigin}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div className="col-12">
                                                <label className="form-label-custom">Residential Address *</label>
                                                <textarea
                                                    name="address"
                                                    rows="2"
                                                    className="form-input-custom"
                                                    placeholder="Enter residential address"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 2: Academic History & DE Details */}
                                {currentStep === 2 && (
                                    <div>
                                        <h4 className="mb-4" style={{ color: colors.navy, fontWeight: 800 }}>
                                            Step 2: Academic Background & JAMB Details
                                        </h4>

                                        {/* Secondary School */}
                                        <div className="row g-3 mb-4">
                                            <div className="col-md-6">
                                                <label className="form-label-custom">O'Level Qualification *</label>
                                                <select
                                                    name="qualification"
                                                    className="form-input-custom"
                                                    value={formData.qualification}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="SSCE / WAEC / NECO">SSCE / WAEC / NECO</option>
                                                    <option value="NABTEB">NABTEB</option>
                                                    <option value="GCE A-Level">GCE A-Level</option>
                                                </select>
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label-custom">Secondary School Attended *</label>
                                                <input
                                                    type="text"
                                                    name="schoolName"
                                                    className="form-input-custom"
                                                    placeholder="e.g. Government College Ibadan"
                                                    value={formData.schoolName}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <label className="form-label-custom">Graduation Year *</label>
                                                <input
                                                    type="number"
                                                    name="graduationYear"
                                                    className="form-input-custom"
                                                    placeholder="e.g. 2024"
                                                    value={formData.graduationYear}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <label className="form-label-custom">UTME / JAMB Reg Number *</label>
                                                <input
                                                    type="text"
                                                    name="jambRegNumber"
                                                    className="form-input-custom"
                                                    placeholder="202612345678AB"
                                                    value={formData.jambRegNumber}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <label className="form-label-custom">JAMB Score *</label>
                                                <input
                                                    type="number"
                                                    name="jambScore"
                                                    className="form-input-custom"
                                                    placeholder={formData.programmeType === 'NCE' ? 'Min: 150' : 'Min: 180'}
                                                    value={formData.jambScore}
                                                    onChange={handleInputChange}
                                                />
                                                <span className="small text-muted d-block mt-1">
                                                    Required cut-off: <strong>{formData.programmeType === 'NCE' ? '150' : '180'}</strong>
                                                </span>
                                            </div>
                                        </div>

                                        {/* Direct Entry Specific Form Section */}
                                        {formData.programmeType === 'Degree' && formData.entryMode === 'Direct Entry (200L)' && (
                                            <div className="p-3 p-md-4 rounded-3 border mb-3" style={{ backgroundColor: colors.lightGold }}>
                                                <h5 className="mb-3" style={{ color: colors.navy, fontWeight: 800 }}>
                                                    🎓 Direct Entry (DE) Prior Qualification Details
                                                </h5>
                                                <div className="row g-3">
                                                    <div className="col-md-6">
                                                        <label className="form-label-custom">Previous Institution Attended *</label>
                                                        <input
                                                            type="text"
                                                            name="dePreviousSchool"
                                                            className="form-input-custom"
                                                            placeholder="e.g. The Polytechnic Ibadan"
                                                            value={formData.dePreviousSchool}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label className="form-label-custom">Qualification Obtained *</label>
                                                        <select
                                                            name="deQualification"
                                                            className="form-input-custom"
                                                            value={formData.deQualification}
                                                            onChange={handleInputChange}
                                                        >
                                                            <option value="NCE">NCE (National Certificate in Education)</option>
                                                            <option value="ND">ND (National Diploma)</option>
                                                            <option value="HND">HND (Higher National Diploma)</option>
                                                            <option value="IJMB / JUPEB">IJMB / JUPEB</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label className="form-label-custom">Grade / CGPA / Points Obtained *</label>
                                                        <input
                                                            type="text"
                                                            name="deGradePoints"
                                                            className="form-input-custom"
                                                            placeholder="e.g. Upper Credit / 3.40 CGPA / 11 Points"
                                                            value={formData.deGradePoints}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label className="form-label-custom">Year of Graduation *</label>
                                                        <input
                                                            type="number"
                                                            name="deGraduationYear"
                                                            className="form-input-custom"
                                                            placeholder="e.g. 2025"
                                                            value={formData.deGraduationYear}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* STEP 3: Programme Selection */}
                                {currentStep === 3 && (
                                    <div>
                                        <h4 className="mb-4" style={{ color: colors.navy, fontWeight: 800 }}>
                                            Step 3: Programme & Faculty Choice
                                        </h4>
                                        <div className="row g-3">
                                            {/* Programme Category */}
                                            <div className="col-md-6">
                                                <label className="form-label-custom">Programme Category *</label>
                                                <select
                                                    name="programmeType"
                                                    className="form-input-custom"
                                                    value={formData.programmeType}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="NCE">NCE (Full-Time - Cut-off 150)</option>
                                                    <option value="Degree">Degree Programme (Cut-off 180)</option>
                                                </select>
                                            </div>

                                            {/* Entry Mode */}
                                            <div className="col-md-6">
                                                <label className="form-label-custom">Mode of Entry *</label>
                                                <select
                                                    name="entryMode"
                                                    className="form-input-custom"
                                                    value={formData.entryMode}
                                                    onChange={handleInputChange}
                                                >
                                                    {formData.programmeType === 'NCE' ? (
                                                        <option value="Full-Time">Full-Time (NCE)</option>
                                                    ) : (
                                                        <>
                                                            <option value="Full-Time (100L)">Full-Time Degree (100L UTME)</option>
                                                            <option value="Direct Entry (200L)">Direct Entry Degree (200L DE)</option>
                                                        </>
                                                    )}
                                                </select>
                                            </div>

                                            {/* Faculty */}
                                            <div className="col-md-12">
                                                <label className="form-label-custom">Faculty / School *</label>
                                                <select
                                                    name="faculty"
                                                    className="form-input-custom"
                                                    value={formData.faculty}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="Early Childhood Care & Primary Education">
                                                        Faculty of Early Childhood Care & Primary Education
                                                    </option>
                                                    <option value="Science Education">Faculty of Science Education</option>
                                                    <option value="Arts & Social Sciences">Faculty of Arts and Social Sciences</option>
                                                    <option value="Languages">Faculty of Languages</option>
                                                    <option value="Vocational & Technical">Faculty of Vocational & Technical Education</option>
                                                </select>
                                            </div>

                                            {/* First Choice */}
                                            <div className="col-md-6">
                                                <label className="form-label-custom">First Choice Course *</label>
                                                <input
                                                    type="text"
                                                    name="firstChoiceCourse"
                                                    className="form-input-custom"
                                                    placeholder="e.g. Early Childhood Education"
                                                    value={formData.firstChoiceCourse}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            {/* Second Choice */}
                                            <div className="col-md-6">
                                                <label className="form-label-custom">Second Choice Course *</label>
                                                <input
                                                    type="text"
                                                    name="secondChoiceCourse"
                                                    className="form-input-custom"
                                                    placeholder="e.g. Primary Education Studies"
                                                    value={formData.secondChoiceCourse}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 4: Document Uploads & Passport */}
                                {currentStep === 4 && (
                                    <div>
                                        <h4 className="mb-4" style={{ color: colors.navy, fontWeight: 800 }}>
                                            Step 4: Upload Mandatory Credentials
                                        </h4>

                                        <div className="row g-3 mb-4">
                                            {/* Passport Photo Upload */}
                                            <div className="col-md-6">
                                                <div className={`file-upload-box ${formData.passportPhoto ? 'uploaded' : ''}`}>
                                                    {formData.passportPhoto ? (
                                                        <img
                                                            src={URL.createObjectURL(formData.passportPhoto)}
                                                            alt="Passport Preview"
                                                            className="file-preview-img"
                                                        />
                                                    ) : (
                                                        <div className="fs-1 text-muted mb-1">📷</div>
                                                    )}
                                                    <h6 style={{ color: colors.navy, fontWeight: 700 }}>Passport Photograph *</h6>
                                                    <p className="small text-muted mb-2">Clear red/white background (Max 2MB)</p>
                                                    <input
                                                        type="file"
                                                        name="passportPhoto"
                                                        accept="image/*"
                                                        onChange={handleFileChange}
                                                        style={{ display: 'none' }}
                                                        id="passport-upload"
                                                    />
                                                    <label htmlFor="passport-upload" className="btn btn-sm btn-outline-dark">
                                                        {formData.passportPhoto ? `✓ ${formData.passportPhoto.name}` : 'Upload Passport'}
                                                    </label>
                                                </div>
                                            </div>

                                            {/* O'Level Cert Upload */}
                                            <div className="col-md-6">
                                                <div className={`file-upload-box ${formData.oLevelCert ? 'uploaded' : ''}`}>
                                                    <div className="fs-1 text-muted mb-1">📄</div>
                                                    <h6 style={{ color: colors.navy, fontWeight: 700 }}>O’Level Result (WAEC/NECO) *</h6>
                                                    <p className="small text-muted mb-2">PDF/JPEG format (Max 5MB)</p>
                                                    <input
                                                        type="file"
                                                        name="oLevelCert"
                                                        accept=".pdf,image/*"
                                                        onChange={handleFileChange}
                                                        style={{ display: 'none' }}
                                                        id="olevel-upload"
                                                    />
                                                    <label htmlFor="olevel-upload" className="btn btn-sm btn-outline-dark">
                                                        {formData.oLevelCert ? `✓ ${formData.oLevelCert.name}` : 'Upload Result'}
                                                    </label>
                                                </div>
                                            </div>

                                            {/* Birth Cert Upload */}
                                            <div className="col-md-6">
                                                <div className={`file-upload-box ${formData.birthCert ? 'uploaded' : ''}`}>
                                                    <div className="fs-1 text-muted mb-1">📜</div>
                                                    <h6 style={{ color: colors.navy, fontWeight: 700 }}>Birth Certificate / Declaration *</h6>
                                                    <p className="small text-muted mb-2">PDF/JPEG format (Max 5MB)</p>
                                                    <input
                                                        type="file"
                                                        name="birthCert"
                                                        accept=".pdf,image/*"
                                                        onChange={handleFileChange}
                                                        style={{ display: 'none' }}
                                                        id="birth-upload"
                                                    />
                                                    <label htmlFor="birth-upload" className="btn btn-sm btn-outline-dark">
                                                        {formData.birthCert ? `✓ ${formData.birthCert.name}` : 'Upload Birth Cert'}
                                                    </label>
                                                </div>
                                            </div>

                                            {/* JAMB Result Upload */}
                                            <div className="col-md-6">
                                                <div className={`file-upload-box ${formData.jambResult ? 'uploaded' : ''}`}>
                                                    <div className="fs-1 text-muted mb-1">📋</div>
                                                    <h6 style={{ color: colors.navy, fontWeight: 700 }}>JAMB Official Result Slip *</h6>
                                                    <p className="small text-muted mb-2">PDF/JPEG format (Max 5MB)</p>
                                                    <input
                                                        type="file"
                                                        name="jambResult"
                                                        accept=".pdf,image/*"
                                                        onChange={handleFileChange}
                                                        style={{ display: 'none' }}
                                                        id="jamb-upload"
                                                    />
                                                    <label htmlFor="jamb-upload" className="btn btn-sm btn-outline-dark">
                                                        {formData.jambResult ? `✓ ${formData.jambResult.name}` : 'Upload JAMB Result'}
                                                    </label>
                                                </div>
                                            </div>

                                            {/* Conditional DE Certificate Upload */}
                                            {formData.entryMode === 'Direct Entry (200L)' && (
                                                <div className="col-md-12">
                                                    <div className={`file-upload-box ${formData.deTranscript ? 'uploaded' : ''}`}>
                                                        <div className="fs-1 text-muted mb-1">🎓</div>
                                                        <h6 style={{ color: colors.navy, fontWeight: 700 }}>NCE / ND / HND Certificate or Transcript *</h6>
                                                        <p className="small text-muted mb-2">Required for Direct Entry applicants</p>
                                                        <input
                                                            type="file"
                                                            name="deTranscript"
                                                            accept=".pdf,image/*"
                                                            onChange={handleFileChange}
                                                            style={{ display: 'none' }}
                                                            id="de-upload"
                                                        />
                                                        <label htmlFor="de-upload" className="btn btn-sm btn-outline-dark">
                                                            {formData.deTranscript ? `✓ ${formData.deTranscript.name}` : 'Upload DE Credential'}
                                                        </label>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Navigation Buttons */}
                                <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                                    {currentStep > 1 ? (
                                        <button type="button" className="btn-outline-navy" onClick={prevStep}>
                                            ← Back
                                        </button>
                                    ) : (
                                        <div></div>
                                    )}

                                    {currentStep < 4 ? (
                                        <button type="button" className="btn-gold" onClick={nextStep}>
                                            Next Step →
                                        </button>
                                    ) : (
                                        <button type="submit" className="btn-gold" style={{ backgroundColor: colors.navy, color: colors.gold }}>
                                            Complete & Submit
                                        </button>
                                    )}
                                </div>

                            </form>
                        </div>
                    ) : (
                        /* Final Success Confirmation */
                        <div className="admission-card p-5 text-center">
                            {formData.passportPhoto && (
                                <img
                                    src={URL.createObjectURL(formData.passportPhoto)}
                                    alt="Applicant Passport"
                                    style={{
                                        width: '110px',
                                        height: '110px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        border: `3px solid ${colors.gold}`,
                                        margin: '0 auto 1rem auto',
                                        display: 'block'
                                    }}
                                />
                            )}
                            <h3 style={{ color: colors.navy, fontWeight: 800 }}>Application Submitted Successfully!</h3>
                            <p className="text-muted mb-3" style={{ maxWidth: '600px', margin: '0 auto' }}>
                                Thank you, <strong>{formData.firstName} {formData.lastName}</strong>. Your application for <strong>{formData.firstChoiceCourse}</strong> ({formData.programmeType}) has been logged.
                            </p>

                            <div
                                className="p-3 rounded-3 d-inline-block mb-4"
                                style={{ backgroundColor: colors.bgLight, border: `1px solid ${colors.gold}` }}
                            >
                                <span className="small text-muted d-block">Application Number:</span>
                                <strong style={{ fontSize: '1.4rem', color: colors.navy, letterSpacing: '1px' }}>
                                    {applicationId}
                                </strong>
                            </div>

                            <div>
                                <button className="btn-gold" onClick={() => window.print()}>
                                    Print Application Slip
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </section>
        </>
    );
}

