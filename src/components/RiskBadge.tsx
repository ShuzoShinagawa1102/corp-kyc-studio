import { RiskTier } from '@/types';

const RISK_CONFIG: Record<RiskTier, { className: string }> = {
  Low: { className: 'bg-green-100 text-green-700' },
  Medium: { className: 'bg-amber-100 text-amber-700' },
  High: { className: 'bg-red-100 text-red-700' },
};

export default function RiskBadge({ tier }: { tier: RiskTier }) {
  const config = RISK_CONFIG[tier];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      {tier}
    </span>
  );
}
