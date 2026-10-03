// Official staff registry, organized by school/department. Used by the
// public Staff directory pages AND by the staff portal for signup
// eligibility, course allocation, and the course catalog each HOD assigns
// from. portalRole is only present on entries allowed to log into the
// staff portal.

const SCHOOLS = {
  LANGUAGES: "School of Languages",
  EDUCATION: "School of Education",
  SCIENCES: "School of Sciences",
  ARTS_SOCIAL: "School of Arts and Social Sciences",
  VOCATIONAL: "School of Vocational and Technical Education",
  ECCE: "School of Early Childhood Care and Education / Primary Education",
};
export { SCHOOLS };

const photo = (seed) => `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=400&q=80`;
const PHOTOS = [
  "1500648767791-00dcc994a43e", "1506794778202-cad84cf45f1d", "1507003211169-0a1dd7228f2d",
  "1580489944761-15a19d654956", "1567532939604-b6b5b0db2604",
];
const p = (i) => photo(PHOTOS[i % PHOTOS.length]);

function buildSchool(deptName, hodName, hodStaffId, lecturerNames, lecturerPrefix, startId) {
  const hod = { id: startId, staffId: hodStaffId, fullName: hodName, role: `HOD, ${deptName}`, department: deptName, category: "Academic Staff", portalRole: "HOD", photo: p(startId) };
  const lecturers = lecturerNames.map((name, i) => ({
    id: startId + i + 1,
    staffId: `${lecturerPrefix}/${String(i + 1).padStart(4, "0")}`,
    fullName: name,
    role: i % 2 === 0 ? "Lecturer II" : "Lecturer I",
    department: deptName,
    category: "Academic Staff",
    portalRole: "Lecturer",
    photo: p(startId + i + 1),
  }));
  return [hod, ...lecturers];
}

// ---- Principal Officers ----
const principalOfficersSection = [
  { id: 1, staffId: "PICE/ST/0001", fullName: "Prof. Jimoh Fasasi Adewale", role: "Proprietor", department: "Chairman Governing Council", category: "Principal Officer", photo: p(1) },
  { id: 2, staffId: "PICE/ST/0002", fullName: "Dr. Badiru Dauda Kolapo", role: "Provost", department: "Academic Board", category: "Principal Officer", photo: p(2) },
];

// ---- Six Schools, one HOD + five lecturers each ----
const languagesSection = buildSchool(
  SCHOOLS.LANGUAGES, "Kunle Fashina", "PICE/HOD/0001",
  ["Bisi Alao", "Dele Akande", "Taiwo Bello", "Kemi Adisa", "Ngozi Chukwu"],
  "PICE/LEC/LAN", 100
);

const educationSection = buildSchool(
  SCHOOLS.EDUCATION, "Funmilayo Okediran", "PICE/HOD/0002",
  ["Chidi Eze", "Amaka Nwosu", "Sola Adebanjo", "Ibrahim Musa", "Hauwa Garba"],
  "PICE/LEC/EDU", 200
);

const sciencesSection = buildSchool(
  SCHOOLS.SCIENCES, "Patience Udoh", "PICE/HOD/0003",
  ["Emeka Obi", "Grace Nwachukwu", "Tunde Bakare", "Zainab Yusuf", "Victor Chukwuemeka"],
  "PICE/LEC/SCI", 300
);

const artsSocialSection = buildSchool(
  SCHOOLS.ARTS_SOCIAL, "Babatunde Ariyo", "PICE/HOD/0004",
  ["Chioma Nnamdi", "Rasheed Lawal", "Esther Adeyinka", "Musa Abdullahi", "Blessing Okafor"],
  "PICE/LEC/ART", 400
);

const vocationalSection = buildSchool(
  SCHOOLS.VOCATIONAL, "Yemi Ogundele", "PICE/HOD/0005",
  ["Felix Okonkwo", "Aisha Lawal", "Chukwudi Eze", "Ronke Afolabi", "Samuel Danjuma"],
  "PICE/LEC/VOC", 500
);

const ecceSection = buildSchool(
  SCHOOLS.ECCE, "Grace Oyelaran", "PICE/HOD/0006",
  ["Comfort Ibe", "Fatima Suleiman", "Peace Effiong", "Kehinde Taiwo", "Joy Umeh"],
  "PICE/LEC/ECC", 600
);

// ---- Exams & Records Officers (portal access) ----
const examsOfficerSection = [
  { id: 700, staffId: "PICE/EXO/0001", fullName: "Chioma Obi", role: "Exams and Records Officer", department: "Exams and Records", category: "Non-Academic Staff", portalRole: "Exams Officer", photo: p(700) },
  { id: 701, staffId: "PICE/EXO/0002", fullName: "Tope Oyedepo", role: "Exams and Records Officer", department: "Exams and Records", category: "Non-Academic Staff", portalRole: "Exams Officer", photo: p(701) },
];

// ---- Bursary / Financial Control (portal access) ----
const bursarySection = [
  { id: 800, staffId: "PICE/BUR/0001", fullName: "Olabode Adewumi", role: "Bursar", department: "Bursary", category: "Non-Academic Staff", portalRole: "Bursary", photo: p(800) },
  { id: 801, staffId: "PICE/BUR/0002", fullName: "Ifeoma Nwankwo", role: "Financial Control Officer", department: "Bursary", category: "Non-Academic Staff", portalRole: "Bursary", photo: p(801) },
];

// ---- ICT Unit and Super Admin (portal access, full system access) ----
const ictAndAdminSection = [
  { id: 900, staffId: "PICE/ST/0005", fullName: "Azeez Ademola Oladimeji", role: "ICT Officer and System Super Admin", department: "ICT Unit", category: "Non-Academic Staff", portalRole: "Super Admin", photo: p(900) },
];

// ---- Other Non-Academic Staff (public directory only) ----
const otherNonAcademicSection = [
  { id: 950, staffId: "PICE/ST/0006", fullName: "Folake Adeyemi", role: "Head, Student Affairs", department: "Student Affairs", category: "Non-Academic Staff", photo: p(950) },
];

const staffRegistry = [
  ...principalOfficersSection,
  ...languagesSection,
  ...educationSection,
  ...sciencesSection,
  ...artsSocialSection,
  ...vocationalSection,
  ...ecceSection,
  ...examsOfficerSection,
  ...bursarySection,
  ...ictAndAdminSection,
  ...otherNonAcademicSection,
];

// ---- Course catalog each HOD allocates from, split by school ----
export const DEPARTMENT_COURSES = {
  [SCHOOLS.LANGUAGES]: [
    { code: "ENG111", title: "Practical Listening Skills", unit: 1, level: "100L", semester: "First" },
    { code: "ENG112", title: "Introduction to Phonetics and Phonology", unit: 2, level: "100L", semester: "First" },
    { code: "ENG121", title: "Basic Reading Skills and Comprehension", unit: 2, level: "100L", semester: "Second" },
    { code: "FRE111", title: "Comprehension Orale I", unit: 1, level: "100L", semester: "First" },
    { code: "YOR111", title: "Akoto Yoruba", unit: 2, level: "100L", semester: "First" },
    { code: "ENG211", title: "The Structure of English", unit: 2, level: "200L", semester: "First" },
    { code: "ENG221", title: "Composition Writing", unit: 2, level: "200L", semester: "Second" },
    { code: "YOR211", title: "Mofoloji Yoruba", unit: 1, level: "200L", semester: "First" },
    { code: "ENG321", title: "Long Essay", unit: 1, level: "300L", semester: "Second" },
    { code: "ENG322", title: "Varieties of English and Stylistics", unit: 1, level: "300L", semester: "Second" },
  ],
  [SCHOOLS.EDUCATION]: [
    { code: "EDU111", title: "History of Education", unit: 1, level: "100L", semester: "First" },
    { code: "EDU112", title: "Developmental Psychology", unit: 2, level: "100L", semester: "First" },
    { code: "EDU113", title: "Principles and Methods of Teaching", unit: 2, level: "100L", semester: "First" },
    { code: "EDU121", title: "Sociology of Education", unit: 1, level: "100L", semester: "Second" },
    { code: "EDU211", title: "Philosophy of Education", unit: 1, level: "200L", semester: "First" },
    { code: "EDU213", title: "Educational Technology: Theory and Practice", unit: 2, level: "200L", semester: "First" },
    { code: "EDU222", title: "Curriculum Studies", unit: 1, level: "200L", semester: "Second" },
    { code: "EDU223", title: "Measurement and Evaluation", unit: 2, level: "200L", semester: "Second" },
    { code: "EDU321", title: "Research Methods and Project", unit: 2, level: "300L", semester: "Second" },
    { code: "EDU322", title: "Educational Administration, Planning and Supervision", unit: 2, level: "300L", semester: "Second" },
  ],
  [SCHOOLS.SCIENCES]: [
    { code: "BIO111", title: "Basic Principles and Cell Biology", unit: 1, level: "100L", semester: "First" },
    { code: "BIO113", title: "Viruses, Bacteria and Lower Plants", unit: 2, level: "100L", semester: "First" },
    { code: "CSC111", title: "Introduction to Computer Science", unit: 1, level: "100L", semester: "First" },
    { code: "CSC112", title: "BASIC Programming Language", unit: 2, level: "100L", semester: "First" },
    { code: "MAT111", title: "Algebra", unit: 2, level: "100L", semester: "First" },
    { code: "ISC112", title: "Science Education I", unit: 2, level: "100L", semester: "First" },
    { code: "BIO211", title: "Diversity of Chordates", unit: 1, level: "200L", semester: "First" },
    { code: "CSC212", title: "Database Management", unit: 1, level: "200L", semester: "First" },
    { code: "MAT211", title: "Integral Calculus", unit: 1, level: "200L", semester: "First" },
    { code: "BIO321", title: "Applied Biology", unit: 2, level: "300L", semester: "Second" },
    { code: "CSC321", title: "Advanced Level Programming Language", unit: 2, level: "300L", semester: "Second" },
  ],
  [SCHOOLS.ARTS_SOCIAL]: [
    { code: "CRS111", title: "Introduction to the Study of Religions", unit: 1, level: "100L", semester: "First" },
    { code: "ECO111", title: "Principles of Economics I", unit: 2, level: "100L", semester: "First" },
    { code: "GEO112", title: "Map Reading and Interpretation", unit: 2, level: "100L", semester: "First" },
    { code: "HIS111", title: "Historiography", unit: 2, level: "100L", semester: "First" },
    { code: "POL111", title: "Introduction to Political Science", unit: 2, level: "100L", semester: "First" },
    { code: "SOS111", title: "Foundations of Social Studies", unit: 2, level: "100L", semester: "First" },
    { code: "ECO211", title: "Micro-Economics", unit: 2, level: "200L", semester: "First" },
    { code: "HIS211", title: "Methodology", unit: 2, level: "200L", semester: "First" },
    { code: "SOS211", title: "Nigerian Political Life", unit: 2, level: "200L", semester: "First" },
    { code: "POL321", title: "African Political Thought", unit: 1, level: "300L", semester: "Second" },
    { code: "SOS321", title: "Population and Family Life Education", unit: 2, level: "300L", semester: "Second" },
  ],
  [SCHOOLS.VOCATIONAL]: [
    { code: "BED110", title: "Introduction to Vocational Business Education", unit: 1, level: "100L", semester: "First" },
    { code: "BED111", title: "Principles of Bookkeeping and Accounting I", unit: 1, level: "100L", semester: "First" },
    { code: "PHE111", title: "Theory and Techniques of Football", unit: 1, level: "100L", semester: "First" },
    { code: "PHE114", title: "History and Philosophy of Physical Education", unit: 2, level: "100L", semester: "First" },
    { code: "BED211", title: "Financial Accounting I", unit: 1, level: "200L", semester: "First" },
    { code: "PHE214", title: "Introduction to Sport Management", unit: 1, level: "200L", semester: "First" },
    { code: "BED221", title: "Financial Accounting II", unit: 2, level: "200L", semester: "Second" },
    { code: "PHE227", title: "Research Methodology in PHE", unit: 2, level: "200L", semester: "Second" },
    { code: "BEA321", title: "Cost Accounting", unit: 1, level: "300L", semester: "Second" },
    { code: "PHE323", title: "Exercise Physiology", unit: 1, level: "300L", semester: "Second" },
  ],
  [SCHOOLS.ECCE]: [
    { code: "ECC111", title: "Foundations of Early Childhood Education", unit: 2, level: "100L", semester: "First" },
    { code: "ECC112", title: "Child Growth and Development", unit: 2, level: "100L", semester: "First" },
    { code: "ECC121", title: "Play and Learning in Early Years", unit: 1, level: "100L", semester: "Second" },
    { code: "ECC122", title: "Health, Safety and Nutrition in ECCE", unit: 1, level: "100L", semester: "Second" },
    { code: "ECC211", title: "Curriculum Design for Early Years", unit: 2, level: "200L", semester: "First" },
    { code: "ECC212", title: "Language Development in Young Children", unit: 1, level: "200L", semester: "First" },
    { code: "ECC221", title: "Assessment in Early Childhood Settings", unit: 1, level: "200L", semester: "Second" },
    { code: "ECC311", title: "Inclusive Practice in Early Childhood", unit: 2, level: "300L", semester: "First" },
    { code: "ECC321", title: "Research Methods in Early Childhood Education", unit: 2, level: "300L", semester: "Second" },
  ],
};

export function findStaffByStaffId(staffId) {
  if (!staffId) return null;
  return staffRegistry.find((s) => s.staffId.toLowerCase() === String(staffId).toLowerCase().trim());
}

export function findStaffById(id) {
  return staffRegistry.find((s) => String(s.id) === String(id));
}

export function getRegistryLecturersByDepartment(department) {
  return staffRegistry.filter((s) => s.portalRole === "Lecturer" && s.department === department);
}

export function getCoursesForDepartment(department) {
  return DEPARTMENT_COURSES[department] || [];
}

export default staffRegistry;