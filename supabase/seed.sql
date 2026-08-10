insert into schools (name, address, city, state, contact_name, contact_email, student_count, subscription_plan, subscription_status, onboarding_status)
values
  ('Greenfield School', 'Lekki Phase 1', 'Lagos', 'Lagos', 'Ada Okafor', 'ops@greenfield.example', 420, 'premium', 'active', 'live'),
  ('Corona School', 'Ikoyi', 'Lagos', 'Lagos', 'Tola Adeyemi', 'transport@corona.example', 360, 'standard', 'active', 'live'),
  ('Abuja Prep', 'Maitama', 'Abuja', 'FCT', 'Sani Bello', 'admin@abujaprep.example', 280, 'premium', 'active', 'live')
on conflict do nothing;

insert into app_users (email, phone, full_name, role)
values
  ('admin@tranzita.africa', '+2348000000001', 'Operations Control', 'admin'),
  ('partner@tranzita.africa', '+2348000000002', 'Vehicle Partner', 'partner'),
  ('driver@tranzita.africa', '+2348000000003', 'Emeka Okafor', 'driver')
on conflict (email) do nothing;

insert into vehicles (registration_number, make, model, year, vehicle_type, owner_type, certification_status, battery_level)
values
  ('TRZ-B012', 'Omar', 'Electric Bus', 2026, 'bus', 'tranzita', 'certified', 88),
  ('TRZ-B018', 'Omar', 'Electric Bus', 2026, 'bus', 'tranzita', 'certified', 92),
  ('TRZ-E004', 'Toyota', 'Prado', 2021, 'executive', 'partner', 'certified', 76),
  ('TRZ-B027', 'Omar', 'Electric Bus', 2026, 'bus', 'tranzita', 'certified', 81)
on conflict (registration_number) do nothing;

insert into routes (name, description, city, type, estimated_duration_minutes, max_students)
values
  ('Route B', 'Lekki afternoon school run', 'Lagos', 'afternoon', 52, 18),
  ('Route A', 'Ikoyi morning school run', 'Lagos', 'morning', 44, 22),
  ('Executive', 'Premium low-density school route', 'Lagos', 'afternoon', 38, 8)
on conflict do nothing;

insert into alerts (alert_type, severity, notes)
values
  ('GPS ping recovered', 'low', 'Vehicle reconnected after brief network gap.'),
  ('Late guardian confirmation', 'medium', 'Guardian confirmation took longer than expected.'),
  ('Route B completed safely', 'low', 'Journey closed with no incident.')
on conflict do nothing;
