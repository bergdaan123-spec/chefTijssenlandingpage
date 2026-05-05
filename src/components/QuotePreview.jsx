import { useEffect, useRef, useState } from 'react';

export default function QuotePreview({ data }) {
  const verstuurd = useRef(false);
  const [fout, setFout] = useState(false);

  useEffect(() => {
    if (verstuurd.current) return;
    verstuurd.current = true;

    fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(res => { if (!res.ok) setFout(true); })
      .catch(() => setFout(true));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const datumFormatted = data.datum
    ? new Date(data.datum + 'T00:00:00').toLocaleDateString('nl-NL', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      })
    : null;

  return (
    <div className="text-center py-8">
      <div className={`w-16 h-16 ${fout ? 'bg-red-100' : 'bg-emerald-100'} rounded-full flex items-center justify-center mx-auto mb-5`}>
        {fout ? (
          <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>

      {fout ? (
        <>
          <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-semibold text-stone-900 mb-3">
            Er ging iets mis
          </h3>
          <p className="text-stone-500 text-sm leading-relaxed max-w-xs mx-auto">
            Stuur je aanvraag even direct via{' '}
            <a href="mailto:info@cheftijssen.nl" className="text-amber-500 font-medium">info@cheftijssen.nl</a>.
          </p>
        </>
      ) : (
        <>
          <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-semibold text-stone-900 mb-3">
            Aanvraag ontvangen!
          </h3>
          <p className="text-stone-500 text-sm leading-relaxed max-w-xs mx-auto">
            Bedankt, {data.naam}. We nemen binnen 24 uur contact met je op via{' '}
            <span className="font-medium text-stone-700">{data.email}</span>.
          </p>
          {datumFormatted && (
            <p className="text-stone-400 text-xs mt-3 capitalize">{datumFormatted}</p>
          )}
        </>
      )}
    </div>
  );
}
