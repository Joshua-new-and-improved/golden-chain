-- Optional server-side fix: post "joined the group" only when someone actually joins (not on a repeat join).
create or replace function public.join_group(code text) returns uuid
language plpgsql security definer set search_path = public as $$
declare gid uuid; n int;
begin
  if auth.uid() is null then raise exception 'Sign in first'; end if;
  select id into gid from public.groups where invite_code = upper(trim(code));
  if gid is null then raise exception 'No group has that code'; end if;
  insert into public.group_members (group_id, user_id) values (gid, auth.uid()) on conflict do nothing;
  get diagnostics n = row_count;
  if n > 0 then
    insert into public.messages (group_id, user_id, kind, body) values (gid, auth.uid(), 'system', 'joined the group');
  end if;
  return gid;
end $$;
