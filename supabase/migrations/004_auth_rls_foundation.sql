create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop policy if exists "users read own profile" on public.app_users;
create policy "users read own profile" on public.app_users
  for select to authenticated
  using (
    auth_user_id = (select auth.uid())
    and is_active = true
    and deleted_at is null
  );

drop policy if exists "admins read all user profiles" on public.app_users;
create policy "admins read all user profiles" on public.app_users
  for select to authenticated
  using (
    exists (
      select 1 from public.app_users admin_user
      where admin_user.auth_user_id = (select auth.uid())
      and admin_user.role = 'admin'
      and admin_user.is_active = true
      and admin_user.deleted_at is null
    )
  );

revoke all on function public.rls_auto_enable() from public;
revoke all on function public.rls_auto_enable() from anon;
revoke all on function public.rls_auto_enable() from authenticated;
