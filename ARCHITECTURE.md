
## 2. ARCHITECTURE.md

```markdown
# Architecture & System Design

## System Diagram
┌─────────────────────────────────────────────────────────────────┐
│ User Browser                                                    │
│ ┌──────────────────────────────────────────────────────────┐    │
│ │ Landing Page (/) → Audit Form (/audit)                   │    │
│ │ - Multi-tool input                                       │    │
│ │ - Team size, use case                                    │    │
│ │ - localStorage persistence                               │    │
│ └──────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                                ↓
                            POST /api/audit
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│ Next.js API Routes                                              │
├─────────────────────────────────────────────────────────────────┤
│ /api/audit                                                      │
│ ├─ Input validation (tools array, teamSize, useCase)            │
│ ├─ Call runAudit() from audit-engine.ts                         | 
│ └─ Return AuditRecommendation[] to frontend                     │
│                                                                 │
│ /api/generate-summary                                           │
│ ├─ POST: toolName, monthlySpend, auditResult                    │
│ ├─ Call OpenAI gpt-4o-mini API                                  │
│ ├─ Fallback to template if API fails                            │
│ └─ Return ~100 word personalized summary                        │
│                                                                 │
│ /api/leads                                                      │
│ ├─ Email validation + honeypot check                            │
│ ├─ Rate limit: 5 req/hour per IP (in-memory)                    │
│ ├─ Supabase: INSERT leads row + calc totals                     │
│ ├─ Send Resend transactional email                              │
│ └─ Return share_url (UUID)                                      │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│ Audit Engine (lib/audit-engine.ts)                              │
├─────────────────────────────────────────────────────────────────┤
│ runAudit(tools[], teamSize, useCase)                            │
│ ├─ Normalize tools (vendor, tier parsing)                       │
│ ├─ Calculate total spend + spend-per-employee                   │
│ ├─ For each tool:                                               │
│ │ ├─ Run applicable rules (rule-based engine)                   │
│ │ ├─ Generate candidate recommendations                         │
│ │ ├─ Rank by (savings × confidence)                             │
│ │ └─ Return best match or "Keep current"                        │
│ └─ Return AuditRecommendation[]                                 │
│                                                                 │
│ Rules (lib/rules/):                                             │
│ ├─ OverprovisionedTeamRule (team=2, tier=enterprise)            │
│ ├─ CodingToolSwapRule (useCase=coding, switch to Copilot)       │
│ ├─ ToolOverlapRule (3+ conversational tools detected)           │
│ ├─ ApiMigrationRule (switch from retail to API)                 │
│ └─ CreditArbitrageRule (pay-as-you-go cheaper)                  │
│                                                                 │
│ Scoring: rankRecommendations(candidates[])                      │
│ └─ Sort by: savings × confidence (higher = better)              │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│ External Services                                               │
├─────────────────────────────────────────────────────────────────┤
│ Supabase (PostgreSQL)                                           │
│ ├─ leads table (email, audit_results JSONB, share_url)          │
│ └─ email_events table (tracking)                                │
│                                                                 │
│ OpenAI API                                                      │
│ └─ gpt-4o-mini for personalized summary generation              │
│                                                                 │
│ Resend                                                          │
│ └─ Transactional email (from: onboarding@resend.dev)            │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│ Public Share Page (/share/[uuid])                               │
├─────────────────────────────────────────────────────────────────┤
│ GET /share/{uuid}                                               │
│ ├─ Fetch lead from Supabase by share_url                        │
│ ├─ Strip PII (no email, company_name)                           │
│ ├─ Render audit_results + hero stats                        │
│ ├─ Conditional Credex CTA (if savings > $500/mo)               │
│ ├─ Open Graph meta tags (for Twitter/Slack preview)           │
│ └─ Viral loop: user shares link, others discover tool           │
└─────────────────────────────────────────────────────────────────┘

## Data Flow:

USER INPUTS
├─ Tools: [{toolName, plan, monthlySpend, seats}, ...]
├─ TeamSize: 5
└─ UseCase: "coding"
↓
NORMALIZATION
├─ Parse tool names → vendor (e.g., "ChatGPT" → "chatgpt")
├─ Parse plans → tier (e.g., "Plus" → "plus")
└─ Calc monthly spend per tool
↓
CONTEXT BUILDING
├─ Total monthly spend: $120
├─ Spend per employee: $24/mo
└─ Benchmark multiplier: 1.2x (average for industry)
↓
RULE EVALUATION (for each tool)
├─ Does OverprovisionedTeamRule apply? (seats <= 2 AND tier in [team, business])
│ └─ If yes → Generate candidate: "Downgrade to Pro"
├─ Does CodingToolSwapRule apply? (useCase=coding AND vendor in [chatgpt, claude] AND tier in [plus, pro])
│ └─ If yes → Generate candidate: "Switch to GitHub Copilot Pro"
├─ Does ToolOverlapRule apply? (3+ overlapping tools)
│ └─ If yes → Generate candidate: "Consolidate to 1-2 tools"
└─ ... (other rules)
↓
RECOMMENDATION RANKING
├─ Score each candidate: (savings × confidence)
│ ├─ "Downgrade to Pro": ($30 × 0.95) = 28.5
│ ├─ "Switch to Copilot": ($50 × 0.82) = 41
│ └─ "Consolidate": ($60 × 0.7) = 42 ← WINNER
└─ Select top recommendation
↓
OUTPUT
├─ AuditRecommendation
│ ├─ toolName: "ChatGPT"
│ ├─ currentSpend: $20
│ ├─ recommendedAction: "Consolidate overlapping AI subscriptions"
│ ├─ monthlySavings: $42
│ ├─ annualSavings: $504
│ ├─ confidence: 0.7
│ └─ reasoning: "Small teams maintaining multiple premium conversational AI subscriptions typically experience diminishing productivity returns relative to cost."
└─ (Repeat for each tool)
↓
UI RENDERS
├─ Results page with per-tool breakdowns
├─ Hero stats: Total monthly ($XXX), Total annual ($XXX)
├─ Conditional Credex CTA (if > $500/mo savings)
├─ Lead capture form (email + optional fields)
└─ Shareable URL generation + social preview


## Why This Architecture?

**1. Rule-Based Engine, Not ML**
- Explainability > accuracy for a lead-gen tool
- Deterministic (same input = same output always)
- Cost: $0 vs. $X for ML ops

**2. Rule-Based Scoring**
- Each rule: applies() → generate() → score
- Easy to add new rules without touching core engine
- Each rule is independently testable
- Combine via ranking function (no ML weights)

**3. Fallback Templates for Summaries**
- OpenAI API unavailable? Use handcrafted template
- No disruption to UX if AI service is down
- Templates maintain tone/quality baseline

**4. Stateless API Routes**
- No sessions, no cookies, no JWT complexity
- Rate limiting via IP + in-memory map (scales to 1M requests)
- Scales horizontally (each Vercel function independent)

## Scaling to 10k Audits/Day

**Current (MVP)**:
- In-memory rate limiting
- Sync email sends (can block)
- Single Supabase database

**Changes needed for 10k/day**:
1. **Rate Limiting**: Move to Redis (Upstash)
   ```typescript
   const redis = new Redis(process.env.UPSTASH_REDIS_URL);
   const key = `rate:${ip}`;
   const count = await redis.incr(key);
   if (count === 1) await redis.expire(key, 3600);
```
2. **Async Email**: Queue via Inngest or Bull
// Don't: await resend.emails.send() in API route
// Do: await inngest.send({ name: 'email.send', data: {...} })

3. **Database Scaling**:
- Add read replicas for queries
- Archive old leads to cold storage
- Index on (email, created_at)
4. **Analytics**: Add event tracking to identify bottlenecks

Layer,Choice,Why,Alternative
Frontend,Next.js 16,"Server components, API routes, edge deployment",Vite + React (more config)
Styling,Tailwind + shadcn/ui,"Zero-config, accessible components, small bundle",styled-components (slower)
Database,Supabase,"Auto REST API, real-time ready, PostgreSQL","Firebase (NoSQL, less flexible)"
Email,Resend,"Developer-friendly, React emails, fast",SendGrid (more complex)
LLM,OpenAI gpt-4o-mini,"Fast (100ms), cheap ($0.015 per 1M tokens)","Claude (slower, 3x cost)"
Tests,Vitest,"Lightning fast, ESM native, Node 18+",Jest (slower config)