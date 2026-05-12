const { Resend } = require('resend');
const { verifyToken } = require('@clerk/backend');

const CHEF = {
  naam: 'Chef Tijssen',
  adres: 'Amsteldijk Zuid 33',
  postcode: '1184VC Amstelveen',
  email: 'info@cheftijssen.nl',
  kvk: '42010518',
  iban: process.env.CHEF_IBAN,
};

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const token = req.headers.authorization?.split(' ')[1];
    await verifyToken(token, { secretKey: process.env.CLERK_SECRET_KEY });
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { klant, regels, factuurnummer, vervaldatum, notities } = req.body;
  const totaal = regels.reduce((sum, r) => sum + Number(r.bedrag), 0);

  const factuurDatum = new Date().toLocaleDateString('nl-NL', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
  const vervalFormatted = new Date(vervaldatum + 'T00:00:00').toLocaleDateString('nl-NL', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: 'Chef Tijssen <noreply@cheftijssen.nl>',
    to: klant.email,
    subject: `Factuur ${factuurnummer} — Chef Tijssen`,
    html: generateFactuurHTML({ klant, regels, factuurnummer, factuurDatum, vervalFormatted, notities, totaal }),
  });

  return res.status(200).json({ ok: true });
};

function generateFactuurHTML({ klant, regels, factuurnummer, factuurDatum, vervalFormatted, notities, totaal }) {
  const regelRijen = regels.map(r => `
    <tr>
      <td style="padding:14px 20px;color:#44403c;font-size:14px;border-bottom:1px solid #f5f5f4;">${r.omschrijving}</td>
      <td style="padding:14px 20px;color:#1c1917;font-weight:600;font-size:14px;text-align:right;border-bottom:1px solid #f5f5f4;">
        € ${Number(r.bedrag).toFixed(2).replace('.', ',')}
      </td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:0;background:#f4f4f4;">
    <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">

      <!-- Header -->
      <div style="background:#0f0f0f;padding:32px 40px;">
        <p style="margin:0;color:#fbbf24;letter-spacing:0.25em;font-size:10px;text-transform:uppercase;font-weight:700;">Chef Tijssen</p>
        <div style="width:32px;height:1px;background:#fbbf24;margin:10px 0;"></div>
        <p style="margin:0;color:#888;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;">Factuur</p>
      </div>

      <!-- Van / Aan + factuurnummers -->
      <div style="padding:32px 40px;background:#fafaf9;border-bottom:1px solid #e7e5e4;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="vertical-align:top;width:50%;">
              <p style="margin:0 0 6px;color:#78716c;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Van</p>
              <p style="margin:0;color:#1c1917;font-weight:600;font-size:14px;">${CHEF.naam}</p>
              <p style="margin:2px 0;color:#78716c;font-size:13px;">${CHEF.adres}</p>
              <p style="margin:2px 0;color:#78716c;font-size:13px;">${CHEF.postcode}</p>
              <p style="margin:2px 0;color:#78716c;font-size:13px;">KVK: ${CHEF.kvk}</p>
            </td>
            <td style="vertical-align:top;width:50%;text-align:right;">
              <p style="margin:0 0 6px;color:#78716c;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Aan</p>
              <p style="margin:0;color:#1c1917;font-weight:600;font-size:14px;">${klant.naam}</p>
              <p style="margin:2px 0;color:#78716c;font-size:13px;">${klant.email}</p>
              ${klant.locatie ? `<p style="margin:2px 0;color:#78716c;font-size:13px;">${klant.locatie}</p>` : ''}
            </td>
          </tr>
        </table>

        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
          <tr>
            <td>
              <p style="margin:0 0 3px;color:#78716c;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Factuurnummer</p>
              <p style="margin:0;color:#1c1917;font-weight:600;font-size:14px;">${factuurnummer}</p>
            </td>
            <td style="text-align:center;">
              <p style="margin:0 0 3px;color:#78716c;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Factuurdatum</p>
              <p style="margin:0;color:#1c1917;font-size:14px;">${factuurDatum}</p>
            </td>
            <td style="text-align:right;">
              <p style="margin:0 0 3px;color:#78716c;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Vervaldatum</p>
              <p style="margin:0;color:#1c1917;font-size:14px;">${vervalFormatted}</p>
            </td>
          </tr>
        </table>
      </div>

      <!-- Regelitems -->
      <div style="padding:0 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          <thead>
            <tr style="background:#f5f5f4;">
              <th style="padding:12px 20px;color:#78716c;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;text-align:left;font-weight:600;">Omschrijving</th>
              <th style="padding:12px 20px;color:#78716c;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;text-align:right;font-weight:600;">Bedrag</th>
            </tr>
          </thead>
          <tbody>${regelRijen}</tbody>
          <tfoot>
            <tr style="border-top:2px solid #1c1917;">
              <td style="padding:16px 20px;font-weight:700;color:#1c1917;font-size:15px;">Totaal</td>
              <td style="padding:16px 20px;font-weight:700;color:#1c1917;font-size:15px;text-align:right;">
                € ${totaal.toFixed(2).replace('.', ',')}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      ${notities ? `
      <!-- Notities -->
      <div style="padding:24px 40px;background:#fafaf9;border-top:1px solid #e7e5e4;">
        <p style="margin:0 0 8px;color:#78716c;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Notities</p>
        <p style="margin:0;color:#44403c;font-size:14px;line-height:1.6;">${notities}</p>
      </div>
      ` : ''}

      <!-- Betaalinformatie -->
      <div style="padding:28px 40px;border-top:1px solid #e7e5e4;">
        <p style="margin:0 0 10px;color:#78716c;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Betaalinformatie</p>
        <p style="margin:0 0 4px;color:#44403c;font-size:14px;">IBAN: <strong>${CHEF.iban}</strong></p>
        <p style="margin:0 0 4px;color:#44403c;font-size:14px;">T.n.v.: ${CHEF.naam}</p>
        <p style="margin:12px 0 0;color:#78716c;font-size:13px;line-height:1.6;">
          Graag betalen voor <strong>${vervalFormatted}</strong> onder vermelding van <strong>${factuurnummer}</strong>.
        </p>
      </div>

      <!-- Footer -->
      <div style="background:#0f0f0f;padding:20px 40px;text-align:center;">
        <p style="margin:0;color:#444;font-size:11px;letter-spacing:0.1em;">CHEF TIJSSEN &nbsp;·&nbsp; Persoonlijk koken bij jou thuis</p>
      </div>
    </div>
    </body>
    </html>
  `;
}
