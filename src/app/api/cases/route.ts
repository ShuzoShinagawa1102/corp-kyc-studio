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
  const newCase = createCase({ legalEntity, productType, riskTier, assignedTo });
  return NextResponse.json(newCase, { status: 201 });
}
