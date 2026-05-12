async function verifeerClerkToken(token) {
  if (!token) throw new Error('Geen token');

  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Ongeldig token formaat');

  const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString());
  const sessionId = payload.sid;
  if (!sessionId) throw new Error('Geen session ID in token');

  const res = await fetch(`https://api.clerk.com/v1/sessions/${sessionId}`, {
    headers: { Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}` },
  });

  if (!res.ok) throw new Error('Sessie ongeldig');

  const sessie = await res.json();
  if (sessie.status !== 'active') throw new Error('Sessie niet actief');
}

module.exports = { verifeerClerkToken };
