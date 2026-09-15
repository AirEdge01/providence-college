import React from 'react';
import { Link } from 'react-router-dom';

export default function PageHeader({ title, subtitle, breadcrumb }) {
  const renderBreadcrumb = () => {
    if (!breadcrumb) return null;

    if (typeof breadcrumb === 'string') {
      const parts = breadcrumb.split('/').map((part) => part.trim()).filter(Boolean);

      if (parts.length === 0) return null;

      return (
        <div className="breadcrumb-text mb-2">
          {parts.map((part, index) => (
            <React.Fragment key={`${part}-${index}`}>
              {index === 0 ? (
                <Link to="/" style={{ color: '#D4AF37', textDecoration: 'none' }}>{part}</Link>
              ) : (
                <span>{part}</span>
              )}
              {index < parts.length - 1 && <span> / </span>}
            </React.Fragment>
          ))}
        </div>
      );
    }

    return <div className="breadcrumb-text mb-2">{breadcrumb}</div>;
  };

  return (
    <div className="pce-page-header">
      <div className="container">
        {renderBreadcrumb()}
        <h1>{title}</h1>
        {subtitle && <p className="mb-0" style={{ color: '#C9D5EA', maxWidth: '65ch' }}>{subtitle}</p>}
      </div>
    </div>
  );
}