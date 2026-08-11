alter table public.welfare_notes
  alter column child_id set not null;

create table if not exists public.first_aid_actions (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.children(id) on delete cascade,
  nurse_id uuid references public.crew_members(id) on delete set null,
  action text not null,
  status text not null default 'completed',
  note text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists first_aid_actions_child_created_idx
  on public.first_aid_actions(child_id, created_at desc);

create index if not exists first_aid_actions_nurse_created_idx
  on public.first_aid_actions(nurse_id, created_at desc);

alter table public.first_aid_actions enable row level security;

create or replace function public.prevent_first_aid_action_mutation()
returns trigger
language plpgsql
as $$
begin
  raise exception 'first_aid_actions are append-only. Create a new action instead.';
end;
$$;

drop trigger if exists first_aid_actions_prevent_update on public.first_aid_actions;
create trigger first_aid_actions_prevent_update
  before update on public.first_aid_actions
  for each row execute function public.prevent_first_aid_action_mutation();

drop trigger if exists first_aid_actions_prevent_delete on public.first_aid_actions;
create trigger first_aid_actions_prevent_delete
  before delete on public.first_aid_actions
  for each row execute function public.prevent_first_aid_action_mutation();

drop policy if exists "admin read first aid actions" on public.first_aid_actions;
create policy "admin read first aid actions" on public.first_aid_actions
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

drop policy if exists "nurse read assigned first aid actions" on public.first_aid_actions;
create policy "nurse read assigned first aid actions" on public.first_aid_actions
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
        and rm.child_id = first_aid_actions.child_id
    )
  );

drop policy if exists "admin write first aid actions" on public.first_aid_actions;
create policy "admin write first aid actions" on public.first_aid_actions
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

drop policy if exists "nurse insert assigned first aid actions" on public.first_aid_actions;
create policy "nurse insert assigned first aid actions" on public.first_aid_actions
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
        and cm.id = first_aid_actions.nurse_id
        and cm.role = 'nurse'
        and cm.active = true
        and ra.service_date = current_date
        and ra.status in ('scheduled', 'active', 'loading')
        and rm.service_date = current_date
        and rm.status <> 'cancelled'
        and rm.child_id = first_aid_actions.child_id
    )
  );
