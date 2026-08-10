create extension if not exists pgcrypto;

create type user_role as enum ('admin', 'school', 'parent', 'driver', 'codriver', 'nurse', 'partner');
create type vehicle_type as enum ('bus', 'suv', 'sedan', 'minivan', 'executive');
create type vehicle_owner_type as enum ('tranzita', 'partner');
create type journey_status as enum ('pre_check', 'active', 'completed', 'flagged', 'cancelled');
create type alert_severity as enum ('low', 'medium', 'high', 'critical');

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text,
  city text not null,
  state text,
  contact_name text,
  contact_email text,
  contact_phone text,
  principal_name text,
  safeguarding_lead_name text,
  safeguarding_lead_email text,
  student_count integer default 0,
  subscription_plan text,
  subscription_status text default 'pending',
  onboarding_status text default 'applied',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

create table if not exists app_users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid,
  email text unique not null,
  phone text,
  full_name text not null,
  role user_role not null,
  school_id uuid references schools(id),
  avatar_url text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

create table if not exists vehicles (
  id uuid primary key default gen_random_uuid(),
  registration_number text unique not null,
  make text,
  model text,
  year integer,
  vehicle_type vehicle_type default 'bus',
  owner_type vehicle_owner_type default 'tranzita',
  partner_id uuid references app_users(id),
  gps_unit_id text,
  nfc_reader_id text,
  certification_status text default 'certified',
  last_inspection_date date,
  next_inspection_date date,
  battery_level integer default 100,
  current_driver_id uuid references app_users(id),
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

create table if not exists routes (
  id uuid primary key default gen_random_uuid(),
  school_id uuid references schools(id),
  name text not null,
  description text,
  city text not null,
  type text check (type in ('morning', 'afternoon')),
  stops jsonb default '[]'::jsonb,
  optimised_path jsonb default '{}'::jsonb,
  estimated_duration_minutes integer default 0,
  max_students integer default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

create table if not exists journeys (
  id uuid primary key default gen_random_uuid(),
  route_id uuid references routes(id),
  vehicle_id uuid references vehicles(id),
  school_id uuid references schools(id),
  date date default current_date,
  departed_at timestamptz,
  completed_at timestamptz,
  status journey_status default 'pre_check',
  battery_start integer,
  battery_end integer,
  total_distance_km numeric(8,2),
  on_time boolean default true,
  children_on_board integer default 0,
  current_speed_kmh integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

create table if not exists journey_positions (
  id uuid primary key default gen_random_uuid(),
  journey_id uuid references journeys(id),
  vehicle_id uuid references vehicles(id),
  lat numeric(10,7),
  lng numeric(10,7),
  speed_kmh integer,
  heading integer,
  recorded_at timestamptz default now(),
  created_at timestamptz default now(),
  deleted_at timestamptz
);

create table if not exists alerts (
  id uuid primary key default gen_random_uuid(),
  journey_id uuid references journeys(id),
  vehicle_id uuid references vehicles(id),
  alert_type text not null,
  severity alert_severity default 'low',
  resolved boolean default false,
  resolved_at timestamptz,
  resolved_by uuid references app_users(id),
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

create table if not exists partner_vehicles (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid references app_users(id),
  vehicle_id uuid references vehicles(id),
  monthly_rate numeric(12,2) default 0,
  earnings_to_date numeric(12,2) default 0,
  payment_day integer default 1,
  bank_name text,
  account_number text,
  account_name text,
  joined_at date default current_date,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

create index if not exists idx_vehicles_active on vehicles(is_active) where deleted_at is null;
create index if not exists idx_journeys_status on journeys(status, date) where deleted_at is null;
create index if not exists idx_alerts_open on alerts(resolved, severity) where deleted_at is null;

alter table schools enable row level security;
alter table app_users enable row level security;
alter table vehicles enable row level security;
alter table routes enable row level security;
alter table journeys enable row level security;
alter table journey_positions enable row level security;
alter table alerts enable row level security;
alter table partner_vehicles enable row level security;

create policy "temporary authenticated read schools" on schools for select to authenticated using (deleted_at is null);
create policy "temporary authenticated read users" on app_users for select to authenticated using (deleted_at is null);
create policy "temporary authenticated read vehicles" on vehicles for select to authenticated using (deleted_at is null);
create policy "temporary authenticated read routes" on routes for select to authenticated using (deleted_at is null);
create policy "temporary authenticated read journeys" on journeys for select to authenticated using (deleted_at is null);
create policy "temporary authenticated read positions" on journey_positions for select to authenticated using (deleted_at is null);
create policy "temporary authenticated read alerts" on alerts for select to authenticated using (deleted_at is null);
create policy "temporary authenticated read partner vehicles" on partner_vehicles for select to authenticated using (deleted_at is null);

create trigger trg_schools_updated before update on schools for each row execute function set_updated_at();
create trigger trg_app_users_updated before update on app_users for each row execute function set_updated_at();
create trigger trg_vehicles_updated before update on vehicles for each row execute function set_updated_at();
create trigger trg_routes_updated before update on routes for each row execute function set_updated_at();
create trigger trg_journeys_updated before update on journeys for each row execute function set_updated_at();
create trigger trg_alerts_updated before update on alerts for each row execute function set_updated_at();
create trigger trg_partner_vehicles_updated before update on partner_vehicles for each row execute function set_updated_at();
