'use client';

import { useState, useEffect } from "react";
import { AuditForm } from "@/components/form/audit-form";
import { AuditStepper } from "@/components/form/audit-stepper";
import { AuditProgress } from "@/components/form/audit-progress";
import { AuditResults } from "@/components/form/audit-results";
import { AuditRecommendation } from "@/lib/types";

export default function AuditPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [results, setResults] = useState<AuditRecommendation[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('auditState');
    if (saved) {
      try {
        const { step, results: savedResults } = JSON.parse(saved);
        if (step === 2 && savedResults && Array.isArray(savedResults)) {
          setCurrentStep(2);
          setResults(savedResults);
        } else if (step === 1) {
          setCurrentStep(1);
        } else {
          localStorage.removeItem('auditState');
          setCurrentStep(1);
        }
      } catch (error) {
        localStorage.removeItem('auditState');
        setCurrentStep(1);
      }
    }
  }, []);

  const handleAuditSubmit = async (data: AuditRecommendation[]) => {
    setResults(data);
    setCurrentStep(2);
    localStorage.setItem('auditState', JSON.stringify({ step: 2, results: data }));
  };

  const handleNext = () => {
    const newStep = currentStep + 1;
    setCurrentStep(newStep);
    // Only persist valid steps (1-2)
    if (newStep <= 2) {
      localStorage.setItem('auditState', JSON.stringify({ step: newStep, results }));
    }
  };

  const handlePrevious = () => {
    const newStep = currentStep - 1;
    setCurrentStep(newStep);
    // Only persist valid steps
    if (newStep >= 1 && newStep <= 2) {
      localStorage.setItem('auditState', JSON.stringify({ step: newStep, results }));
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setResults(null);
    localStorage.removeItem('auditState');
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