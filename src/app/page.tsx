import Link from 'next/link';
import { getCases } from '@/lib/store';
import CaseTable from '@/components/CaseTable';

export default function DashboardPage() {
  const cases = getCases();

  const totalCases = cases.length;
  const pendingReview = cases.filter(
    (c) => c.status === 'InReview' || c.status === 'WaitingForEvidence'
  ).length;
  const exceptions = cases.filter((c) => c.status === 'Exception').length;
  const thisMonth = new Date();
  const approvedThisMonth = cases.filter(
    (c) =>
      c.status === 'Approved' &&
      c.decision &&
      new Date(c.decision.decidedAt).getMonth() === thisMonth.getMonth() &&
      new Date(c.decision.decidedAt).getFullYear() === thisMonth.getFullYear()
  ).length;

  const summaryCards = [
    { label: 'Total Cases', value: totalCases, color: 'bg-indigo-50 text-indigo-700', border: 'border-indigo-200' },
    { label: 'Pending Review', value: pendingReview, color: 'bg-yellow-50 text-yellow-700', border: 'border-yellow-200' },
    { label: 'Exceptions', value: exceptions, color: 'bg-orange-50 text-orange-700', border: 'border-orange-200' },
    { label: 'Approved This Month', value: approvedThisMonth, color: 'bg-green-50 text-green-700', border: 'border-green-200' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track corporate KYC onboarding cases
          </p>
        </div>
        <Link
          href="/cases/new"
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors shadow-sm"
        >
          + New Case
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className={`rounded-lg border ${card.border} ${card.color} p-5`}
          >
            <div className="text-3xl font-bold">{card.value}</div>
            <div className="mt-1 text-sm font-medium opacity-80">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Cases Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">All Cases</h2>
        </div>
        <CaseTable cases={cases} />
      </div>
    </div>
  );
}
