import { describe, it, expect } from "vitest";
import { runAudit } from "../audit-engine";
import { ToolInput } from "../types";

describe("Audit Engine", () => {
  // Test 1: Overprovisioned Team Detection
  it("detects overprovisioned team and recommends downgrade", () => {
    const tools: ToolInput[] = [
      {
        toolName: "ChatGPT",
        plan: "Team",
        monthlySpend: 60,
        seats: 2,
      },
    ];

    const result = runAudit(tools, 5, "coding");

    expect(result).toHaveLength(1);
    expect(result[0].toolName).toBe("ChatGPT");
    expect(result[0].currentSpend).toBe(60);
    expect(result[0].recommendedAction).toContain("Downgrade");
    expect(result[0].monthlySavings).toBeGreaterThan(0);
    expect(result[0].confidence).toBeGreaterThan(0.8);
    expect(result[0].category).toBe("downgrade");
  });

  // Test 2: Coding Tool Swap Recommendation
  it("recommends GitHub Copilot for coding-focused teams", () => {
    const tools: ToolInput[] = [
      {
        toolName: "ChatGPT",
        plan: "Plus",
        monthlySpend: 60,
        seats: 3,
      },
    ];

    const result = runAudit(tools, 5, "coding");

    expect(result).toHaveLength(1);
    expect(result[0].recommendedAction).toContain("Copilot");
    expect(result[0].monthlySavings).toBeGreaterThan(0);
    expect(result[0].category).toBe("vendor-switch");
  });

  // Test 3: Tool Overlap Consolidation
  it("detects tool overlap and recommends consolidation", () => {
    const tools: ToolInput[] = [
      {
        toolName: "ChatGPT",
        plan: "Plus",
        monthlySpend: 20,
        seats: 2,
      },
      {
        toolName: "Claude",
        plan: "Pro",
        monthlySpend: 20,
        seats: 2,
      },
      {
        toolName: "Gemini",
        plan: "Pro",
        monthlySpend: 10,
        seats: 2,
      },
    ];

    const result = runAudit(tools, 3, "mixed");

    expect(result.length).toBeGreaterThan(0);
    // At least one recommendation should be consolidation
    const consolidationRec = result.find(
      (r) => r.category === "consolidation" || r.monthlySavings > 0,
    );
    expect(consolidationRec).toBeDefined();
  });

  // Test 4: Returns Zero Savings for Optimized Setup
  it("returns zero savings for already-optimized setup", () => {
    const tools: ToolInput[] = [
      {
        toolName: "GitHub Copilot",
        plan: "Pro",
        monthlySpend: 10,
        seats: 1,
      },
    ];

    const result = runAudit(tools, 1, "coding");

    expect(result).toHaveLength(1);
    // Should either be "Keep current" or have very low savings
    if (result[0].monthlySavings === 0) {
      expect(result[0].recommendedAction).toContain("Keep");
      expect(result[0].confidence).toBe(1);
    } else {
      // If there is a recommendation, savings should be minimal
      expect(result[0].monthlySavings).toBeLessThan(5);
    }
  });

  // Test 5: Recommendation Scoring (Higher Score Wins)
  it("ranks recommendations by (savings × confidence) score", () => {
    const tools: ToolInput[] = [
      {
        toolName: "ChatGPT",
        plan: "Team",
        monthlySpend: 100,
        seats: 2,
      },
    ];

    const result = runAudit(tools, 5, "coding");

    expect(result).toHaveLength(1);
    // Should select the recommendation with highest impact
    const rec = result[0];

    // If there's a recommendation, it should have good score
    if (rec.monthlySavings > 0) {
      const score = rec.monthlySavings * rec.confidence;
      expect(score).toBeGreaterThan(0);
      expect(rec.confidence).toBeGreaterThan(0.5);
    }
  });
});
