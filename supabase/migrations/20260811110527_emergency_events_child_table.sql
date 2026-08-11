create table if not exists public.emergency_events (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.children(id) on delete cascade,
  nurse_id uuid references public.crew_members(id) on delete set null,
  event_type text not null default 'medical',
  severity text not null default 'high',
  status text not null default 'open',
  note text not null,
  parent_notification_attempted boolean not null default false,
  parent_notification_confirmed_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists emergency_events_child_created_idx
  on public.emergency_events(child_id, created_at desc);

create index if not exists emergency_events_nurse_created_idx
  on public.emergency_events(nurse_id, created_at desc);

create index if not exists emergency_events_status_created_idx
  on public.emergency_events(status, created_at desc);

alter table public.emergency_events enable row level security;

create or replace function public.prevent_emergency_event_mutation()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  raise exception 'emergency_events are append-only. Create a new event instead.';
end;
$$;

drop trigger if exists emergency_events_prevent_update on public.emergency_events;
create trigger emergency_events_prevent_update
  before update on public.emergency_events
  for each row execute function public.prevent_emergency_event_mutation();

drop trigger if exists emergency_events_prevent_delete on public.emergency_events;
create trigger emergency_events_prevent_delete
  before delete on public.emergency_events
  for each row execute function public.prevent_emergency_event_mutation();

drop policy if exists "admin read emergency events" on public.emergency_events;
create policy "admin read emergency events" on public.emergency_events
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

drop policy if exists "nurse read assigned emergency events" on public.emergency_events;
create policy "nurse read assigned emergency events" on public.emergency_events
  for select to authenticated
  using (
    exists (
      select 1
      from public.app_users au
      join public.crew_members cm on cm.user_id = au.id
      join public.route_assignments ra on ra.nurse_id = cm.id
      join public.route_manifest rm on rm.route_assignment_id = ra.id
      where au.auth_user_id = (select auth.uid())
        and au.role = 'nurse'
        and au.is_active = true
        and au.deleted_at is null
        and cm.role = 'nurse'
        and cm.active = true
        and ra.service_date = current_date
        and ra.status in ('scheduled', 'active', 'loading')
        and rm.service_date = current_date
        and rm.status <> 'cancelled'
        and rm.child_id = emergency_events.child_id
    )
  );

drop policy if exists "admin write emergency events" on public.emergency_events;
create policy "admin write emergency events" on public.emergency_events
  for all to authenticated
  using (
    exists (
      select 1 from public.app_users
      where app_users.auth_user_id = (select auth.uid())
      and app_users.role = 'admin'
      and app_users.is_active = true
      and app_users.deleted_at is null
    )
  )
  with check (
    exists (
      select 1 from public.app_users
      where app_users.auth_user_id = (select auth.uid())
      and app_users.role = 'admin'
      and app_users.is_active = true
      and app_users.deleted_at is null
    )
  );

drop policy if exists "nurse insert assigned emergency events" on public.emergency_events;
create policy "nurse insert assigned emergency events" on public.emergency_events
  for insert to authenticated
  with check (
    exists (
      select 1
      from public.app_users au
      join public.crew_members cm on cm.user_id = au.id
      join public.route_assignments ra on ra.nurse_id = cm.id
      join public.route_manifest rm on rm.route_assignment_id = ra.id
      where au.auth_user_id = (select auth.uid())
        and au.role = 'nurse'
        and au.is_active = true
        and au.deleted_at is null
        and cm.id = emergency_events.nurse_id
        and cm.role = 'nurse'
        and cm.active = true
        and ra.service_date = current_date
        and ra.status in ('scheduled', 'active', 'loading')
        and rm.service_date = current_date
        and rm.status <> 'cancelled'
        and rm.child_id = emergency_events.child_id
    )
  );
