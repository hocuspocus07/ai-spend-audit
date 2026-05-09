import { NextResponse } from 'next/server';
import { runAudit } from '@/lib/audit-engine';

export async function POST(req: Request) {
  const body = await req.json();

  const results = runAudit(
    body.tools,
    body.teamSize,
    body.useCase
  );

  return NextResponse.json(results);
}