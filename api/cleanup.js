const { createClient } = require('@supabase/supabase-js');

module.exports = async function handler(req, res) {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  const tweeJaarGeleden = new Date();
  tweeJaarGeleden.setFullYear(tweeJaarGeleden.getFullYear() - 2);

  const { error, count } = await supabase
    .from('leads')
    .delete({ count: 'exact' })
    .lt('created_at', tweeJaarGeleden.toISOString());

  if (error) {
    console.error('Cleanup fout:', error);
    return res.status(500).json({ error: 'Verwijderen mislukt' });
  }

  return res.status(200).json({ verwijderd: count });
};
