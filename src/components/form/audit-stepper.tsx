import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuditStepperProps {
  currentStep: number;
}

const steps = [
  { id: 1, title: 'Stack' },
  { id: 2, title: 'Usage' },
  { id: 3, title: 'Review' },
];

export function AuditStepper({ currentStep }: AuditStepperProps) {
  return (
    <div className="relative flex w-full justify-between gap-4 py-4">
      {steps.map((step, idx) => {
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;

        return (
          <div key={step.id} className="relative flex flex-1 flex-col items-center gap-3">
            <div
              className={cn(
                "z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                isCompleted ? "border-emerald-500 bg-emerald-500 text-white" : 
                isActive ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-black" : 
                "border-zinc-200 bg-white text-zinc-400 dark:border-zinc-800 dark:bg-zinc-950"
              )}
            >
              {isCompleted ? <Check className="h-5 w-5" /> : <span className="text-sm font-bold">{step.id}</span>}
            </div>
            <span className={cn("text-xs font-bold uppercase tracking-widest", isActive ? "text-zinc-900 dark:text-white" : "text-zinc-400")}>
              {step.title}
            </span>
            {idx !== steps.length - 1 && (
              <div className={cn(
                "absolute left-[50%] top-5 z-0 h-0.5 w-full",
                isCompleted ? "bg-emerald-500" : "bg-zinc-100 dark:bg-zinc-800"
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}