import { AuditForm } from "@/components/form/audit-form";
import { AuditStepper } from "@/components/form/audit-stepper";
import { AuditProgress } from "@/components/form/audit-progress";

export default function AuditPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-4 py-10 text-zinc-950 dark:text-zinc-50 transition-colors">
      <div className="mx-auto max-w-4xl space-y-6">
        <AuditStepper currentStep={1} />

        <AuditForm />

        <AuditProgress
          currentStep={1}
          totalSteps={3}
          progress={33}
        />
      </div>
    </div>
  );
}