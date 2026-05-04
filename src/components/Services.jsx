const DIENSTEN = [
  {
    titel: '3 gangen diner',
    omschrijving: 'Een volledig driegangendiner bereid in jouw eigen keuken. Van amuse tot dessert — jij hoeft alleen maar te genieten.',
    icon: '🍽️',
    prijs: '€ 55,-',
    detail: 'p.p. · vanaf 4 personen',
  },
  {
    titel: '5 gangen diner',
    omschrijving: 'Een uitgebreide culinaire avond met vijf gangen vol smaak en verfijning. Perfect voor een bijzondere gelegenheid.',
    icon: '⭐',
    prijs: '€ 70,-',
    detail: 'p.p. · vanaf 4 personen',
  },
  {
    titel: 'Groot feest',
    omschrijving: 'Hapjes, een smaakvol hoofdgerecht en een heerlijk toetje voor jouw feest. Ik regel alles, jij geniet.',
    icon: '🥂',
    prijs: '€ 35,-',
    detail: 'p.p. · vanaf 10 personen',
  },
  {
    titel: 'Wijn arrangement',
    omschrijving: 'Zorgvuldig geselecteerde wijnen passend bij elke gang. Een mooie aanvulling op elk menu.',
    icon: '🍷',
    prijs: '€ 4,-',
    detail: 'p.p. per gang',
  },
];

export default function Services() {
  return (
    <section id="diensten" className="bg-[#faf9f7] py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-amber-400 uppercase tracking-[0.2em] text-xs font-medium">Aanbod</span>
          <h2
            style={{ fontFamily: 'var(--font-display)' }}
            className="text-4xl md:text-5xl font-semibold text-stone-900 mt-3 mb-4"
          >
            Wat ik aanbied
          </h2>
          <div className="w-12 h-px bg-amber-400 mx-auto" />
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DIENSTEN.map((d) => (
            <div
              key={d.titel}
              className="group bg-white rounded-3xl p-8 border border-stone-100 hover:border-amber-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:bg-amber-100 transition-colors">
                {d.icon}
              </div>

              <h3
                style={{ fontFamily: 'var(--font-display)' }}
                className="text-xl font-semibold text-stone-900 mb-3"
              >
                {d.titel}
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed mb-6 flex-1">{d.omschrijving}</p>

              <div className="pt-5 border-t border-stone-100">
                <span className="text-3xl font-bold text-stone-900" style={{ fontFamily: 'var(--font-display)' }}>
                  {d.prijs}
                </span>
                <p className="text-stone-400 text-xs mt-1">{d.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
