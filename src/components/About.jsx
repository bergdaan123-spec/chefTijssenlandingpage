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
