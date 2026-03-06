import { CaseStatus } from '@/types';

const STATUS_CONFIG: Record<
  CaseStatus,
  { label: string; className: string }
> = {
  Draft: { label: 'Draft', className: 'bg-gray-100 text-gray-700' },
  IntakeValidated: { label: 'Intake Validated', className: 'bg-blue-100 text-blue-700' },
  WaitingForEvidence: { label: 'Waiting For Evidence', className: 'bg-yellow-100 text-yellow-700' },
  InReview: { label: 'In Review', className: 'bg-purple-100 text-purple-700' },
  Exception: { label: 'Exception', className: 'bg-orange-100 text-orange-700' },
  Approved: { label: 'Approved', className: 'bg-green-100 text-green-700' },
  Rejected: { label: 'Rejected', className: 'bg-red-100 text-red-700' },
  Closed: { label: 'Closed', className: 'bg-gray-100 text-gray-500' },
  Reopened: { label: 'Reopened', className: 'bg-blue-100 text-blue-700' },
};

export default function StatusBadge({ status }: { status: CaseStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}
