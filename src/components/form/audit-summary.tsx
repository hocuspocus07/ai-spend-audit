'use client';

import { useEffect, useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AuditRecommendation } from '@/lib/types';

interface AuditSummaryProps {
  result: AuditRecommendation;
}

export function AuditSummary({ result }: AuditSummaryProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch('/api/generate-summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            toolName: result.toolName,
            monthlySpend: result.currentSpend,
            auditResult: result,
          }),
        });

        const data = await response.json();
        setSummary(data.summary);
        setIsFallback(data.fallback || false);
      } catch (error) {
        console.error('Error fetching summary:', error);
        setSummary(
          `Unable to generate a personalized summary at this time. ${result.recommendedAction}: Your team could save $${result.monthlySavings}/month by following this recommendation.`
        );
        setIsFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [result]);

  if (loading) {
    return (
      <Card className="border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Loader2 className="h-5 w-5 text-blue-600 dark:text-blue-400 animate-spin" />
            <p className="text-sm text-blue-700 dark:text-blue-300">Generating personalized insights...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex gap-3">
          <Sparkles className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              AI-Generated Insight {isFallback && '(Fallback)'}
            </p>
            <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {summary}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
