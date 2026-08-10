create table if not exists public.portal_complaints (
  id uuid primary key default gen_random_uuid(),
  submitted_by uuid references public.app_users(id) on delete set null,
  role public.user_role not null,
  subject text not null,
  priority text not null default 'normal',
  details text not null,
  status text not null default 'open',
  source text not null default 'portal',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.portal_messages (
  id uuid primary key default gen_random_uuid(),
  submitted_by uuid references public.app_users(id) on delete set null,
  role public.user_role not null,
  channel text not null check (channel in ('email', 'whatsapp', 'support')),
  subject text,
  body text not null,
  recipient_scope text not null default 'operations',
  status text not null default 'logged',
  created_at timestamptz not null default now()
);

create table if not exists public.qr_scan_events (
  id uuid primary key default gen_random_uuid(),
  scanned_by uuid references public.app_users(id) on delete set null,
  role public.user_role not null,
  scan_type text not null,
  qr_value text not null,
  action text not null default 'lookup',
  result_summary text not null default 'Logged for operations review',
  created_at timestamptz not null default now()
);

create table if not exists public.temperature_readings (
  id uuid primary key default gen_random_uuid(),
  child_id uuid references public.children(id) on delete set null,
  child_name text not null,
  nurse_id uuid references public.app_users(id) on delete set null,
  route_session text not null check (route_session in ('morning', 'noon', 'afternoon')),
  temperature_c numeric(4,1) not null,
  status text not null default 'normal',
  note text,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.app_users(id) on delete set null,
  actor_role public.user_role,
  event_type text not null,
  entity_type text not null,
  entity_id uuid,
  summary text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists portal_complaints_submitted_by_idx on public.portal_complaints(submitted_by, created_at desc);
create index if not exists portal_messages_submitted_by_idx on public.portal_messages(submitted_by, created_at desc);
create index if not exists qr_scan_events_scanned_by_idx on public.qr_scan_events(scanned_by, created_at desc);
create index if not exists temperature_readings_nurse_idx on public.temperature_readings(nurse_id, created_at desc);
create index if not exists audit_events_actor_idx on public.audit_events(actor_id, created_at desc);

alter table public.portal_complaints enable row level security;
alter table public.portal_messages enable row level security;
alter table public.qr_scan_events enable row level security;
alter table public.temperature_readings enable row level security;
alter table public.audit_events enable row level security;

drop policy if exists "portal complaints own read" on public.portal_complaints;
create policy "portal complaints own read" on public.portal_complaints
  for select to authenticated
  using (
    submitted_by in (select id from public.app_users where auth_user_id = (select auth.uid()))
    or exists (select 1 from public.app_users where auth_user_id = (select auth.uid()) and role = 'admin')
  );

drop policy if exists "portal messages own read" on public.portal_messages;
create policy "portal messages own read" on public.portal_messages
  for select to authenticated
  using (
    submitted_by in (select id from public.app_users where auth_user_id = (select auth.uid()))
    or exists (select 1 from public.app_users where auth_user_id = (select auth.uid()) and role = 'admin')
  );

drop policy if exists "qr scan own read" on public.qr_scan_events;
create policy "qr scan own read" on public.qr_scan_events
  for select to authenticated
  using (
    scanned_by in (select id from public.app_users where auth_user_id = (select auth.uid()))
    or exists (select 1 from public.app_users where auth_user_id = (select auth.uid()) and role = 'admin')
  );

drop policy if exists "temperature readings nurse admin read" on public.temperature_readings;
create policy "temperature readings nurse admin read" on public.temperature_readings
  for select to authenticated
  using (
    nurse_id in (select id from public.app_users where auth_user_id = (select auth.uid()))
    or exists (select 1 from public.app_users where auth_user_id = (select auth.uid()) and role in ('admin', 'school'))
  );

drop policy if exists "audit admin read" on public.audit_events;
create policy "audit admin read" on public.audit_events
  for select to authenticated
  using (exists (select 1 from public.app_users where auth_user_id = (select auth.uid()) and role = 'admin'));

create trigger portal_complaints_set_updated_at before update on public.portal_complaints for each row execute function public.set_updated_at();
