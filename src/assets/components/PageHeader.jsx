import React from 'react';

export default function PageHeader({ title, subtitle, breadcrumb }) {
  return (
    <div className="pce-page-header">
      <div className="container">
        {breadcrumb && <div className="breadcrumb-text mb-2">{breadcrumb}</div>}
        <h1>{title}</h1>
        {subtitle && <p className="mb-0" style={{ color: '#C9D5EA', maxWidth: '65ch' }}>{subtitle}</p>}
      </div>
    </div>
  );
}