insert into schools (name, address, city, state, contact_name, contact_email, student_count, subscription_plan, subscription_status, onboarding_status)
select * from (values
  ('Greenfield School', 'Lekki Phase 1', 'Lagos', 'Lagos', 'Ada Okafor', 'ops@greenfield.example', 420, 'premium', 'active', 'live'),
  ('Corona School', 'Ikoyi', 'Lagos', 'Lagos', 'Tola Adeyemi', 'transport@corona.example', 360, 'standard', 'active', 'live'),
  ('Abuja Prep', 'Maitama', 'Abuja', 'FCT', 'Sani Bello', 'admin@abujaprep.example', 280, 'premium', 'active', 'live')
) as seed(name, address, city, state, contact_name, contact_email, student_count, subscription_plan, subscription_status, onboarding_status)
where not exists (select 1 from schools s where lower(s.name) = lower(seed.name));

insert into app_users (email, phone, full_name, role, school_id, is_active)
select seed.email, seed.phone, seed.full_name, seed.role::user_role, schools.id, true
from (values
  ('admin@tranzita.africa', '+2348000000001', 'Operations Control', 'admin', null),
  ('school.admin@greenfield.example', '+2348000000010', 'Greenfield Transport Admin', 'school', 'Greenfield School'),
  ('parent.amara@example.com', '+2348000000020', 'Ifeoma Okorie', 'parent', 'Greenfield School'),
  ('parent.tomi@example.com', '+2348000000021', 'Kunle Adewale', 'parent', 'Greenfield School'),
  ('driver.emeka@example.com', '+2348000000030', 'Emeka Okafor', 'driver', null),
  ('copilot.zainab@example.com', '+2348000000040', 'Zainab Bello', 'codriver', null),
  ('nurse.amina@example.com', '+2348000000050', 'Nurse Amina Yusuf', 'nurse', null),
  ('partner.ev@example.com', '+2348000000060', 'EV Fleet Partner', 'partner', null)
) as seed(email, phone, full_name, role, school_name)
left join schools on schools.name = seed.school_name
on conflict (email) do update set
  phone = excluded.phone,
  full_name = excluded.full_name,
  role = excluded.role,
  school_id = excluded.school_id,
  is_active = true;

insert into vehicles (registration_number, make, model, year, vehicle_type, owner_type, certification_status, battery_level, gps_unit_id, nfc_reader_id, current_driver_id)
select seed.registration_number, seed.make, seed.model, seed.year, 'bus'::vehicle_type, seed.owner_type::vehicle_owner_type, seed.certification_status, seed.battery_level, seed.gps_unit_id, seed.nfc_reader_id, driver.id
from (values
  ('TRZ-E012', 'Omar', 'Made-in-Nigeria Electric School Bus', 2026, 'tranzita', 'certified', 88, 'GPS-LAG-012', 'NFC-LAG-012', 'driver.emeka@example.com'),
  ('TRZ-E018', 'Omar', 'Made-in-Nigeria Electric School Bus', 2026, 'tranzita', 'certified', 92, 'GPS-LAG-018', 'NFC-LAG-018', 'driver.emeka@example.com'),
  ('TRZ-E027', 'Jet Motor', 'Made-in-Nigeria Electric School Bus', 2026, 'partner', 'certified', 81, 'GPS-ABJ-027', 'NFC-ABJ-027', 'driver.emeka@example.com')
) as seed(registration_number, make, model, year, owner_type, certification_status, battery_level, gps_unit_id, nfc_reader_id, driver_email)
left join app_users driver on driver.email = seed.driver_email
on conflict (registration_number) do update set
  make = excluded.make,
  model = excluded.model,
  year = excluded.year,
  vehicle_type = excluded.vehicle_type,
  owner_type = excluded.owner_type,
  certification_status = excluded.certification_status,
  battery_level = excluded.battery_level,
  gps_unit_id = excluded.gps_unit_id,
  nfc_reader_id = excluded.nfc_reader_id,
  current_driver_id = excluded.current_driver_id;

insert into routes (school_id, name, description, city, type, estimated_duration_minutes, max_students, stops, optimised_path)
select schools.id, seed.name, seed.description, seed.city, seed.type, seed.estimated_duration_minutes, seed.max_students, seed.stops::jsonb, seed.optimised_path::jsonb
from (values
  ('Greenfield School', 'Lekki Morning Loop', 'Greenfield morning pickup through Lekki and Victoria Island', 'Lagos', 'morning', 44, 22, '["Lekki Phase 1","Oniru","Victoria Island","Greenfield School"]', '{"status":"optimised","corridor":"Lekki-VI"}'),
  ('Greenfield School', 'Lekki Afternoon Loop', 'Greenfield afternoon drop-off through Lekki and Victoria Island', 'Lagos', 'afternoon', 52, 18, '["Greenfield School","Victoria Island","Oniru","Lekki Phase 1"]', '{"status":"optimised","corridor":"Lekki-VI"}'),
  ('Abuja Prep', 'Maitama Morning Loop', 'Abuja Prep morning pickup through Maitama and Wuse', 'Abuja', 'morning', 48, 20, '["Maitama","Wuse 2","Abuja Prep"]', '{"status":"reviewed","corridor":"Maitama-Wuse"}')
) as seed(school_name, name, description, city, type, estimated_duration_minutes, max_students, stops, optimised_path)
join schools on schools.name = seed.school_name
where not exists (
  select 1 from routes r where r.school_id = schools.id and lower(r.name) = lower(seed.name) and r.type = seed.type
);

insert into children (school_id, full_name, year_group, pickup_area, welfare_notes, wristband_id, active)
select schools.id, seed.full_name, seed.year_group, seed.pickup_area, seed.welfare_notes, seed.wristband_id, true
from (values
  ('Greenfield School', 'Amara Okorie', 'Year 4', 'Lekki Phase 1', 'No known medical condition', 'TRZ-WB-0001'),
  ('Greenfield School', 'Tomi Adewale', 'Year 3', 'Oniru', 'Recent fever note. Nurse to check morning and noon.', 'TRZ-WB-0002'),
  ('Greenfield School', 'Zara Bello', 'Year 5', 'Victoria Island', 'Asthma watch. Inhaler confirmed on route.', 'TRZ-WB-0003'),
  ('Abuja Prep', 'David Musa', 'Year 4', 'Maitama', 'Motion sickness watch. Seat forward.', 'TRZ-WB-0004')
) as seed(school_name, full_name, year_group, pickup_area, welfare_notes, wristband_id)
join schools on schools.name = seed.school_name
on conflict (wristband_id) do update set
  school_id = excluded.school_id,
  full_name = excluded.full_name,
  year_group = excluded.year_group,
  pickup_area = excluded.pickup_area,
  welfare_notes = excluded.welfare_notes,
  active = true;

insert into guardians (child_id, full_name, phone, email, relationship, verified)
select children.id, seed.guardian_name, seed.phone, seed.email, seed.relationship, true
from (values
  ('TRZ-WB-0001', 'Ifeoma Okorie', '+2348000000020', 'parent.amara@example.com', 'mother'),
  ('TRZ-WB-0002', 'Kunle Adewale', '+2348000000021', 'parent.tomi@example.com', 'father'),
  ('TRZ-WB-0003', 'Halima Bello', '+2348000000022', 'parent.zara@example.com', 'mother'),
  ('TRZ-WB-0004', 'Aisha Musa', '+2348000000023', 'parent.david@example.com', 'mother')
) as seed(wristband_id, guardian_name, phone, email, relationship)
join children on children.wristband_id = seed.wristband_id
where not exists (
  select 1 from guardians g where g.child_id = children.id and lower(g.email) = lower(seed.email)
);

insert into crew_members (user_id, full_name, role, phone, clearance_status, first_aid_status, active)
select app_users.id, app_users.full_name, app_users.role, app_users.phone, 'cleared', case when app_users.role in ('nurse','codriver') then 'passed' else 'trained' end, true
from app_users
where app_users.role in ('driver','codriver','nurse')
  and not exists (
    select 1 from crew_members cm where cm.user_id = app_users.id and cm.role = app_users.role
  );

insert into route_assignments (route_id, vehicle_id, driver_id, codriver_id, nurse_id, service_date, status)
select routes.id, vehicles.id, driver_cm.id, codriver_cm.id, nurse_cm.id, current_date, 'active'
from routes
join vehicles on vehicles.registration_number = case when routes.city = 'Abuja' then 'TRZ-E027' when routes.type = 'morning' then 'TRZ-E012' else 'TRZ-E018' end
join crew_members driver_cm on driver_cm.role = 'driver' and driver_cm.active = true
join crew_members codriver_cm on codriver_cm.role = 'codriver' and codriver_cm.active = true
join crew_members nurse_cm on nurse_cm.role = 'nurse' and nurse_cm.active = true
where routes.name in ('Lekki Morning Loop', 'Lekki Afternoon Loop', 'Maitama Morning Loop')
  and not exists (
    select 1 from route_assignments ra where ra.route_id = routes.id and ra.service_date = current_date
  );

insert into route_manifest (route_assignment_id, child_id, route_session, service_date, pickup_stop_label, dropoff_stop_label, status, boarded_at, dropped_off_at, notes)
select ra.id, children.id, routes.type, current_date,
  children.pickup_area,
  children.pickup_area,
  case when children.wristband_id in ('TRZ-WB-0001','TRZ-WB-0002') then 'onboarded' else 'scheduled' end,
  case when children.wristband_id in ('TRZ-WB-0001','TRZ-WB-0002') then now() - interval '35 minutes' else null end,
  null,
  'Demo manifest row for portal walkthrough.'
from route_assignments ra
join routes on routes.id = ra.route_id
join children on children.school_id = routes.school_id
where routes.name in ('Lekki Morning Loop', 'Lekki Afternoon Loop', 'Maitama Morning Loop')
on conflict (route_assignment_id, child_id, route_session) do update set
  service_date = excluded.service_date,
  pickup_stop_label = excluded.pickup_stop_label,
  dropoff_stop_label = excluded.dropoff_stop_label,
  status = excluded.status,
  boarded_at = excluded.boarded_at,
  dropped_off_at = excluded.dropped_off_at,
  notes = excluded.notes;

insert into journeys (route_id, vehicle_id, school_id, date, departed_at, status, battery_start, children_on_board, current_speed_kmh, on_time)
select routes.id, ra.vehicle_id, routes.school_id, current_date, now() - interval '40 minutes', 'active', 91, 12, 38, true
from routes
join route_assignments ra on ra.route_id = routes.id and ra.service_date = current_date
where routes.name = 'Lekki Afternoon Loop'
  and not exists (select 1 from journeys j where j.route_id = routes.id and j.date = current_date);

insert into alerts (journey_id, vehicle_id, alert_type, severity, notes)
select journeys.id, journeys.vehicle_id, seed.alert_type, seed.severity::alert_severity, seed.notes
from journeys
cross join (values
  ('GPS ping recovered', 'low', 'Vehicle reconnected after brief network gap.'),
  ('Late guardian confirmation', 'medium', 'Guardian confirmation took longer than expected.'),
  ('Route completed safely', 'low', 'Journey closing checklist is ready.')
) as seed(alert_type, severity, notes)
where not exists (
  select 1 from alerts a where a.journey_id = journeys.id and a.alert_type = seed.alert_type
);

insert into temperature_readings (child_id, child_name, nurse_id, route_session, temperature_c, status, note)
select children.id, children.full_name, nurse.id, 'morning', seed.temperature_c, seed.status, seed.note
from (values
  ('TRZ-WB-0001', 36.7, 'normal', 'Morning check clear.'),
  ('TRZ-WB-0002', 37.6, 'watch', 'Monitor again at noon.'),
  ('TRZ-WB-0003', 36.8, 'normal', 'Breathing normal at boarding.')
) as seed(wristband_id, temperature_c, status, note)
join children on children.wristband_id = seed.wristband_id
join app_users nurse on nurse.email = 'nurse.amina@example.com'
where not exists (
  select 1 from temperature_readings tr where tr.child_id = children.id and tr.route_session = 'morning' and tr.created_at::date = current_date
);

insert into welfare_notes (child_id, nurse_id, note, action_required)
select children.id, cm.id, seed.note, seed.action_required
from (values
  ('TRZ-WB-0002', 'Observation: recent fever note, noon temperature check required.', true),
  ('TRZ-WB-0003', 'Asthma watch: inhaler location confirmed before route.', false)
) as seed(wristband_id, note, action_required)
join children on children.wristband_id = seed.wristband_id
join crew_members cm on cm.role = 'nurse' and cm.active = true
where not exists (
  select 1 from welfare_notes wn where wn.child_id = children.id and wn.note = seed.note
);

insert into parent_notifications (guardian_id, child_id, channel, title, status, sent_at)
select guardians.id, guardians.child_id, 'email', 'PWA journey update ready', 'sent', now() - interval '10 minutes'
from guardians
where guardians.email in ('parent.amara@example.com', 'parent.tomi@example.com')
  and not exists (
    select 1 from parent_notifications pn where pn.guardian_id = guardians.id and pn.title = 'PWA journey update ready'
  );
