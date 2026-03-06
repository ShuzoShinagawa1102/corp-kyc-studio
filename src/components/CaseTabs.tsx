'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingCase } from '@/types';
import RequirementChecklist from './RequirementChecklist';
import EvidencePanel from './EvidencePanel';
import DecisionPanel from './DecisionPanel';
import AuditTrail from './AuditTrail';

type Tab = 'overview' | 'requirements' | 'evidence' | 'decision' | 'audit';

const TABS: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'requirements', label: 'Requirements' },
  { id: 'evidence', label: 'Evidence' },
  { id: 'decision', label: 'Decision' },
  { id: 'audit', label: 'Audit Trail' },
];

export default function CaseTabs({ caseData }: { caseData: OnboardingCase }) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [advancing, setAdvancing] = useState(false);
  const [raisingException, setRaisingException] = useState(false);
  const router = useRouter();

  async function handleAdvance() {
    setAdvancing(true);
    try {
      const res = await fetch(`/api/cases/${caseData.caseId}/advance`, { method: 'POST' });
      if (res.ok) router.refresh();
    } finally {
      setAdvancing(false);
    }
  }

  async function handleRaiseException() {
    setRaisingException(true);
    try {
      const res = await fetch(`/api/cases/${caseData.caseId}/decision`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          decision: 'Exception',
          rationale: 'Case raised to Exception status for further review',
          decidedBy: caseData.assignedTo,
        }),
      });
      if (res.ok) router.refresh();
    } finally {
      setRaisingException(false);
    }
  }

  const canAdvance = !['Approved', 'Rejected', 'Closed', 'Reopened', 'Exception'].includes(
    caseData.status
  );
  const canRaiseException = caseData.status === 'InReview';

  return (
    <div>
      {/* Action Buttons */}
      <div className="flex items-center gap-3 mb-6">
        {canAdvance && (
          <button
            onClick={handleAdvance}
            disabled={advancing}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            {advancing ? 'Advancing...' : 'Advance Status →'}
          </button>
        )}
        {canRaiseException && (
          <button
            onClick={handleRaiseException}
            disabled={raisingException}
            className="inline-flex items-center px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-md hover:bg-orange-600 disabled:opacity-50 transition-colors"
          >
            {raisingException ? 'Raising...' : '⚠ Raise Exception'}
          </button>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-1 border-b-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Legal Entity */}
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Legal Entity</h3>
            <dl className="space-y-2">
              {[
                { label: 'Registered Name', value: caseData.legalEntity.registeredName },
                { label: 'Jurisdiction', value: caseData.legalEntity.jurisdiction },
                { label: 'Reg. Number', value: caseData.legalEntity.registrationNumber },
                { label: 'Industry', value: caseData.legalEntity.industry },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <dt className="text-xs text-gray-500">{label}</dt>
                  <dd className="text-xs font-medium text-gray-800">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Beneficial Owners */}
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Beneficial Owners ({caseData.beneficialOwners.length})
            </h3>
            {caseData.beneficialOwners.length === 0 ? (
              <p className="text-sm text-gray-500">No beneficial owners recorded</p>
            ) : (
              <ul className="space-y-3">
                {caseData.beneficialOwners.map((bo) => (
                  <li key={bo.ownerId} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-800">{bo.name}</div>
                      <div className="text-xs text-gray-500">{bo.nationality}</div>
                    </div>
                    <div className="text-sm font-semibold text-indigo-600">
                      {bo.ownershipPercent}%
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Case Info */}
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Case Details</h3>
            <dl className="space-y-2">
              {[
                { label: 'Product Type', value: caseData.productType },
                { label: 'Risk Tier', value: caseData.riskTier },
                { label: 'Assigned To', value: caseData.assignedTo },
                {
                  label: 'Created',
                  value: new Date(caseData.createdAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  }),
                },
                {
                  label: 'Last Updated',
                  value: new Date(caseData.updatedAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  }),
                },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <dt className="text-xs text-gray-500">{label}</dt>
                  <dd className="text-xs font-medium text-gray-800">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Screening Hits Summary */}
          {caseData.screeningHits.length > 0 && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-5">
              <h3 className="text-sm font-semibold text-red-700 mb-3">
                ⚠ Screening Hits ({caseData.screeningHits.length})
              </h3>
              <ul className="space-y-2">
                {caseData.screeningHits.map((hit) => (
                  <li key={hit.hitId} className="text-xs text-red-700">
                    <span className="font-medium">{hit.severity}:</span> {hit.matchedName} —{' '}
                    {hit.source}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {activeTab === 'requirements' && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Document Requirements ({caseData.documentRequirements.length})
          </h3>
          <RequirementChecklist requirements={caseData.documentRequirements} />
        </div>
      )}

      {activeTab === 'evidence' && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Submitted Documents ({caseData.submittedDocuments.length})
          </h3>
          <EvidencePanel documents={caseData.submittedDocuments} />
        </div>
      )}

      {activeTab === 'decision' && <DecisionPanel caseData={caseData} />}

      {activeTab === 'audit' && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Audit Trail ({caseData.events.length} events)
          </h3>
          <AuditTrail events={caseData.events} />
        </div>
      )}
    </div>
  );
}
