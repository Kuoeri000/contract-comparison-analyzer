const RISK_STYLES = {
  low: { badge: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20', dot: 'bg-emerald-500' },
  medium: { badge: 'bg-amber-50 text-amber-700 ring-amber-600/20', dot: 'bg-amber-500' },
  high: { badge: 'bg-orange-50 text-orange-700 ring-orange-600/20', dot: 'bg-orange-500' },
  critical: { badge: 'bg-red-50 text-red-700 ring-red-600/20', dot: 'bg-red-500' },
};

export default function DeviationCard({ deviation, index }) {
  const style = RISK_STYLES[deviation.riskLevel] || RISK_STYLES.medium;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-sm font-semibold text-slate-600">
            {index + 1}
          </span>
          <h3 className="text-base font-semibold text-slate-900">{deviation.category}</h3>
        </div>
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${style.badge}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
          {deviation.riskLevel}
        </span>
      </div>

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-slate-50 p-4">
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">Standard</p>
          <p className="text-sm leading-relaxed text-slate-700">{deviation.standardClause}</p>
        </div>
        <div className="rounded-lg bg-brand-50 p-4">
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-brand-400">Counterparty</p>
          <p className="text-sm leading-relaxed text-slate-700">{deviation.counterpartyClause}</p>
        </div>
      </div>

      <div className="flex gap-3 rounded-lg border border-slate-100 bg-slate-50/50 p-4">
        <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <p className="mb-1 text-xs font-medium text-slate-500">Recommendation</p>
          <p className="text-sm leading-relaxed text-slate-700">{deviation.recommendation}</p>
        </div>
      </div>
    </div>
  );
}
