'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingCase, HitSeverity } from '@/types';

const SEVERITY_CONFIG: Record<HitSeverity, { className: string }> = {
  Low: { className: 'bg-yellow-50 text-yellow-700' },
  Medium: { className: 'bg-orange-50 text-orange-700' },
  High: { className: 'bg-red-50 text-red-700' },
  Critical: { className: 'bg-red-100 text-red-900 font-semibold' },
};

export default function DecisionPanel({ caseData }: { caseData: OnboardingCase }) {
  const router = useRouter();
  const [decision, setDecision] = useState<'Approved' | 'Rejected' | 'Exception'>('Approved');
  const [rationale, setRationale] = useState('');
  const [decidedBy, setDecidedBy] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const mandatoryDocs = caseData.documentRequirements.filter((r) => r.mandatory);
  const receivedMandatory = mandatoryDocs.filter((r) => r.status === 'Received');
  const missingMandatory = mandatoryDocs.filter((r) => r.status !== 'Received');
  const completeness =
    mandatoryDocs.length === 0
      ? 100
      : Math.round((receivedMandatory.length / mandatoryDocs.length) * 100);

  const openHits = caseData.screeningHits.filter((h) => h.status === 'Open' || h.status === 'Escalated');

  let recommendation = 'Ready for Approval';
  let recommendationClass = 'text-green-700 bg-green-50';
  if (missingMandatory.length > 0) {
    recommendation = 'Missing Requirements';
    recommendationClass = 'text-yellow-700 bg-yellow-50';
  }
  if (openHits.length > 0) {
    recommendation = 'Has Open Screening Hits';
    recommendationClass = 'text-red-700 bg-red-50';
  }

  const canDecide = caseData.status === 'InReview' || caseData.status === 'Exception';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rationale.trim() || !decidedBy.trim()) {
      setError('Rationale and Decided By are required');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/cases/${caseData.caseId}/decision`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decision, rationale, decidedBy }),
      });
      if (!res.ok) throw new Error('Failed to submit decision');
      router.refresh();
    } catch {
      setError('Failed to submit decision. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Completeness Score */}
      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Document Completeness</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="h-2.5 w-full rounded-full bg-gray-200">
              <div
                className={`h-2.5 rounded-full transition-all ${
                  completeness === 100
                    ? 'bg-green-500'
                    : completeness >= 60
                    ? 'bg-yellow-400'
                    : 'bg-red-400'
                }`}
                style={{ width: `${completeness}%` }}
              />
            </div>
          </div>
          <span className="text-lg font-bold text-gray-900">{completeness}%</span>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          {receivedMandatory.length} of {mandatoryDocs.length} mandatory documents received
        </p>
        {missingMandatory.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-medium text-red-600 mb-1">Missing:</p>
            <ul className="space-y-1">
              {missingMandatory.map((req) => (
                <li key={req.requirementId} className="text-xs text-red-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  {req.docType}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Screening Hits Summary */}
      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Screening Hits ({caseData.screeningHits.length})
        </h3>
        {caseData.screeningHits.length === 0 ? (
          <p className="text-sm text-gray-500">No screening hits</p>
        ) : (
          <ul className="space-y-2">
            {caseData.screeningHits.map((hit) => {
              const sevCfg = SEVERITY_CONFIG[hit.severity];
              return (
                <li
                  key={hit.hitId}
                  className="flex items-start justify-between gap-3 rounded-md border border-gray-100 p-3"
                >
                  <div>
                    <div className="text-xs font-medium text-gray-800">{hit.matchedName}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{hit.source}</div>
                    <div className="text-xs text-gray-600 mt-1">{hit.description}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${sevCfg.className}`}>
                      {hit.severity}
                    </span>
                    <span className="text-xs text-gray-400">{hit.status}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Recommendation */}
      <div className={`rounded-lg border p-4 ${recommendationClass} border-current border-opacity-20`}>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Recommendation:</span>
          <span className="text-sm">{recommendation}</span>
        </div>
      </div>

      {/* Decision Form or Existing Decision */}
      {caseData.decision ? (
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Decision Recorded</h3>
          <dl className="space-y-2">
            <div className="flex gap-3">
              <dt className="text-xs font-medium text-gray-500 w-24">Decision</dt>
              <dd className="text-sm font-semibold text-gray-900">{caseData.decision.decision}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-xs font-medium text-gray-500 w-24">Rationale</dt>
              <dd className="text-sm text-gray-700">{caseData.decision.rationale}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-xs font-medium text-gray-500 w-24">Decided By</dt>
              <dd className="text-sm text-gray-700">{caseData.decision.decidedBy}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-xs font-medium text-gray-500 w-24">Date</dt>
              <dd className="text-sm text-gray-700">
                {new Date(caseData.decision.decidedAt).toLocaleString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </dd>
            </div>
          </dl>
        </div>
      ) : canDecide ? (
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Record Decision</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Decision <span className="text-red-500">*</span>
              </label>
              <select
                value={decision}
                onChange={(e) => setDecision(e.target.value as typeof decision)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="Approved">Approve</option>
                <option value="Rejected">Reject</option>
                <option value="Exception">Exception</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Rationale <span className="text-red-500">*</span>
              </label>
              <textarea
                value={rationale}
                onChange={(e) => setRationale(e.target.value)}
                rows={3}
                placeholder="Provide reasoning for this decision..."
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Decided By <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={decidedBy}
                onChange={(e) => setDecidedBy(e.target.value)}
                placeholder="Analyst name"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Submitting...' : 'Submit Decision'}
            </button>
          </form>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
          <p className="text-sm text-gray-500">
            Decisions can be recorded when the case is In Review or Exception status.
          </p>
        </div>
      )}
    </div>
  );
}
