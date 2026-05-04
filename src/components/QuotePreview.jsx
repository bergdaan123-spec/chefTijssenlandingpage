import { useEffect } from 'react';

export default function QuotePreview({ data }) {
  useEffect(() => {
    fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch(() => {});
  }, [data]);

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
        Bedankt, {data.naam}. We nemen binnen 24 uur contact met je op via{' '}
        <span className="font-medium text-stone-700">{data.email}</span>.
      </p>
    </div>
  );
}
