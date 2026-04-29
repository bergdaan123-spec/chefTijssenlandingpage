import './index.css';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import BookingFlow from './components/BookingFlow';
import logo from './assets/WhatsApp Image 2026-04-24 at 18.23.35.jpeg';

function App() {
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
      <BookingFlow />
      <footer className="bg-stone-950 text-stone-500 text-center py-10 text-sm">
        <img src={logo} alt="Chef Tijssen" className="h-48 w-48 rounded-full object-cover mx-auto mb-4" />
        <p>© {new Date().getFullYear()} — Persoonlijk koken bij jou thuis</p>
      </footer>
    </div>
  );
}

export default App;
