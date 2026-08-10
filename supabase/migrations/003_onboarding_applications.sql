do $$ begin
  create type public.application_status as enum (
    'submitted',
    'under_review',
    'documents_requested',
    'payment_required',
    'payment_confirmed',
    'approved',
    'activated',
    'rejected',
    'suspended'
  );
exception
  when duplicate_object then null;
end $$;

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  role public.user_role not null,
  status public.application_status not null default 'submitted',
  full_name text not null,
  email text not null,
  phone text,
  whatsapp text,
  organisation_name text,
  city text,
  state text,
  applicant_notes text,
  vehicle_plate_numbers text[] not null default '{}'::text[],
  school_interest text,
  payment_reference text,
  reviewed_by uuid references public.app_users(id) on delete set null,
  reviewed_at timestamptz,
  activated_user_id uuid references public.app_users(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.application_status_events (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  from_status public.application_status,
  to_status public.application_status not null,
  actor_user_id uuid references public.app_users(id) on delete set null,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists public.email_events (
  id uuid primary key default gen_random_uuid(),
  application_id uuid references public.applications(id) on delete set null,
  recipient_email text not null,
  template_key text not null,
  subject text not null,
  provider text not null default 'resend',
  provider_message_id text,
  status text not null default 'queued',
  error_message text,
  created_at timestamptz not null default now(),
  sent_at timestamptz
);

create index if not exists applications_status_role_idx on public.applications(status, role, created_at desc);
create index if not exists applications_email_idx on public.applications(lower(email));
create index if not exists application_status_events_application_idx on public.application_status_events(application_id, created_at desc);
create index if not exists email_events_application_idx on public.email_events(application_id, created_at desc);

alter table public.applications enable row level security;
alter table public.application_status_events enable row level security;
alter table public.email_events enable row level security;

create policy "admin read applications" on public.applications
  for select to authenticated
  using (
    exists (
      select 1 from public.app_users
      where app_users.auth_user_id = (select auth.uid())
      and app_users.role = 'admin'
      and app_users.is_active = true
      and app_users.deleted_at is null
    )
  );

create policy "admin read application status events" on public.application_status_events
  for select to authenticated
  using (
    exists (
      select 1 from public.app_users
      where app_users.auth_user_id = (select auth.uid())
      and app_users.role = 'admin'
      and app_users.is_active = true
      and app_users.deleted_at is null
    )
  );

create policy "admin read email events" on public.email_events
  for select to authenticated
  using (
    exists (
      select 1 from public.app_users
      where app_users.auth_user_id = (select auth.uid())
      and app_users.role = 'admin'
      and app_users.is_active = true
      and app_users.deleted_at is null
    )
  );

create trigger applications_set_updated_at
  before update on public.applications
  for each row execute function public.set_updated_at();
