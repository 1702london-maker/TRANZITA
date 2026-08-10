create table if not exists public.demo_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  school_name text not null,
  role text not null,
  student_count text,
  source text not null default 'website_route_review',
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.demo_requests enable row level security;

drop policy if exists "admin read demo requests" on public.demo_requests;
create policy "admin read demo requests" on public.demo_requests
  for select to authenticated
  using (exists (select 1 from public.app_users where auth_user_id = (select auth.uid()) and role = 'admin'));
