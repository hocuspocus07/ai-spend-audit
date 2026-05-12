'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { AuditRecommendation } from '@/lib/types';

interface LeadCaptureFormProps {
  auditResults: AuditRecommendation[];
  onSuccess: (shareUrl: string) => void;
}

export function LeadCaptureForm({ auditResults, onSuccess }: LeadCaptureFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const totalMonthlySavings = auditResults.reduce((sum, r) => sum + r.monthlySavings, 0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.get('email'),
          company_name: formData.get('company_name'),
          role: formData.get('role'),
          team_size: formData.get('team_size'),
          notification_opt_in: formData.get('notification_opt_in') === 'on',
          honeypot: honeypotRef.current?.value, // Honeypot field
          audit_results: auditResults,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to capture lead');
        return;
      }

      setSuccess(true);
      if (data.share_url) {
        onSuccess(data.share_url);
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="p-6 text-center">
        <h3 className="text-lg font-semibold text-green-600 mb-2">
          ✓ Audit saved successfully!
        </h3>
        <p className="text-sm text-gray-600">
          Check your email for the full report and shareable link.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">
        Save your audit & unlock insights
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
          />
        </div>

        <div>
          <Label htmlFor="company_name">Company Name</Label>
          <Input id="company_name" name="company_name" placeholder="Acme Inc." />
        </div>

        <div>
          <Label htmlFor="role">Your Role</Label>
          <Input id="role" name="role" placeholder="Founder / Engineering Lead" />
        </div>

        <div>
          <Label htmlFor="team_size">Team Size</Label>
          <Input id="team_size" name="team_size" type="number" min="1" />
        </div>

        {/* Honeypot field - hidden from users */}
        <input
          ref={honeypotRef}
          name="website"
          type="text"
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="notification_opt_in"
            className="w-4 h-4"
          />
          <span>Notify me of new optimizations for my stack</span>
        </label>

        {error && <div className="text-red-600 text-sm">{error}</div>}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Saving...' : `Save & Share (Potential $${totalMonthlySavings}/mo savings)`}
        </Button>
      </form>
    </Card>
  );
}