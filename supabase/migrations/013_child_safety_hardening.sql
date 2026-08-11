alter table public.tap_events
  add column if not exists notification_attempted boolean not null default false,
  add column if not exists notification_confirmed_at timestamptz;

update public.tap_events
set notification_attempted = true
where event_type = 'dropoff'
  and guardian_notified = true
  and notification_attempted = false;

update public.tap_events
set guardian_notified = false
where guardian_notified = true
  and notification_confirmed_at is null;

create index if not exists welfare_notes_child_created_idx
  on public.welfare_notes(child_id, created_at desc);

create or replace function public.prevent_welfare_note_mutation()
returns trigger
language plpgsql
as $$
begin
  raise exception 'welfare_notes are append-only. Create a new note instead.';
end;
$$;

drop trigger if exists welfare_notes_prevent_update on public.welfare_notes;
create trigger welfare_notes_prevent_update
  before update on public.welfare_notes
  for each row execute function public.prevent_welfare_note_mutation();

drop trigger if exists welfare_notes_prevent_delete on public.welfare_notes;
create trigger welfare_notes_prevent_delete
  before delete on public.welfare_notes
  for each row execute function public.prevent_welfare_note_mutation();

drop trigger if exists welfare_notes_set_updated_at on public.welfare_notes;

drop policy if exists "nurse insert assigned welfare notes" on public.welfare_notes;
create policy "nurse insert assigned welfare notes" on public.welfare_notes
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
        and cm.active = true
        and cm.id = welfare_notes.nurse_id
        and rm.child_id = welfare_notes.child_id
        and rm.service_date = current_date
        and rm.status <> 'cancelled'
    )
  );
