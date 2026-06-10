import RiskScore from './RiskScore';
import DeviationCard from './DeviationCard';

const RISK_ORDER = { critical: 0, high: 1, medium: 2, low: 3 };

export default function Results({ results }) {
  const sortedDeviations = [...results.deviations].sort(
    (a, b) => (RISK_ORDER[a.riskLevel] ?? 4) - (RISK_ORDER[b.riskLevel] ?? 4)
  );

  const riskCounts = results.deviations.reduce((acc, d) => {
    acc[d.riskLevel] = (acc[d.riskLevel] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Analysis Results</h2>
        <p className="mt-1 text-slate-500">
          {results.deviations.length} deviation{results.deviations.length !== 1 ? 's' : ''} identified
        </p>
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Executive Summary
          </h3>
          <p className="text-base leading-relaxed text-slate-700">{results.executiveSummary}</p>
        </div>

        <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">Overall Risk Score</h3>
          <RiskScore score={results.overallRiskScore} />
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        {['critical', 'high', 'medium', 'low'].map((level) =>
          riskCounts[level] ? (
            <span key={level} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-600">
              {riskCounts[level]} {level}
            </span>
          ) : null
        )}
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Deviations</h3>
        <div className="space-y-4">
          {sortedDeviations.map((deviation, index) => (
            <DeviationCard key={`${deviation.category}-${index}`} deviation={deviation} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
