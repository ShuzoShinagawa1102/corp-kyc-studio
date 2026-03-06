import { NextResponse } from 'next/server';
import { getCases, createCase } from '@/lib/store';

export async function GET() {
  return NextResponse.json(getCases());
}

export async function POST(request: Request) {
  const body = await request.json();
  const { legalEntity, productType, riskTier, assignedTo } = body;
  if (!legalEntity || !productType || !riskTier || !assignedTo) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  // Generate entityId server-side to avoid client-side randomness
  const entityWithId = {
    ...legalEntity,
    entityId: `LE-${crypto.randomUUID()}`,
  };
  const newCase = createCase({ legalEntity: entityWithId, productType, riskTier, assignedTo });
  return NextResponse.json(newCase, { status: 201 });
}
