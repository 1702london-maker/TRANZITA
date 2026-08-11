create or replace function public.prevent_welfare_note_mutation()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  raise exception 'welfare_notes are append-only. Create a new note instead.';
end;
$$;

create or replace function public.prevent_first_aid_action_mutation()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  raise exception 'first_aid_actions are append-only. Create a new action instead.';
end;
$$;
