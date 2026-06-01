import { useState, useEffect, useCallback, useRef } from 'react';

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
    <div className="flex gap-1 justify-center mb-6">
      {Array.from({ length: aantal }).map((_, i) => (
        <svg key={i} className="w-5 h-5 fill-amber-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  const [actief, setActief] = useState(0);
  const [fade, setFade] = useState(true);
  const touchStartX = useRef(null);

  const wissel = useCallback((volgend) => {
    setFade(false);
    setTimeout(() => {
      setActief(volgend);
      setFade(true);
    }, 300);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      wissel((actief + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [actief, wissel]);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) < 40) return;
    if (delta > 0) {
      wissel((actief + 1) % REVIEWS.length);
    } else {
      wissel((actief - 1 + REVIEWS.length) % REVIEWS.length);
    }
    touchStartX.current = null;
  };

  const r = REVIEWS[actief];

  return (
    <section className="bg-stone-950 py-28 px-6">
      <div className="max-w-3xl mx-auto">
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

        {/* Card */}
        <div
          className="bg-stone-900 rounded-3xl p-10 md:p-14 border border-stone-800 text-center cursor-grab active:cursor-grabbing select-none"
          style={{ transition: 'opacity 0.3s ease', opacity: fade ? 1 : 0 }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <Sterren aantal={r.sterren} />

          <p className="text-stone-200 text-lg md:text-xl leading-relaxed mb-10 italic">
            "{r.tekst}"
          </p>

          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400 font-semibold">
              {r.naam[0]}
            </div>
            <div className="text-left">
              <p className="text-white text-sm font-medium">{r.naam}</p>
              <p className="text-stone-500 text-xs">{r.aanleiding}</p>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => wissel(i)}
              className={`rounded-full transition-all duration-300 ${
                i === actief
                  ? 'bg-amber-400 w-6 h-2'
                  : 'bg-stone-700 hover:bg-stone-500 w-2 h-2'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
