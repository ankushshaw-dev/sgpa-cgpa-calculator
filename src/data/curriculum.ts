export interface Subject {
  code: string;
  name: string;
  credits: number;
  type: 'theory' | 'practical';
  category?: string;
}

export interface Semester {
  number: number;
  name: string;
  subjects: Subject[];
}

export const semesters: Semester[] = [
  {
    number: 1,
    name: "First Semester",
    subjects: [
      { code: 'CS101', name: 'Introduction to Programming and Problem Solving', credits: 3, type: 'theory', category: 'ENGG Major' },
      { code: 'PH101', name: 'Engineering Physics', credits: 3, type: 'theory', category: 'SCI' },
      { code: 'M101', name: 'Engineering Mathematics-I', credits: 3, type: 'theory', category: 'SCI' },
      { code: 'HU101', name: 'Environmental Science', credits: 2, type: 'theory', category: 'HUM' },
      { code: 'HU102', name: 'Indian Knowledge System', credits: 1, type: 'theory', category: 'HUM' },
      { code: 'CS191', name: 'Programming and Problem-Solving Lab', credits: 1.5, type: 'practical', category: 'ENGG Major' },
      { code: 'PH191', name: 'Engineering Physics Lab', credits: 1.5, type: 'practical', category: 'SCI' },
      { code: 'ME194', name: 'Engineering Graphics & CAD Lab', credits: 1.5, type: 'practical', category: 'ENGG' },
      { code: 'HU191', name: 'Communication & Presentation Skill', credits: 1.5, type: 'practical', category: 'HUM' },
    ]
  },
  {
    number: 2,
    name: "Second Semester",
    subjects: [
      { code: 'CS201', name: 'Data Structure and Algorithms', credits: 3, type: 'theory', category: 'ENGG Major' },
      { code: 'CS202', name: 'Introduction to Artificial Intelligence', credits: 2, type: 'theory', category: 'ENGG Minor' },
      { code: 'CS203', name: 'Digital Logic and Computer Organization', credits: 3, type: 'theory', category: 'ENGG Major' },
      { code: 'CH201', name: 'Engineering Chemistry', credits: 2, type: 'theory', category: 'SCI' },
      { code: 'M201', name: 'Engineering Mathematics–II', credits: 3, type: 'theory', category: 'SCI' },
      { code: 'HU202', name: 'Constitution of India & Professional Ethics', credits: 1, type: 'theory', category: 'HUM' },
      { code: 'HU203', name: 'Design Thinking & Innovation', credits: 1, type: 'theory', category: 'HUM' },
      { code: 'CS291', name: 'Data Structure & Algorithms Lab', credits: 1.5, type: 'practical', category: 'ENGG Major' },
      { code: 'CS292', name: 'Artificial Intelligence Lab', credits: 1.5, type: 'practical', category: 'ENGG Minor' },
      { code: 'CS293', name: 'Digital Logic and Computer Organization Lab', credits: 1.5, type: 'practical', category: 'ENGG Major' },
      { code: 'CH291', name: 'Engineering Chemistry Lab', credits: 1, type: 'practical', category: 'SCI' },
      { code: 'ME293', name: 'IDEA LAB Workshop', credits: 1.5, type: 'practical', category: 'ENGG' },
    ]
  },
  {
    number: 3,
    name: "Third Semester",
    subjects: [
      { code: 'CS301', name: 'Computer Architecture', credits: 3, type: 'theory', category: 'ENGG Major' },
      { code: 'CS302', name: 'Design and Analysis of Algorithms', credits: 3, type: 'theory', category: 'ENGG Major' },
      { code: 'CS303', name: 'Operating Systems', credits: 3, type: 'theory', category: 'ENGG Major' },
      { code: 'CS304', name: 'Advanced Artificial Intelligence', credits: 3, type: 'theory', category: 'ENGG Major' },
      { code: 'EC(CS)301', name: 'Internet of Things', credits: 3, type: 'theory', category: 'ENGG Major' },
      { code: 'M(CS)301', name: 'Discrete Mathematics', credits: 3, type: 'theory', category: 'SCI' },
      { code: 'CS391', name: 'Computer Architecture Lab', credits: 1.5, type: 'practical', category: 'ENGG Major' },
      { code: 'CS392', name: 'Design and Analysis of Algorithms Lab', credits: 1.5, type: 'practical', category: 'ENGG Major' },
      { code: 'CS393', name: 'Operating Systems Lab', credits: 1.5, type: 'practical', category: 'ENGG Major' },
      { code: 'CS394', name: 'Advanced Artificial Intelligence Lab', credits: 1.5, type: 'practical', category: 'ENGG Major' },
      { code: 'CS395', name: 'Python Programming Lab', credits: 2.5, type: 'practical', category: 'ENGG Major' },
      { code: 'EC(CS)391', name: 'Internet of Things Lab', credits: 1.5, type: 'practical', category: 'ENGG Major' },
    ]
  },
  {
    number: 4,
    name: "Fourth Semester",
    subjects: [
      { code: 'CS401', name: 'Database Management Systems', credits: 3, type: 'theory', category: 'ENGG Major' },
      { code: 'CS402', name: 'Computer Networks', credits: 3, type: 'theory', category: 'ENGG Major' },
      { code: 'CS403', name: 'Machine Learning', credits: 3, type: 'theory', category: 'ENGG Major' },
      { code: 'CS404', name: 'Formal Language and Automata Theory', credits: 3, type: 'theory', category: 'ENGG Major' },
      { code: 'M(CS)401', name: 'Probability and Statistics', credits: 3, type: 'theory', category: 'SCI Minor' },
      { code: 'CS491', name: 'Database Management Systems Lab', credits: 1.5, type: 'practical', category: 'ENGG Major' },
      { code: 'CS492', name: 'Computer Networks Lab', credits: 1.5, type: 'practical', category: 'ENGG Major' },
      { code: 'CS493', name: 'Machine Learning Lab', credits: 1.5, type: 'practical', category: 'ENGG Major' },
      { code: 'M(CS)491', name: 'Introduction to R Programming', credits: 1.5, type: 'practical', category: 'ENGG Minor' },
      { code: 'HU(CS)491', name: 'Soft Skill & Aptitude', credits: 1.5, type: 'practical', category: 'HUM' },
    ]
  },
  {
    number: 5,
    name: "Fifth Semester",
    subjects: [
      { code: 'CS501', name: 'Software Engineering', credits: 3, type: 'theory', category: 'ENGG Major' },
      { code: 'CS502', name: 'Object Oriented Programming using Java', credits: 3, type: 'theory', category: 'ENGG Major' },
      { code: 'CS503', name: 'Elective I (Compiler/Cryptography/Graphics/Data Viz)', credits: 3, type: 'theory', category: 'ENGG Major' },
      { code: 'CS504', name: 'Soft Computing', credits: 3, type: 'theory', category: 'ENGG Major' },
      { code: 'HU(CS)501', name: 'Project Management & Finance', credits: 2, type: 'theory', category: 'HUM Minor' },
      { code: 'CS591', name: 'Software Engineering Lab', credits: 1.5, type: 'practical', category: 'ENGG Major' },
      { code: 'CS592', name: 'Object Oriented Programming using Java Lab', credits: 1.5, type: 'practical', category: 'ENGG Major' },
      { code: 'CS593', name: 'Elective I Lab', credits: 1.5, type: 'practical', category: 'ENGG Major' },
      { code: 'CS594', name: 'Soft Computing Lab', credits: 1.5, type: 'practical', category: 'ENGG Major' },
      { code: 'CS582', name: 'Project-I', credits: 2, type: 'practical', category: 'Project' },
    ]
  },
  {
    number: 6,
    name: "Sixth Semester",
    subjects: [
      { code: 'CS601', name: 'Web and Internet Technology', credits: 3, type: 'theory', category: 'ENGG Major' },
      { code: 'CS602', name: 'Deep Learning', credits: 3, type: 'theory', category: 'ENGG Major' },
      { code: 'CS603', name: 'Elective II (Image/Cloud/Big Data/NLP)', credits: 3, type: 'theory', category: 'ENGG Major' },
      { code: 'CS604', name: 'Elective III (Mobile/HCI/E-Commerce/Quantum)', credits: 3, type: 'theory', category: 'ENGG Major' },
      { code: 'CS605', name: 'Cyber Law and Ethics', credits: 3, type: 'theory', category: 'ENGG Minor' },
      { code: 'CS691', name: 'Web and Internet Technology Lab', credits: 1.5, type: 'practical', category: 'ENGG Major' },
      { code: 'CS692', name: 'Deep Learning Lab', credits: 1.5, type: 'practical', category: 'ENGG Major' },
      { code: 'CS693', name: 'Elective II Lab', credits: 1.5, type: 'practical', category: 'ENGG Major' },
      { code: 'CS681', name: 'Project-II', credits: 4, type: 'practical', category: 'Project' },
    ]
  },
  {
    number: 7,
    name: "Seventh Semester",
    subjects: [
      { code: 'CS701', name: 'Elective IV (Blockchain/Optimization/Bio-informatics/Robotics)', credits: 3, type: 'theory', category: 'ENGG Major' },
      { code: 'HU(CS)701', name: 'Human Resource Development and Organizational Behavior', credits: 2, type: 'theory', category: 'HUM Minor' },
      { code: 'HU702', name: 'Research Methodology & IPR', credits: 1, type: 'theory', category: 'HUM' },
      { code: 'CS793', name: 'Project-III', credits: 6, type: 'practical', category: 'Project' },
      { code: 'CS781', name: 'Internship (Minimum 1 Month)', credits: 2, type: 'practical', category: 'Internship' },
      { code: 'PR792', name: 'Rapid Prototyping Lab', credits: 2, type: 'practical', category: 'ENGG' },
    ]
  },
  {
    number: 8,
    name: "Eighth Semester",
    subjects: [
      { code: 'CS881', name: 'Internship/Entrepreneurship', credits: 6, type: 'practical', category: 'Internship' },
      { code: 'CS882', name: 'Grand Viva', credits: 2, type: 'practical', category: 'Viva' },
    ]
  }
];

export const gradeMapping = [
  { minMarks: 90, maxMarks: 100, grade: 'O', gradePoint: 10, color: 'success' },
  { minMarks: 80, maxMarks: 89, grade: 'E', gradePoint: 9, color: 'info' },
  { minMarks: 70, maxMarks: 79, grade: 'A', gradePoint: 8, color: 'accent' },
  { minMarks: 60, maxMarks: 69, grade: 'B', gradePoint: 7, color: 'primary' },
  { minMarks: 50, maxMarks: 59, grade: 'C', gradePoint: 6, color: 'warning' },
  { minMarks: 40, maxMarks: 49, grade: 'D', gradePoint: 5, color: 'muted' },
  { minMarks: 0, maxMarks: 39, grade: 'F', gradePoint: 0, color: 'destructive' },
];

export function marksToGrade(marks: number) {
  const mapping = gradeMapping.find(
    (m) => marks >= m.minMarks && marks <= m.maxMarks
  );
  return mapping || gradeMapping[gradeMapping.length - 1];
}
