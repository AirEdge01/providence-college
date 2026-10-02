// Official staff registry, organized by section. Used by the public Staff
// directory pages (Staff.jsx, StaffProfile.jsx) AND by the staff portal for
// signup eligibility and course allocation. portalRole is only present on
// entries allowed to log into the staff portal.

// ---- Section 1: Principal Officers (public directory only, no portal access) ----
const principalOfficersSection = [
  { id: 1, staffId: "PICE/ST/0001", fullName: "Prof. Jimoh Fasasi Adewale", role: "Proprietor", department: "Chairman Governing Council", category: "Principal Officer", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
  { id: 2, staffId: "PICE/ST/0002", fullName: "Dr. Badiru Dauda Kolapo", role: "Provost", department: "Academic Board", category: "Principal Officer", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80" },
];

// ---- Section 2: Heads of Department (HOD, portal access) ----
const hodSection = [
  { id: 10, staffId: "PICE/HOD/0001", fullName: "Kunle Fashina", role: "HOD, English Language", department: "English Language", category: "Academic Staff", portalRole: "HOD", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
  { id: 11, staffId: "PICE/HOD/0002", fullName: "Ngozi Chukwu", role: "HOD, Yoruba", department: "Yoruba", category: "Academic Staff", portalRole: "HOD", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" },
  { id: 12, staffId: "PICE/HOD/0003", fullName: "Babatunde Ariyo", role: "HOD, Social Studies", department: "Social Studies", category: "Academic Staff", portalRole: "HOD", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
  { id: 13, staffId: "PICE/HOD/0004", fullName: "Funmilayo Okediran", role: "HOD, History", department: "History", category: "Academic Staff", portalRole: "HOD", photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80" },
  { id: 14, staffId: "PICE/HOD/0005", fullName: "Grace Oyelaran", role: "HOD, Early Childhood Education", department: "Early Childhood Education", category: "Academic Staff", portalRole: "HOD", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" },
];

// ---- Section 3: Lecturers / Academic Staff (portal access) ----
const lecturerSection = [
  { id: 20, staffId: "PICE/LEC/0001", fullName: "Bisi Alao", role: "Lecturer II", department: "English Language", category: "Academic Staff", portalRole: "Lecturer", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" },
  { id: 21, staffId: "PICE/LEC/0002", fullName: "Dele Akande", role: "Lecturer I", department: "English Language", category: "Academic Staff", portalRole: "Lecturer", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
  { id: 22, staffId: "PICE/LEC/0003", fullName: "Taiwo Bello", role: "Lecturer II", department: "Yoruba", category: "Academic Staff", portalRole: "Lecturer", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" },
  { id: 23, staffId: "PICE/LEC/0004", fullName: "Kemi Adisa", role: "Lecturer I", department: "Yoruba", category: "Academic Staff", portalRole: "Lecturer", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
  { id: 24, staffId: "PICE/LEC/0005", fullName: "Chidi Eze", role: "Lecturer II", department: "Social Studies", category: "Academic Staff", portalRole: "Lecturer", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" },
  { id: 25, staffId: "PICE/LEC/0006", fullName: "Amaka Nwosu", role: "Lecturer I", department: "Social Studies", category: "Academic Staff", portalRole: "Lecturer", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
  { id: 26, staffId: "PICE/LEC/0007", fullName: "Sola Adebanjo", role: "Lecturer II", department: "History", category: "Academic Staff", portalRole: "Lecturer", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" },
  { id: 27, staffId: "PICE/LEC/0008", fullName: "Ibrahim Musa", role: "Lecturer I", department: "History", category: "Academic Staff", portalRole: "Lecturer", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
  { id: 28, staffId: "PICE/LEC/0009", fullName: "Hauwa Garba", role: "Lecturer II", department: "Early Childhood Education", category: "Academic Staff", portalRole: "Lecturer", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" },
  { id: 29, staffId: "PICE/LEC/0010", fullName: "Patience Udoh", role: "Lecturer I", department: "Early Childhood Education", category: "Academic Staff", portalRole: "Lecturer", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
];

// ---- Section 4: Exams & Records Officers (portal access) ----
const examsOfficerSection = [
  { id: 30, staffId: "PICE/EXO/0001", fullName: "Yemi Ogundele", role: "Exams and Records Officer", department: "Exams and Records", category: "Non-Academic Staff", portalRole: "Exams Officer", photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80" },
  { id: 31, staffId: "PICE/EXO/0002", fullName: "Chioma Obi", role: "Exams and Records Officer", department: "Exams and Records", category: "Non-Academic Staff", portalRole: "Exams Officer", photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80" },
];

// ---- Section 5: Bursary / Financial Control (portal access) ----
const bursarySection = [
  { id: 40, staffId: "PICE/BUR/0001", fullName: "Felix Okonkwo", role: "Bursar", department: "Bursary", category: "Non-Academic Staff", portalRole: "Bursary", photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80" },
  { id: 41, staffId: "PICE/BUR/0002", fullName: "Aisha Lawal", role: "Financial Control Officer", department: "Bursary", category: "Non-Academic Staff", portalRole: "Bursary", photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80" },
];

// ---- Section 6: ICT Unit and Super Admin (portal access) ----
const ictAndAdminSection = [
  { id: 50, staffId: "PICE/ST/0005", fullName: "Azeez Ademola Oladimeji", role: "ICT Officer and System Super Admin", department: "ICT Unit", category: "Non-Academic Staff", portalRole: "Super Admin", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
];

// ---- Section 7: Other Non-Academic Staff (public directory only) ----
const otherNonAcademicSection = [
  { id: 60, staffId: "PICE/ST/0006", fullName: "Folake Adeyemi", role: "Head, Student Affairs", department: "Student Affairs", category: "Non-Academic Staff", photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80" },
];

const staffRegistry = [
  ...principalOfficersSection,
  ...hodSection,
  ...lecturerSection,
  ...examsOfficerSection,
  ...bursarySection,
  ...ictAndAdminSection,
  ...otherNonAcademicSection,
];

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

export { hodSection, lecturerSection, examsOfficerSection, bursarySection };
export default staffRegistry;