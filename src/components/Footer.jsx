import logo from '../assets/WhatsApp Image 2026-04-24 at 18.23.35.jpeg';

export default function Footer() {
  return (
    <footer className="bg-stone-950 py-16 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12">

        {/* Logo */}
        <div className="flex-shrink-0 flex flex-col items-center md:items-start gap-4">
          <img
            src={logo}
            alt="Chef Tijssen"
            className="h-24 w-24 rounded-full object-cover"
          />
          <span style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-white text-sm font-semibold tracking-widest uppercase">
            Chef Tijssen
          </span>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px bg-stone-800 self-stretch" />

        {/* Contactgegevens */}
        <div className="flex flex-col gap-4">
          <p style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-amber-500 uppercase tracking-[0.2em] text-xs font-semibold">
            Contact
          </p>

          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
            </svg>
            <span style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-stone-400 text-sm italic">
              info@cheftijssen.nl
            </span>
          </div>

          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
            </svg>
            <span style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-stone-400 text-sm italic">
              +31 6 00 000 000
            </span>
          </div>

          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <span style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-stone-400 text-sm italic">
              KVK: 00000000
            </span>
          </div>
        </div>
      </div>

      {/* Onderste regel */}
      <div className="max-w-5xl mx-auto mt-12 pt-6 border-t border-stone-800">
        <p style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-stone-600 text-xs text-center tracking-wide">
          © {new Date().getFullYear()} Chef Tijssen — Persoonlijk koken bij jou thuis
        </p>
      </div>
    </footer>
  );
}
