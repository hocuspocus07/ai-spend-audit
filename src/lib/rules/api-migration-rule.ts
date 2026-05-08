import { PRICING } from '../pricing';
import { AuditRule } from '../types';

export const ApiMigrationRule: AuditRule = {
  id: 'api-migration',

  applies(tool, context) {
    return (
      tool.monthlySpend >= 100 &&
      ['data', 'mixed'].includes(context.useCase)
    );
  },

  generate(tool) {
    const estimatedApiSpend =
      PRICING.apiBenchmarks.moderateDeveloper;

    return {
      ruleId: 'api-migration',
      category: 'api-migration',
      action: 'Move to direct API billing',
      savings: Math.max(
        0,
        tool.monthlySpend - estimatedApiSpend
      ),
      confidence: 0.78,
      reasoning:
        'Data-heavy workflows often achieve lower effective cost through token-based API pricing rather than flat-rate UI subscriptions.',
    };
  },
};