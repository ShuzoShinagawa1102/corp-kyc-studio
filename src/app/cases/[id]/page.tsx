import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCase } from '@/lib/store';
import StatusBadge from '@/components/StatusBadge';
import RiskBadge from '@/components/RiskBadge';
import CaseTabs from '@/components/CaseTabs';

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const caseData = getCase(id);

  if (!caseData) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500 flex items-center gap-2">
        <Link href="/" className="hover:text-indigo-600 transition-colors">
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{caseData.caseId}</span>
      </nav>

      {/* Case Header */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="font-mono text-sm text-gray-500">{caseData.caseId}</span>
              <StatusBadge status={caseData.status} />
              <RiskBadge tier={caseData.riskTier} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {caseData.legalEntity.registeredName}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {caseData.legalEntity.jurisdiction} · {caseData.legalEntity.registrationNumber} ·{' '}
              {caseData.productType}
            </p>
          </div>
          <div className="text-right text-sm text-gray-500">
            <div>Assigned to</div>
            <div className="font-medium text-gray-800">{caseData.assignedTo}</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <CaseTabs caseData={caseData} />
    </div>
  );
}
