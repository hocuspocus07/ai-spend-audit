import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface AuditProgressProps {
  currentStep: number;
  totalSteps: number;
  progress: number;
}

export function AuditProgress({ currentStep, totalSteps, progress }: AuditProgressProps) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-6 flex items-end justify-between">
        <div className="space-y-2">
          <Badge variant="outline" className="rounded-full font-mono text-[10px] uppercase tracking-wider">
            Step {currentStep} of {totalSteps}
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight">Audit Progress</h2>
        </div>
        <div className="text-right">
          <span className="text-4xl font-black tabular-nums tracking-tighter text-emerald-500">
            {progress}%
          </span>
        </div>
      </div>
      <Progress value={progress} className="h-3 bg-zinc-100 dark:bg-zinc-800" />
    </div>
  );
}