import * as z from "zod";

export const auditFormSchema = z.object({
  toolName: z.enum(["Cursor", "GitHub Copilot", "Claude", "ChatGPT", "Anthropic API", "OpenAI API", "Gemini", "Windsurf"]),
  plan: z.string().min(1, "Please select a plan"),
  monthlySpend: z.coerce.number().min(0, "Spend must be at least 0"),
  seats: z.coerce.number().int().min(1, "Must have at least 1 seat"),
  teamSize: z.coerce.number().int().min(1, "Team size is required"),
  useCase: z.enum(["coding", "writing", "data", "research", "mixed"]),
});

export type AuditFormValues = z.infer<typeof auditFormSchema>;