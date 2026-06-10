function getRiskColor(score) {
  if (score >= 75) return { ring: 'stroke-red-500', text: 'text-red-600', bg: 'bg-red-50', label: 'Critical Risk' };
  if (score >= 50) return { ring: 'stroke-orange-500', text: 'text-orange-600', bg: 'bg-orange-50', label: 'High Risk' };
  if (score >= 25) return { ring: 'stroke-amber-500', text: 'text-amber-600', bg: 'bg-amber-50', label: 'Moderate Risk' };
  return { ring: 'stroke-emerald-500', text: 'text-emerald-600', bg: 'bg-emerald-50', label: 'Low Risk' };
}

export default function RiskScore({ score }) {
  const colors = getRiskColor(score);
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg className="h-36 w-36 -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="#e2e8f0" strokeWidth="8" />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            className={colors.ring}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${colors.text}`}>{score}</span>
          <span className="text-xs font-medium text-slate-400">/ 100</span>
        </div>
      </div>
      <span className={`mt-3 rounded-full px-3 py-1 text-sm font-medium ${colors.bg} ${colors.text}`}>
        {colors.label}
      </span>
    </div>
  );
}
