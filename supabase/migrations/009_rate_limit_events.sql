create table if not exists public.rate_limit_events (
  id uuid primary key default gen_random_uuid(),
  key text not null,
  created_at timestamptz not null default now()
);

create index if not exists rate_limit_events_key_created_at_idx
  on public.rate_limit_events (key, created_at desc);

alter table public.rate_limit_events enable row level security;

revoke all on table public.rate_limit_events from anon, authenticated;
