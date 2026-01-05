import { Card } from "@/components/ui/card";
import { Subject } from "@/data/curriculum";
import { marksToGrade } from "@/data/curriculum";

interface SGPAResultProps {
  sgpa: number | null;
  subjects: Subject[];
  marks: { [key: string]: number };
}

export function SGPAResult({ sgpa, subjects, marks }: SGPAResultProps) {
  const getMessage = (sgpa: number) => {
    if (sgpa >= 9) return { text: 'Outstanding! 🌟 Excellent performance!', color: 'text-success' };
    if (sgpa >= 8) return { text: 'Great work! 💪 Keep it up!', color: 'text-info' };
    if (sgpa >= 7) return { text: 'Good job! 👍 Aim higher next time.', color: 'text-accent' };
    if (sgpa >= 6) return { text: 'Passed ✓ Room for improvement.', color: 'text-primary' };
    return { text: 'Need to work harder 📚 You can do it!', color: 'text-warning' };
  };

  const message = sgpa !== null ? getMessage(sgpa) : null;

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">Your SGPA</div>
          <div className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {sgpa !== null ? sgpa.toFixed(2) : '—'}
          </div>
          {message && (
            <div className={`text-sm font-semibold ${message.color}`}>
              {message.text}
            </div>
          )}
        </div>

        {sgpa !== null && subjects.length > 0 && (
          <div className="pt-4 border-t border-border">
            <div className="text-xs font-medium text-muted-foreground mb-3">Grade Breakdown</div>
            <div className="space-y-2">
              {subjects.map((subject) => {
                const mark = marks[subject.code];
                if (typeof mark !== 'number') return null;
                const grade = marksToGrade(mark);
                return (
                  <div key={subject.code} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground font-mono">{subject.code}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-foreground font-semibold">{mark}</span>
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        grade.gradePoint === 10 ? 'bg-success/20 text-success' :
                        grade.gradePoint === 9 ? 'bg-info/20 text-info' :
                        grade.gradePoint === 8 ? 'bg-accent/20 text-accent' :
                        grade.gradePoint === 7 ? 'bg-primary/20 text-primary' :
                        grade.gradePoint === 6 ? 'bg-warning/20 text-warning' :
                        grade.gradePoint === 5 ? 'bg-muted text-muted-foreground' :
                        'bg-destructive/20 text-destructive'
                      }`}>
                        {grade.grade}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
