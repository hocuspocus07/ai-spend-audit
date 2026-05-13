# Metrics Framework: What We're Optimizing For

## North Star Metric

### **"Audits Completed with Savings >$100/Month Captured"**

### Why this metric?

- Audits alone = vanity
- `$100+` threshold = real business problem
- `"Captured"` = user actually took action
- Strong leading indicator for Credex conversions

### Target

```txt
500 audits/month with >$100 savings captured by Month 3
```

---

# 3 Input Metrics That Drive the North Star

---

## 1. Email Capture Rate

### Definition

**Formula**

```txt
Emails Captured / Audits Completed
```

### Current

```txt
~50%
```

Varies by savings amount:
- ~90% for `>$500`
- ~20% for `<$100`

### Target

```txt
60% by Month 2
```

### Lever

- Optimize CTA copy
- Test gating timing
- Add social proof

### Red Flag

```txt
Below 30%
```

Meaning:
- friction in form UX
- low perceived value

---

## 2. Credex Consultation Booking Rate

### Definition

**Formula**

```txt
Consultations Booked / Emails Captured
```

### Current

```txt
~35%
```

Based on:
- high-intent users
- users with larger savings
- ~30% CTA click-through rate

### Target

```txt
40% by Month 2
```

### Lever

- Improve email copy
- Test CTA timing
- Clarify Credex value

### Red Flag

```txt
Below 20%
```

Meaning:
- users don't trust Credex
- users don't understand the offer

---

## 3. Recommendation Accuracy

### Definition

Post-audit survey:

```txt
"Is this recommendation valuable?"
```

Options:
- Yes
- No

### Current

```txt
Unknown
```

### Target

```txt
80%+
```

Acts as a proxy for:
- trust
- action likelihood
- recommendation quality

### Lever

- Improve rule thresholds
- Validate recommendations through interviews

### Red Flag

```txt
Below 60%
```

Meaning:
- recommendations are low quality
- trust and conversions will suffer

---

# What We'd Instrument First

## Week 1 Tracking (MVP)

### Audit Completion

```ts
analytics.track({
  event: 'audit_completed',
  totalSavings: number,
  toolsAudited: number,
  recommendationCount: number,
})
```

---

### Email Capture

```ts
analytics.track({
  event: 'email_captured',
  totalSavings: number,
  emailSource: 'share_button' | 'form',
})
```

---

### Credex CTA Click

```ts
analytics.track({
  event: 'credex_cta_clicked',
  totalSavings: number,
})
```

---

# Dashboards to Build

## 1. Daily Active Audits

Track:
- 7-day rolling average
- growth trends
- daily audit volume

---

## 2. Funnel Dashboard

```txt
Audits → Emails → Consultations → Credex Customers
```

Purpose:
- identify conversion bottlenecks
- measure funnel efficiency

---

## 3. Savings Distribution

Histogram showing:
- audits by savings band
- concentration of high-value users

---

## 4. Recommendation Accuracy Dashboard

Track:
- approval rates
- performance by rule type
- low-confidence recommendations

---

# Pivot Triggers (When to Change Direction)

## 🔴 ABORT CONDITIONS

### Email Capture Rate < 20%

Meaning:
- users don't value results enough

Action:
- remove email gate
- pivot to free reporting
- reduce CTA friction

---

### Recommendation Accuracy < 50%

Meaning:
- recommendations are unreliable

Action:
- revert to conservative defaults
- recommend only high-confidence actions

---

### Credex Consultation Conversion < 5%

Meaning:
- users don't trust Credex
- users don't understand the value

Action:
- pause Credex integration
- focus on benchmarking first

---

## 🟡 WARNING CONDITIONS

### Organic Traffic < 100 audits/month by Month 3

Meaning:
- product isn't spreading organically

Action:
- test paid acquisition
- improve positioning

---

### Recommendation Accuracy 60–75%

Meaning:
- core logic works
- edge cases fail

Action:

```txt
"We're 70% confident in this recommendation."
```

---

### User Feedback:
#### "Didn't Know I Needed This"

Meaning:
- weak problem-solution fit

Action:
- reposition around benchmarking
- emphasize spend visibility

---

# Stage Targets

| Stage | Metric | Target | Timeline |
|---|---|---|---|
| MVP Launch | Email Capture Rate | 50%+ | Week 1 |
| MVP Launch | Recommendation Accuracy | 75%+ | Week 1 |
| Growth | Daily Audits | 50+ | Week 2 |
| Growth | North Star Metric | 100+ | Month 1 |
| Growth | Consultation Booking Rate | 30%+ | Month 1 |
| Growth | Viral Coefficient | 0.1+ | Month 2 |
| Scale | Monthly Audits | 1K+ | Month 3 |
| Scale | Credex Customers | 10+ | Month 3 |
| Revenue | Revenue | $50K+ | Month 3 |

---

# Real Metrics (These Matter)

## Vanity Metrics

- page views
- audit starts
- social impressions

---

## Real Metrics

- audits with meaningful savings captured
- users who actually downgrade or switch
- Credex leads + conversions
- repeat engagement over time

---

# Final Principle

Optimize for:
- real business outcomes
- measurable savings
- trust in recommendations

Not:
- vanity charts
- meaningless engagement spikes
