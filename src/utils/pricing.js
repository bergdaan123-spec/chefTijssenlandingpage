const PRIJZEN = {
  verjaardag: { basis: 150, perPersoon: 25 },
  diner:      { basis: 200, perPersoon: 30 },
  feestje:    { basis: 175, perPersoon: 20 },
};

export function berekenOfferte(type, personen) {
  const config = PRIJZEN[type];
  if (!config) return null;
  const aantal = parseInt(personen, 10) || 0;
  const basis = config.basis;
  const pp = config.perPersoon * aantal;
  const totaal = basis + pp;
  return { basis, perPersoon: pp, totaal };
}
