export default function Privacy() {
  return (
    <div className="bg-[#faf9f7] min-h-screen">

      {/* Header */}
      <div className="bg-stone-950 py-20 px-6 text-center">
        <p style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-amber-400 uppercase tracking-[0.25em] text-xs font-semibold mb-4">
          Chef Tijssen
        </p>
        <h1 style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-4xl md:text-5xl font-bold text-white">
          Privacyverklaring
        </h1>
        <div className="w-12 h-px bg-amber-400 mx-auto mt-6" />
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-20 space-y-12">

        <Intro />
        <Sectie titel="Persoonsgegevens die wij verwerken">
          <p>Chef Tijssen verwerkt uw persoonsgegevens doordat u gebruik maakt van onze diensten en/of omdat u deze zelf aan ons verstrekt.</p>
          <p className="mt-3">Hieronder vindt u een overzicht van de persoonsgegevens die wij verwerken:</p>
          <ul className="mt-3 space-y-1">
            {['Voor- en achternaam', 'Internetbrowser en apparaat type', 'E-mailadres', 'Locatiegegevens'].map(item => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-amber-400 mt-1">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Sectie>

        <Sectie titel="Bijzondere en/of gevoelige persoonsgegevens die wij verwerken">
          <p>Onze website en/of dienst heeft niet de intentie gegevens te verzamelen over websitebezoekers die jonger zijn dan 16 jaar. Tenzij ze toestemming hebben van ouders of voogd. We kunnen echter niet controleren of een bezoeker ouder dan 16 is. Wij raden ouders dan ook aan betrokken te zijn bij de online activiteiten van hun kinderen, om zo te voorkomen dat er gegevens over kinderen verzameld worden zonder ouderlijke toestemming. Als u er van overtuigd bent dat wij zonder die toestemming persoonlijke gegevens hebben verzameld over een minderjarige, neem dan contact met ons op via <a href="mailto:info@cheftijssen.nl" className="text-amber-500 hover:text-amber-400 transition-colors">info@cheftijssen.nl</a>, dan verwijderen wij deze informatie.</p>
        </Sectie>

        <Sectie titel="Chef Tijssen verwerkt jouw persoonsgegevens voor de volgende doelen">
          <ul className="space-y-1">
            {[
              'Verzenden van bevestigings- en notificatiemails',
              'U te kunnen e-mailen indien dit nodig is om onze dienstverlening uit te kunnen voeren',
              'Het uitvoeren van e-mailcampagnes',
              'Chef Tijssen analyseert uw gedrag op de website om daarmee de website te verbeteren en het aanbod van diensten af te stemmen op uw voorkeuren.',
            ].map(item => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-amber-400 mt-1">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Sectie>

        <Sectie titel="Geautomatiseerde besluitvorming">
          <p>Chef Tijssen neemt op basis van geautomatiseerde verwerkingen besluiten over zaken die (aanzienlijke) gevolgen kunnen hebben voor personen. Het gaat hier om besluiten die worden genomen door computerprogramma's of -systemen, zonder dat daar een mens tussen zit.</p>
          <p className="mt-3">Chef Tijssen gebruikt de volgende computerprogramma's of -systemen:</p>
          <ul className="mt-3 space-y-1">
            <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">—</span><span>Softwareprogramma Resend voor het automatisch versturen van e-mails.</span></li>
            <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">—</span><span>Softwareprogramma Brevo voor het uitvoeren van e-mailcampagnes.</span></li>
            <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">—</span><span>Softwareprogramma Supabase voor het opslaan van aanvragen en persoonsgegevens.</span></li>
          </ul>
        </Sectie>

        <Sectie titel="Hoe lang we persoonsgegevens bewaren">
          <p>Chef Tijssen bewaart uw persoonsgegevens niet langer dan strikt nodig is om de doelen te realiseren waarvoor uw gegevens worden verzameld. Wij hanteren een bewaartermijn van <strong className="text-stone-800">2 jaar</strong>.</p>
        </Sectie>

        <Sectie titel="Delen van persoonsgegevens met derden">
          <p>Chef Tijssen deelt uw persoonsgegevens met derden als dit noodzakelijk is voor het uitvoeren van de overeenkomst en om te voldoen aan een eventuele wettelijke verplichting. Met bedrijven die uw gegevens verwerken in onze opdracht, sluiten wij een verwerkersovereenkomst om te zorgen voor eenzelfde niveau van beveiliging en vertrouwelijkheid.</p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-stone-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-900 text-left">
                  <th style={{ fontFamily: 'Montserrat, sans-serif' }} className="px-5 py-3 text-amber-400 font-semibold text-xs uppercase tracking-wider">Categorie</th>
                  <th style={{ fontFamily: 'Montserrat, sans-serif' }} className="px-5 py-3 text-amber-400 font-semibold text-xs uppercase tracking-wider">Naam</th>
                  <th style={{ fontFamily: 'Montserrat, sans-serif' }} className="px-5 py-3 text-amber-400 font-semibold text-xs uppercase tracking-wider">Jurisdictie</th>
                  <th style={{ fontFamily: 'Montserrat, sans-serif' }} className="px-5 py-3 text-amber-400 font-semibold text-xs uppercase tracking-wider">Doel</th>
                  <th style={{ fontFamily: 'Montserrat, sans-serif' }} className="px-5 py-3 text-amber-400 font-semibold text-xs uppercase tracking-wider">Gegevens</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {[
                  { cat: 'E-mailprovider', naam: 'Resend', jurisdictie: 'Verenigde Staten', doel: 'Automatisch versturen van e-mails', data: 'Naam, e-mailadres' },
                  { cat: 'E-mailmarketing', naam: 'Brevo', jurisdictie: 'Europese Unie', doel: 'Uitvoeren van e-mailcampagnes', data: 'Naam, e-mailadres' },
                  { cat: 'Database', naam: 'Supabase', jurisdictie: 'Verenigde Staten', doel: 'Opslaan van aanvragen', data: 'Naam, e-mailadres, datum, locatie, aantal personen, type dienst' },
                ].map((r) => (
                  <tr key={r.naam} className="bg-white hover:bg-stone-50 transition-colors">
                    <td className="px-5 py-4 text-stone-600">{r.cat}</td>
                    <td className="px-5 py-4 font-medium text-stone-800">{r.naam}</td>
                    <td className="px-5 py-4 text-stone-600">{r.jurisdictie}</td>
                    <td className="px-5 py-4 text-stone-600">{r.doel}</td>
                    <td className="px-5 py-4 text-stone-600">{r.data}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Sectie>

        <Sectie titel="Cookies, of vergelijkbare technieken, die wij gebruiken">
          <p>Chef Tijssen gebruikt geen cookies of vergelijkbare technieken.</p>
        </Sectie>

        <Sectie titel="Gegevens inzien, aanpassen of verwijderen">
          <p>U heeft het recht om uw persoonsgegevens in te zien, te corrigeren of te verwijderen. Daarnaast heeft u het recht om uw eventuele toestemming voor de gegevensverwerking in te trekken of bezwaar te maken tegen de verwerking van uw persoonsgegevens door Chef Tijssen en heeft u het recht op gegevensoverdraagbaarheid.</p>
          <p className="mt-4">U kunt een verzoek tot inzage, correctie, verwijdering of gegevensoverdraging sturen naar <a href="mailto:info@cheftijssen.nl" className="text-amber-500 hover:text-amber-400 transition-colors">info@cheftijssen.nl</a>.</p>
          <p className="mt-4">Om er zeker van te zijn dat het verzoek door u is gedaan, vragen wij u een kopie van uw identiteitsbewijs mee te sturen. Maak hierin uw pasfoto, MRZ, paspoortnummer en BSN zwart ter bescherming van uw privacy. We reageren binnen vier weken op uw verzoek.</p>
          <p className="mt-4">Chef Tijssen wijst u er op dat u een klacht kunt indienen bij de Autoriteit Persoonsgegevens via <a href="https://autoriteitpersoonsgegevens.nl/nl/contact-met-de-autoriteit-persoonsgegevens/tip-ons" target="_blank" rel="noreferrer" className="text-amber-500 hover:text-amber-400 transition-colors">autoriteitpersoonsgegevens.nl</a>.</p>
        </Sectie>

        <Sectie titel="Hoe wij persoonsgegevens beveiligen">
          <p>Chef Tijssen neemt de bescherming van uw gegevens serieus en neemt passende maatregelen om misbruik, verlies, onbevoegde toegang, ongewenste openbaarmaking en ongeoorloofde wijziging tegen te gaan. Als u de indruk heeft dat uw gegevens niet goed beveiligd zijn of er aanwijzingen zijn van misbruik, neem dan contact op via <a href="mailto:info@cheftijssen.nl" className="text-amber-500 hover:text-amber-400 transition-colors">info@cheftijssen.nl</a>.</p>
        </Sectie>

      </div>

      {/* Footer regel */}
      <div className="bg-stone-950 py-8 px-6 text-center">
        <p style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-stone-600 text-xs tracking-wide">
          © {new Date().getFullYear()} Chef Tijssen — Persoonlijk koken bij jou thuis
        </p>
      </div>
    </div>
  );
}

function Intro() {
  return (
    <div className="bg-white rounded-2xl p-8 border border-stone-100">
      <p style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-amber-400 uppercase tracking-[0.2em] text-xs font-semibold mb-4">
        Contactgegevens
      </p>
      <div style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-stone-600 text-sm space-y-1 leading-relaxed">
        <p className="font-semibold text-stone-800">Chef Tijssen</p>
        <p>Amstelveen, 3166AA</p>
        <p>cheftijssen.nl</p>
        <p>+31 6 57 55 31 33</p>
      </div>
      <p className="text-stone-500 text-sm leading-relaxed mt-6">
        Chef Tijssen, gevestigd aan Amstelveen, 3166AA, is verantwoordelijk voor de verwerking van persoonsgegevens zoals weergegeven in deze privacyverklaring.
      </p>
    </div>
  );
}

function Sectie({ titel, children }) {
  return (
    <div>
      <h2 style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-xl font-bold text-stone-900 mb-4 pb-3 border-b border-amber-400/30">
        {titel}
      </h2>
      <div className="text-stone-500 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}
