const { createClient } = require('@supabase/supabase-js');
const { verifeerClerkToken } = require('./_auth');

module.exports = async function handler(req, res) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    await verifeerClerkToken(token);
  } catch (err) {
    return res.status(401).json({ error: err.message });
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
