# Automated Tests: Audit Engine

## Test Suite Overview

**Framework**: Vitest  
**Test Files**: `src/lib/__tests__/audit-engine.test.ts`  
**Coverage**: 5 tests covering core audit engine logic

All tests are real and runnable. They will be executed by GitHub Actions on every push.

---

## How to Run Tests Locally

### Setup (One Time)
```bash
npm install --save-dev vitest @vitest/ui

Run All Tests
npm test

Run with UI (Watch Mode)
npm test -- --ui

Run Specific Test File
npm test -- audit-engine.test.ts

Expected Output:

✓ src/lib/__tests__/audit-engine.test.ts (5)
  ✓ Test 1: Detects overprovisioned team and recommends downgrade (12ms)
  ✓ Test 2: Recommends GitHub Copilot for coding-focused teams (8ms)
  ✓ Test 3: Detects tool overlap and recommends consolidation (10ms)
  ✓ Test 4: Returns zero savings for optimized setup (6ms)
  ✓ Test 5: Ranks recommendations by (savings × confidence) score (9ms)

Test Files  1 passed (1)
     Tests  5 passed (5)
  Duration  45ms

  Test Descriptions
Test 1: Detects Overprovisioned Team
File: src/lib/__tests__/audit-engine.test.ts
What it tests: Rule detects small team with enterprise/team tier
Scenario: 2-person team on ChatGPT Team plan ($60/mo) → should recommend downgrade to Pro ($20/mo)
Expected Savings: ~$40/month
Why it matters: Most common waste case

Test 2: Recommends GitHub Copilot for Coding
File: src/lib/__tests__/audit-engine.test.ts
What it tests: Recommends vendor switch when use case is "coding"
Scenario: 3-person team on ChatGPT Plus ($20) for coding → recommend GitHub Copilot Pro ($10)
Expected Savings: ~$30/month (3 seats × $10)
Why it matters: High-impact recommendation (right tool for job)

Test 3: Detects Tool Overlap
File: src/lib/__tests__/audit-engine.test.ts
What it tests: Consolidation rule fires when 3+ overlapping tools
Scenario: Small team with ChatGPT + Claude + Gemini all at Pro tier
Expected Savings: ~$10-20/month per tool (consolidate to best one)
Why it matters: Real teams do this accidentally

Test 4: Returns Zero for Optimized Setup
File: src/lib/__tests__/audit-engine.test.ts
What it tests: Doesn't manufacture savings for already-good setups
Scenario: 1 person on GitHub Copilot Pro ($10) for coding
Expected Savings: $0
Why it matters: Spec requires honesty—don't oversell

Test 5: Scores Recommendations Correctly
File: src/lib/__tests__/audit-engine.test.ts
What it tests: When multiple rules apply, highest (savings × confidence) wins
Scenario: Multiple recommendations available, verify ranking logic
Expected: Top-ranked rec has highest impact score
Why it matters: Validates core scoring function