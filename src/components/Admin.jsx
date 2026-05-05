import { useState, useEffect } from 'react';

const MAANDEN = ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'];
const DAGEN = ['ma','di','wo','do','vr','za','zo'];

function vandaag() {
  return new Date().toISOString().split('T')[0];
}


function getDagenInMaand(jaar, maand) {
  const eerste = new Date(jaar, maand, 1);
  const laatste = new Date(jaar, maand + 1, 0);
  const dagen = [];

  // Lege vakjes voor de eerste dag (ma=0, zo=6)
  let startDag = (eerste.getDay() + 6) % 7;
  for (let i = 0; i < startDag; i++) dagen.push(null);

  for (let d = 1; d <= laatste.getDate(); d++) {
    const maandStr = String(maand + 1).padStart(2, '0');
    const dagStr = String(d).padStart(2, '0');
    dagen.push(`${jaar}-${maandStr}-${dagStr}`);
  }
  return dagen;
}

export default function Admin() {
  const [ingelogd, setIngelogd] = useState(false);
  const [wachtwoord, setWachtwoord] = useState('');
  const [fout, setFout] = useState('');
  const [adminSecret, setAdminSecret] = useState('');

  const [beschikbaarheid, setBeschikbaarheid] = useState({});
  const [geladen, setGeladen] = useState(false);
  const [bezig, setBezig] = useState(null);

  const nu = new Date();
  const [maandOffset, setMaandOffset] = useState(0);
  const huidigJaar = nu.getFullYear();
  const huidigMaand = nu.getMonth();
  const zichtMaand = (huidigMaand + maandOffset) % 12;
  const zichtJaar = huidigJaar + Math.floor((huidigMaand + maandOffset) / 12);

  useEffect(() => {
    if (!ingelogd) return;
    fetch('/api/beschikbaarheid')
      .then(r => r.json())
      .then(data => {
        const map = {};
        data.forEach(r => { map[r.datum] = r.beschikbaar; });
        setBeschikbaarheid(map);
        setGeladen(true);
      });
  }, [ingelogd]);

  async function login() {
    if (!wachtwoord.trim()) return;
    setFout('');

    const res = await fetch('/api/beschikbaarheid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${wachtwoord}`,
      },
      body: JSON.stringify({ datum: '2000-01-01', beschikbaar: true }),
    });

    if (res.status === 401) {
      setFout('Verkeerd wachtwoord.');
    } else {
      setAdminSecret(wachtwoord);
      setIngelogd(true);
    }
  }

  async function toggleDag(datum) {
    if (datum < vandaag()) return;
    const huidig = beschikbaarheid[datum];
    const nieuw = huidig === false ? true : false;
    setBezig(datum);

    const res = await fetch('/api/beschikbaarheid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminSecret}`,
      },
      body: JSON.stringify({ datum, beschikbaar: nieuw }),
    });

    if (res.status === 401) {
      setFout('Verkeerd wachtwoord — log opnieuw in.');
      setIngelogd(false);
    } else if (res.ok) {
      setBeschikbaarheid(prev => ({ ...prev, [datum]: nieuw }));
    }
    setBezig(null);
  }

  function dagKleur(datum) {
    if (!datum) return '';
    if (datum < vandaag()) return 'bg-stone-100 text-stone-300 cursor-not-allowed';
    const status = beschikbaarheid[datum];
    if (status === false) return 'bg-red-100 text-red-600 hover:bg-red-200 cursor-pointer';
    return 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 cursor-pointer';
  }

  const dagen = getDagenInMaand(zichtJaar, zichtMaand);

  if (!ingelogd) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl p-10 w-full max-w-sm shadow-xl">
          <img src="/logo.png" alt="Chef Tijssen" className="w-32 mx-auto mb-8" />
          <h1 style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-xl font-bold text-stone-900 text-center mb-6">
            Admin — Beschikbaarheid
          </h1>
          {fout && <p className="text-red-500 text-sm text-center mb-4">{fout}</p>}
          <input
            type="password"
            placeholder="Wachtwoord"
            value={wachtwoord}
            onChange={e => setWachtwoord(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <button
            onClick={login}
            className="w-full bg-stone-900 text-white font-semibold py-3 rounded-xl text-sm hover:bg-stone-800 transition"
          >
            Inloggen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 px-6 py-12">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-amber-500 uppercase tracking-[0.2em] text-xs font-semibold mb-1">Chef Tijssen</p>
            <h1 style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-2xl font-bold text-stone-900">Beschikbaarheid</h1>
          </div>
          <button
            onClick={() => { setIngelogd(false); setWachtwoord(''); }}
            className="text-stone-400 text-sm hover:text-stone-600 transition"
          >
            Uitloggen
          </button>
        </div>

        {/* Legenda */}
        <div className="flex gap-4 mb-6">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <div className="w-3 h-3 rounded-full bg-emerald-200" /> Beschikbaar
          </div>
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <div className="w-3 h-3 rounded-full bg-red-200" /> Geblokkeerd
          </div>
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <div className="w-3 h-3 rounded-full bg-stone-200" /> Verleden
          </div>
        </div>

        {/* Kalender card */}
        <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-8">

          {/* Maand navigatie */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setMaandOffset(o => Math.max(0, o - 1))}
              disabled={maandOffset === 0}
              className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:border-amber-400 hover:text-amber-500 disabled:opacity-30 transition"
            >
              ←
            </button>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-lg font-semibold text-stone-900 capitalize">
              {MAANDEN[zichtMaand]} {zichtJaar}
            </h2>
            <button
              onClick={() => setMaandOffset(o => Math.min(5, o + 1))}
              disabled={maandOffset === 5}
              className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:border-amber-400 hover:text-amber-500 disabled:opacity-30 transition"
            >
              →
            </button>
          </div>

          {/* Weekdagen header */}
          <div className="grid grid-cols-7 mb-2">
            {DAGEN.map(d => (
              <div key={d} className="text-center text-xs font-semibold text-stone-400 uppercase tracking-wide py-2">{d}</div>
            ))}
          </div>

          {/* Dagen */}
          {!geladen ? (
            <div className="text-center py-12 text-stone-400 text-sm">Laden…</div>
          ) : (
            <div className="grid grid-cols-7 gap-1">
              {dagen.map((datum, i) => (
                <button
                  key={i}
                  onClick={() => datum && toggleDag(datum)}
                  disabled={!datum || datum < vandaag() || bezig === datum}
                  className={`aspect-square rounded-xl text-sm font-medium flex items-center justify-center transition-all
                    ${!datum ? '' : dagKleur(datum)}
                    ${bezig === datum ? 'opacity-50' : ''}
                  `}
                >
                  {datum ? parseInt(datum.split('-')[2]) : ''}
                </button>
              ))}
            </div>
          )}
        </div>

        <p className="text-stone-400 text-xs text-center mt-6">
          Klik op een dag om hem te blokkeren of vrijgeven. Groen = beschikbaar, rood = geblokkeerd.
        </p>
      </div>
    </div>
  );
}
