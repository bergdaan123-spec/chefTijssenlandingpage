import './index.css';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
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
      <BookingFlow />
      <Footer />
    </div>
  );
}

export default App;
