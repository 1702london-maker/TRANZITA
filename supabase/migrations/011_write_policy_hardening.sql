do $$
declare
  table_name text;
  tables text[] := array[
    'alerts','app_users','application_status_events','applications','audit_events','children','crew_members','demo_requests','email_events','guardians','incidents','journey_positions','journeys','parent_notifications','partner_vehicles','portal_complaints','portal_messages','qr_scan_events','rate_limit_events','route_assignments','route_manifest','routes','school_billing','schools','tap_events','temperature_readings','vehicle_inspections','vehicles','welfare_notes'
  ];
begin
  foreach table_name in array tables loop
    execute format('drop policy if exists %I on public.%I', 'admin write ' || table_name, table_name);
    execute format($policy$
      create policy %I on public.%I
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
      )
    $policy$, 'admin write ' || table_name, table_name);
  end loop;
end $$;

drop policy if exists "portal messages own insert" on public.portal_messages;
create policy "portal messages own insert" on public.portal_messages
  for insert to authenticated
  with check (
    submitted_by in (
      select app_users.id from public.app_users
      where app_users.auth_user_id = (select auth.uid())
      and app_users.role = portal_messages.role
      and app_users.is_active = true
      and app_users.deleted_at is null
    )
  );

drop policy if exists "portal complaints own insert" on public.portal_complaints;
create policy "portal complaints own insert" on public.portal_complaints
  for insert to authenticated
  with check (
    submitted_by in (
      select app_users.id from public.app_users
      where app_users.auth_user_id = (select auth.uid())
      and app_users.role = portal_complaints.role
      and app_users.is_active = true
      and app_users.deleted_at is null
    )
  );

drop policy if exists "qr scans own insert" on public.qr_scan_events;
create policy "qr scans own insert" on public.qr_scan_events
  for insert to authenticated
  with check (
    scanned_by in (
      select app_users.id from public.app_users
      where app_users.auth_user_id = (select auth.uid())
      and app_users.role = qr_scan_events.role
      and app_users.is_active = true
      and app_users.deleted_at is null
    )
  );

drop policy if exists "temperature readings assigned nurse insert" on public.temperature_readings;
create policy "temperature readings assigned nurse insert" on public.temperature_readings
  for insert to authenticated
  with check (
    nurse_id in (
      select app_users.id from public.app_users
      where app_users.auth_user_id = (select auth.uid())
      and app_users.role = 'nurse'
      and app_users.is_active = true
      and app_users.deleted_at is null
    )
  );
