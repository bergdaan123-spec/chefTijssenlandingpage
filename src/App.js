import './index.css';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Reviews from './components/Reviews';
import BookingFlow from './components/BookingFlow';
import Footer from './components/Footer';
import Admin from './components/Admin';
import Privacy from './components/Privacy';
import { SignedIn, SignedOut, SignIn } from '@clerk/clerk-react';

const isAdmin = window.location.pathname === '/admin';
const isPrivacy = window.location.pathname === '/privacy';

function App() {
  if (isAdmin) return (
    <>
      <SignedOut>
        <div className="min-h-screen bg-stone-950 flex items-center justify-center px-6">
          <SignIn routing="hash" afterSignInUrl="/admin" afterSignUpUrl="/admin" />
        </div>
      </SignedOut>
      <SignedIn>
        <Admin />
      </SignedIn>
    </>
  );
  if (isPrivacy) return <Privacy />;

  function scrollNaarBoeken() {
    document.getElementById('boeken')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="bg-[#faf9f7]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-950/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-white text-lg font-semibold tracking-widest uppercase">
            Chef Tijssen
          </span>
          <button
            onClick={() => document.getElementById('over-mij')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-amber-400 text-sm font-medium hover:text-amber-300 transition tracking-wide"
          >
            Over mij →
          </button>
        </div>
      </nav>
      <Hero onBoeken={scrollNaarBoeken} />
      <About />
      <Services />
      <Reviews />
      <BookingFlow />
      <Footer />

      {/* Zwevende WhatsApp knop */}
      <a
        href="https://wa.me/31655622988?text=Hallo%20Chef%20Tijssen%2C%20ik%20heb%20een%20vraag!"
        target="_blank"
        rel="noreferrer"
        aria-label="Stel een vraag via WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#1ebe5d] active:scale-95 transition-all duration-200 group"
      >
        <svg className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.535 5.845L.057 23.885a.5.5 0 00.613.613l6.04-1.478A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.815 9.815 0 01-5.003-1.367l-.358-.214-3.718.91.927-3.623-.234-.372A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
        </svg>
        <span
          style={{ fontFamily: 'Montserrat, sans-serif' }}
          className="text-sm font-semibold tracking-wide max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap"
        >
          Stel een vraag
        </span>
      </a>
    </div>
  );
}

export default App;
