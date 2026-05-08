import { AuditRule } from '../types';

export const CreditArbitrageRule: AuditRule = {
  id: 'credit-arbitrage',

  applies(tool, context) {
    return context.totalMonthlySpend >= 500;
  },

  generate(tool) {
    const estimatedSavings = tool.monthlySpend * 0.2;

    return {
      ruleId: 'credit-arbitrage',
      category: 'credit-arbitrage',
      action: 'Purchase discounted AI credits through Credex',
      savings: estimatedSavings,
      confidence: 0.65,
      reasoning:
        'Organizations with substantial recurring AI infrastructure spend are often eligible for discounted enterprise credit allocations.',
    };
  },
};