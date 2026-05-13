# 🚀 Credex Assignment — Self Reflection

## 1. 🐛 Hardest Bug & Debugging

### Problem

The lead capture API returned `500` errors:
- Supabase inserts failed
- Emails never arrived
- Shareable URLs broke

Error:

```txt
duplicate key value violates unique constraint "leads_email_key"
```

### Investigation

I tested:
1. Supabase connection issues
2. Email validation failures
3. Resend authentication problems
4. Database uniqueness conflicts
5. Broken slug generation

Added logging:

```ts
console.log('[Email] Sending to:', email);

const emailResponse = await resend.emails.send({...});

console.log('[Email] Success:', emailResponse);
```

The API claimed success, but:
- emails never arrived
- nothing appeared in the Resend dashboard

### Root Cause #1 → Resend Domain

Switching from:

```txt
noreply@credex.rocks
```

to:

```txt
onboarding@resend.dev
```

fixed delivery instantly.

The domain was not verified.

> Every service reported “success” while nothing actually worked. Modern SaaS in one sentence.

### Root Cause #2 → Next.js 16 Params

#### Broken

```ts
export default async function SharePage({
  params,
}: {
  params: { slug: string }
}) {
  const slug = params.slug;
}
```

#### Fixed

```ts
export default async function SharePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
}
```

Next.js 16 changed route params into async promises because frontend frameworks occasionally decide reality needs versioning.

### Additional Fixes

Removed:

```sql
email UNIQUE
```

This allowed users to run multiple audits.

Also improved error handling so users saw contextual messages instead of generic failures.

### Final Flow

```txt
Form
→ API
→ Supabase Insert
→ Email Send
→ Shareable URL
```

---

## 2. 🔄 Decision I Reversed Mid-Week

### Original Choice

Initially used:
- Claude 3.5 Sonnet
- `@anthropic-ai/sdk`

for AI-generated summaries.

### Why I Changed It

#### Speed

Claude averaged:

```txt
~3 seconds
```

But the product promise was:

> “Instant AI Spend Audit”

One interview changed priorities:

> “Show me the result instantly, or I lose interest.”

#### Cost

Claude cost:

```txt
$0.015 per summary
```

Too expensive for a lightweight lead-gen tool.

### New Decision → GPT-4o-mini

Migrated to:

```txt
gpt-4o-mini
```

because it was:
- faster
- cheaper
- simpler operationally

### Impact

| Metric | Claude | GPT-4o-mini |
|---|---|---|
| Speed | ~3s | ~200ms |
| Cost | ~$0.015 | ~$0.0004 |

### Lesson

For short summaries:
- latency mattered more than reasoning depth
- UX mattered more than benchmark prestige

The technically “best” model was not the best product decision.

---

## 3. 🚀 What I’d Build Next

### Historical Audits

Track savings progress over time.

Example:

```txt
“You could save $2.4K/year,
but only captured $600.”
```

### Benchmarking Dashboard

Example:

```txt
“Your spend is $24/dev/month.
Companies your size average $18.”
```

Transforms the product from:
- calculator
- into a decision-support platform

### Additional Features

- Slack/email alerts
- Embeddable widget
- PDF export

Because enterprise workflow apparently still means screenshotting dashboards into Slack threads.

---

## 4. 🤖 How I Used AI Tools

### AI Assisted With

- boilerplate generation
- TypeScript fixes
- tests
- documentation drafts

### I Handled Manually

- business logic
- pricing rules
- architecture decisions
- product tradeoffs

Those required judgment more than autocomplete.

### Example Where AI Was Wrong

Claude recommended Claude 3.5 Sonnet.

Reasonable technically.

Bad product decision because it ignored:
- latency
- cost
- UX expectations

### Example Where AI Was Right

Cursor autocompleted my Supabase schema and indexes correctly.

> Ideal AI behavior: useful assistant, not self-appointed CTO.

---

## 5. 📊 Self Ratings

| Category | Rating |
|---|---|
| Discipline | 7/10 |
| Code Quality | 8/10 |
| Design Sense | 7/10 |
| Problem Solving | 9/10 |
| Entrepreneurial Thinking | 8/10 |

### Strengths

- Strong debugging process
- Fast iteration
- Pragmatic tradeoffs
- User feedback influenced roadmap

### Weaknesses

- User interviews happened too late
- Some components became oversized
- Assumed adoption instead of validating directly

---

## 🧾 Final Reflection

This project reinforced several lessons:

- Speed matters more than theoretical intelligence in user-facing AI
- Product decisions beat engineering purity
- User interviews improve prioritization dramatically
- Reliability matters more than flashy architecture

Most importantly:

The real product wasn’t the audit itself.

It was helping companies continuously stay aware of AI spend decisions over time.

Which founders usually realize immediately after building the wrong abstraction first.
