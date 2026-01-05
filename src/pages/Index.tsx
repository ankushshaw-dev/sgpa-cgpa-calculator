import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { semesters } from '@/data/curriculum';
import { loadAllData } from '@/utils/storage';
import { Calculator, BookOpen, GraduationCap, TrendingUp, Briefcase } from 'lucide-react';
import { marksToGrade } from '@/data/curriculum';
export default function Index() {
  const allData = loadAllData();
  const calculateOverallCGPA = () => {
    let totalWeightedGP = 0;
    let totalCredits = 0;
    semesters.forEach(semester => {
      const semesterMarks = allData.semesters[semester.number];
      if (!semesterMarks) return;
      semester.subjects.forEach(subject => {
        const mark = semesterMarks[subject.code];
        if (typeof mark === 'number' && mark >= 0 && mark <= 100) {
          const {
            gradePoint
          } = marksToGrade(mark);
          totalWeightedGP += gradePoint * subject.credits;
          totalCredits += subject.credits;
        }
      });
    });
    return totalCredits > 0 ? totalWeightedGP / totalCredits : null;
  };
  const cgpa = calculateOverallCGPA();
  return <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Header */}
      <header className="bg-gradient-to-r from-primary via-primary to-accent text-primary-foreground shadow-xl">
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="h-12 w-12" />
            <h1 className="text-4xl md:text-5xl font-bold">MAKAUT R25 SGPA/CGPA Calculator</h1>
          </div>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            B.Tech CSE Curriculum · Calculate your SGPA & CGPA for all semesters
          </p>
          <div className="mt-4 text-sm opacity-80">
            Effective from 2025-26 admission batch
          </div>
        </div>
      </header>

      {/* CGPA Overview */}
      {cgpa !== null && <div className="container mx-auto px-4 -mt-10">
          <Card className="relative overflow-hidden border-2 border-teal-400 bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 shadow-2xl shadow-teal-500/30">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-500/20 via-transparent to-transparent" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-500/15 rounded-full blur-2xl" />
            
            <div className="relative p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center border-4 border-teal-300 shadow-lg shadow-teal-500/50">
                    <div className="text-center">
                      <div className="text-4xl font-black text-slate-900 drop-shadow-lg">
                        {cgpa.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div>
                  <div className="text-teal-400 text-sm font-medium uppercase tracking-wider mb-1">
                    Overall Performance
                  </div>
                  <div className="text-3xl font-bold text-white">
                    Your CGPA
                  </div>
                  <div className="text-slate-300 text-sm mt-1">
                    Based on completed semesters
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-center px-6 py-3 bg-teal-500/20 backdrop-blur-sm rounded-xl border border-teal-400/50">
                  <div className="text-2xl font-bold text-teal-400">
                    {cgpa >= 9 ? 'Outstanding' : cgpa >= 8 ? 'Excellent' : cgpa >= 7 ? 'Very Good' : cgpa >= 6 ? 'Good' : 'Average'}
                  </div>
                  <div className="text-slate-300 text-xs uppercase tracking-wider">Grade Status</div>
                </div>
              </div>
            </div>
          </Card>
        </div>}

      {/* Semesters Grid */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            Select Your Semester
          </h2>
          <p className="text-muted-foreground">
            Choose a semester to calculate SGPA and view detailed subject breakdown
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {semesters.map(semester => {
          const semesterMarks = allData.semesters[semester.number];
          const hasData = semesterMarks && Object.keys(semesterMarks).length > 0;
          const totalCredits = semester.subjects.reduce((sum, s) => sum + s.credits, 0);
          let semesterSGPA: number | null = null;
          if (hasData) {
            let totalWeightedGP = 0;
            let totalCreds = 0;
            semester.subjects.forEach(subject => {
              const mark = semesterMarks[subject.code];
              if (typeof mark === 'number' && mark >= 0 && mark <= 100) {
                const {
                  gradePoint
                } = marksToGrade(mark);
                totalWeightedGP += gradePoint * subject.credits;
                totalCreds += subject.credits;
              }
            });
            semesterSGPA = totalCreds > 0 ? totalWeightedGP / totalCreds : null;
          }
          return <Link key={semester.number} to={`/semester/${semester.number}`}>
                <Card className="p-6 hover:shadow-lg transition-all duration-200 hover:border-primary/50 h-full group">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-3xl font-bold text-primary group-hover:text-accent transition-colors">
                          Sem {semester.number}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {semester.subjects.length} subjects · {totalCredits} credits
                        </div>
                      </div>
                      <Calculator className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>

                    {semesterSGPA !== null && <div className="pt-3 border-t border-border">
                        <div className="text-xs text-muted-foreground mb-1">Your SGPA</div>
                        <div className="text-2xl font-bold text-accent">
                          {semesterSGPA.toFixed(2)}
                        </div>
                      </div>}

                    <Button className="w-full" variant={hasData ? "default" : "outline"}>
                      {hasData ? 'View & Edit' : 'Calculate SGPA'}
                    </Button>
                  </div>
                </Card>
              </Link>;
        })}
        </div>
      </main>

      {/* Placement Checker CTA */}
      <div className="container mx-auto px-4 pb-8">
        <Link to="/placement">
          <Card className="p-6 bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10 border-accent/30 hover:shadow-lg hover:border-accent/50 transition-all duration-200 cursor-pointer group">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/20 rounded-xl group-hover:bg-accent/30 transition-colors">
                  <Briefcase className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                    Placement Eligibility Checker
                  </h3>
                  <p className="text-muted-foreground">
                    Check your eligibility for 100+ top companies including Google, Microsoft, TCS, Infosys &amp; more
                  </p>
                </div>
              </div>
              <Button variant="default" className="gap-2">
                Check Now
                <Briefcase className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </Link>
      </div>

      {/* Info Section */}
      <div className="container mx-auto px-4 pb-12">
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <h3 className="font-bold text-lg mb-3">About This Calculator</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <p className="mb-2">
                ✓ Based on MAKAUT R25 B.Tech CSE curriculum structure
              </p>
              <p className="mb-2">
                ✓ Automatic grade calculation (O/E/A/B/C/D/F)
              </p>
              <p>
                ✓ Data saved locally in your browser
              </p>
            </div>
            <div>
              <p className="mb-2">
                ✓ Overall CGPA tracking across all semesters
              </p>
              <p className="mb-2">
                ✓ Detailed subject-wise grade breakdown
              </p>
              <p>
                ✓ Responsive design for mobile & desktop
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-border">
        <div className="text-center text-sm text-muted-foreground">
          <p className="font-semibold text-foreground mb-1">Created by: Ankush Shaw & Ashish Chaurasia</p>
          <p>Narula Institute of Technology — CSE 1D</p>
        </div>
      </footer>
    </div>;
}
