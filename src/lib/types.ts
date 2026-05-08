
export type ToolName =
  | 'Cursor'
  | 'GitHub Copilot'
  | 'Claude'
  | 'ChatGPT'
  | 'Windsurf'
  | 'Gemini'
  | 'Anthropic API Direct'
  | 'OpenAI API Direct';

export type UseCase =
  | 'coding'
  | 'writing'
  | 'data'
  | 'research'
  | 'mixed';

export type PlanTier =
  | 'free'
  | 'pro'
  | 'plus'
  | 'team'
  | 'business'
  | 'enterprise'
  | 'max'
  | 'api';

export type RecommendationCategory =
  | 'downgrade'
  | 'vendor-switch'
  | 'api-migration'
  | 'consolidation'
  | 'credit-arbitrage';

export interface ToolInput {
  toolName: ToolName;
  plan: string;
  monthlySpend: number;
  seats: number;
}

export interface NormalizedTool extends ToolInput {
  vendor: string;
  tier: PlanTier;
}

export interface AuditContext {
  tools: NormalizedTool[];
  teamSize: number;
  useCase: UseCase;
  totalMonthlySpend: number;
  spendPerEmployee: number;
}

export interface CandidateRecommendation {
  ruleId: string;
  category: RecommendationCategory;
  action: string;
  savings: number;
  confidence: number;
  reasoning: string;
}

export interface AuditRecommendation {
  toolName: ToolName;
  currentSpend: number;
  recommendedAction: string;
  monthlySavings: number;
  annualSavings: number;
  confidence: number;
  category: RecommendationCategory;
  reasoning: string;
}

export interface AuditRule {
  id: string;

  applies: (
    tool: NormalizedTool,
    context: AuditContext
  ) => boolean;

  generate: (
    tool: NormalizedTool,
    context: AuditContext
  ) => CandidateRecommendation;
}