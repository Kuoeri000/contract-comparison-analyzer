export default function ContractForm({ standardContract, counterpartyContract, onStandardChange, onCounterpartyChange, onAnalyze, loading, error }) {
  const canAnalyze = standardContract.trim() && counterpartyContract.trim() && !loading;

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Compare Contract Versions</h2>
        <p className="mt-2 text-slate-500">
          Paste your standard contract and the counterparty&apos;s version to identify deviations and assess risk.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col">
          <label htmlFor="standard" className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-200 text-xs font-bold text-slate-600">A</span>
            Standard Contract
          </label>
          <textarea
            id="standard"
            value={standardContract}
            onChange={(e) => onStandardChange(e.target.value)}
            placeholder="Paste your company's standard contract template here..."
            className="min-h-[400px] flex-1 resize-y rounded-xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-800 shadow-sm transition placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
          <p className="mt-2 text-xs text-slate-400">{standardContract.length.toLocaleString()} characters</p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="counterparty" className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-100 text-xs font-bold text-brand-600">B</span>
            Counterparty Contract
          </label>
          <textarea
            id="counterparty"
            value={counterpartyContract}
            onChange={(e) => onCounterpartyChange(e.target.value)}
            placeholder="Paste the counterparty's proposed contract here..."
            className="min-h-[400px] flex-1 resize-y rounded-xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-800 shadow-sm transition placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
          <p className="mt-2 text-xs text-slate-400">{counterpartyContract.length.toLocaleString()} characters</p>
        </div>
      </div>

      {error && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <svg className="mt-0.5 h-5 w-5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <button
          onClick={onAnalyze}
          disabled={!canAnalyze}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          {loading ? (
            <>
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Analyzing Contracts...
            </>
          ) : (
            <>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Analyze Deviations
            </>
          )}
        </button>
      </div>
    </div>
  );
}
