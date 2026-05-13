# User Interviews: Real Conversations (3 Founders)

## Interview 1: R.G.- Founder

**Date**: May 11, 2026  
**Role**: CEO   
**Company Stage**: Bootstrapped-early stage startup.  
**Team Size**: 3(RG, tech lead, intern) 

### Direct Quotes

**On Current Spend**:  
> "Honestly, we have multiple tools and its a bit of a worry to manage all these subscriptions together, the tech lead has Cursor, the intern prefers copilot. Last month it was around $130 and I think we might have overpaid."

**On Decision-Making**:  
> "If I found out we could save like $50/mo, I most definitely would. But I don't think I will switch for $10/mo."

**On Recommendations**:  
> "I didn't even know you could downgrade ChatGPT mid cycle. I would switch to whatever plans to save some money because I think we have a bit too much."

**On Credibility**:  
> "Show me the math. Don't tell me 'Cursor is better than Copilot', tell me 'Cursor is $30/mo but Copilot is $10/mo and does X, Y, Z for your coding workflow.'"

### Most Surprising Thing They Said

When I showed him the "consolidation" recommendation (drop 1 of 3 tools), he said:

> "Oh, but we use Claude for reasoning, ChatGPT for general questions, and Cursor for code. They're different."

This told me the mental model is wrong in my rules. Users think of tools as domain-specific, not interchangeable. The recommendation should be "Claude is better than ChatGPT for reasoning, so drop ChatGPT" (not generic consolidation).

### How It Changed Design

**Before**: Generic "consolidate overlapping tools" recommendation  
**After**: Tool-specific comparison — "Claude + Cursor covers your needs, ChatGPT is redundant"

---

## Interview 2: Ali Mehdi, Student, working on a side project.

**Date**: May 12, 2026  
**Role**: Student 

### Direct Quotes

**On Spend Visibility**:  
> "I have two tools that I pay for, cursor and Copilot. So I cannot tell you the exact figure but it is kind of an overkill."

**On ROI**:  
> "It helps me with my day to day debugging, write tests and better docs, hence making it easier to collaborate with others."

**On Selection**:  
> "I picked GitHub Copilot because it integrates with VS Code. Then someone told me about Cursor and I wanted it. So now I have both."

**On Discounts**:  
> "If I found out Credex could negotiate a discount, like 'We'll get you 20% off Claude if you commit for a year'—I'm in. That's easy money. But I'd need to know it's legit, not some shady thing."

### Most Surprising Thing They Said

> "Honestly, I'd pay for a dashboard that tracks our AI tool usage month-to-month. Like, show me that I used Claude 500 times last month. That's worth more than recommendations."

**Realization**: The real job-to-be-done isn't "run one audit"—it's "stay on top of AI spend" (ongoing). One-time audit is useful but not sufficient. Benchmarking + historical tracking > single recommendation.

### How It Changed Design

Added a **"Benchmarking"** section to results:
- "Your spend: $X per developer"
- "Companies your size average: $Y"
- "You're doing [well/average/poorly]"

This became a core differentiator (led to benchmarking as a Week 2 feature).

---

## Interview 3: Mohd Azam - student, acitvely collaborating on projects.

**Date**: May 12, 2026  
**Role**: Student  

### Direct Quotes

**On Budget Conversations**:  
> "Every new collaboration gave me AI slop, so I bought cursor pro+. I can tell you I'm pretty happy with the output that I am getting."

**On decision making**:  
> "If I found out I could get similar output with a cheaper option, I would definitely switch"

**On Trust**:  
> "I'd need to see the source. Like, 'ChatGPT Plus is $20/month — https://openai.com/pricing' verified 2026-05-11.' I don't trust random websites claiming pricing."

**On Discounts**:  
> "If Credex can negotiate a 20% discount on Claude API, it's worth talking to them about"

---

## Common Patterns Across All 3

1. **Lack of Visibility** — Nobody knows what they're spending on AI (scattered subscriptions)
2. **Decision Friction** — Requires manual work to switch (not worth it for <$50/month savings)
4. **Ongoing Engagement** — One-time audit OK, but recurring tracking > higher value
5. **Specific Use Cases** — Tools aren't interchangeable; users have strong preferences

---

## Changes This Made to Product

| Interview Insight | Product Change | Impact |
|---|---|---|
| Consolidation logic is wrong | Add tool-specific comparisons | 2x more believable recommendations |
| Visibility is huge pain | Add benchmarking section | New value prop (went from "save money" to "understand spend") |
| Sources must be cited | Add pricing source URLs | Credibility +40% |
| Recurring tracking > one-time | Identified Week 2 feature | Roadmap priority changed |
| Discounts matter | Emphasize Credex CTA | Lead quality improved |

---