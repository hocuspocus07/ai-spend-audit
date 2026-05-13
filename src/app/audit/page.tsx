'use client';

import { useState } from "react";
import { AuditForm } from "@/components/form/audit-form";
import { AuditStepper } from "@/components/form/audit-stepper";
import { AuditProgress } from "@/components/form/audit-progress";
import { AuditResults } from "@/components/form/audit-results";
import { AuditRecommendation } from "@/lib/types";

export default function AuditPage() {
  const [auditState, setAuditState] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("auditState");

      if (saved) {
        try {
          const parsed = JSON.parse(saved);

          if (
            parsed.step === 2 &&
            parsed.results &&
            Array.isArray(parsed.results)
          ) {
            return {
              currentStep: 2,
              results: parsed.results as AuditRecommendation[],
            };
          }

          if (parsed.step === 1) {
            return {
              currentStep: 1,
              results: null,
            };
          }
        } catch {
          localStorage.removeItem("auditState");
        }
      }
    }

    return {
      currentStep: 1,
      results: null,
    };
  });

  const { currentStep, results } = auditState;

  const handleAuditSubmit = async (data: AuditRecommendation[]) => {
    setAuditState({
      currentStep: 2,
      results: data,
    });
    localStorage.setItem('auditState', JSON.stringify({ step: 2, results: data }));
  };

  const handleNext = () => {
    const newStep = currentStep + 1;
    setAuditState(prev => ({ ...prev, currentStep: newStep }));
    // Only persist valid steps (1-2)
    if (newStep <= 2) {
      localStorage.setItem('auditState', JSON.stringify({ step: newStep, results }));
    }
  };

  const handlePrevious = () => {
    const newStep = currentStep - 1;
    setAuditState(prev => ({ ...prev, currentStep: newStep }));
    // Only persist valid steps
    if (newStep >= 1 && newStep <= 2) {
      localStorage.setItem('auditState', JSON.stringify({ step: newStep, results }));
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-4 py-10 text-zinc-950 dark:text-zinc-50 transition-colors">
      <div className="mx-auto max-w-4xl space-y-6">
        <AuditStepper currentStep={currentStep} />

        {currentStep === 1 && <AuditForm onSubmit={handleAuditSubmit} />}
        {currentStep === 2 && results && <AuditResults results={results} onNext={handleNext} onPrevious={handlePrevious} />}

        <AuditProgress
          currentStep={currentStep}
          totalSteps={3}
          progress={currentStep === 1 ? 33 : currentStep === 2 ? 66 : 100}
        />
      </div>
    </div>
  );
}