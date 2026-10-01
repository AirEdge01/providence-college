// Official staff registry — only staff listed here are allowed to create accounts or login.
const staffRegistry = [
    {
        id: 1,
        staffId: "PICE/ST/0001",
        fullName: "Prof. Jimoh Fasasi Adewale",
        role: "Proprietor",
        department: "Chairman Governing Council",
        category: "Principal Officer",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    },
    {
        id: 2,
        staffId: "PICE/ST/0002",
        fullName: "Dr. Badiru Dauda Kolapo",
        role: "Provost",
        department: "Academic Board",
        category: "Principal Officer",
        photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    },
    {
        id: 3,
        staffId: "PICE/ST/0003",
        fullName: "Dr. Kunle Fashina",
        role: "Senior Lecturer",
        department: "Department of English Education",
        category: "Academic Staff",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    },
    {
        id: 4,
        staffId: "PICE/ST/0004",
        fullName: "Mrs. Bisi Alao",
        role: "Lecturer II",
        department: "Department of Integrated Science",
        category: "Academic Staff",
        photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    },
    {
        id: 5,
        staffId: "PICE/ST/0005",
        fullName: "Mr. Azeez Ademola Oladimeji",
        role: "ICT Officer",
        department: "ICT Unit",
        category: "Non-Academic Staff",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    },
    {
        id: 6,
        staffId: "PICE/ST/0006",
        fullName: "Mrs. Folake Adeyemi",
        role: "Head, Student Affairs",
        department: "Student Affairs",
        category: "Non-Academic Staff",
        photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80",
    },
];

export function findStaffByStaffId(staffId) {
    if (!staffId) return null;
    return staffRegistry.find((s) => s.staffId.toLowerCase() === String(staffId).toLowerCase().trim());
}

export function findStaffById(id) {
    return staffRegistry.find((s) => String(s.id) === String(id));
}

export default staffRegistry;
