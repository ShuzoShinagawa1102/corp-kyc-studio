import { CaseEvent } from '@/types';

const EVENT_ICON_CONFIG: Record<string, { bg: string; text: string }> = {
  CaseCreated: { bg: 'bg-indigo-100', text: 'text-indigo-600' },
  StatusChanged: { bg: 'bg-blue-100', text: 'text-blue-600' },
  DocumentReceived: { bg: 'bg-green-100', text: 'text-green-600' },
  ScreeningHitRaised: { bg: 'bg-red-100', text: 'text-red-600' },
  ExceptionRaised: { bg: 'bg-orange-100', text: 'text-orange-600' },
  DecisionRecorded: { bg: 'bg-purple-100', text: 'text-purple-600' },
};

function getEventConfig(eventType: string) {
  return EVENT_ICON_CONFIG[eventType] ?? { bg: 'bg-gray-100', text: 'text-gray-600' };
}

export default function AuditTrail({ events }: { events: CaseEvent[] }) {
  const sorted = [...events].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  if (sorted.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
        <p className="text-sm text-gray-500">No events recorded yet</p>
      </div>
    );
  }

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {sorted.map((event, idx) => {
          const cfg = getEventConfig(event.eventType);
          const isLast = idx === sorted.length - 1;
          return (
            <li key={event.eventId}>
              <div className="relative pb-8">
                {!isLast && (
                  <span
                    className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex items-start space-x-3">
                  <div
                    className={`h-8 w-8 rounded-full ${cfg.bg} flex items-center justify-center ring-8 ring-white flex-shrink-0`}
                  >
                    <span className={`text-xs font-bold ${cfg.text}`}>
                      {event.eventType[0]}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">
                        {event.eventType}
                      </span>
                      <span className="text-xs text-gray-400">by {event.actor}</span>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-600">{event.description}</p>
                    <p className="mt-1 text-xs text-gray-400">
                      {new Date(event.timestamp).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
