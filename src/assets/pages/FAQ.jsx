import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';

const faqsData = [
  {
    category: 'Admissions',
    items: [
      { q: 'When does the admission portal open?', a: 'The admission portal typically opens in January each academic session and closes by August 31st.' },
      { q: 'Can I apply without JAMB?', a: 'Direct entry and part-time pathways may not require UTME; contact the Admissions Office for current guidance.' },
      { q: 'What are the general admission requirements?', a: 'Applicants must possess a minimum of 5 O’Level credit passes including English Language and Mathematics in SSCE/WAEC/NECO or NABTEB.' }
    ]
  },
  {
    category: 'Programmes',
    items: [
      { q: 'How long is the NCE programme?', a: 'The Nigeria Certificate in Education (NCE) programme runs for three years of full-time study.' },
      { q: 'Are there part-time programmes?', a: 'Selected programmes are available part-time; check the Programmes page for current offerings.' },
      { q: 'Is the NCE certificate nationally recognized?', a: 'Yes, all NCE certificates awarded by Providence International College of Education are fully accredited by the NCCE and recognized nationwide.' }
    ]
  },
  {
    category: 'Faculties & Departments',
    items: [
      { q: 'How many faculties does the College have?', a: 'The College currently runs four faculties: Arts and Social Sciences, Science Education, Languages, and Vocational and Technical Education.' },
      { q: 'Where can I view specific course combinations?', a: 'Detailed course combinations can be found under the Faculties & Departments section on our website or in the official prospectus.' }
    ]
  }
];

export default function FAQ() {
  const [openKey, setOpenKey] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const toggle = (key) => setOpenKey(openKey === key ? null : key);

  // Extract all available categories
  const categories = ['All', ...faqsData.map((group) => group.category)];

  // Filter FAQs based on active category and search term
  const filteredFaqs = useMemo(() => {
    return faqsData
      .map((group) => {
        if (activeCategory !== 'All' && group.category !== activeCategory) {
          return null;
        }

        const matchingItems = group.items.filter(
          (item) =>
            item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.a.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (matchingItems.length === 0) return null;

        return {
          ...group,
          items: matchingItems
        };
      })
      .filter(Boolean);
  }, [activeCategory, searchQuery]);

  const colors = {
    navy: '#0F2C59',
    gold: '#D4AF37',
    lightGold: '#FFFDF0',
    white: '#FFFFFF',
    textDark: '#1E293B',
    textMuted: '#64748B',
    border: '#E2E8F0',
    bgLight: '#F8FAFC'
  };

  return (
    <>
      <style>
        {`
          .faq-search-input {
            width: 100%;
            padding: 0.9rem 1.25rem;
            font-size: 1rem;
            border: 2px solid ${colors.border};
            border-radius: 10px;
            outline: none;
            transition: all 0.25s ease;
          }
          .faq-search-input:focus {
            border-color: ${colors.gold};
            box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.15);
          }

          .category-tab-btn {
            background-color: ${colors.bgLight};
            color: ${colors.textDark};
            border: 1px solid ${colors.border};
            padding: 0.5rem 1.25rem;
            border-radius: 30px;
            font-weight: 600;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.25s ease;
            white-space: nowrap;
          }
          .category-tab-btn.active, .category-tab-btn:hover {
            background-color: ${colors.navy};
            color: ${colors.white};
            border-color: ${colors.navy};
          }

          .accordion-item {
            border: 1px solid ${colors.border};
            border-radius: 12px;
            margin-bottom: 0.85rem;
            background-color: ${colors.white};
            overflow: hidden;
            transition: all 0.25s ease;
          }
          .accordion-item:hover {
            border-color: ${colors.gold};
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          }

          .accordion-header {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.2rem 1.5rem;
            background: none;
            border: none;
            text-align: left;
            cursor: pointer;
            font-weight: 700;
            color: ${colors.navy};
            font-size: 1rem;
          }

          .accordion-icon {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background-color: ${colors.lightGold};
            color: ${colors.gold};
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1.2rem;
            flex-shrink: 0;
            margin-left: 1rem;
            transition: transform 0.25s ease;
          }

          .accordion-body {
            padding: 0 1.5rem 1.25rem 1.5rem;
            color: ${colors.textMuted};
            line-height: 1.6;
            font-size: 0.95rem;
            border-top: 1px dashed ${colors.border};
            margin-top: -0.25rem;
            padding-top: 1rem;
          }
        `}
      </style>

      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Answers to common questions about admissions, programmes, faculties, and campus life."
        breadcrumb="Home / FAQs"
      />

      <section className="pce-section pce-bg-white py-5">
        <div className="container" style={{ maxWidth: '860px' }}>
          
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              className="faq-search-input"
              placeholder="🔍 Search for questions (e.g. JAMB, NCE, Faculties)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filter Tabs */}
          <div className="d-flex flex-wrap gap-2 mb-5 justify-content-start align-items-center">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Accordion Section */}
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((group) => (
              <div key={group.category} className="mb-5">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <span
                    style={{
                      width: '8px',
                      height: '24px',
                      backgroundColor: colors.gold,
                      borderRadius: '4px',
                      display: 'inline-block'
                    }}
                  ></span>
                  <h4 style={{ color: colors.navy, fontWeight: 800, margin: 0 }}>
                    {group.category}
                  </h4>
                </div>

                {group.items.map((item, idx) => {
                  const key = `${group.category}-${idx}`;
                  const isOpen = openKey === key;
                  return (
                    <div key={key} className="accordion-item">
                      <button
                        className="accordion-header"
                        onClick={() => toggle(key)}
                        aria-expanded={isOpen}
                      >
                        <span>{item.q}</span>
                        <span
                          className="accordion-icon"
                          style={{
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            backgroundColor: isOpen ? colors.navy : colors.lightGold,
                            color: isOpen ? colors.gold : colors.navy
                          }}
                        >
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="accordion-body">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))
          ) : (
            /* Empty State when Search has no results */
            <div className="text-center py-5" style={{ color: colors.textMuted }}>
              <h5>No questions found</h5>
              <p className="small">Try searching with a different keyword or select another category.</p>
            </div>
          )}

          {/* Contact & Support CTA Banner */}
          <div
            className="p-4 p-md-5 mt-5 rounded-4 text-center"
            style={{
              backgroundColor: colors.navy,
              color: colors.white,
              boxShadow: '0 10px 30px rgba(15, 44, 89, 0.12)'
            }}
          >
            <h4 style={{ fontWeight: 800, color: colors.gold }} className="mb-2">
              Still Have Questions?
            </h4>
            <p style={{ color: '#E2E8F0', maxWidth: '560px', margin: '0 auto 1.5rem auto' }}>
              If you couldn't find the answer to your question, feel free to get in touch with our admissions support team.
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link
                to="/contact"
                className="btn"
                style={{
                  backgroundColor: colors.gold,
                  color: colors.navy,
                  fontWeight: 700,
                  padding: '0.6rem 1.5rem',
                  borderRadius: '6px'
                }}
              >
                Contact Admissions
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}