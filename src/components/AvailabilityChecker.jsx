import { useEffect, useState } from 'react';

const MAANDEN = ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'];
const DAGEN = ['ma','di','wo','do','vr','za','zo'];

function vandaag() {
  return new Date().toISOString().split('T')[0];
}

function getDagenInMaand(jaar, maand) {
  const eerste = new Date(jaar, maand, 1);
  const laatste = new Date(jaar, maand + 1, 0);
  const dagen = [];
  let startDag = (eerste.getDay() + 6) % 7;
  for (let i = 0; i < startDag; i++) dagen.push(null);
  for (let d = 1; d <= laatste.getDate(); d++) {
    const maandStr = String(maand + 1).padStart(2, '0');
    const dagStr = String(d).padStart(2, '0');
    dagen.push(`${jaar}-${maandStr}-${dagStr}`);
  }
  return dagen;
}

export default function AvailabilityChecker({ datum, onDatumKiezen, onVolgende, onTerug }) {
  const [geblokkeerd, setGeblokkeerd] = useState(new Set());
  const [geladen, setGeladen] = useState(false);

  const nu = new Date();
  const [maandOffset, setMaandOffset] = useState(0);
  const huidigJaar = nu.getFullYear();
  const huidigMaand = nu.getMonth();
  const zichtMaand = (huidigMaand + maandOffset) % 12;
  const zichtJaar = huidigJaar + Math.floor((huidigMaand + maandOffset) / 12);

  useEffect(() => {
    fetch('/api/beschikbaarheid')
      .then(r => r.json())
      .then(data => {
        const blocked = new Set(
          (Array.isArray(data) ? data : [])
            .filter(d => d.beschikbaar === false)
            .map(d => d.datum)
        );
        setGeblokkeerd(blocked);
        setGeladen(true);
      })
      .catch(() => setGeladen(true));
  }, []);

  const vandaagStr = vandaag();
  const dagen = getDagenInMaand(zichtJaar, zichtMaand);

  function isKiesbaar(d) {
    return d && d >= vandaagStr && !geblokkeerd.has(d);
  }

  function dagKleur(d) {
    if (!d) return '';
    if (d < vandaagStr) return 'bg-stone-100 text-stone-300 cursor-not-allowed';
    if (geblokkeerd.has(d)) return 'bg-red-50 text-red-300 cursor-not-allowed';
    if (d === datum) return 'bg-amber-400 text-white cursor-pointer';
    return 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 cursor-pointer';
  }

  const geformatteerdeDatum = datum
    ? new Date(datum + 'T00:00:00').toLocaleDateString('nl-NL', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      })
    : null;

  return (
    <div>
      <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-semibold text-stone-900 mb-2">
        Kies een datum
      </h3>
      <p className="text-stone-400 text-sm mb-6">Klik op een beschikbare dag om deze te selecteren.</p>

      {/* Kalender */}
      <div className="border border-stone-200 rounded-2xl p-5 mb-5">
        {/* Maand navigatie */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setMaandOffset(o => Math.max(0, o - 1))}
            disabled={maandOffset === 0}
            className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:border-amber-400 hover:text-amber-500 disabled:opacity-30 transition text-sm"
          >
            ←
          </button>
          <span style={{ fontFamily: 'var(--font-display)' }} className="text-sm font-semibold text-stone-800 capitalize">
            {MAANDEN[zichtMaand]} {zichtJaar}
          </span>
          <button
            onClick={() => setMaandOffset(o => Math.min(5, o + 1))}
            disabled={maandOffset === 5}
            className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:border-amber-400 hover:text-amber-500 disabled:opacity-30 transition text-sm"
          >
            →
          </button>
        </div>

        {/* Weekdagen */}
        <div className="grid grid-cols-7 mb-1">
          {DAGEN.map(d => (
            <div key={d} className="text-center text-[10px] font-semibold text-stone-400 uppercase tracking-wide py-1">{d}</div>
          ))}
        </div>

        {/* Dagen */}
        {!geladen ? (
          <div className="text-center py-8 text-stone-400 text-sm">Laden…</div>
        ) : (
          <div className="grid grid-cols-7 gap-0.5">
            {dagen.map((d, i) => (
              <button
                key={i}
                onClick={() => isKiesbaar(d) && onDatumKiezen(d)}
                disabled={!isKiesbaar(d)}
                className={`aspect-square rounded-lg text-xs font-medium flex items-center justify-center transition-all
                  ${!d ? '' : dagKleur(d)}
                  ${d === datum ? 'ring-2 ring-amber-500 ring-offset-1' : ''}
                `}
              >
                {d ? parseInt(d.split('-')[2]) : ''}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Geselecteerde datum */}
      {datum && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 text-center">
          <p className="text-amber-800 font-semibold text-sm capitalize">{geformatteerdeDatum}</p>
          <p className="text-amber-600 text-xs mt-0.5">Beschikbaar — klik hieronder om verder te gaan</p>
        </div>
      )}

      {/* Legenda */}
      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-1.5 text-xs text-stone-400">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-200" /> Beschikbaar
        </div>
        <div className="flex items-center gap-1.5 text-xs text-stone-400">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-300" /> Geselecteerd
        </div>
        <div className="flex items-center gap-1.5 text-xs text-stone-400">
          <div className="w-2.5 h-2.5 rounded-full bg-red-100" /> Bezet
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onTerug}
          className="flex-1 border border-stone-200 text-stone-600 font-medium py-3.5 rounded-xl text-sm hover:bg-stone-50 active:scale-[0.98] transition-all"
        >
          ← Terug
        </button>
        <button
          onClick={onVolgende}
          disabled={!datum}
          className="flex-1 bg-stone-900 text-white font-semibold py-3.5 rounded-xl text-sm hover:bg-stone-800 active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Aanvraag versturen →
        </button>
      </div>
    </div>
  );
}
