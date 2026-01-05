interface SemesterMarks {
  [subjectCode: string]: number;
}

interface StoredData {
  semesters: {
    [semesterNumber: number]: SemesterMarks;
  };
}

const STORAGE_KEY = 'makaut-sgpa-calculator';

export function saveSemesterMarks(semesterNumber: number, marks: SemesterMarks) {
  const data = loadAllData();
  data.semesters[semesterNumber] = marks;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadSemesterMarks(semesterNumber: number): SemesterMarks {
  const data = loadAllData();
  return data.semesters[semesterNumber] || {};
}

export function loadAllData(): StoredData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
  }
  return { semesters: {} };
}

export function clearSemesterMarks(semesterNumber: number) {
  const data = loadAllData();
  delete data.semesters[semesterNumber];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function clearAllData() {
  localStorage.removeItem(STORAGE_KEY);
}
