-- Golden Chain: groups upgrade (pinned messages, editing, prayer requests, meetings, admin tools)
-- Safe to run more than once. Run in Supabase: SQL Editor → New query → paste → Run.

-- 1. Pins and group settings live on the group
alter table public.groups add column if not exists pins jsonb not null default '[]'::jsonb;
alter table public.groups add column if not exists settings jsonb not null default '{}'::jsonb;

-- 2. Messages can be edited, and there are two new card types
alter table public.messages add column if not exists edited_at timestamptz;
alter table public.messages drop constraint if exists messages_kind_check;
alter table public.messages add constraint messages_kind_check
  check (kind in ('text','verse','lesson','sticker','poll','qa','study','stats','challenge','system','prayer','event'));

-- 3. "Only admins can send messages" (announcement groups)
create or replace function public.gc_can_post(gid uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select public.is_member(gid) and (public.is_admin(gid)
    or not coalesce((select (settings->>'admins_only')::boolean from public.groups where id = gid), false));
$$;
drop policy if exists gc_msg_ins on public.messages;
create policy gc_msg_ins on public.messages for insert to authenticated
  with check (user_id = auth.uid() and kind <> 'system' and public.gc_can_post(group_id));

-- 4. Authors may edit their own messages (text, prayer, meeting details); they cannot move them
drop policy if exists gc_msg_upd on public.messages;
create policy gc_msg_upd on public.messages for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid() and kind <> 'system' and public.is_member(group_id));

-- 5. Pinning: admins always; everyone when the group allows it
create or replace function public.gc_set_pins(gid uuid, p jsonb) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not (public.is_admin(gid) or (public.is_member(gid)
      and coalesce((select (settings->>'pin_all')::boolean from public.groups where id = gid), false))) then
    raise exception 'Only group admins can pin messages in this group';
  end if;
  if jsonb_typeof(p) <> 'array' or jsonb_array_length(p) > 5 then
    raise exception 'A group can have up to 5 pinned messages';
  end if;
  update public.groups set pins = p where id = gid;
end $$;

-- 6. Admins can make other members admins (the owner always stays owner)
create or replace function public.gc_set_role(gid uuid, uid uuid, r text) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin(gid) then raise exception 'Only group admins can do that'; end if;
  if r not in ('admin','member') then raise exception 'Unknown role'; end if;
  update public.group_members set role = r where group_id = gid and user_id = uid and role <> 'owner';
end $$;

revoke all on function public.gc_set_pins(uuid, jsonb) from public, anon;
revoke all on function public.gc_set_role(uuid, uuid, text) from public, anon;
revoke all on function public.gc_can_post(uuid) from public, anon;
grant execute on function public.gc_set_pins(uuid, jsonb) to authenticated;
grant execute on function public.gc_set_role(uuid, uuid, text) to authenticated;
grant execute on function public.gc_can_post(uuid) to authenticated;

-- 7. Live updates for pins, settings, edits and new admins
do $$ begin
  begin alter publication supabase_realtime add table public.groups; exception when others then null; end;
  begin alter publication supabase_realtime add table public.group_members; exception when others then null; end;
end $$;
