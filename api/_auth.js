const { webcrypto } = require('crypto');
const subtle = webcrypto.subtle;

async function verifeerClerkToken(token) {
  if (!token) throw new Error('Geen token');

  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Ongeldig token formaat');

  const header = JSON.parse(Buffer.from(parts[0], 'base64url').toString());
  const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString());

  if (!payload.iss) throw new Error('Geen issuer in token');

  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp < now) throw new Error('Token verlopen');

  // Haal Clerk's publieke sleutels op — geen secret key nodig
  const jwksRes = await fetch(`${payload.iss}/.well-known/jwks.json`);
  if (!jwksRes.ok) throw new Error('JWKS ophalen mislukt');
  const { keys } = await jwksRes.json();

  const jwk = keys.find(k => !header.kid || k.kid === header.kid);
  if (!jwk) throw new Error('Sleutel niet gevonden in JWKS');

  const publicKey = await subtle.importKey(
    'jwk', jwk,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false, ['verify']
  );

  const signingInput = Buffer.from(`${parts[0]}.${parts[1]}`);
  const signature = Buffer.from(parts[2], 'base64url');
  const valid = await subtle.verify('RSASSA-PKCS1-v1_5', publicKey, signature, signingInput);

  if (!valid) throw new Error('Ongeldige token handtekening');
}

module.exports = { verifeerClerkToken };
