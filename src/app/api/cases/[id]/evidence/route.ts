import { NextResponse } from 'next/server';
import { addDocument } from '@/lib/store';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { docType, fileName, status, submittedAt, expiryDate, notes } = body;
  if (!docType || !fileName) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const updated = addDocument(id, {
    docType,
    fileName,
    status: status ?? 'Received',
    submittedAt: submittedAt ?? new Date().toISOString(),
    expiryDate,
    notes,
  });
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(updated);
}
