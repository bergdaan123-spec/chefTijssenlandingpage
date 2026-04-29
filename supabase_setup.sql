-- Voer dit uit in de Supabase SQL editor (supabase.com → project → SQL editor)

create table leads (
  id           uuid default gen_random_uuid() primary key,
  naam         text not null,
  email        text not null,
  datum        date not null,
  locatie      text not null,
  personen     integer not null,
  type         text not null,
  offerte_totaal integer not null,
  created_at   timestamptz default now()
);

-- Beveiliging: frontend mag alleen schrijven, nooit lezen
alter table leads enable row level security;

create policy "Iedereen mag leads aanmaken"
  on leads for insert
  with check (true);
