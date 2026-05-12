import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/server';
import { Resend } from 'resend';
import { v4 as uuidv4 } from 'uuid';

const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory rate limiting (use Redis for production)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

function getRateLimitKey(ip: string) {
  return `${ip}:${Math.floor(Date.now() / (60 * 60 * 1000))}`;
}

function checkRateLimit(ip: string): boolean {
  const key = getRateLimitKey(ip);
  const limit = 5; // 5 requests per hour

  const current = requestCounts.get(key) || { count: 0, resetTime: Date.now() + 3600000 };
  
  if (current.count >= limit) {
    return false; // Rate limited
  }

  current.count++;
  requestCounts.set(key, current);
  
  // Cleanup old entries
  if (requestCounts.size > 1000) {
    const now = Date.now();
    for (const [k, v] of requestCounts.entries()) {
      if (v.resetTime < now) requestCounts.delete(k);
    }
  }

  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';

    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { email, company_name, role, team_size, audit_results, honeypot } = body;

    // Honeypot check
    if (honeypot) {
      console.log('[Security] Honeypot triggered from IP:', ip);
      // Pretend to succeed to not reveal honeypot
      return NextResponse.json({ success: true, message: 'Confirmation email sent.' });
    }

    // Validation
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    if (!audit_results || !Array.isArray(audit_results)) {
      return NextResponse.json({ error: 'Missing audit results' }, { status: 400 });
    }

    // Generate shareable URL slug
    const share_url = uuidv4();

    // Calculate totals
    const total_monthly_savings = audit_results.reduce(
      (sum, rec) => sum + (rec.monthlySavings || 0),
      0
    );
    const total_annual_savings = total_monthly_savings * 12;

    // Insert into Supabase
    const { data, error } = await supabase.from('leads').insert([
      {
        email,
        company_name: company_name || null,
        role: role || null,
        team_size: team_size ? parseInt(team_size) : null,
        audit_results,
        total_monthly_savings,
        total_annual_savings,
        share_url,
        notification_opt_in: body.notification_opt_in || false,
      },
    ]).select();

    if (error) {
      console.error('[Supabase Error]', error);
      return NextResponse.json(
        { error: 'Failed to save lead. Please try again.' },
        { status: 500 }
      );
    }

    const lead = data?.[0];
    if (!lead) {
      return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
    }

    // Send confirmation email
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Your AI Spend Audit Results',
        html: `
          <h1>Your AI Spend Audit</h1>
          <p>Hi ${company_name || 'there'},</p>
          <p>Your audit has been completed. Total potential savings:</p>
          <h2>$${total_monthly_savings.toFixed(2)}/month</h2>
          <p><strong>Annual savings: $${total_annual_savings.toFixed(2)}</strong></p>
          <p><a href="${process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'}/share/${share_url}">View your full audit</a></p>
          ${
            total_monthly_savings > 500
              ? '<p style="color: #059669"><strong>You qualify for a Credex consultation to capture these savings.</strong> <a href="https://calendly.com/credex/consultation">Book a call</a></p>'
              : '<p>We\'ll notify you when new optimizations apply to your stack.</p>'
          }
        `,
      });
    } catch (emailError) {
      console.error('[Email Error]', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
      share_url,
      shareableUrl: `${process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'}/share/${share_url}`,
    });
  } catch (err) {
    console.error('[API Error]', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}