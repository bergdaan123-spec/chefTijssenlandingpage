const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');

const TYPE_LABELS = {
  verjaardag: 'Verjaardagsdiner',
  diner: 'Diner aan huis',
  feestje: 'Feestje / borrel',
};

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { naam, email, datum, locatie, personen, type, offerte_totaal } = req.body;

  if (!naam || !email || !datum || !locatie || !personen || !type || !offerte_totaal) {
    return res.status(400).json({ error: 'Ontbrekende velden' });
  }

  // 1. Opslaan in Supabase
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  const { error: dbError } = await supabase.from('leads').insert({
    naam,
    email,
    datum,
    locatie,
    personen: parseInt(personen, 10),
    type,
    offerte_totaal: parseInt(offerte_totaal, 10),
    status: 'nieuw',
    bron: 'website',
  });

  if (dbError) {
    console.error('Supabase fout:', dbError);
    return res.status(500).json({ error: 'Opslaan mislukt' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const typeLabel = TYPE_LABELS[type] || type;
  const datumFormatted = new Date(datum + 'T00:00:00').toLocaleDateString('nl-NL', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  // 2. Notificatie naar de chef
  await resend.emails.send({
    from: 'Chef Tijssen <noreply@cheftijssen.nl>',
    to: process.env.CHEF_EMAIL,
    subject: `Nieuwe aanvraag — ${naam} (${typeLabel})`,
    html: `
      <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;background:#ffffff;">
        <!-- Header -->
        <div style="background:#0f0f0f;padding:32px 40px;text-align:center;">
          <p style="margin:0;color:#c9a84c;letter-spacing:0.2em;font-size:11px;text-transform:uppercase;font-weight:600;">Chef Tijssen</p>
          <div style="width:40px;height:1px;background:#c9a84c;margin:10px auto;"></div>
          <p style="margin:0;color:#888;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;">Nieuwe aanvraag ontvangen</p>
        </div>
        <!-- Body -->
        <div style="padding:40px;background:#fafaf9;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr style="border-bottom:1px solid #e7e5e4;">
              <td style="padding:12px 0;color:#78716c;width:120px;">Naam</td>
              <td style="padding:12px 0;font-weight:600;color:#1c1917;">${naam}</td>
            </tr>
            <tr style="border-bottom:1px solid #e7e5e4;">
              <td style="padding:12px 0;color:#78716c;">E-mail</td>
              <td style="padding:12px 0;color:#1c1917;">${email}</td>
            </tr>
            <tr style="border-bottom:1px solid #e7e5e4;">
              <td style="padding:12px 0;color:#78716c;">Datum</td>
              <td style="padding:12px 0;color:#1c1917;">${datumFormatted}</td>
            </tr>
            <tr style="border-bottom:1px solid #e7e5e4;">
              <td style="padding:12px 0;color:#78716c;">Locatie</td>
              <td style="padding:12px 0;color:#1c1917;">${locatie}</td>
            </tr>
            <tr style="border-bottom:1px solid #e7e5e4;">
              <td style="padding:12px 0;color:#78716c;">Personen</td>
              <td style="padding:12px 0;color:#1c1917;">${personen}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;color:#78716c;">Type</td>
              <td style="padding:12px 0;color:#1c1917;">${typeLabel}</td>
            </tr>
          </table>
          <!-- Offerte block -->
          <div style="margin-top:32px;background:#0f0f0f;border-radius:8px;padding:24px 28px;">
            <p style="margin:0 0 4px;color:#888;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;">Offerte-indicatie</p>
            <p style="margin:0;color:#c9a84c;font-size:32px;font-weight:700;">€ ${offerte_totaal},-</p>
          </div>
          <p style="margin-top:28px;font-size:13px;color:#78716c;line-height:1.6;">Beantwoord deze mail om de klant een definitieve offerte te sturen.</p>
        </div>
        <!-- Footer -->
        <div style="background:#0f0f0f;padding:20px 40px;text-align:center;">
          <p style="margin:0;color:#444;font-size:11px;letter-spacing:0.1em;">CHEF TIJSSEN &nbsp;·&nbsp; Persoonlijk koken bij jou thuis</p>
        </div>
      </div>
    `,
  });

  // 3. Bevestiging naar de klant
  await resend.emails.send({
    from: 'Chef Tijssen <noreply@cheftijssen.nl>',
    to: process.env.CHEF_EMAIL,
    to: email,
    subject: 'Je aanvraag is ontvangen — Chef Tijssen',
    html: `
      <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;background:#ffffff;">
        <!-- Header -->
        <div style="background:#0f0f0f;padding:32px 40px;text-align:center;">
          <p style="margin:0;color:#c9a84c;letter-spacing:0.2em;font-size:11px;text-transform:uppercase;font-weight:600;">Chef Tijssen</p>
          <div style="width:40px;height:1px;background:#c9a84c;margin:10px auto;"></div>
          <p style="margin:0;color:#888;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;">Aanvraag ontvangen</p>
        </div>
        <!-- Body -->
        <div style="padding:40px;background:#fafaf9;">
          <h2 style="margin:0 0 12px;color:#1c1917;font-size:22px;font-weight:600;">Hoi ${naam},</h2>
          <p style="margin:0 0 28px;color:#44403c;line-height:1.7;font-size:15px;">
            Bedankt voor je aanvraag. Ik heb alles goed ontvangen en neem binnen 24 uur contact met je op om de details te bespreken en een definitieve offerte te sturen.
          </p>
          <p style="margin:0 0 12px;color:#78716c;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;font-weight:600;">Jouw aanvraag</p>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr style="border-bottom:1px solid #e7e5e4;">
              <td style="padding:12px 0;color:#78716c;width:120px;">Datum</td>
              <td style="padding:12px 0;color:#1c1917;">${datumFormatted}</td>
            </tr>
            <tr style="border-bottom:1px solid #e7e5e4;">
              <td style="padding:12px 0;color:#78716c;">Locatie</td>
              <td style="padding:12px 0;color:#1c1917;">${locatie}</td>
            </tr>
            <tr style="border-bottom:1px solid #e7e5e4;">
              <td style="padding:12px 0;color:#78716c;">Type</td>
              <td style="padding:12px 0;color:#1c1917;">${typeLabel}</td>
            </tr>
            <tr style="border-bottom:1px solid #e7e5e4;">
              <td style="padding:12px 0;color:#78716c;">Personen</td>
              <td style="padding:12px 0;color:#1c1917;">${personen}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;color:#78716c;">Indicatie</td>
              <td style="padding:12px 0;font-weight:600;color:#1c1917;">€ ${offerte_totaal},-</td>
            </tr>
          </table>
          <p style="margin-top:36px;color:#44403c;line-height:1.7;font-size:15px;">Tot snel,<br/><strong style="color:#1c1917;">Chef Tijssen</strong></p>
        </div>
        <!-- Footer -->
        <div style="background:#0f0f0f;padding:20px 40px;text-align:center;">
          <p style="margin:0;color:#444;font-size:11px;letter-spacing:0.1em;">CHEF TIJSSEN &nbsp;·&nbsp; Persoonlijk koken bij jou thuis</p>
        </div>
      </div>
    `,
  });

  // 4. Contact toevoegen aan Brevo
  await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      attributes: { FIRSTNAME: naam },
      listIds: [2],
      updateEnabled: true,
    }),
  }).catch((err) => console.error('Brevo fout:', err));

  return res.status(200).json({ ok: true });
};
