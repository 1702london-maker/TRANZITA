create table if not exists public.route_manifest (
  id uuid primary key default gen_random_uuid(),
  route_assignment_id uuid not null references public.route_assignments(id) on delete cascade,
  child_id uuid not null references public.children(id) on delete cascade,
  service_date date not null default current_date,
  route_session text not null default 'afternoon' check (route_session in ('morning', 'noon', 'afternoon')),
  pickup_stop_label text,
  dropoff_stop_label text,
  status text not null default 'scheduled' check (status in ('scheduled', 'onboarded', 'dropped_off', 'absent', 'cancelled')),
  boarded_at timestamptz,
  dropped_off_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (route_assignment_id, child_id, route_session)
);

create index if not exists route_manifest_assignment_idx
  on public.route_manifest (route_assignment_id, route_session, status);

create index if not exists route_manifest_child_date_idx
  on public.route_manifest (child_id, service_date desc);

alter table public.route_manifest enable row level security;

drop policy if exists "admin read route manifest" on public.route_manifest;
create policy "admin read route manifest" on public.route_manifest
  for select to authenticated
  using (exists (select 1 from public.app_users where auth_user_id = (select auth.uid()) and role = 'admin'));

drop policy if exists "school read own route manifest" on public.route_manifest;
create policy "school read own route manifest" on public.route_manifest
  for select to authenticated
  using (
    exists (
      select 1
      from public.app_users au
      join public.children c on c.id = route_manifest.child_id
      where au.auth_user_id = (select auth.uid())
        and au.role = 'school'
        and au.school_id = c.school_id
    )
  );

drop policy if exists "crew read assigned route manifest" on public.route_manifest;
create policy "crew read assigned route manifest" on public.route_manifest
  for select to authenticated
  using (
    exists (
      select 1
      from public.app_users au
      join public.crew_members cm on cm.user_id = au.id
      join public.route_assignments ra on ra.id = route_manifest.route_assignment_id
      where au.auth_user_id = (select auth.uid())
        and cm.active = true
        and (
          (au.role = 'driver' and ra.driver_id = cm.id)
          or (au.role = 'codriver' and ra.codriver_id = cm.id)
          or (au.role = 'nurse' and ra.nurse_id = cm.id)
        )
    )
  );

drop policy if exists "parent read own child route manifest" on public.route_manifest;
create policy "parent read own child route manifest" on public.route_manifest
  for select to authenticated
  using (
    exists (
      select 1
      from public.app_users au
      join public.guardians g on lower(g.email) = lower(au.email)
      where au.auth_user_id = (select auth.uid())
        and au.role = 'parent'
        and g.child_id = route_manifest.child_id
        and g.verified = true
    )
  );

create trigger route_manifest_set_updated_at
  before update on public.route_manifest
  for each row execute function public.set_updated_at();
