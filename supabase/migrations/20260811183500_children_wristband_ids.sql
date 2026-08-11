alter table public.children
  add column if not exists wristband_id text;

create unique index if not exists children_wristband_id_unique
  on public.children (wristband_id);
