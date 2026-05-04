function ContactRegel({ icon, tekst }) {
  return (
    <div className="flex items-center gap-3">
      <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
      </svg>
      <span style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-amber-400 text-sm italic">
        {tekst}
      </span>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-stone-950 py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center">

        {/* Links: tagline */}
        <div className="flex flex-col gap-4 md:border-r md:border-stone-800 md:pr-12">
          <p style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-amber-400 uppercase tracking-[0.2em] text-xs font-semibold">
            Chef Tijssen
          </p>
          <p style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-stone-400 text-sm leading-relaxed">
            Persoonlijk koken bij jou thuis. Een onvergetelijke eetervaring, volledig op maat gemaakt voor jou en je gasten.
          </p>
          <div className="flex gap-3 mt-2">
            {['Over mij', 'Diensten', 'Boeken'].map((label, i) => (
              <button
                key={label}
                onClick={() => document.getElementById(['over-mij', 'diensten', 'boeken'][i])?.scrollIntoView({ behavior: 'smooth' })}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
                className="text-amber-400 hover:text-amber-300 text-xs tracking-wide transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Midden: logo */}
        <div className="flex justify-center">
          <img src="/logo.png" alt="Chef Tijssen" className="w-52 opacity-90" />
        </div>

        {/* Rechts: contact */}
        <div className="flex flex-col gap-5 md:border-l md:border-stone-800 md:pl-12">
          <p style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-amber-400 uppercase tracking-[0.2em] text-xs font-semibold">
            Contact
          </p>
          <ContactRegel
            icon="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75"
            tekst="info@cheftijssen.nl"
          />
          <ContactRegel
            icon="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z"
            tekst="+31 6 00 000 000"
          />
          <ContactRegel
            icon="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            tekst="KVK: 00000000"
          />
        </div>

      </div>

      {/* Onderste regel */}
      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-stone-800">
        <p style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-stone-600 text-xs text-center tracking-wide">
          © {new Date().getFullYear()} Chef Tijssen — Persoonlijk koken bij jou thuis
        </p>
      </div>
    </footer>
  );
}
