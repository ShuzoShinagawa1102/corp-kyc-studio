'use client';

import { useState } from 'react';
import Link from 'next/link';
import { OnboardingCase, CaseStatus } from '@/types';
import StatusBadge from './StatusBadge';
import RiskBadge from './RiskBadge';

const ALL_STATUSES: CaseStatus[] = [
  'Draft',
  'IntakeValidated',
  'WaitingForEvidence',
  'InReview',
  'Exception',
  'Approved',
  'Rejected',
  'Closed',
  'Reopened',
];

export default function CaseTable({ cases }: { cases: OnboardingCase[] }) {
  const [statusFilter, setStatusFilter] = useState<CaseStatus | 'All'>('All');

  const filtered =
    statusFilter === 'All' ? cases : cases.filter((c) => c.status === statusFilter);

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <label htmlFor="status-filter" className="text-sm font-medium text-gray-700">
          Filter by status:
        </label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as CaseStatus | 'All')}
          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="All">All Statuses</option>
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-500">{filtered.length} case(s)</span>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Case ID', 'Company Name', 'Product', 'Risk Tier', 'Status', 'Assigned To', 'Last Updated'].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-sm text-gray-500">
                  No cases found
                </td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr key={c.caseId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <Link
                      href={`/cases/${c.caseId}`}
                      className="font-mono text-sm font-medium text-indigo-600 hover:text-indigo-800"
                    >
                      {c.caseId}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    <Link href={`/cases/${c.caseId}`} className="hover:text-indigo-600">
                      {c.legalEntity.registeredName}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{c.productType}</td>
                  <td className="px-4 py-3">
                    <RiskBadge tier={c.riskTier} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{c.assignedTo}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(c.updatedAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
