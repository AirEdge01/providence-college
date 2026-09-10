import React from 'react';
import PageHeader from '../components/PageHeader.jsx';

const faculties = [
  {
    id: 'arts-social-sciences',
    name: 'School of Arts and Social Sciences',
    icon: '',
    description: 'Prepares educators in the humanities and social sciences, blending subject mastery with sound pedagogy.',
    prerequisite: 'Credits must include at least two social science or arts subjects (e.g., Government, Economics, History, Geography, CRS/IRS).',
    departments: [
      { name: 'Department of English Education', programmes: ['NCE English/Social Studies', 'NCE English/Christian Religious Studies'], desc: 'Trains teachers of the English language and literature for basic and post-basic education.' },
      { name: 'Department of Social Studies', programmes: ['NCE Social Studies/Economics', 'NCE Social Studies/Political Science'], desc: 'Focuses on civic education, society and human relations pedagogy.' },
      { name: 'Department of Christian Religious Studies', programmes: ['NCE CRS/English', 'NCE CRS/Social Studies'], desc: 'Combines religious studies with moral and values education.' }
    ]
  },
  {
    id: 'sciences-education',
    name: 'School of Science Education',
    icon: '',
    description: 'Trains competent science educators equipped for modern, lab-driven classroom instruction.',
    prerequisite: 'Credits must include Mathematics, the primary choice subject (e.g., Computer Science or Biology), and one other science subject (Physics or Chemistry).',
    departments: [
      { name: 'Department of Integrated Science', programmes: ['NCE Integrated Science/Biology', 'NCE Integrated Science/Chemistry'], desc: 'Builds foundational science teaching skills across biology, chemistry, and physics.' },
      { name: 'Department of Mathematics Education', programmes: ['NCE Mathematics/Physics', 'NCE Mathematics/Computer Science'], desc: 'Prepares teachers of mathematics for basic and secondary education.' },
      { name: 'Department of Computer Science Education', programmes: ['NCE Computer Science/Mathematics'], desc: 'Combines ICT competence with instructional pedagogy for the digital classroom.' }
    ]
  },
  {
    id: 'languages',
    name: 'School of Languages',
    icon: '',
    description: 'Develops fluency and teaching competence in indigenous and foreign languages.',
    prerequisite: 'Credit in English Language is compulsory. For specific language majors, a credit in that language (e.g., Yoruba, French, Arabic) is required. A pass in Literature-in-English is required.',
    departments: [
      { name: 'Department of Yoruba', programmes: ['NCE Yoruba/English', 'NCE Yoruba/CRS'], desc: 'Preserves and teaches Yoruba language, culture, and literature.' },
      { name: 'Department of French', programmes: ['NCE French/English'], desc: 'Trains teachers of French as a second language.' }
    ]
  },
  {
    id: 'vocational-technical',
    name: 'School of Vocational and Technical Education',
    icon: '',
    description: 'Equips educators with hands-on technical, commercial, and vocational teaching skills.',
    prerequisite: 'Credits must include relevant technical, agricultural, or commercial subjects (e.g., Agricultural Science, Accounting, Home Economics, Fine Arts).',
    departments: [
      { name: 'Department of Business Education', programmes: ['NCE Business Education/Economics', 'NCE Accounting/Business Studies'], desc: 'Prepares teachers for commerce, accounting, and business studies.' },
      { name: 'Department of Home Economics', programmes: ['NCE Home Economics/Biology'], desc: 'Covers food, nutrition, textiles, and family life education pedagogy.' },
      { name: 'Department of Agricultural Science', programmes: ['NCE Agricultural Science/Biology'], desc: 'Combines agricultural practice with classroom instruction methods.' }
    ]
  },
  {
    id: 'eccde-primary',
    name: 'School of Early Childhood Care & Primary Education',
    icon: '',
    description: 'Specializes in foundational child development, early learning strategies, and primary school curriculum delivery.',
    prerequisite: 'General entry requirements apply. A credit in any Science subject or Fine Arts is an added advantage due to the multi-disciplinary nature of primary education.',
    departments: [
      { name: 'Department of Early Childhood Care Education', programmes: ['NCE Early Childhood Care Education'], desc: 'Focuses on early childhood psychology, play-based learning, and foundational education.' },
      { name: 'Department of Primary Education Studies', programmes: ['NCE Primary Education Studies (PES)'], desc: 'Prepares multi-disciplinary educators capable of teaching core subjects across primary schools.' }
    ]
  }
];

export default function Faculties() {
  return (
    <>
      <PageHeader
        title="Faculties & Departments"
        subtitle="Explore our schools, academic departments, subject combinations, and entry requirements."
        breadcrumb="Home / Faculties"
      />

      <section className="pce-section pce-bg-white py-5">
        <div className="container">
          {faculties.map((f, idx) => (
            <div 
              key={f.id} 
              className={`pce-faculty-card p-4 p-md-5 rounded-4 shadow-sm bg-light ${idx !== faculties.length - 1 ? 'mb-5' : ''}`}
              style={{ borderLeft: '5px solid var(--bs-primary, #0d6efd)' }}
            >
              {/* Header Section */}
              <div className="row g-4 mb-4">
                <div className="col-lg-12">
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <span className="fs-2">{f.icon}</span>
                    <div>
                      <span className="badge bg-primary text-uppercase px-2 py-1 mb-1">Academic School</span>
                      <h2 className="h3 mb-0 fw-bold">{f.name}</h2>
                    </div>
                  </div>
                  <p className="text-secondary lead fs-6 mb-3">{f.description}</p>
                  
                  {/* Special Prerequisite Callout */}
                  <div className="alert alert-warning border-0 d-flex align-items-start gap-2 mb-0 rounded-3">
                    <span className="fs-5">📋</span>
                    <div>
                      <strong className="d-block text-dark small text-uppercase fw-bold">Special Prerequisites / Core Requirements:</strong>
                      <span className="small text-dark">{f.prerequisite}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Departments Grid */}
              <div className="row g-3">
                <div className="col-12">
                  <h5 className="fw-semibold text-dark mb-3">Departments & Offered Combinations</h5>
                </div>
                {f.departments.map((d) => (
                  <div className="col-md-6 col-lg-4" key={d.name}>
                    <div className="card h-100 border-0 shadow-sm rounded-3 p-3 bg-white">
                      <div className="card-body p-0 d-flex flex-column justify-content-between">
                        <div>
                          <h6 className="fw-bold text-primary mb-2">{d.name}</h6>
                          <p className="small text-muted mb-3">{d.desc}</p>
                        </div>
                        <div>
                          <span className="d-block small text-uppercase text-secondary fw-bold mb-2" style={{ fontSize: '0.75rem' }}>Programmes:</span>
                          <div className="d-flex flex-wrap gap-1">
                            {d.programmes.map((p) => (
                              <span key={p} className="badge bg-secondary-subtle text-dark border fw-normal">{p}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}