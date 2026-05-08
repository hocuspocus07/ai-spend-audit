import { NormalizedTool, PlanTier, ToolInput } from './types';

const normalizeVendor = (toolName: string): string => {
  const name = toolName.toLowerCase();

  if (name.includes('cursor')) return 'cursor';
  if (name.includes('copilot')) return 'copilot';
  if (name.includes('claude')) return 'claude';
  if (name.includes('chatgpt')) return 'chatgpt';
  if (name.includes('windsurf')) return 'windsurf';
  if (name.includes('gemini')) return 'gemini';
  if (name.includes('anthropic')) return 'anthropic-api';
  if (name.includes('openai')) return 'openai-api';

  return 'unknown';
};

const normalizeTier = (plan: string): PlanTier => {
  const value = plan.toLowerCase();

  if (value.includes('free')) return 'free';
  if (value.includes('plus')) return 'plus';
  if (value.includes('pro')) return 'pro';
  if (value.includes('team')) return 'team';
  if (value.includes('business')) return 'business';
  if (value.includes('enterprise')) return 'enterprise';
  if (value.includes('max')) return 'max';
  if (value.includes('api')) return 'api';

  return 'pro';
};

export const normalizeTool = (
  tool: ToolInput
): NormalizedTool => {
  return {
    ...tool,
    vendor: normalizeVendor(tool.toolName),
    tier: normalizeTier(tool.plan),
  };
};