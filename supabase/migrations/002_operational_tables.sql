create table if not exists public.children (
  id uuid primary key default gen_random_uuid(),
  school_id uuid references public.schools(id) on delete cascade,
  full_name text not null,
  year_group text,
  pickup_area text,
  welfare_notes text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.guardians (
  id uuid primary key default gen_random_uuid(),
  child_id uuid references public.children(id) on delete cascade,
  full_name text not null,
  phone text not null,
  email text,
  relationship text not null default 'parent',
  verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.crew_members (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.app_users(id) on delete set null,
  full_name text not null,
  role public.user_role not null,
  phone text,
  clearance_status text not null default 'pending',
  first_aid_status text not null default 'pending',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.route_assignments (
  id uuid primary key default gen_random_uuid(),
  route_id uuid references public.routes(id) on delete cascade,
  vehicle_id uuid references public.vehicles(id) on delete set null,
  driver_id uuid references public.crew_members(id) on delete set null,
  codriver_id uuid references public.crew_members(id) on delete set null,
  nurse_id uuid references public.crew_members(id) on delete set null,
  service_date date not null default current_date,
  status text not null default 'scheduled',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tap_events (
  id uuid primary key default gen_random_uuid(),
  child_id uuid references public.children(id) on delete cascade,
  journey_id uuid references public.journeys(id) on delete cascade,
  event_type text not null check (event_type in ('pickup', 'dropoff')),
  event_time timestamptz not null default now(),
  guardian_notified boolean not null default false,
  location_label text,
  created_at timestamptz not null default now()
);

create table if not exists public.incidents (
  id uuid primary key default gen_random_uuid(),
  journey_id uuid references public.journeys(id) on delete set null,
  child_id uuid references public.children(id) on delete set null,
  severity public.alert_severity not null default 'low',
  title text not null,
  details text,
  status text not null default 'open',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.welfare_notes (
  id uuid primary key default gen_random_uuid(),
  child_id uuid references public.children(id) on delete cascade,
  nurse_id uuid references public.crew_members(id) on delete set null,
  note text not null,
  action_required boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.parent_notifications (
  id uuid primary key default gen_random_uuid(),
  guardian_id uuid references public.guardians(id) on delete cascade,
  child_id uuid references public.children(id) on delete cascade,
  channel text not null default 'whatsapp',
  title text not null,
  status text not null default 'queued',
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.vehicle_inspections (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid references public.vehicles(id) on delete cascade,
  inspection_date date not null default current_date,
  inspector_name text,
  status text not null default 'passed',
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.school_billing (
  id uuid primary key default gen_random_uuid(),
  school_id uuid references public.schools(id) on delete cascade,
  invoice_month date not null,
  amount_ngn numeric(12,2) not null,
  status text not null default 'draft',
  due_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists children_school_id_idx on public.children(school_id);
create index if not exists guardians_child_id_idx on public.guardians(child_id);
create index if not exists route_assignments_service_date_idx on public.route_assignments(service_date);
create index if not exists tap_events_child_id_event_time_idx on public.tap_events(child_id, event_time desc);
create index if not exists incidents_status_created_at_idx on public.incidents(status, created_at desc);
create index if not exists parent_notifications_status_idx on public.parent_notifications(status);

alter table public.children enable row level security;
alter table public.guardians enable row level security;
alter table public.crew_members enable row level security;
alter table public.route_assignments enable row level security;
alter table public.tap_events enable row level security;
alter table public.incidents enable row level security;
alter table public.welfare_notes enable row level security;
alter table public.parent_notifications enable row level security;
alter table public.vehicle_inspections enable row level security;
alter table public.school_billing enable row level security;

create policy "preview authenticated read children" on public.children for select to authenticated using (true);
create policy "preview authenticated read guardians" on public.guardians for select to authenticated using (true);
create policy "preview authenticated read crew_members" on public.crew_members for select to authenticated using (true);
create policy "preview authenticated read route_assignments" on public.route_assignments for select to authenticated using (true);
create policy "preview authenticated read tap_events" on public.tap_events for select to authenticated using (true);
create policy "preview authenticated read incidents" on public.incidents for select to authenticated using (true);
create policy "preview authenticated read welfare_notes" on public.welfare_notes for select to authenticated using (true);
create policy "preview authenticated read parent_notifications" on public.parent_notifications for select to authenticated using (true);
create policy "preview authenticated read vehicle_inspections" on public.vehicle_inspections for select to authenticated using (true);
create policy "preview authenticated read school_billing" on public.school_billing for select to authenticated using (true);

create trigger children_set_updated_at before update on public.children for each row execute function public.set_updated_at();
create trigger guardians_set_updated_at before update on public.guardians for each row execute function public.set_updated_at();
create trigger crew_members_set_updated_at before update on public.crew_members for each row execute function public.set_updated_at();
create trigger route_assignments_set_updated_at before update on public.route_assignments for each row execute function public.set_updated_at();
create trigger incidents_set_updated_at before update on public.incidents for each row execute function public.set_updated_at();
create trigger welfare_notes_set_updated_at before update on public.welfare_notes for each row execute function public.set_updated_at();
create trigger school_billing_set_updated_at before update on public.school_billing for each row execute function public.set_updated_at();
