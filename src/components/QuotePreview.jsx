import { useState } from 'react';
import { berekenOfferte } from '../utils/pricing';

const TYPE_LABELS = {
  verjaardag: 'Verjaardagsdiner',
  diner: 'Diner aan huis',
  feestje: 'Feestje / borrel',
};

function Regel({ label, waarde, subtiel }) {
  return (
    <div className={`flex justify-between items-center py-3 ${subtiel ? 'border-b border-stone-100' : ''}`}>
      <span className="text-stone-500 text-sm">{label}</span>
      <span className="text-stone-800 text-sm font-medium">{waarde}</span>
    </div>
  );
}

export default function QuotePreview({ data, onTerug }) {
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const offerte = berekenOfferte(data.type, data.personen);
  const datum = new Date(data.datum + 'T00:00:00').toLocaleDateString('nl-NL', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  async function versturen() {
    setStatus('loading');
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          naam: data.naam,
          email: data.email,
          datum: data.datum,
          locatie: data.locatie,
          personen: data.personen,
          type: data.type,
          offerte_totaal: offerte.totaal,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-semibold text-stone-900 mb-3">
          Aanvraag ontvangen!
        </h3>
        <p className="text-stone-500 text-sm leading-relaxed max-w-xs mx-auto">
          Bedankt, {data.naam}. Je ontvangt een bevestiging op <span className="font-medium text-stone-700">{data.email}</span>. Ik neem binnen 24 uur contact op.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-semibold text-stone-900 mb-1">
        Jouw offerte-indicatie
      </h3>
      <p className="text-stone-400 text-xs mb-8 tracking-wide">
        Indicatie — definitieve offerte volgt na bevestiging
      </p>

      {/* Samenvatting */}
      <div className="bg-stone-50 rounded-2xl px-5 mb-5 divide-y divide-stone-100">
        <Regel label="Naam" waarde={data.naam} subtiel />
        <Regel label="E-mail" waarde={data.email} subtiel />
        <Regel label="Datum" waarde={datum} subtiel />
        <Regel label="Locatie" waarde={data.locatie} subtiel />
        <Regel label="Evenement" waarde={TYPE_LABELS[data.type]} subtiel />
        <Regel label="Personen" waarde={data.personen} />
      </div>

      {/* Prijsoverzicht */}
      <div className="border border-stone-200 rounded-2xl overflow-hidden">
        <div className="px-5 divide-y divide-stone-100">
          <div className="flex justify-between py-3">
            <span className="text-stone-500 text-sm">Basistarief</span>
            <span className="text-stone-700 text-sm">€ {offerte.basis},-</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-stone-500 text-sm">{data.personen} personen</span>
            <span className="text-stone-700 text-sm">€ {offerte.perPersoon},-</span>
          </div>
        </div>
        <div className="bg-stone-900 px-5 py-4 flex justify-between items-center">
          <span className="text-stone-300 text-sm font-medium">Totaal (indicatie)</span>
          <span style={{ fontFamily: 'var(--font-display)' }} className="text-white text-2xl font-semibold">
            € {offerte.totaal},-
          </span>
        </div>
      </div>

      {status === 'error' && (
        <p className="mt-4 text-red-500 text-sm text-center">Er ging iets mis. Probeer het opnieuw.</p>
      )}

      <div className="flex gap-3 mt-8">
        <button
          onClick={onTerug}
          disabled={status === 'loading'}
          className="flex-1 border border-stone-200 text-stone-600 font-medium py-3.5 rounded-xl text-sm hover:bg-stone-50 active:scale-[0.98] transition-all disabled:opacity-40"
        >
          ← Terug
        </button>
        <button
          onClick={versturen}
          disabled={status === 'loading'}
          className="flex-1 bg-amber-400 text-stone-950 font-semibold py-3.5 rounded-xl text-sm hover:bg-amber-300 active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Versturen…
            </>
          ) : 'Aanvraag versturen'}
        </button>
      </div>
    </div>
  );
}
