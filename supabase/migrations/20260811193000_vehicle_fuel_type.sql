alter table public.vehicles
  add column if not exists fuel_type text not null default 'electric'
  check (fuel_type in ('electric', 'diesel', 'petrol'));
