export default function About() {
  return (
    <section id="over-mij" className="bg-white py-24 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">

        {/* Tekst links */}
        <div className="flex-1">
          <p style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-amber-400 uppercase tracking-[0.25em] text-xs font-semibold mb-4">
            Over de chef
          </p>
          <h2 style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-3xl md:text-4xl font-bold text-stone-900 mb-6 leading-tight">
            Hoi, ik ben Viego
          </h2>
          <p style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-stone-500 text-base leading-relaxed mb-4">
            Hier komt een stukje over Viego — zijn passie voor koken, zijn achtergrond en wat hem onderscheidt als privéchef.
          </p>
          <p style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-stone-500 text-base leading-relaxed">
            Vertel hier iets persoonlijks: waar hij vandaan komt, welke keukens hem inspireren, of een leuke anekdote.
          </p>
          <a
            href="https://www.instagram.com/cheftijssen"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-stone-400 hover:text-amber-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-sm">@cheftijssen</span>
          </a>
        </div>

        {/* Foto rechts */}
        <div className="flex-1 flex justify-center">
          <img
            src={require('../assets/WhatsApp Image 2026-04-29 at 06.47.38.jpeg')}
            alt="Viego"
            className="w-72 h-96 object-cover rounded-2xl shadow-md"
          />
        </div>

      </div>
    </section>
  );
}
