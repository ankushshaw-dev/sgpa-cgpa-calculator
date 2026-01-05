import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SubjectInput } from '@/components/SubjectInput';
import { SGPAResult } from '@/components/SGPAResult';
import { GradeTable } from '@/components/GradeTable';
import { semesters } from '@/data/curriculum';
import { saveSemesterMarks, loadSemesterMarks, clearSemesterMarks } from '@/utils/storage';
import { marksToGrade } from '@/data/curriculum';
import { toast } from 'sonner';
import { ArrowLeft, Calculator, RotateCcw, Save } from 'lucide-react';

export default function SemesterCalculator() {
  const { semesterNumber } = useParams<{ semesterNumber: string }>();
  const semester = semesters.find((s) => s.number === parseInt(semesterNumber || '1'));

  const [marks, setMarks] = useState<{ [key: string]: number | '' }>({});
  const [sgpa, setSgpa] = useState<number | null>(null);

  useEffect(() => {
    if (semester) {
      const savedMarks = loadSemesterMarks(semester.number);
      setMarks(savedMarks);
    }
  }, [semester]);

  if (!semester) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">Semester Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested semester does not exist.</p>
          <Link to="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const handleMarksChange = (code: string, value: number | '') => {
    setMarks((prev) => ({ ...prev, [code]: value }));
  };

  const calculateSGPA = () => {
    const allFilled = semester.subjects.every((subject) => {
      const mark = marks[subject.code];
      return typeof mark === 'number' && mark >= 0 && mark <= 100;
    });

    if (!allFilled) {
      toast.error('Please fill marks for all subjects (0-100)');
      return;
    }

    let totalWeightedGP = 0;
    let totalCredits = 0;

    semester.subjects.forEach((subject) => {
      const mark = marks[subject.code] as number;
      const { gradePoint } = marksToGrade(mark);
      totalWeightedGP += gradePoint * subject.credits;
      totalCredits += subject.credits;
    });

    const calculatedSgpa = totalCredits > 0 ? totalWeightedGP / totalCredits : 0;
    setSgpa(calculatedSgpa);
    
    // Save to localStorage
    const savedMarks = Object.fromEntries(
      Object.entries(marks).filter(([_, value]) => typeof value === 'number')
    ) as { [key: string]: number };
    saveSemesterMarks(semester.number, savedMarks);
    
    toast.success(`SGPA calculated: ${calculatedSgpa.toFixed(2)}`);
  };

  const handleClear = () => {
    setMarks({});
    setSgpa(null);
    clearSemesterMarks(semester.number);
    toast.info('All marks cleared');
  };

  const totalCredits = semester.subjects.reduce((sum, s) => sum + s.credits, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary via-primary to-accent text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <Link to="/" className="inline-flex items-center text-sm font-medium mb-2 hover:underline">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to All Semesters
          </Link>
          <h1 className="text-3xl font-bold">{semester.name}</h1>
          <p className="text-sm opacity-90 mt-1">
            MAKAUT R25 B.Tech CSE · Total Credits: {totalCredits}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr_400px] gap-6">
          {/* Left: Input Form */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Enter Marks (Out of 100)
              </h2>
              
              <div className="space-y-4">
                {semester.subjects.map((subject) => (
                  <SubjectInput
                    key={subject.code}
                    subject={subject}
                    value={marks[subject.code] || ''}
                    onChange={handleMarksChange}
                  />
                ))}
              </div>

              <div className="flex gap-3 mt-6">
                <Button onClick={calculateSGPA} className="flex-1">
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate SGPA
                </Button>
                <Button onClick={handleClear} variant="outline">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Clear
                </Button>
              </div>
            </Card>
          </div>

          {/* Right: Results & Grade Table */}
          <div className="space-y-6">
            <SGPAResult 
              sgpa={sgpa} 
              subjects={semester.subjects}
              marks={marks as { [key: string]: number }}
            />
            <GradeTable />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-12 border-t border-border">
        <div className="text-center text-sm text-muted-foreground">
          <p className="font-semibold text-foreground mb-1">Created by: Ankush Shaw & Ashish Chaurasia</p>
          <p>Narula Institute of Technology — CSE 1D</p>
        </div>
      </footer>
    </div>
  );
}
