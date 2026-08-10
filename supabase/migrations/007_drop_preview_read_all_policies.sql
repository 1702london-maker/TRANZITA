drop policy if exists "temporary authenticated read schools" on public.schools;
drop policy if exists "temporary authenticated read users" on public.app_users;
drop policy if exists "temporary authenticated read vehicles" on public.vehicles;
drop policy if exists "temporary authenticated read routes" on public.routes;
drop policy if exists "temporary authenticated read journeys" on public.journeys;
drop policy if exists "temporary authenticated read positions" on public.journey_positions;
drop policy if exists "temporary authenticated read alerts" on public.alerts;
drop policy if exists "temporary authenticated read partner vehicles" on public.partner_vehicles;

drop policy if exists "preview authenticated read children" on public.children;
drop policy if exists "preview authenticated read guardians" on public.guardians;
drop policy if exists "preview authenticated read crew_members" on public.crew_members;
drop policy if exists "preview authenticated read route_assignments" on public.route_assignments;
drop policy if exists "preview authenticated read tap_events" on public.tap_events;
drop policy if exists "preview authenticated read incidents" on public.incidents;
drop policy if exists "preview authenticated read welfare_notes" on public.welfare_notes;
drop policy if exists "preview authenticated read parent_notifications" on public.parent_notifications;
drop policy if exists "preview authenticated read vehicle_inspections" on public.vehicle_inspections;
drop policy if exists "preview authenticated read school_billing" on public.school_billing;

drop policy if exists "admin read schools" on public.schools;
create policy "admin read schools" on public.schools
  for select to authenticated
  using (exists (select 1 from public.app_users where auth_user_id = (select auth.uid()) and role = 'admin'));

drop policy if exists "admin read vehicles" on public.vehicles;
create policy "admin read vehicles" on public.vehicles
  for select to authenticated
  using (exists (select 1 from public.app_users where auth_user_id = (select auth.uid()) and role = 'admin'));

drop policy if exists "admin read routes" on public.routes;
create policy "admin read routes" on public.routes
  for select to authenticated
  using (exists (select 1 from public.app_users where auth_user_id = (select auth.uid()) and role = 'admin'));

drop policy if exists "admin read journeys" on public.journeys;
create policy "admin read journeys" on public.journeys
  for select to authenticated
  using (exists (select 1 from public.app_users where auth_user_id = (select auth.uid()) and role = 'admin'));

drop policy if exists "admin read journey positions" on public.journey_positions;
create policy "admin read journey positions" on public.journey_positions
  for select to authenticated
  using (exists (select 1 from public.app_users where auth_user_id = (select auth.uid()) and role = 'admin'));

drop policy if exists "admin read alerts" on public.alerts;
create policy "admin read alerts" on public.alerts
  for select to authenticated
  using (exists (select 1 from public.app_users where auth_user_id = (select auth.uid()) and role = 'admin'));

drop policy if exists "admin read partner vehicles" on public.partner_vehicles;
create policy "admin read partner vehicles" on public.partner_vehicles
  for select to authenticated
  using (exists (select 1 from public.app_users where auth_user_id = (select auth.uid()) and role = 'admin'));

drop policy if exists "admin read children" on public.children;
create policy "admin read children" on public.children
  for select to authenticated
  using (exists (select 1 from public.app_users where auth_user_id = (select auth.uid()) and role = 'admin'));

drop policy if exists "admin read guardians" on public.guardians;
create policy "admin read guardians" on public.guardians
  for select to authenticated
  using (exists (select 1 from public.app_users where auth_user_id = (select auth.uid()) and role = 'admin'));

drop policy if exists "admin read crew members" on public.crew_members;
create policy "admin read crew members" on public.crew_members
  for select to authenticated
  using (exists (select 1 from public.app_users where auth_user_id = (select auth.uid()) and role = 'admin'));

drop policy if exists "admin read route assignments" on public.route_assignments;
create policy "admin read route assignments" on public.route_assignments
  for select to authenticated
  using (exists (select 1 from public.app_users where auth_user_id = (select auth.uid()) and role = 'admin'));

drop policy if exists "admin read operational child records" on public.tap_events;
create policy "admin read operational child records" on public.tap_events
  for select to authenticated
  using (exists (select 1 from public.app_users where auth_user_id = (select auth.uid()) and role = 'admin'));

drop policy if exists "admin read incidents" on public.incidents;
create policy "admin read incidents" on public.incidents
  for select to authenticated
  using (exists (select 1 from public.app_users where auth_user_id = (select auth.uid()) and role = 'admin'));

drop policy if exists "admin read welfare notes" on public.welfare_notes;
create policy "admin read welfare notes" on public.welfare_notes
  for select to authenticated
  using (exists (select 1 from public.app_users where auth_user_id = (select auth.uid()) and role = 'admin'));

drop policy if exists "admin read parent notifications" on public.parent_notifications;
create policy "admin read parent notifications" on public.parent_notifications
  for select to authenticated
  using (exists (select 1 from public.app_users where auth_user_id = (select auth.uid()) and role = 'admin'));

drop policy if exists "admin read vehicle inspections" on public.vehicle_inspections;
create policy "admin read vehicle inspections" on public.vehicle_inspections
  for select to authenticated
  using (exists (select 1 from public.app_users where auth_user_id = (select auth.uid()) and role = 'admin'));

drop policy if exists "admin read school billing" on public.school_billing;
create policy "admin read school billing" on public.school_billing
  for select to authenticated
  using (exists (select 1 from public.app_users where auth_user_id = (select auth.uid()) and role = 'admin'));
