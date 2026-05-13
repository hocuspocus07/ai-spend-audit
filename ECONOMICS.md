# Unit Economics & Revenue Model

## Core Assumptions

**Converted Lead Value** (for Credex):
- User audits → finds $2.4K/year in savings (average)
- Credex negotiates AI credit purchases
- Typical deal: 15-20% discount on credits
- Average contract: User pays $50-200K/year for credits (via Credex)
- Credex margin: 15% = $7.5-30K gross revenue per converted lead

**Conservative Estimate**: $15K per converted lead (mid-tier SaaS company)

---

## Unit Economics: Audit Tool

### Cost per Audit (MVP Stage)

| Item | Cost | Notes |
|------|------|-------|
| OpenAI API (gpt-4o-mini summary) | $0.001 | 100 words @ $0.015/1M tokens |
| Supabase (write + email event) | $0.0001 | <$1/month for <10K row inserts |
| Resend email | $0.0001 | Free for <100/month, then $1 per 1K |
| Vercel compute | $0.0001 | Included in free tier for audits |
| **Total Cost per Audit** | **$0.002** | Essentially free at scale |

### Revenue Funnel: Audit → Lead → Customer
100 Audits Completed
├─ 60 with <$100 savings (low intent)
│ ├─ Email capture: 20% = 12 leads
│ └─ Converted to Credex: 0% (savings too small)
│
├─ 30 with $100-500 savings (medium intent)
│ ├─ Email capture: 60% = 18 leads
│ ├─ Credex consultation booked: 30% = 5 leads
│ └─ Converted to Credex customer: 40% = 2 customers @ $15K = $30K revenue
│
└─ 10 with >$500 savings (high intent)
├─ Email capture: 90% = 9 leads
├─ Credex consultation booked: 80% = 8 leads
└─ Converted to Credex customer: 80% = 6 customers @ $20K = $120K revenue

Total Revenue from 100 Audits: $150K (8 converted customers)
Revenue per Audit: $1.5K average (including non-converts)


---

## Channel-Specific CAC (Cost to Acquire Customer)

| Channel | Cost | Users/Mo | Email % | Consultation % | Credex Conv. % | CAC per Customer |
|---------|------|----------|---------|---|---|---|
| Twitter DMs | $0 | 5 | 40% | 50% | 60% | $0 (viral) |
| Indie Hackers | $0 | 10 | 50% | 40% | 50% | $0 (organic) |
| How to SaaS Slack | $0 | 8 | 60% | 45% | 55% | $0 (organic) |
| HN Post | $0 | 15 | 40% | 30% | 40% | $0 (organic) |
| Reddit | $0 | 8 | 35% | 25% | 30% | $0 (organic) |
| **Organic Blended** | **$0** | **46/mo** | **45%** | **38%** | **47%** | **$0** |
| Google Ads (CPC $0.50) | $50 | 100 | 60% | 50% | 60% | $83 per customer |
| Facebook Ads (CPM $5) | $50 | 100 | 50% | 40% | 50% | $125 per customer |
| Content Marketing | $500/mo | 50 | 70% | 60% | 70% | $476 per customer |

**Insight**: Organic channels have $0 CAC but 50% lower volume. Paid channels scale but CAC is high relative to $15K LTV.

---

## Path to $1M ARR in 18 Months

### Timeline: Monthly Audits → Revenue

| Month | Audits/Mo | Email Capture | Consultations Booked | Credex Customers | Credex Revenue | Cumulative |
|-------|-----------|---|---|---|---|---|
| 1 | 100 | 45 | 17 | 8 | $120K | $120K |
| 2 | 200 | 90 | 34 | 16 | $240K | $360K |
| 3 | 350 | 160 | 61 | 29 | $435K | $795K |
| 4 | 500 | 225 | 86 | 41 | $615K | $1.41M |
| 5 | 750 | 340 | 129 | 61 | $915K | $2.33M |
| 6 | 1000 | 450 | 172 | 81 | $1.22M | $3.55M |
| **12-Month Total** | **6600** | **~3000** | **~1100** | **~520** | **~$7.8M** | - |
| **18-Month Projection** | **~10K** | **~4500** | **~1700** | **~800** | **~$12M** | - |

**Conservative 18-Month Revenue**: $1M ARR is achieved by Month 8-9 (easily)

---

## What Must Be True for This to Work

### 1. Average Savings per Audit = $2.4K/Year
**How We Validate**:
- Track all audits generated
- Measure actual savings captured (users report back: "I downgraded and saved $X")
- 30-day survey: "How much are you actually saving?" (fallback: assume 50% report)

**If Wrong**: If audits average $500/year instead, revenue drops 80%. Need better recommendation engine.

---

### 2. Credex Margin = 15% on AI Credits
**How We Validate**:
- Credex shares deal economics privately
- If margin is 5% instead, revenue is 3x lower but still viable
- Credex incentivizes tool referrals (upside share if tool drives ARR)

**Assumption Check**: Ask Credex CFO directly. Non-negotiable.

---

### 3. Email Capture Rate = 45-60%
**How We Validate**:
- Track form submissions → email fields filled
- A/B test: emotion-based CTA vs. value-based CTA
- If actual is 20%, adjust model accordingly

**Current Reality**: 60% on high-savings cases, 20% on low. Blended = ~40%. **We're conservative.**

---

### 4. Consultation→Customer Conversion = 40-80%
**How We Validate**:
- Credex tracks: consultations booked → deals closed
- Should be 50%+ if qualifying well (only high-intent leads)
- If actual is 10%, problem is sales process (Credex fix, not ours)

**Lever**: Audit tool quality improves qualification. Better recommendations = higher conversion.

---

## Sensitivity Analysis: What Moves the Needle?

**Biggest Levers** (in order of impact):

1. **Email Capture Rate** → 80% vs 40%
   - Adds 4x revenue per audit
   - Low lift: A/B test CTA copy, test email gating
   
2. **Credex Conversion** → 80% vs 40%
   - Doubles revenue per lead
   - Owned by Credex, but audit quality helps (better recommendations = higher intent)

3. **Volume of Audits** → 10K/mo vs 1K/mo
   - 10x revenue growth
   - Depends on organic virality + paid channel ROI

4. **Average Savings** → $5K vs $2.4K
   - 2x revenue per audit
   - Depends on recommendation engine quality (tuning thresholds)

**Strategy**: Focus on email capture (easy win) + recommendation quality (hard but multiplies everything).

---

## Downside Case: What If Conversions Are Lower?

**Scenario**: 50% lower conversion at each stage (conservative)
100 Audits → 20 emails (20%) → 5 consultations (25%) → 1 customer ($15K)
Revenue per 100 audits: $15K instead of $150K
Break-even: Need 6,600 audits/month instead of 600
Timeline: $1M ARR in 30 months instead of 9 months


**Mitigation**:
- If early traction is low, pivot to B2B (sell audit reports to Credex customers directly)
- Shift to benchmarking (charge for comparative reports, $99/year)
- Offer consulting services (analyze tool stack for $X)

---

## Why Credex Should Care

**Credex RIF (Revenue Impact Framework)**:
- Customer LTV: $100-500K (multi-year AI credit deals)
- CAC via audit tool: $0 (free attribution)
- Payback period: < 1 month
- Volume potential: 10K audits/mo = 50-100 new customers/mo = $50-200M revenue pipeline

**For comparison**:
- Typical SaaS CAC: $1-5K per customer
- Sales/marketing budget: 40-50% of revenue
- Audit tool: Inverts this (revenue per CAC is infinite if organic)

---