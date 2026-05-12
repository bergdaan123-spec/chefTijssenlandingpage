import React, { useState, useRef } from 'react';
import IntakeForm from './IntakeForm';
import AvailabilityChecker from './AvailabilityChecker';
import QuotePreview from './QuotePreview';

const STAPPEN = ['Gegevens', 'Beschikbaarheid', 'Bevestiging'];

const LEEG_FORMULIER = {
  naam: '',
  email: '',
  telefoon: '',
  datum: '',
  locatie: '',
  personen: '',
  type: '',
};

export default function BookingFlow() {
  const [stap, setStap] = useState(0);
  const [formData, setFormData] = useState(LEEG_FORMULIER);
  const ref = useRef(null);

  function scrollNaarFlow() {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function handleChange(veld, waarde) {
    setFormData((prev) => ({ ...prev, [veld]: waarde }));
  }

  function volgende() {
    setStap((s) => s + 1);
    scrollNaarFlow();
  }

  function terug() {
    setStap((s) => s - 1);
    scrollNaarFlow();
  }

  return (
    <section ref={ref} id="boeken" className="bg-stone-100 py-28 px-6">
      <div className="max-w-xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="text-amber-400 uppercase tracking-[0.2em] text-xs font-medium">Direct aanvragen</span>
          <h2
            style={{ fontFamily: 'var(--font-display)' }}
            className="text-4xl md:text-5xl font-semibold text-stone-900 mt-3 mb-4"
          >
            Plan jouw avond
          </h2>
          <div className="w-12 h-px bg-amber-400 mx-auto" />
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
          {/* Stepper */}
          <div className="px-8 pt-8 pb-6 border-b border-stone-100">
            <div className="flex items-center">
              {STAPPEN.map((label, i) => (
                <React.Fragment key={label}>
                  {/* Cirkel + label */}
                  <div className="flex flex-col items-center gap-1.5 shrink-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-all duration-300
                        ${i < stap
                          ? 'bg-stone-900 border-stone-900 text-white'
                          : i === stap
                          ? 'border-amber-400 text-amber-400 bg-amber-50'
                          : 'border-stone-200 text-stone-300 bg-white'
                        }`}
                    >
                      {i < stap ? '✓' : i + 1}
                    </div>
                    <span className={`text-[11px] font-medium tracking-wide ${i <= stap ? 'text-stone-700' : 'text-stone-300'}`}>
                      {label}
                    </span>
                  </div>
                  {/* Lijn tussen stappen — buiten de cirkel-container */}
                  {i < STAPPEN.length - 1 && (
                    <div className={`flex-1 h-px mx-3 mb-5 transition-colors duration-300 ${i < stap ? 'bg-stone-900' : 'bg-stone-200'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Step content */}
          <div className="px-8 py-8">
            {stap === 0 && <IntakeForm data={formData} onChange={handleChange} onVolgende={volgende} />}
            {stap === 1 && <AvailabilityChecker datum={formData.datum} onDatumKiezen={(d) => handleChange('datum', d)} onVolgende={volgende} onTerug={terug} />}
            {stap === 2 && <QuotePreview data={formData} onTerug={terug} />}
          </div>
        </div>
      </div>
    </section>
  );
}
