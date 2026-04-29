import heroVideo from '../assets/hero.mp4';

export default function Hero({ onBoeken }) {
  return (
    <section className="relative min-h-screen bg-stone-950 flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center opacity-85"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-stone-950/30" />

      {/* Warm radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-900/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Brand name — hoofdrol */}
        <h1
          style={{ fontFamily: 'Montserrat, sans-serif' }}
          className="text-6xl md:text-8xl font-bold text-amber-400 uppercase tracking-[0.05em] mb-24"
        >
          Chef Tijssen
        </h1>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => document.getElementById('diensten')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-amber-400 text-stone-950 font-semibold px-10 py-4 rounded-full text-base hover:bg-amber-300 active:scale-95 transition-all duration-200 tracking-wide"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Wat bied ik aan?
          </button>
          <button
            onClick={onBoeken}
            className="text-stone-400 text-sm font-medium hover:text-white transition tracking-wide"
          >
            Bekijk beschikbaarheid ↓
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <div className="w-px h-10 bg-stone-400 animate-pulse" />
      </div>
    </section>
  );
}
