import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Hardcoded fallback templates indexed by tool name
const FALLBACK_TEMPLATES: Record<string, (spend: number, savings: number) => string> = {
  ChatGPT: (spend: number, savings: number) => 
    `Your ChatGPT Plus subscription at $${spend}/month is a solid foundation for general AI tasks. However, we've identified opportunities to optimize. By consolidating to ${savings > 50 ? 'Claude or Gemini' : 'a more selective tool'} based on your team's workflow, you could reduce costs to $${(spend - savings).toFixed(0)}/month without sacrificing quality. Consider your team's actual usage patterns—many teams pay for features they barely use. Evaluating your use case against market alternatives could yield significant savings.`,
  
  Claude: (spend: number, savings: number) =>
    `Your Claude subscription at $${spend}/month shows strong value for complex reasoning tasks. Yet your team may benefit from a hybrid approach combining Claude for specialized work with a budget-friendly tool for routine tasks. This strategy typically reduces overall spend by 30-40% while maintaining quality. Review whether all team members need full Claude access, or if tiered access could optimize costs while preserving performance for critical tasks.`,
  
  'GitHub Copilot': (spend: number, savings: number) =>
    `At $${spend}/month, GitHub Copilot is excellent for coding acceleration across your team. However, we found potential savings by combining it with open-source alternatives for specific workflows or limiting enterprise licenses to power users. This selective approach often cuts costs by ${savings > 0 ? '25-35%' : '15-20%'} while maintaining developer velocity. Audit actual usage to identify underutilized seats and reallocate to high-impact developers.`,
  
  Cursor: (spend: number, savings: number) =>
    `Your Cursor IDE investment at $${spend}/month reflects a modern development approach. Yet most teams could reduce costs by $${savings.toFixed(0)}/month by combining Cursor with VS Code plugins or limiting Pro access to senior developers. Evaluate whether your entire team needs full Cursor licenses, or if a tiered model would better serve your budget while maintaining productivity.`,
  
  Gemini: (spend: number, savings: number) =>
    `Gemini at $${spend}/month offers compelling value for multimodal AI tasks and large context windows. However, consolidating with ChatGPT or Claude for your primary use cases often yields 20-30% cost savings. Analyze your team's actual Gemini usage—many teams maintain it for niche features while overlapping needs exist in their primary tool. Selective deployment could reduce your bill to around $${(spend - savings).toFixed(0)}/month.`,
};

const DEFAULT_FALLBACK = (toolName: string, spend: number, savings: number) =>
  `Your ${toolName} subscription at $${spend}/month represents an investment in AI capabilities for your team. Based on our analysis, we've identified opportunities to optimize your stack and reduce costs by $${savings.toFixed(0)}/month. We recommend reviewing your team's actual usage patterns against market alternatives. By consolidating overlapping tools or leveraging open-source alternatives for specific tasks, you can maintain productivity while reducing expenses. Consider which features your team actively uses and prioritize those that deliver the highest ROI.`;

export async function POST(req: Request) {
  try {
    const { toolName, monthlySpend, auditResult } = await req.json();

    if (!toolName || monthlySpend === undefined || !auditResult) {
      return NextResponse.json(
        { error: 'Missing required fields: toolName, monthlySpend, auditResult' },
        { status: 400 }
      );
    }

    const systemPrompt = `You are a concise AI optimization consultant. Generate a personalized, actionable summary (~100 words) for a user about their AI tool subscription. Be specific to their tool and situation. Focus on practical next steps. Tone: professional, encouraging, non-salesy.`;

    const userPrompt = `User Details:
- Current Tool: ${toolName}
- Monthly Spend: $${monthlySpend}
- Recommended Action: ${auditResult.recommendedAction}
- Potential Monthly Savings: $${auditResult.monthlySavings}
- Reasoning: ${auditResult.reasoning}

Generate a personalized summary (~100 words) explaining why they should consider this recommendation, what they'll gain, and any next steps they should take. Be specific and actionable.`;

    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 150,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    const summary =
      message.content[0].type === 'text'
        ? message.content[0].text
        : DEFAULT_FALLBACK(toolName, monthlySpend, auditResult.monthlySavings);

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Error generating summary:', error);

    // Fallback to template-based summary
    const { toolName, monthlySpend, auditResult } = await req.json();
    const fallback =
      FALLBACK_TEMPLATES[toolName]?.(monthlySpend, auditResult.monthlySavings) ||
      DEFAULT_FALLBACK(toolName, monthlySpend, auditResult.monthlySavings);

    return NextResponse.json({
      summary: fallback,
      fallback: true,
      error: 'API rate limit or connection issue. Using fallback summary.',
    });
  }
}
