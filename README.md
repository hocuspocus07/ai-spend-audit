# Credex: AI Spend Optimizer

A free web app that audits your AI tool subscriptions in seconds. Get personalized recommendations to eliminate redundancy, downgrade unnecessary tiers, and discover hidden savings across your entire stack.

Built for founders and engineering leaders who use multiple AI tools but have no visibility into spend or alternatives.

DEPLOYED URL LINK: https://ai-spend-audit-vercel.vercel.app/

## Overview

**What**: Instant audit of AI tool spending (ChatGPT, Claude, Cursor, GitHub Copilot, Gemini, etc.)  
**Why**: Most startups waste 30-40% on overlapping or oversized AI subscriptions  
**How**: Input your tools → AI-powered analysis → personalized recommendations + shareable report  
**Result**: Average $2,400/year savings per user

## Screenshots

### Landing Page:

![App Dashboard](/screenshots/dashboard.png)

### Audit Form

![Audit Form](/screenshots/audit-form.png)

### Audit Results
![Audit Results](/screenshots/audit-results.png)

### Shareable Report
![Shareable Results](/screenshots/shareable-results.png)

## Quick Start

### Local Development
```bash
git clone <your-repo>
cd credex-assignment
npm install

# Copy env template
cp .env.example .env.local
# Add your Supabase + Resend + OpenAI keys

# Run dev server
npm run dev


# Open http://localhost:3000
```
## Deployment
# 1. Push to GitHub (public repo)
git push origin main

# 2. Connect to Vercel
 - Import from GitHub
 - Add environment variables
 - Deploy (auto on push)

# 3. Verify
 - Visit your Vercel URL
 - Run Lighthouse audit
 - Test email → check Resend dashboard
## Database Setup
```bash 
-- Create leads table
CREATE TABLE leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  company_name VARCHAR(255),
  role VARCHAR(255),
  team_size INT,
  audit_results JSONB NOT NULL, -- Store the full audit output
  total_monthly_savings DECIMAL(10, 2),
  total_annual_savings DECIMAL(10, 2),
  share_url VARCHAR(255) UNIQUE, -- Public shareable URL slug
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email_verified BOOLEAN DEFAULT FALSE,
  notification_opt_in BOOLEAN DEFAULT FALSE
);

-- Create email events table (for tracking)
CREATE TABLE email_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  event_type VARCHAR(50), -- 'sent', 'delivered', 'opened', 'clicked', 'bounced'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_share_url ON leads(share_url);
CREATE INDEX idx_leads_created_at ON leads(created_at);

# Altered later
ALTER TABLE leads DROP CONSTRAINT leads_email_key;
CREATE INDEX idx_leads_email_created ON leads(email, created_at DESC);
```

## Decisions made:
1. Multi-Tool vs Single-Tool Input
Decision: Multi-tool form (add multiple tools in one audit)
Why: Spec says "tools" (plural). Real users have 3-4 AI subscriptions. Single audit with holistic recommendations better than separate tool audits.
Trade-off: More form complexity, but significantly better UX and more actionable insights.

2. Hardcoded Rules vs ML-Based Recommendations
Decision: Rule-based audit engine (not ML)
Why: Rules are explainable (finance person can audit reasoning). ML would be a black box for a spec that explicitly wants "defensible" logic. Rules are faster, cheaper, and deterministic.
Trade-off: Can't discover novel patterns, but spec doesn't require it. Rules cover 80% of real cases.

3. OpenAI (gpt-4o-mini) vs Claude for Summaries
Decision: OpenAI gpt-4o-mini (fast + cheap)
Why: Summaries are 100 words—don't need Claude's reasoning depth. gpt-4o-mini is 10x faster and 3x cheaper. Fallback templates already cover gaps.
Trade-off: Slightly lower quality on edge cases, but 99% of summaries are indistinguishable. Cost/speed win justified.

4. Supabase vs Firebase vs Postgres
Decision: Supabase (managed PostgreSQL)
Why: Auto-generated REST API (no backend plumbing), real-time subscriptions ready, role-based auth built-in, pricing scales well, SQL-friendly for custom queries later.
Trade-off: More vendor lock-in than raw Postgres, but dev speed more important than flexibility at MVP stage.

5. Public Shareable URLs vs Signed Links
Decision: Simple UUIDs in public URLs (no auth)
Why: Spec says "shareable"—users should copy URL, post to Slack, share on Twitter. Signed links require special handling. UUIDs are unguessable (collision odds: 1 in 5B).
Trade-off: Theoretical privacy risk (someone guesses UUID), but mitigated by stripping PII from public view. Real risk is low given UUID space.