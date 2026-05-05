const EVENT_TYPES = [
  { value: '3gangen', label: '3 gangen diner aan huis — € 55,- p.p.' },
  { value: '5gangen', label: '5 gangen diner aan huis — € 70,- p.p.' },
  { value: 'feest', label: 'Groot feest (hapjes + hoofdgerecht + toetje) — € 35,- p.p.' },
  { value: 'wijn', label: 'Wijn arrangement — € 4,- p.p. per gang' },
];

const inputClass =
  'w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 placeholder:text-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition';

function Label({ children }) {
  return (
    <label className="block text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-2">
      {children}
    </label>
  );
}

export default function IntakeForm({ data, onChange, onVolgende }) {
  const isGeldig =
    data.naam.trim() &&
    data.email.trim() &&
    data.locatie.trim() &&
    data.personen > 0 &&
    data.type;

  return (
    <div>
      <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-semibold text-stone-900 mb-6">
        Jouw gegevens
      </h3>

      <div className="space-y-5">
        <div>
          <Label>Naam</Label>
          <input
            type="text"
            value={data.naam}
            onChange={(e) => onChange('naam', e.target.value)}
            placeholder="Jouw naam"
            className={inputClass}
          />
        </div>

        <div>
          <Label>E-mailadres</Label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="jouw@email.nl"
            className={inputClass}
          />
        </div>

        <div>
          <Label>Aantal personen</Label>
          <input
            type="number"
            min="1"
            max="100"
            value={data.personen}
            onChange={(e) => onChange('personen', e.target.value)}
            placeholder="Bijv. 8"
            className={inputClass}
          />
        </div>

        <div>
          <Label>Locatie</Label>
          <input
            type="text"
            value={data.locatie}
            onChange={(e) => onChange('locatie', e.target.value)}
            placeholder="Stad of adres"
            className={inputClass}
          />
        </div>

        <div>
          <Label>Type evenement</Label>
          <select
            value={data.type}
            onChange={(e) => onChange('type', e.target.value)}
            className={inputClass}
          >
            <option value="">Kies een type</option>
            {EVENT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={onVolgende}
        disabled={!isGeldig}
        className="mt-8 w-full bg-stone-900 text-white font-semibold py-4 rounded-xl text-sm tracking-wide hover:bg-stone-800 active:scale-[0.98] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Kies een datum →
      </button>
    </div>
  );
}
