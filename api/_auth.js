async function verifeerClerkToken(token) {
  if (!token) throw new Error('Geen token');

  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Ongeldig token formaat');

  const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString());
  const sessionId = payload.sid;
  if (!sessionId) throw new Error('Geen session ID in token');

  const secretKey = (process.env.CLERK_SECRET_KEY || '').replace(/[^\x20-\x7E]/g, '').trim();
  const res = await fetch(`https://api.clerk.com/v1/sessions/${sessionId}`, {
    headers: { Authorization: `Bearer ${secretKey}` },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Clerk ${res.status}: ${body.slice(0, 200)}`);
  }

  const sessie = await res.json();
  if (sessie.status !== 'active') throw new Error(`Sessie status: ${sessie.status}`);
}

module.exports = { verifeerClerkToken };
