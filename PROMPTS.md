# Prompts Documentation

## AI-Generated Personalized Summary Prompt

**Purpose**: Generate concise, personalized 100-word insights about AI tool subscription optimization based on audit results.

**Model**: Claude 3.5 Sonnet (Anthropic)

---

### System Prompt

```
You are a concise AI optimization consultant. Generate a personalized, actionable summary (~100 words) for a user about their AI tool subscription. Be specific to their tool and situation. Focus on practical next steps. Tone: professional, encouraging, non-salesy.
```

---

### User Prompt Template

```
User Details:
- Current Tool: {toolName}
- Monthly Spend: ${monthlySpend}
- Recommended Action: {recommendedAction}
- Potential Monthly Savings: ${monthlySavings}
- Reasoning: {reasoning}

Generate a personalized summary (~100 words) explaining why they should consider this recommendation, what they'll gain, and any next steps they should take. Be specific and actionable.
```

---

### Prompt Variables

- **{toolName}**: The AI tool being audited (e.g., "ChatGPT", "Claude", "GitHub Copilot")
- **{monthlySpend}**: Current monthly subscription cost in USD
- **{recommendedAction}**: The specific action recommended (e.g., "Downgrade to Plus", "Switch to Claude")
- **{monthlySavings}**: Potential monthly savings in USD
- **{reasoning}**: The audit engine's reasoning for the recommendation

---

### Example Output

**Input:**
```
User Details:
- Current Tool: ChatGPT
- Monthly Spend: $20
- Recommended Action: Downgrade to free tier with Claude Free
- Potential Monthly Savings: $20
- Reasoning: Your team primarily uses ChatGPT for brainstorming and research, which Claude Free can handle effectively. Plus, Claude's free tier has a higher context window.
```

**Expected Output:**
```
Your ChatGPT Plus investment isn't wasted, but your team's workflow suggests significant opportunity for cost optimization. Since you're primarily using ChatGPT for research and brainstorming—tasks where Claude's free tier excels—consolidating to Claude could eliminate this $20/month expense while potentially improving results thanks to better context handling. Test Claude Free with your team for two weeks to validate compatibility, then adjust your subscriptions accordingly. This move alone could save your team $240 annually.
```

---

### Fallback Strategy

If the Anthropic API is unavailable or rate-limited, the system uses tool-specific template summaries. These are hardcoded fallbacks that provide contextual guidance based on the tool being audited, ensuring users always receive helpful insights even if the LLM is unreachable.

**Fallback Implementation**: See `src/app/api/generate-summary/route.ts` for template definitions per tool (ChatGPT, Claude, GitHub Copilot, Cursor, Gemini).

---

## Notes

- **Token Limit**: Max 150 tokens to keep output concise (~100 words)
- **Rate Limiting**: API includes fallback mechanism for failed requests
- **Data Privacy**: No personal data is stored; summaries are generated on-demand
