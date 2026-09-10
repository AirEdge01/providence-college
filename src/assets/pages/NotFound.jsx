import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container pce-section text-center">
      <h1 style={{ fontSize: '3rem' }}>404</h1>
      <p className="pce-text-muted mb-4">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-pce-primary">Back to Home</Link>
    </div>
  );
}