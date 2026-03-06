import { NextResponse } from 'next/server';
import { getCase, updateCase, addEvent } from '@/lib/store';
import { ReviewDecision } from '@/types';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const c = getCase(id);
  if (!c) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const body = await request.json();
  const { decision, rationale, decidedBy } = body;
  if (!decision || !rationale || !decidedBy) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const now = new Date().toISOString();
  const reviewDecision: ReviewDecision = {
    decisionId: `DEC-${Date.now()}`,
    decision,
    rationale,
    decidedBy,
    decidedAt: now,
  };

  const newStatus =
    decision === 'Approved' ? 'Approved' : decision === 'Rejected' ? 'Rejected' : 'Exception';

  addEvent(id, {
    eventType: 'DecisionRecorded',
    timestamp: now,
    actor: decidedBy,
    description: `Decision recorded: ${decision} — ${rationale}`,
  });

  const updated = updateCase(id, { decision: reviewDecision, status: newStatus });
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(updated);
}
