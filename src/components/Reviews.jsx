const REVIEWS = [
  {
    naam: 'Sophie & Thomas',
    tekst: 'Viego heeft ons trouwfeest compleet gemaakt. Het eten was fenomenaal — elke gang een verrassing. Onze gasten praten er nog steeds over.',
    aanleiding: 'Trouwdiner · 28 personen',
    sterren: 5,
  },
  {
    naam: 'Familie De Groot',
    tekst: 'Voor mijn vaders 60ste verjaardag boekte ik een vijfgangendiner. Viego regelde alles perfect, van inkopen tot opruimen. Een onvergetelijke avond.',
    aanleiding: '5-gangen diner · 8 personen',
    sterren: 5,
  },
  {
    naam: 'Marieke V.',
    tekst: 'Zo fijn dat je gewoon thuis kunt genieten van restaurantkwaliteit. De gerechten waren prachtig gepresenteerd en ontzettend lekker. Absoluut een aanrader.',
    aanleiding: '3-gangen diner · 6 personen',
    sterren: 5,
  },
  {
    naam: 'Bedrijfsuitje Kreative Studio',
    tekst: 'Wij boekten Viego voor ons jaarlijkse teamuitje. Iedereen was onder de indruk van de kwaliteit en presentatie. Professioneel, attent en heerlijk eten.',
    aanleiding: 'Groot feest · 22 personen',
    sterren: 5,
  },
];

function Sterren({ aantal }) {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: aantal }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="bg-stone-950 py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-amber-400 uppercase tracking-[0.2em] text-xs font-medium">Ervaringen</span>
          <h2
            style={{ fontFamily: 'var(--font-display)' }}
            className="text-4xl md:text-5xl font-semibold text-white mt-3 mb-4"
          >
            Wat gasten zeggen
          </h2>
          <div className="w-12 h-px bg-amber-400 mx-auto" />
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {REVIEWS.map((r) => (
            <div
              key={r.naam}
              className="bg-stone-900 rounded-3xl p-8 border border-stone-800 hover:border-amber-400/30 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <Sterren aantal={r.sterren} />

              {/* Quote */}
              <p className="text-stone-300 text-sm leading-relaxed flex-1 mb-6">
                "{r.tekst}"
              </p>

              {/* Reviewer */}
              <div className="pt-5 border-t border-stone-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400 text-sm font-semibold">
                  {r.naam[0]}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{r.naam}</p>
                  <p className="text-stone-500 text-xs">{r.aanleiding}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
