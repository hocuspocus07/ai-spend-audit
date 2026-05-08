import { getSpendBenchmarkMultiplier } from './benchmark';
import { normalizeTool } from './normalize';
import { RULES } from './rules';
import { rankRecommendations } from './scorer';
import {
  AuditContext,
  AuditRecommendation,
  ToolInput,
  UseCase,
} from './types';

export const runAudit = (
  tools: ToolInput[],
  teamSize: number,
  useCase: UseCase
): AuditRecommendation[] => {
  const normalizedTools = tools.map(normalizeTool);

  const totalMonthlySpend = normalizedTools.reduce(
    (sum, tool) => sum + tool.monthlySpend,
    0
  );

  const spendPerEmployee =
    totalMonthlySpend / Math.max(teamSize, 1);

  const benchmarkMultiplier =
    getSpendBenchmarkMultiplier(spendPerEmployee);

  const context: AuditContext = {
    tools: normalizedTools,
    teamSize,
    useCase,
    totalMonthlySpend,
    spendPerEmployee,
  };

  return normalizedTools.map(tool => {
    const candidates = RULES
      .filter(rule => rule.applies(tool, context))
      .map(rule => rule.generate(tool, context));

    const best = rankRecommendations(candidates);

    if (!best) {
      return {
        toolName: tool.toolName,
        currentSpend: tool.monthlySpend,
        recommendedAction: 'Keep current setup',
        monthlySavings: 0,
        annualSavings: 0,
        confidence: 1,
        category: 'downgrade',
        reasoning:
          benchmarkMultiplier > 1.5
            ? `Your stack appears relatively efficient, though your AI spend per employee is ${benchmarkMultiplier}x above benchmark averages.`
            : 'Your current setup appears cost-efficient relative to comparable startup teams.',
      };
    }

    return {
      toolName: tool.toolName,
      currentSpend: tool.monthlySpend,
      recommendedAction: best.action,
      monthlySavings: Number(best.savings.toFixed(2)),
      annualSavings: Number((best.savings * 12).toFixed(2)),
      confidence: best.confidence,
      category: best.category,
      reasoning: best.reasoning,
    };
  });
};