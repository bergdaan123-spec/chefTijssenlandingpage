const GEBLOKKEERDE_DATUMS = [
  '2026-04-25',
  '2026-05-01',
  '2026-05-09',
  '2026-05-16',
  '2026-05-23',
  '2026-06-06',
  '2026-06-13',
];

export function checkBeschikbaarheid(datum) {
  if (!datum) return null;
  const dag = new Date(datum).getDay();
  if (dag === 0) return false; // zondag altijd bezet
  return !GEBLOKKEERDE_DATUMS.includes(datum);
}
