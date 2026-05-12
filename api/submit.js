const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');

const TYPE_LABELS = {
  '3gangen': '3 gangen diner aan huis',
  '5gangen': '5 gangen diner aan huis',
  'feest':   'Groot feest',
  'wijn':    'Wijn arrangement',
};

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { naam, email, telefoon, datum, locatie, personen, type } = req.body;

  if (!naam || !email || !telefoon || !datum || !locatie || !personen || !type) {
    return res.status(400).json({ error: 'Ontbrekende velden' });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  const { error: dbError } = await supabase.from('leads').insert({
    naam,
    email,
    telefoon,
    datum,
    locatie,
    personen: parseInt(personen, 10),
    type,
    offerte_totaal: 0,
    status: 'nieuw',
    bron: 'website',
  });

  if (dbError) {
    console.error('Supabase fout:', dbError);
    return res.status(500).json({ error: 'Opslaan mislukt' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const typeLabel = TYPE_LABELS[type] || type;
  const whatsappNummer = telefoon.replace(/\D/g, '').replace(/^0/, '31');
  const whatsappLink = `https://wa.me/${whatsappNummer}`;
  const datumFormatted = new Date(datum + 'T00:00:00').toLocaleDateString('nl-NL', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  // Notificatie naar de chef
  await resend.emails.send({
    from: 'Chef Tijssen <noreply@cheftijssen.nl>',
    to: process.env.CHEF_EMAIL,
    subject: `Nieuwe aanvraag — ${naam} (${typeLabel})`,
    html: `
      <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;background:#ffffff;">
        <div style="background:#0f0f0f;padding:32px 40px;text-align:center;">
          <p style="margin:0;color:#c9a84c;letter-spacing:0.2em;font-size:11px;text-transform:uppercase;font-weight:600;">Chef Tijssen</p>
          <div style="width:40px;height:1px;background:#c9a84c;margin:10px auto;"></div>
          <p style="margin:0;color:#888;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;">Nieuwe aanvraag ontvangen</p>
        </div>
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
            <tr style="border-bottom:1px solid #e7e5e4;">
              <td style="padding:12px 0;color:#78716c;">Telefoon</td>
              <td style="padding:12px 0;color:#1c1917;">${telefoon}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;color:#78716c;">Type</td>
              <td style="padding:12px 0;color:#1c1917;">${typeLabel}</td>
            </tr>
          </table>
          <a href="${whatsappLink}" style="display:inline-block;margin-top:28px;background:#25D366;color:#ffffff;font-size:14px;font-weight:600;padding:14px 28px;border-radius:10px;text-decoration:none;">
            Open WhatsApp chat met ${naam}
          </a>
        </div>
        <div style="background:#0f0f0f;padding:20px 40px;text-align:center;">
          <p style="margin:0;color:#444;font-size:11px;letter-spacing:0.1em;">CHEF TIJSSEN &nbsp;·&nbsp; Persoonlijk koken bij jou thuis</p>
        </div>
      </div>
    `,
  });

  // Bevestiging naar de klant
  await resend.emails.send({
    from: 'Chef Tijssen <noreply@cheftijssen.nl>',
    to: email,
    subject: `Hey ${naam}, je aanvraag is binnengekomen!`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
      <meta name="viewport" content="width=device-width,initial-scale=1.0">
      <style>
        @media only screen and (max-width:600px) {
          .sig-tekst { display:block !important; width:100% !important; padding-bottom:0 !important; }
          .sig-foto  { display:block !important; width:100% !important; text-align:center !important; padding-top:16px !important; }
        }
      </style>
      </head>
      <body style="margin:0;padding:0;background:#f4f4f4;">
      <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;background:#ffffff;">

        <!-- Header -->
        <div style="background:#0f0f0f;padding:28px 40px;text-align:center;">
          <p style="margin:0;color:#fbbf24;letter-spacing:0.25em;font-size:10px;text-transform:uppercase;font-weight:700;">Chef Tijssen</p>
          <div style="width:32px;height:1px;background:#fbbf24;margin:10px auto;"></div>
          <p style="margin:0;color:#888;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;">Aanvraag ontvangen</p>
        </div>

        <!-- Body -->
        <div style="padding:40px 40px 32px;background:#fafaf9;">
          <h2 style="margin:0 0 16px;color:#1c1917;font-size:22px;font-weight:600;text-align:center;">Hoi ${naam},</h2>
          <p style="margin:0 0 16px;color:#44403c;line-height:1.8;font-size:15px;text-align:center;">
            Bedankt voor het kiezen van Chef Tijssen. Het is fijn dat je jouw avond aan mij toevertrouwt — ik ga er iets moois van maken.
          </p>
          <p style="margin:0 0 32px;color:#44403c;line-height:1.8;font-size:15px;text-align:center;">
            Ik neem binnen 24 uur persoonlijk contact met je op om alles door te spreken.
          </p>

          <!-- Aanvraag samenvatting -->
          <div style="background:#ffffff;border-radius:12px;border:1px solid #e7e5e4;overflow:hidden;margin-bottom:32px;">
            <div style="background:#1c1917;padding:12px 20px;">
              <p style="margin:0;color:#fbbf24;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">Jouw aanvraag</p>
            </div>
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr style="border-bottom:1px solid #f5f5f4;">
                <td style="padding:14px 20px;color:#78716c;width:110px;">Datum</td>
                <td style="padding:14px 20px;font-weight:600;color:#1c1917;">${datumFormatted}</td>
              </tr>
              <tr style="border-bottom:1px solid #f5f5f4;">
                <td style="padding:14px 20px;color:#78716c;">Locatie</td>
                <td style="padding:14px 20px;font-weight:600;color:#1c1917;">${locatie}</td>
              </tr>
              <tr style="border-bottom:1px solid #f5f5f4;">
                <td style="padding:14px 20px;color:#78716c;">Type</td>
                <td style="padding:14px 20px;font-weight:600;color:#1c1917;">${typeLabel}</td>
              </tr>
              <tr>
                <td style="padding:14px 20px;color:#78716c;">Personen</td>
                <td style="padding:14px 20px;font-weight:600;color:#1c1917;">${personen}</td>
              </tr>
            </table>
          </div>

          <!-- Handtekening: foto boven tekst -->
          <div style="border-top:1px solid #e7e5e4;padding-top:24px;text-align:center;">
            <img
              src="https://www.cheftijssen.nl/viego.jpg"
              alt="Viego Tijssen"
              width="160"
              style="display:inline-block;width:160px;height:200px;object-fit:cover;object-position:center top;border-radius:12px;margin-bottom:16px;"
            />
            <p style="margin:0 0 4px;color:#1c1917;font-weight:600;font-size:15px;">Viego Tijssen</p>
            <p style="margin:0;color:#78716c;font-size:13px;">Chef Tijssen — Persoonlijk koken bij jou thuis</p>
            <p style="margin:4px 0 2px;font-size:13px;color:#78716c;">+31 6 55 62 29 88</p>
            <p style="margin:0;font-size:13px;"><a href="https://cheftijssen.nl" style="color:#fbbf24;text-decoration:none;">cheftijssen.nl</a></p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background:#0f0f0f;padding:20px 40px;text-align:center;">
          <p style="margin:0;color:#444;font-size:11px;letter-spacing:0.1em;">CHEF TIJSSEN &nbsp;·&nbsp; Persoonlijk koken bij jou thuis</p>
        </div>
      </div>
      </body>
      </html>
    `,
  });

  // Contact toevoegen aan Brevo
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
