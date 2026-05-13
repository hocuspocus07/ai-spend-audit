import {
  AuditRule,
} from '../types';

export const OverprovisionedTeamRule: AuditRule = {
  id: 'overprovisioned-team',

  applies(tool) {
    return (
      tool.seats <= 2 &&
      ['team', 'business'].includes(tool.tier)
    );
  },

  generate(tool) {
    const estimatedProSpend = 20 * tool.seats;
    const savings = tool.monthlySpend - estimatedProSpend;

    return {
      ruleId: 'overprovisioned-team',
      category: 'downgrade',
      action: 'Downgrade to individual Pro plans',
      savings: Math.max(0, savings),
      confidence: 0.95,
      reasoning: `Your organization only has ${tool.seats} active seats. Team collaboration and admin features are unlikely to justify the premium pricing.`
    };
  },
};