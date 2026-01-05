import { Card } from "@/components/ui/card";
import { gradeMapping } from "@/data/curriculum";

export function GradeTable() {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-semibold mb-3">Grade Mapping (MAKAUT)</h3>
      <div className="space-y-1">
        {gradeMapping.map((grade) => (
          <div key={grade.grade} className="flex items-center justify-between text-xs py-1.5 px-2 rounded hover:bg-muted/50 transition-colors">
            <span className="text-muted-foreground font-medium">
              {grade.minMarks}–{grade.maxMarks}
            </span>
            <div className="flex items-center gap-3">
              <span className="font-bold text-foreground">{grade.grade}</span>
              <span className={`w-8 text-center font-bold ${
                grade.gradePoint === 10 ? 'text-success' :
                grade.gradePoint === 9 ? 'text-info' :
                grade.gradePoint === 8 ? 'text-accent' :
                grade.gradePoint === 7 ? 'text-primary' :
                grade.gradePoint === 6 ? 'text-warning' :
                grade.gradePoint === 5 ? 'text-muted-foreground' :
                'text-destructive'
              }`}>
                {grade.gradePoint}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
