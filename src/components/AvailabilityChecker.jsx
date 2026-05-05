import { useEffect, useState } from 'react';

export default function AvailabilityChecker({ datum, onVolgende, onTerug }) {
  const [status, setStatus] = useState('laden'); // laden | beschikbaar | bezet

  const geformatteerdeDatum = new Date(datum + 'T00:00:00').toLocaleDateString('nl-NL', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  useEffect(() => {
    fetch('/api/beschikbaarheid')
      .then(r => r.json())
      .then(data => {
        const dag = data.find(d => d.datum === datum);
        // Niet gevonden = standaard beschikbaar, false = geblokkeerd
        setStatus(dag?.beschikbaar === false ? 'bezet' : 'beschikbaar');
      })
      .catch(() => setStatus('beschikbaar'));
  }, [datum]);

  return (
    <div>
      <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-semibold text-stone-900 mb-6">
        Beschikbaarheid
      </h3>

      {status === 'laden' && (
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8 mb-8 text-center">
          <p className="text-stone-400 text-sm">Beschikbaarheid controleren…</p>
        </div>
      )}

      {status === 'beschikbaar' && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 mb-8 text-center">
          <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-emerald-800 font-semibold text-lg mb-1">Beschikbaar!</p>
          <p className="text-emerald-700 text-sm capitalize">{geformatteerdeDatum}</p>
        </div>
      )}

      {status === 'bezet' && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 mb-8 text-center">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <p className="text-red-800 font-semibold text-lg mb-1">Niet beschikbaar</p>
          <p className="text-red-600 text-sm capitalize mb-1">{geformatteerdeDatum} is al bezet.</p>
          <p className="text-red-500 text-sm">Ga terug en kies een andere datum.</p>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={onTerug}
          className="flex-1 border border-stone-200 text-stone-600 font-medium py-3.5 rounded-xl text-sm hover:bg-stone-50 active:scale-[0.98] transition-all"
        >
          ← Terug
        </button>
        {status === 'beschikbaar' && (
          <button
            onClick={onVolgende}
            className="flex-1 bg-stone-900 text-white font-semibold py-3.5 rounded-xl text-sm hover:bg-stone-800 active:scale-[0.98] transition-all"
          >
            Aanvraag versturen →
          </button>
        )}
      </div>
    </div>
  );
}
