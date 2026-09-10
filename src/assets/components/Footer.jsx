import React from 'react';
import { Link } from 'react-router-dom';

const institution = {
  name: 'Providence International College of Education',
  shortName: 'Providence International College of Education',
  address: 'No. 1, Adeojo, Boluwaji, Lagos-Ibadan Expressway, Ibadan, Oyo State, Nigeria',
  phone: '+234 800 000 0000',
  email: 'info@providencecollege.edu.ng',
  motto: 'Empowering Minds. Transforming Futures.',
  social: {
    facebook: '#',
    twitter: '#',
    instagram: '#',
    youtube: '#'
  }
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pce-footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            {/* Logo and Brand Name (Matching Navbar Structure) */}
            <Link to="/" className="d-flex align-items-center gap-2 mb-3 text-decoration-none">
              <img 
                src="/src/assets/provi.png" 
                alt="Providence International College Logo" 
                className="pce-logo"
                style={{ height: '40px', width: 'auto', objectFit: 'contain' }} 
              />
              <span className="text-white fw-bold fs-6">{institution.shortName}</span>
            </Link>

            <p className="small mb-1">{institution.address}</p>
            <p className="small mb-1">{institution.phone}</p>
            <p className="small mb-3">{institution.email}</p>

            {/* Proprietor Speech Quick Link */}
            <div>
              <Link
                to="/address"
                className="btn btn-sm btn-outline-warning d-inline-flex align-items-center gap-2 rounded-2 fw-semibold"
                style={{ fontSize: '0.8rem' }}
              >
                <span></span> Proprietor Speech
              </Link>
            </div>
          </div>

          <div className="col-6 col-md-2">
            <h5>Explore</h5>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/about">About Us</Link></li>
              <li className="mb-2"><Link to="/faculties">Faculties</Link></li>
              <li className="mb-2"><Link to="/programmes">Programmes</Link></li>
              <li className="mb-2"><Link to="/admissions">Admissions</Link></li>
              <li className="mb-2"><Link to="/address">Proprietor Address</Link></li>
            </ul>
          </div>

          <div className="col-6 col-md-2">
            <h5>Resources</h5>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/news">News</Link></li>
              <li className="mb-2"><Link to="/events">Events</Link></li>
              <li className="mb-2"><Link to="/gallery">Gallery</Link></li>
              <li className="mb-2"><Link to="/faq">FAQs</Link></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5>Stay Connected</h5>
            <p className="small mb-3">Follow the College for updates on admissions, events and news.</p>
            <div>
              <a href={institution.social.facebook} className="pce-social-icon" aria-label="Facebook">f</a>
              <a href={institution.social.twitter} className="pce-social-icon" aria-label="Twitter">x</a>
              <a href={institution.social.instagram} className="pce-social-icon" aria-label="Instagram">ig</a>
              <a href={institution.social.youtube} className="pce-social-icon" aria-label="YouTube">yt</a>
            </div>
          </div>
        </div>

        <hr />
        <div className="d-flex flex-column flex-md-row justify-content-between small">
          <span>&copy; {year} {institution.name}. All rights reserved.</span>
          <span>{institution.motto}</span>
        </div>
      </div>
    </footer>
  );
}