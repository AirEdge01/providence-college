import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './assets/components/Navbar.jsx';
import Footer from './assets/components/Footer.jsx';

import Home from './assets/pages/Home.jsx';
import About from './assets/pages/About.jsx';
import Faculties from './assets/pages/Faculties.jsx';
import Programmes from './assets/pages/Programmes.jsx';
import Admissions from './assets/pages/Admissions.jsx';
import News from './assets/pages/News.jsx';
import NewsArticle from './assets/pages/NewsArticle.jsx';
import Events from './assets/pages/Events.jsx';
import EventDetails from './assets/pages/EventDetails.jsx';
import Staff from './assets/pages/Staff.jsx';
import StaffProfile from './assets/pages/StaffProfile.jsx';
import Gallery from './assets/pages/Gallery.jsx';
import Contact from './assets/pages/Contact.jsx';
import FAQ from './assets/pages/FAQ.jsx';
import NotFound from './assets/pages/NotFound.jsx';
import ProprietorsAddress from './assets/pages/ProprietorsAddress.jsx';
import AdmissionPortal from './assets/pages/AdmissionPortal.jsx';
import AdmissionLanding from './assets/pages/AdmissionLanding.jsx';
import AAUADegreeAdmission from './assets/pages/AAUADegreeAdmission.jsx';
import AAUADirectEntryAdmission from './assets/pages/AAUADirectEntryAdmission.jsx';

import Signup from './assets/pages/Signup.jsx';
import Login from './assets/pages/Login.jsx';
import StudentDashboard from './assets/pages/StudentDashboard.jsx';
import Profile from './assets/pages/Profile.jsx';
import Courses from './assets/pages/Courses.jsx';
import Results from './assets/pages/Results.jsx';
import PostResults from './assets/pages/PostResults.jsx';
import AcademicHistory from './assets/pages/AcademicHistory.jsx';
import ChangePassword from './assets/pages/ChangePassword.jsx';
import ProtectedRoute from './assets/components/ProtectedRoute.jsx';
import { AuthProvider } from './assets/context/AuthContext.jsx';
import NotEligible from './assets/pages/NotEligible.jsx';

import StaffAuthPage from './assets/pages/StaffAuthPage.jsx';
import StaffLayout from './assets/pages/StaffLayout.jsx';
import StaffDashboard from './assets/pages/StaffDashboard.jsx';
import StaffPortalProfile from './assets/pages/StaffPortalProfile.jsx';
import CourseAllocationPage from './assets/pages/CourseAllocationPage.jsx';
import AssignedCourseRosterPage from './assets/pages/AssignedCourseRosterPage.jsx';
import ScoreUploadPage from './assets/pages/ScoreUploadPage.jsx';
import HodVettingQueuePage from './assets/pages/HodVettingQueuePage.jsx';
import ExamOfficerAuditPage from './assets/pages/ExamOfficerAuditPage.jsx';
import BursaryClearancePage from './assets/pages/BursaryClearancePage.jsx';
import StaffProtectedRoute from './assets/components/StaffProtectedRoute.jsx';
import { STAFF_ROLES } from './assets/utils/staffDB.js';
import SuperAdminPage from './assets/pages/SuperAdminPage.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ScrollToTop from './assets/components/ScrollToTop.jsx';

export default function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/faculties" element={<Faculties />} />
            <Route path="/programmes" element={<Programmes />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsArticle />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />

            <Route path="/staff/login" element={<StaffAuthPage />} />
            <Route path="/staff/signup" element={<StaffAuthPage />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/staff/:id" element={<StaffProfile />} />

            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/address" element={<ProprietorsAddress />} />
            <Route path="/admission" element={<AdmissionPortal />} />
            <Route path="/admission/landing" element={<AdmissionLanding />} />
            <Route path="/admission/aaua" element={<AAUADegreeAdmission />} />
            <Route path="/admission/aaua-direct" element={<AAUADirectEntryAdmission />} />

            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/dashboard/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
            <Route path="/dashboard/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
            <Route path="/post-results" element={<PostResults />} />
            <Route path="/dashboard/history" element={<ProtectedRoute><AcademicHistory /></ProtectedRoute>} />
            <Route path="/dashboard/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
            <Route path="/not-eligible" element={<NotEligibleWrapper />} />

            <Route path="/staff-portal" element={<StaffLayout />}>
              <Route index element={<StaffProtectedRoute><StaffDashboard /></StaffProtectedRoute>} />
              <Route path="dashboard" element={<StaffProtectedRoute><StaffDashboard /></StaffProtectedRoute>} />
              <Route path="profile" element={<StaffProtectedRoute><StaffPortalProfile /></StaffProtectedRoute>} />
              <Route
                path="course-allocation"
                element={
                  <StaffProtectedRoute allowedRoles={[STAFF_ROLES.HOD, STAFF_ROLES.LECTURER]}>
                    <CourseAllocationPage />
                  </StaffProtectedRoute>
                }
              />
              <Route
                path="roster"
                element={
                  <StaffProtectedRoute allowedRoles={[STAFF_ROLES.LECTURER]}>
                    <AssignedCourseRosterPage />
                  </StaffProtectedRoute>
                }
              />
              <Route
                path="score-upload"
                element={
                  <StaffProtectedRoute allowedRoles={[STAFF_ROLES.LECTURER]}>
                    <ScoreUploadPage />
                  </StaffProtectedRoute>
                }
              />
              <Route
                path="hod-vetting"
                element={
                  <StaffProtectedRoute allowedRoles={[STAFF_ROLES.HOD]}>
                    <HodVettingQueuePage />
                  </StaffProtectedRoute>
                }
              />
              <Route
                path="exam-audit"
                element={
                  <StaffProtectedRoute allowedRoles={[STAFF_ROLES.EXAMS_OFFICER]}>
                    <ExamOfficerAuditPage />
                  </StaffProtectedRoute>
                }
              />
              <Route
                path="bursary"
                element={
                  <StaffProtectedRoute allowedRoles={[STAFF_ROLES.BURSARY]}>
                    <BursaryClearancePage />
                  </StaffProtectedRoute>
                }
              />
            </Route>

            <Route path="*" element={<NotFound />} />
            <Route path="/admin" element={<SuperAdminPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

function NotEligibleWrapper() {
  const location = useLocation();
  return <NotEligible matricNumber={location.state?.matricNumber} />;
}