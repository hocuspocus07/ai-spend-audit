'use client';

import { AlertCircle, ArrowRight, DollarSign, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AuditRecommendation } from '@/lib/types';
import { cn } from '@/lib/utils';

interface AuditResultsProps {
    results: AuditRecommendation[];
    onNext: () => void;
    onPrevious: () => void;
}

export function AuditResults({ results, onNext, onPrevious }: AuditResultsProps) {
    const totalMonthlySavings = results.reduce((sum, r) => sum + r.monthlySavings, 0);
    const totalAnnualSavings = results.reduce((sum, r) => sum + r.annualSavings, 0);
    const hasHighSavings = totalMonthlySavings > 500;

    return (
        <div className="space-y-6">
            {/* High Savings Hero Banner */}
            {hasHighSavings && (
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 border-2 border-emerald-200 dark:border-emerald-800/50 p-8">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl" />
                    </div>
                    <div className="relative space-y-3">
                        <div className="flex items-center gap-2">
                            <TrendingDown className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-sm font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                                Significant Opportunity
                            </span>
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-3xl font-bold tracking-tight text-emerald-900 dark:text-emerald-100">
                                ${totalMonthlySavings.toLocaleString('en-US', { maximumFractionDigits: 0 })}/mo
                            </h2>
                            <p className="text-sm text-emerald-700 dark:text-emerald-300">
                                You can save ${totalAnnualSavings.toLocaleString('en-US', { maximumFractionDigits: 0 })}/year by optimizing your AI stack
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Result Cards */}
            <div className="space-y-4">
                {results.map((result, idx) => (
                    <Card key={idx} className="overflow-hidden border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                        <CardContent className="p-6">
                            <div className="grid gap-6 md:grid-cols-3 md:items-center">
                                {/* Current Tool */}
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                                        Current Tool
                                    </p>
                                    <div className="space-y-1">
                                        <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                                            {result.toolName}
                                        </p>
                                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                            ${result.currentSpend.toLocaleString('en-US', { maximumFractionDigits: 2 })}/mo
                                        </p>
                                    </div>
                                </div>

                                {/* Arrow Separator */}
                                <div className="hidden md:flex justify-center">
                                    <ArrowRight className="h-5 w-5 text-zinc-300 dark:text-zinc-700" />
                                </div>

                                {/* Recommended Action */}
                                <div className="space-y-2 md:col-span-1">
                                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                                        Recommended Action
                                    </p>
                                    <div className="space-y-2">
                                        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                            {result.recommendedAction}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge
                                                variant="secondary"
                                                className={cn(
                                                    "capitalize",
                                                    // Amber for warnings/reductions
                                                    result.category === 'downgrade' && 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',

                                                    // Blue for lateral moves/swaps
                                                    result.category === 'vendor-switch' && 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',

                                                    // Purple for technical changes
                                                    result.category === 'api-migration' && 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400',

                                                    // Emerald for efficiency/cleanups
                                                    result.category === 'consolidation' && 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',

                                                    // Cyan for financial optimization
                                                    result.category === 'credit-arbitrage' && 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400',
                                                )}
                                            >
                                                {/* Replace hyphens with spaces for the UI display */}
                                                {result.category.replace('-', ' ')}
                                            </Badge>
                                            <Badge variant="outline" className="text-xs">
                                                {(result.confidence * 100).toFixed(0)}% confidence
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                {/* Savings */}
                                <div className="space-y-2 md:col-span-1">
                                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                                        Monthly Savings
                                    </p>
                                    <div className="space-y-1">
                                        <div className="flex items-baseline gap-2">
                                            <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                                {result.monthlySavings.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                                            </p>
                                        </div>
                                        <p className="text-xs text-zinc-600 dark:text-zinc-400">
                                            ${result.annualSavings.toLocaleString('en-US', { maximumFractionDigits: 0 })}/year
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Reasoning */}
                            <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                                <div className="flex gap-3">
                                    <AlertCircle className="h-4 w-4 text-zinc-400 dark:text-zinc-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                        {result.reasoning}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Navigation */}
            <div className="flex gap-4 pt-4">
                <Button
                    variant="outline"
                    onClick={onPrevious}
                    className="h-12 rounded-xl px-8 font-bold"
                >
                    Back
                </Button>
                <Button
                    onClick={onNext}
                    className="h-12 rounded-xl px-8 font-bold flex-1 md:flex-none"
                >
                    Next Step
                </Button>
            </div>
        </div>
    );
}
