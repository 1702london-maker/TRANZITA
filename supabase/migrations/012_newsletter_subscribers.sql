create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text not null default 'footer',
  status text not null default 'subscribed',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (email)
);

create index if not exists newsletter_subscribers_status_created_idx
  on public.newsletter_subscribers(status, created_at desc);

alter table public.newsletter_subscribers enable row level security;

drop policy if exists "admin read newsletter subscribers" on public.newsletter_subscribers;
create policy "admin read newsletter subscribers" on public.newsletter_subscribers
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

drop policy if exists "admin write newsletter subscribers" on public.newsletter_subscribers;
create policy "admin write newsletter subscribers" on public.newsletter_subscribers
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

drop trigger if exists newsletter_subscribers_set_updated_at on public.newsletter_subscribers;
create trigger newsletter_subscribers_set_updated_at
  before update on public.newsletter_subscribers
  for each row execute function public.set_updated_at();
