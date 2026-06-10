export async function compareContracts(standardContract, counterpartyContract) {
  const response = await fetch('/api/compare-contracts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ standardContract, counterpartyContract }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to analyze contracts');
  }

  return data;
}
