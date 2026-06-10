import { useState } from 'react';
import Header from './components/Header';
import ContractForm from './components/ContractForm';
import Results from './components/Results';
import { compareContracts } from './api/compareContracts';

const SAMPLE_STANDARD = `MASTER SERVICES AGREEMENT

1. LIABILITY. Provider's total liability shall not exceed the fees paid in the twelve (12) months preceding the claim. Provider shall not be liable for indirect, incidental, or consequential damages.

2. TERMINATION. Either party may terminate for convenience with ninety (90) days written notice. Either party may terminate immediately for material breach uncured within thirty (30) days.

3. PAYMENT. Client shall pay invoices within thirty (30) days of receipt. Late payments accrue interest at 1.5% per month.

4. INTELLECTUAL PROPERTY. All work product created under this Agreement shall be owned by Client upon full payment.

5. GOVERNING LAW. This Agreement shall be governed by the laws of the State of Delaware.`;

const SAMPLE_COUNTERPARTY = `MASTER SERVICES AGREEMENT

1. LIABILITY. Provider's total liability shall not exceed $50,000 regardless of fees paid. Provider shall not be liable for any damages including direct damages.

2. TERMINATION. Client may terminate for convenience with thirty (30) days notice. Provider may terminate immediately without cause with fifteen (15) days notice.

3. PAYMENT. Client shall pay invoices within sixty (60) days of receipt. No late payment penalties shall apply.

4. INTELLECTUAL PROPERTY. Provider retains all intellectual property rights to methodologies, tools, and pre-existing materials. Client receives a non-exclusive license only.

5. GOVERNING LAW. This Agreement shall be governed by the laws of England and Wales.`;

export default function App() {
  const [view, setView] = useState('form');
  const [standardContract, setStandardContract] = useState('');
  const [counterpartyContract, setCounterpartyContract] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleAnalyze() {
    setLoading(true);
    setError(null);

    try {
      const data = await compareContracts(standardContract, counterpartyContract);
      setResults(data);
      setView('results');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleBack() {
    setView('form');
    setResults(null);
    setError(null);
  }

  function loadSamples() {
    setStandardContract(SAMPLE_STANDARD);
    setCounterpartyContract(SAMPLE_COUNTERPARTY);
  }

  return (
    <div className="min-h-screen">
      <Header showBack={view === 'results'} onBack={handleBack} />

      {view === 'form' && (
        <>
          {!standardContract && !counterpartyContract && (
            <div className="border-b border-slate-200 bg-brand-50/50">
              <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
                <p className="text-sm text-slate-600">Try it out with sample contracts</p>
                <button
                  onClick={loadSamples}
                  className="text-sm font-medium text-brand-600 transition hover:text-brand-700"
                >
                  Load sample data →
                </button>
              </div>
            </div>
          )}
          <ContractForm
            standardContract={standardContract}
            counterpartyContract={counterpartyContract}
            onStandardChange={setStandardContract}
            onCounterpartyChange={setCounterpartyContract}
            onAnalyze={handleAnalyze}
            loading={loading}
            error={error}
          />
        </>
      )}

      {view === 'results' && results && <Results results={results} />}
    </div>
  );
}
