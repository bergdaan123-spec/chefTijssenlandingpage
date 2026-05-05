-- Voer dit uit in de Supabase SQL editor

create table beschikbaarheid (
  id           uuid default gen_random_uuid() primary key,
  datum        date not null unique,
  beschikbaar  boolean not null default true,
  created_at   timestamptz default now()
);

-- Publiek lezen toegestaan (voor de website)
alter table beschikbaarheid enable row level security;

create policy "Iedereen mag beschikbaarheid lezen"
  on beschikbaarheid for select
  using (true);
