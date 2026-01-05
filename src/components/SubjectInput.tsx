import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Subject } from "@/data/curriculum";
import { marksToGrade } from "@/data/curriculum";
import { GradeCard } from "./GradeCard";

interface SubjectInputProps {
  subject: Subject;
  value: number | '';
  onChange: (code: string, value: number | '') => void;
}

export function SubjectInput({ subject, value, onChange }: SubjectInputProps) {
  const grade = typeof value === 'number' && value >= 0 && value <= 100 
    ? marksToGrade(value) 
    : null;

  return (
    <div className="space-y-2">
      <Label htmlFor={subject.code} className="text-sm font-semibold">
        <div className="flex items-center justify-between">
          <span className="text-foreground">{subject.code}</span>
          <span className="text-xs text-muted-foreground font-normal">
            {subject.credits} {subject.credits === 1 ? 'credit' : 'credits'}
          </span>
        </div>
        <div className="text-xs font-normal text-muted-foreground mt-0.5">
          {subject.name}
        </div>
      </Label>
      <div className="flex gap-2">
        <Input
          id={subject.code}
          type="number"
          min="0"
          max="100"
          step="0.01"
          value={value}
          onChange={(e) => {
            const val = e.target.value;
            onChange(subject.code, val === '' ? '' : parseFloat(val));
          }}
          placeholder="0-100"
          className="flex-1"
        />
        <div className="flex items-center min-w-[100px]">
          {grade ? (
            <GradeCard grade={grade.grade} gradePoint={grade.gradePoint} color={grade.color} />
          ) : (
            <span className="text-sm text-muted-foreground">—</span>
          )}
        </div>
      </div>
    </div>
  );
}
