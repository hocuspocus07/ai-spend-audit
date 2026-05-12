'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';
import { Loader2, Sparkles } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AuditRecommendation } from '@/lib/types';

const formSchema = z.object({
  toolName: z.string().min(1, 'Please select a tool'),
  plan: z.string().min(1, 'Please select a plan'),
  monthlySpend: z.coerce.number().min(0, 'Must be 0 or higher'),
  seats: z.coerce.number().min(1, 'At least 1 seat required'),
  teamSize: z.coerce.number().min(1, 'Team size must be at least 1'),
  useCase: z.enum(['coding', 'writing', 'data', 'research', 'mixed']),
});

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-zinc-900 dark:text-zinc-100">{label}</Label>
      {children}
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}

interface AuditFormProps {
  onSubmit: (results: AuditRecommendation[]) => void;
}

export function AuditForm({ onSubmit }: AuditFormProps) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    toolName: 'ChatGPT',
    plan: 'Plus',
    monthlySpend: '20',
    seats: '1',
    teamSize: '5',
    useCase: 'coding',
  });

  // Load form data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('auditFormData');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load saved form data:', error);
      }
    }
  }, []);

  // Save form data to localStorage whenever it changes
  const handleInputChange = (field: string, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    localStorage.setItem('auditFormData', JSON.stringify(updated));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrors({});

    const result = formSchema.safeParse({
      toolName: formData.toolName,
      plan: formData.plan,
      monthlySpend: formData.monthlySpend,
      seats: formData.seats,
      teamSize: formData.teamSize,
      useCase: formData.useCase,
    });

    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = String(issue.path[0]);
        formattedErrors[key] = issue.message;
      });
      setErrors(formattedErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tools: [{
            toolName: result.data.toolName,
            plan: result.data.plan,
            monthlySpend: result.data.monthlySpend,
            seats: result.data.seats
          }],
          teamSize: result.data.teamSize,
          useCase: result.data.useCase,
        }),
      });
      
      const data = await response.json();
      onSubmit(data);
    } catch (error) {
      console.error(error);
      setErrors({ submit: 'Failed to run audit. Please try again.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="overflow-hidden border-zinc-200 shadow-xl dark:border-zinc-800">
      <CardHeader className="space-y-4 bg-zinc-50/50 pb-8 dark:bg-zinc-900/50">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
            <Sparkles className="mr-1 h-3 w-3" />
            Free AI Spend Analysis
          </Badge>
        </div>
        <div className="space-y-1.5">
          <CardTitle className="text-3xl font-bold tracking-tight">Analyze your AI stack</CardTitle>
          <CardDescription className="text-base text-zinc-500">
            Identify redundant subscriptions and optimize your team's efficiency.
          </CardDescription>
        </div>
      </CardHeader>
      
      <CardContent className="pt-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            
            <Field label="AI Tool" error={errors.toolName}>
              <Select value={formData.toolName} onValueChange={(value:any) => handleInputChange('toolName', value)}>
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue placeholder="Select a tool" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ChatGPT">ChatGPT</SelectItem>
                  <SelectItem value="Claude">Claude</SelectItem>
                  <SelectItem value="Cursor">Cursor</SelectItem>
                  <SelectItem value="GitHub Copilot">GitHub Copilot</SelectItem>
                  <SelectItem value="Gemini">Gemini</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field label="Current Plan" error={errors.plan}>
              <Select value={formData.plan} onValueChange={(value:any) => handleInputChange('plan', value)}>
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue placeholder="Select plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Free">Free</SelectItem>
                  <SelectItem value="Plus">Plus</SelectItem>
                  <SelectItem value="Pro">Pro</SelectItem>
                  <SelectItem value="Team">Team</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field label="Monthly Spend ($)" error={errors.monthlySpend}>
              <Input 
                value={formData.monthlySpend}
                onChange={(e) => handleInputChange('monthlySpend', e.target.value)}
                type="number" 
                className="h-12 rounded-xl" 
              />
            </Field>

            <Field label="Seats" error={errors.seats}>
              <Input 
                value={formData.seats}
                onChange={(e) => handleInputChange('seats', e.target.value)}
                type="number" 
                className="h-12 rounded-xl" 
              />
            </Field>

            <Field label="Team Size" error={errors.teamSize}>
              <Input 
                value={formData.teamSize}
                onChange={(e) => handleInputChange('teamSize', e.target.value)}
                type="number" 
                className="h-12 rounded-xl" 
              />
            </Field>

            <Field label="Primary Use Case" error={errors.useCase}>
              <Select value={formData.useCase} onValueChange={(value:any) => handleInputChange('useCase', value)}>
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue placeholder="Select use case" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="coding">Coding</SelectItem>
                  <SelectItem value="writing">Writing</SelectItem>
                  <SelectItem value="data">Data</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </Field>

          </div>

          <CardFooter className="flex flex-col gap-4 border-t px-0 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-0.5">
              <p className="text-sm font-semibold">Instant Analysis</p>
              <p className="text-xs text-zinc-500">Report generated in &lt;3 seconds</p>
            </div>
            
            <Button type="submit" size="lg" disabled={loading} className="h-12 rounded-xl px-8 font-bold">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Run AI Audit'}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}