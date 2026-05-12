const { createClient } = require('@supabase/supabase-js');
const { verifyToken } = require('@clerk/backend');

module.exports = async function handler(req, res) {
  if (!process.env.CLERK_SECRET_KEY) {
    return res.status(500).json({ error: 'CLERK_SECRET_KEY niet ingesteld in Vercel' });
  }
  try {
    const token = req.headers.authorization?.split(' ')[1];
    await verifyToken(token, { secretKey: process.env.CLERK_SECRET_KEY });
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  return res.json(data);
};
