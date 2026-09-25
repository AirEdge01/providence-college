import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

export default function App() {
  return (
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}