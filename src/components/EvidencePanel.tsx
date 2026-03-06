import { SubmittedDocument, DocStatus } from '@/types';

const DOC_STATUS_CONFIG: Record<DocStatus, { className: string }> = {
  Pending: { className: 'bg-gray-100 text-gray-600' },
  Received: { className: 'bg-green-100 text-green-700' },
  Rejected: { className: 'bg-red-100 text-red-700' },
  Expired: { className: 'bg-orange-100 text-orange-700' },
};

export default function EvidencePanel({
  documents,
}: {
  documents: SubmittedDocument[];
}) {
  if (documents.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
        <p className="text-sm text-gray-500">No documents submitted yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {documents.map((doc) => {
        const statusCfg = DOC_STATUS_CONFIG[doc.status];
        return (
          <div
            key={doc.documentId}
            className="flex items-start justify-between rounded-lg border border-gray-200 bg-white p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex-shrink-0 w-8 h-8 bg-indigo-50 rounded-md flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">{doc.docType}</div>
                <div className="text-xs text-gray-500 mt-0.5">{doc.fileName}</div>
                <div className="text-xs text-gray-400 mt-1">
                  Submitted:{' '}
                  {new Date(doc.submittedAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                  {doc.expiryDate && (
                    <span className="ml-3">
                      Expires:{' '}
                      {new Date(doc.expiryDate).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  )}
                </div>
                {doc.notes && (
                  <div className="mt-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
                    Note: {doc.notes}
                  </div>
                )}
              </div>
            </div>
            <span
              className={`ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusCfg.className}`}
            >
              {doc.status}
            </span>
          </div>
        );
      })}
    </div>
  );
}
