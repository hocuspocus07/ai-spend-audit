import { AuditRule } from '../types';

export const CodingToolSwapRule: AuditRule = {
  id: 'coding-tool-swap',

  applies(tool, context) {
    return (
      context.useCase === 'coding' &&
      ['chatgpt', 'claude'].includes(tool.vendor) &&
      ['plus', 'pro'].includes(tool.tier)
    );
  },

  generate(tool) {
    const optimizedSpend = 10 * tool.seats;

    return {
      ruleId: 'coding-tool-swap',
      category: 'vendor-switch',
      action: 'Switch to GitHub Copilot Pro',
      savings: Math.max(0, tool.monthlySpend - optimizedSpend),
      confidence: 0.82,
      reasoning:
        'For IDE-centric coding workflows, GitHub Copilot provides tighter editor integration and lower cost than general-purpose conversational subscriptions.',
    };
  },
};