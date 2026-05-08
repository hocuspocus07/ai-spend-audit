import { AuditRule } from '../types';

export const ToolOverlapRule: AuditRule = {
  id: 'tool-overlap',

  applies(tool, context) {
    const overlappingTools = context.tools.filter(t =>
      ['chatgpt', 'claude', 'gemini'].includes(t.vendor)
    );

    return (
      context.teamSize <= 3 &&
      overlappingTools.length >= 3
    );
  },

  generate(tool) {
    return {
      ruleId: 'tool-overlap',
      category: 'consolidation',
      action: 'Consolidate overlapping AI subscriptions',
      savings: tool.monthlySpend * 0.5,
      confidence: 0.7,
      reasoning:
        'Small teams maintaining multiple premium conversational AI subscriptions typically experience diminishing productivity returns relative to cost.',
    };
  },
};