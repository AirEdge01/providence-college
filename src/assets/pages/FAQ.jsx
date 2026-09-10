import React, { useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';

const faqs = [
  {
    category: 'Admissions',
    items: [
      { q: 'When does the admission portal open?', a: 'The admission portal typically opens in January each academic session and closes by August 31st.' },
      { q: 'Can I apply without JAMB?', a: 'Direct entry and part-time pathways may not require UTME; contact the Admissions Office for current guidance.' }
    ]
  },
  {
    category: 'Programmes',
    items: [
      { q: 'How long is the NCE programme?', a: 'The Nigeria Certificate in Education (NCE) programme runs for three years of full-time study.' },
      { q: 'Are there part-time programmes?', a: 'Selected programmes are available part-time; check the Programmes page for current offerings.' }
    ]
  },
  {
    category: 'Faculties & Departments',
    items: [
      { q: 'How many faculties does the College have?', a: 'The College currently runs four faculties: Arts and Social Sciences, Sciences Education, Languages, and Vocational and Technical Education.' }
    ]
  }
];

export default function FAQ() {
  const [openKey, setOpenKey] = useState(null);

  const toggle = (key) => setOpenKey(openKey === key ? null : key);

  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Answers to common questions about admissions, programmes, faculties and more."
        breadcrumb="Home / FAQs"
      />

      <section className="pce-section pce-bg-white">
        <div className="container" style={{ maxWidth: 820 }}>
          {faqs.map((group) => (
            <div key={group.category} className="mb-5">
              <div className="pce-tag">{group.category}</div>
              <h4 className="mb-3">{group.category} Questions</h4>
              {group.items.map((item, idx) => {
                const key = `${group.category}-${idx}`;
                const isOpen = openKey === key;
                return (
                  <div key={key} className="pce-card mb-2" style={{ cursor: 'pointer' }} onClick={() => toggle(key)}>
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="mb-0">{item.q}</h6>
                      <span style={{ color: 'var(--pce-gold)', fontWeight: 700 }}>{isOpen ? '−' : '+'}</span>
                    </div>
                    {isOpen && <p className="small pce-text-muted mt-3 mb-0">{item.a}</p>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}