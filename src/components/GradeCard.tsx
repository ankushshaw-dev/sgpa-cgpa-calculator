import { Card } from "@/components/ui/card";

interface GradeCardProps {
  grade: string;
  gradePoint: number;
  color: string;
}

export function GradeCard({ grade, gradePoint, color }: GradeCardProps) {
  const colorClasses = {
    success: 'bg-success/10 text-success border-success/20',
    info: 'bg-info/10 text-info border-info/20',
    accent: 'bg-accent/10 text-accent border-accent/20',
    primary: 'bg-primary/10 text-primary border-primary/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    muted: 'bg-muted text-muted-foreground border-muted',
    destructive: 'bg-destructive/10 text-destructive border-destructive/20',
  };

  return (
    <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-bold border ${colorClasses[color as keyof typeof colorClasses]}`}>
      <span>{grade}</span>
      <span className="opacity-70">({gradePoint})</span>
    </div>
  );
}
