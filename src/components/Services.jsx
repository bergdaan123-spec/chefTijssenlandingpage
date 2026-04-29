const DIENSTEN = [
  {
    titel: 'Verjaardagsdiner',
    omschrijving: 'Vier je verjaardag met een luxe meergangendiner, volledig op maat samengesteld voor jou en je gasten.',
    icon: '🎂',
    detail: 'Vanaf € 150 + € 25 p.p.',
  },
  {
    titel: 'Diner aan huis',
    omschrijving: 'Romantisch of gezellig — een intiem diner voor twee tot tien personen, bereid in jouw eigen keuken.',
    icon: '🍽️',
    detail: 'Vanaf € 200 + € 30 p.p.',
  },
  {
    titel: 'Feestje & borrel',
    omschrijving: 'Hapjes, buffet of een volledig menu voor je feest. Ik regel alles achter de schermen, jij geniet.',
    icon: '🥂',
    detail: 'Vanaf € 175 + € 20 p.p.',
  },
];

export default function Services() {
  return (
    <section id="diensten" className="bg-[#faf9f7] py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-amber-600 uppercase tracking-[0.2em] text-xs font-medium">Aanbod</span>
          <h2
            style={{ fontFamily: 'var(--font-display)' }}
            className="text-4xl md:text-5xl font-semibold text-stone-900 mt-3 mb-4"
          >
            Wat ik aanbied
          </h2>
          <div className="w-12 h-px bg-amber-400 mx-auto" />
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
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
                <span className="text-amber-600 text-sm font-medium">{d.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
