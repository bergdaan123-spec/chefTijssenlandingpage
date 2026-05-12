import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';

const MAANDEN = ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'];
const DAGEN = ['ma','di','wo','do','vr','za','zo'];

const TYPE_LABELS = {
  '3gangen': '3 gangen diner aan huis',
  '5gangen': '5 gangen diner aan huis',
  'feest':   'Groot feest',
  'wijn':    'Wijn arrangement',
};

const PRIJS_PP = {
  '3gangen': 55,
  '5gangen': 70,
  'feest':   35,
  'wijn':    4,
};

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

function genereerFactuurnummer() {
  const nu = new Date();
  const jaar = nu.getFullYear();
  const maand = String(nu.getMonth() + 1).padStart(2, '0');
  const dag = String(nu.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 900 + 100);
  return `F-${jaar}${maand}${dag}-${random}`;
}

function standaardVervaldatum() {
  const d = new Date();
  d.setDate(d.getDate() + 14);
  return d.toISOString().split('T')[0];
}

export default function Admin() {
  const { getToken, signOut } = useAuth();
  const [tabBlad, setTabBlad] = useState('beschikbaarheid');
  const [gekozenLead, setGekozenLead] = useState(null);

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
    fetch('/api/beschikbaarheid')
      .then(r => r.json())
      .then(data => {
        const map = {};
        data.forEach(r => { map[r.datum] = r.beschikbaar; });
        setBeschikbaarheid(map);
        setGeladen(true);
      });
  }, []);

  async function toggleDag(datum) {
    if (datum < vandaag()) return;
    const huidig = beschikbaarheid[datum];
    const nieuw = huidig === false ? true : false;
    setBezig(datum);
    const token = await getToken();
    const res = await fetch('/api/beschikbaarheid', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ datum, beschikbaar: nieuw }),
    });
    if (res.ok) { setBeschikbaarheid(prev => ({ ...prev, [datum]: nieuw })); }
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

  if (gekozenLead) {
    return (
      <FactuurBuilder
        lead={gekozenLead}
        onTerug={() => setGekozenLead(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 px-6 py-12">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-amber-500 uppercase tracking-[0.2em] text-xs font-semibold mb-1">
              Chef Tijssen
            </p>
            <h1 style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-2xl font-bold text-stone-900">
              Admin
            </h1>
          </div>
          <button
            onClick={() => signOut()}
            className="text-stone-400 text-sm hover:text-stone-600 transition"
          >
            Uitloggen
          </button>
        </div>

        {/* Tabbladen */}
        <div className="flex gap-1 bg-white rounded-2xl p-1 border border-stone-200 mb-8 w-fit">
          {[
            { id: 'beschikbaarheid', label: 'Beschikbaarheid' },
            { id: 'aanvragen', label: 'Aanvragen' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setTabBlad(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                tabBlad === tab.id
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Beschikbaarheid */}
        {tabBlad === 'beschikbaarheid' && (
          <>
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

            <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setMaandOffset(o => Math.max(0, o - 1))}
                  disabled={maandOffset === 0}
                  className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:border-amber-400 hover:text-amber-500 disabled:opacity-30 transition"
                >←</button>
                <h2 style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-lg font-semibold text-stone-900 capitalize">
                  {MAANDEN[zichtMaand]} {zichtJaar}
                </h2>
                <button
                  onClick={() => setMaandOffset(o => Math.min(5, o + 1))}
                  disabled={maandOffset === 5}
                  className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:border-amber-400 hover:text-amber-500 disabled:opacity-30 transition"
                >→</button>
              </div>

              <div className="grid grid-cols-7 mb-2">
                {DAGEN.map(d => (
                  <div key={d} className="text-center text-xs font-semibold text-stone-400 uppercase tracking-wide py-2">{d}</div>
                ))}
              </div>

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
          </>
        )}

        {/* Aanvragen */}
        {tabBlad === 'aanvragen' && (
          <Aanvragen onFactuur={setGekozenLead} />
        )}
      </div>
    </div>
  );
}

function Aanvragen({ onFactuur }) {
  const { getToken } = useAuth();
  const [leads, setLeads] = useState([]);
  const [geladen, setGeladen] = useState(false);
  const [fout, setFout] = useState('');

  useEffect(() => {
    getToken().then(token =>
      fetch('/api/leads', {
        headers: { 'Authorization': `Bearer ${token}` },
      })
        .then(r => r.json())
        .then(data => {
          if (Array.isArray(data)) {
            setLeads(data);
            setGeladen(true);
          } else {
            setFout('Geen toegang — controleer of CLERK_SECRET_KEY is ingesteld in Vercel.');
          }
        })
        .catch(() => setFout('Kon aanvragen niet laden.'))
    );
  }, [getToken]);

  if (!geladen) return <div className="text-center py-12 text-stone-400 text-sm">Laden…</div>;
  if (fout) return <div className="text-center py-12 text-red-400 text-sm">{fout}</div>;
  if (leads.length === 0) return <div className="text-center py-12 text-stone-400 text-sm">Nog geen aanvragen.</div>;

  return (
    <div className="space-y-4">
      {leads.map(lead => {
        const datum = new Date(lead.datum + 'T00:00:00').toLocaleDateString('nl-NL', {
          weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
        });
        const whatsappNummer = lead.telefoon?.replace(/\D/g, '').replace(/^0/, '31');

        return (
          <div key={lead.id} className="bg-white rounded-2xl border border-stone-200 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p style={{ fontFamily: 'Montserrat, sans-serif' }} className="font-semibold text-stone-900 text-base">
                  {lead.naam}
                </p>
                <p className="text-stone-500 text-sm mt-0.5">
                  {datum} · {TYPE_LABELS[lead.type] || lead.type} · {lead.personen} pers.
                </p>
                <p className="text-stone-400 text-sm">
                  {lead.email}{lead.telefoon ? ` · ${lead.telefoon}` : ''}
                </p>
              </div>
              <span className={`shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide
                ${lead.status === 'nieuw' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-700'}`}>
                {lead.status}
              </span>
            </div>

            <div className="flex gap-3 mt-4">
              {whatsappNummer && (
                <a
                  href={`https://wa.me/${whatsappNummer}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 text-sm font-medium hover:bg-emerald-100 transition"
                >
                  WhatsApp
                </a>
              )}
              <button
                onClick={() => onFactuur(lead)}
                className="px-4 py-2 rounded-xl bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition"
              >
                Factuur opstellen
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FactuurBuilder({ lead, onTerug }) {
  const { getToken } = useAuth();
  const typeLabel = TYPE_LABELS[lead.type] || lead.type;
  const prijspp = PRIJS_PP[lead.type] || 0;

  const [factuurnummer, setFactuurnummer] = useState(genereerFactuurnummer);
  const [vervaldatum, setVervaldatum] = useState(standaardVervaldatum);
  const [regels, setRegels] = useState([
    { omschrijving: `${typeLabel} — ${lead.personen} personen`, bedrag: lead.personen * prijspp },
  ]);
  const [notities, setNotities] = useState('');
  const [bezig, setBezig] = useState(false);
  const [verstuurd, setVerstuurd] = useState(false);
  const [fout, setFout] = useState('');

  const totaal = regels.reduce((sum, r) => sum + Number(r.bedrag), 0);

  function updateRegel(index, veld, waarde) {
    setRegels(prev => prev.map((r, i) => i === index ? { ...r, [veld]: waarde } : r));
  }

  function voegRegelToe() {
    setRegels(prev => [...prev, { omschrijving: '', bedrag: 0 }]);
  }

  function verwijderRegel(index) {
    setRegels(prev => prev.filter((_, i) => i !== index));
  }

  async function verstuur() {
    setBezig(true);
    setFout('');
    try {
      const token = await getToken();
      const res = await fetch('/api/factuur', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          klant: { naam: lead.naam, email: lead.email, locatie: lead.locatie },
          regels: regels.map(r => ({ ...r, bedrag: Number(r.bedrag) })),
          factuurnummer,
          vervaldatum,
          notities,
        }),
      });
      if (res.ok) {
        setVerstuurd(true);
      } else {
        setFout('Er ging iets mis. Probeer opnieuw.');
      }
    } catch {
      setFout('Er ging iets mis. Probeer opnieuw.');
    }
    setBezig(false);
  }

  const inputKlasse = 'w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition';

  if (verstuurd) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl p-10 w-full max-w-sm shadow-sm border border-stone-200 text-center">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-xl font-bold text-stone-900 mb-2">
            Factuur verstuurd
          </h2>
          <p className="text-stone-500 text-sm mb-8">
            {factuurnummer} is verzonden naar {lead.email}.
          </p>
          <button onClick={onTerug} className="w-full bg-stone-900 text-white font-semibold py-3 rounded-xl text-sm hover:bg-stone-800 transition">
            Terug naar aanvragen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 px-6 py-12">
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={onTerug} className="text-stone-400 hover:text-stone-600 transition text-sm">
            ← Terug
          </button>
          <div>
            <p style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-amber-500 uppercase tracking-[0.2em] text-xs font-semibold">
              Chef Tijssen
            </p>
            <h1 style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-2xl font-bold text-stone-900">
              Factuur opstellen
            </h1>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-8 space-y-6">

          {/* Klantinfo */}
          <div className="bg-stone-50 rounded-2xl p-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-2">Klant</p>
            <p className="font-semibold text-stone-900">{lead.naam}</p>
            <p className="text-stone-500 text-sm">{lead.email}</p>
            {lead.telefoon && <p className="text-stone-500 text-sm">{lead.telefoon}</p>}
          </div>

          {/* Factuurnummer + vervaldatum */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-2">
                Factuurnummer
              </label>
              <input
                type="text"
                value={factuurnummer}
                onChange={e => setFactuurnummer(e.target.value)}
                className={inputKlasse}
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-2">
                Vervaldatum
              </label>
              <input
                type="date"
                value={vervaldatum}
                onChange={e => setVervaldatum(e.target.value)}
                className={inputKlasse}
              />
            </div>
          </div>

          {/* Factuurregels */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-3">
              Factuurregels
            </p>
            <div className="space-y-3">
              {regels.map((regel, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <input
                    type="text"
                    value={regel.omschrijving}
                    onChange={e => updateRegel(i, 'omschrijving', e.target.value)}
                    placeholder="Omschrijving"
                    className={`${inputKlasse} flex-1`}
                  />
                  <div className="relative w-32 shrink-0">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm pointer-events-none">€</span>
                    <input
                      type="number"
                      value={regel.bedrag}
                      onChange={e => updateRegel(i, 'bedrag', e.target.value)}
                      className={`${inputKlasse} pl-8`}
                    />
                  </div>
                  {regels.length > 1 && (
                    <button
                      onClick={() => verwijderRegel(i)}
                      className="text-stone-300 hover:text-red-400 transition text-xl leading-none shrink-0"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={voegRegelToe}
              className="mt-3 text-sm text-amber-500 hover:text-amber-600 transition font-medium"
            >
              + Regel toevoegen
            </button>
          </div>

          {/* Totaal */}
          <div className="flex items-center justify-between border-t border-stone-200 pt-4">
            <span style={{ fontFamily: 'Montserrat, sans-serif' }} className="font-semibold text-stone-900">
              Totaal
            </span>
            <span style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-xl font-bold text-stone-900">
              € {totaal.toFixed(2).replace('.', ',')}
            </span>
          </div>

          {/* Notities */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-2">
              Notities (optioneel)
            </label>
            <textarea
              value={notities}
              onChange={e => setNotities(e.target.value)}
              placeholder="Bijv. reiskosten inbegrepen, betaling via bank..."
              rows={3}
              className={inputKlasse}
            />
          </div>

          {fout && <p className="text-red-500 text-sm">{fout}</p>}

          {/* Verstuurknop */}
          <button
            onClick={verstuur}
            disabled={bezig || regels.some(r => !r.omschrijving)}
            className="w-full bg-stone-900 text-white font-semibold py-4 rounded-xl text-sm tracking-wide hover:bg-stone-800 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {bezig ? 'Verzenden…' : `Factuur versturen naar ${lead.email}`}
          </button>
        </div>
      </div>
    </div>
  );
}
