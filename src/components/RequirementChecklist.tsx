import { DocumentRequirement, DocStatus } from '@/types';

const DOC_STATUS_CONFIG: Record<DocStatus, { label: string; className: string }> = {
  Pending: { label: 'Pending', className: 'bg-gray-100 text-gray-600' },
  Received: { label: 'Received', className: 'bg-green-100 text-green-700' },
  Rejected: { label: 'Rejected', className: 'bg-red-100 text-red-700' },
  Expired: { label: 'Expired', className: 'bg-orange-100 text-orange-700' },
};

export default function RequirementChecklist({
  requirements,
}: {
  requirements: DocumentRequirement[];
}) {
  return (
    <ul className="divide-y divide-gray-100 rounded-lg border border-gray-200">
      {requirements.map((req) => {
        const statusCfg = DOC_STATUS_CONFIG[req.status];
        return (
          <li
            key={req.requirementId}
            className="flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-4 h-4 rounded-full flex-shrink-0 ${
                  req.status === 'Received'
                    ? 'bg-green-500'
                    : req.status === 'Rejected'
                    ? 'bg-red-400'
                    : req.status === 'Expired'
                    ? 'bg-orange-400'
                    : 'bg-gray-300'
                }`}
              />
              <span className="text-sm text-gray-800">{req.docType}</span>
              {req.mandatory && (
                <span className="text-xs font-medium text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                  Required
                </span>
              )}
            </div>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusCfg.className}`}
            >
              {statusCfg.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
