const { createClient } = require('@supabase/supabase-js');

const supabase = () => createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  // GET — haal beschikbare datums op (publiek)
  if (req.method === 'GET') {
    const vandaag = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase()
      .from('beschikbaarheid')
      .select('datum, beschikbaar')
      .gte('datum', vandaag)
      .order('datum');

    if (error) return res.status(500).json({ error: 'Ophalen mislukt' });
    return res.status(200).json(data);
  }

  // POST — stel beschikbaarheid in (alleen admin)
  if (req.method === 'POST') {
    const verwacht = process.env.ADMIN_SECRET;
    if (!verwacht) {
      return res.status(500).json({ error: 'ADMIN_SECRET niet ingesteld op server' });
    }
    if (req.headers.authorization !== `Bearer ${verwacht}`) {
      return res.status(401).json({ error: 'Niet geautoriseerd' });
    }

    const { datum, beschikbaar } = req.body;
    if (!datum) return res.status(400).json({ error: 'Datum vereist' });

    const { error } = await supabase()
      .from('beschikbaarheid')
      .upsert({ datum, beschikbaar }, { onConflict: 'datum' });

    if (error) return res.status(500).json({ error: 'Opslaan mislukt' });
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
