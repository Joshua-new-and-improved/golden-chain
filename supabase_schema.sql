-- Golden Chain · Groups, streaks and chat
-- Paste this whole script into Supabase → SQL Editor → New query → Run. It is safe to run more than once.

-- ---------- Profiles ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Friend' check (char_length(display_name) between 1 and 40),
  avatar text not null default '🙂' check (char_length(avatar) <= 16),
  stats jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(nullif(left(new.raw_user_meta_data->>'display_name', 40), ''), 'Friend'))
  on conflict (id) do nothing;
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- Groups ----------
create table if not exists public.groups (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 60),
  description text not null default '' check (char_length(description) <= 300),
  emoji text not null default '✝️' check (char_length(emoji) <= 16),
  invite_code text not null unique default upper(substr(md5(random()::text), 1, 6)),
  owner uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.group_members (
  group_id uuid not null references public.groups(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('owner','admin','member')),
  last_read timestamptz not null default now(),
  joined_at timestamptz not null default now(),
  primary key (group_id, user_id)
);
create index if not exists group_members_user on public.group_members(user_id);

create or replace function public.is_member(gid uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.group_members where group_id = gid and user_id = auth.uid());
$$;
create or replace function public.is_admin(gid uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.group_members where group_id = gid and user_id = auth.uid() and role in ('owner','admin'));
$$;
create or replace function public.shares_group(uid uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select uid = auth.uid() or exists (
    select 1 from public.group_members a join public.group_members b on a.group_id = b.group_id
    where a.user_id = auth.uid() and b.user_id = uid);
$$;

create or replace function public.add_owner_member() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.group_members (group_id, user_id, role) values (new.id, new.owner, 'owner')
  on conflict do nothing;
  return new;
end $$;
drop trigger if exists on_group_created on public.groups;
create trigger on_group_created after insert on public.groups
  for each row execute function public.add_owner_member();

-- join by invite code (the only way into a group you are not yet in)
create or replace function public.join_group(code text) returns uuid
language plpgsql security definer set search_path = public as $$
declare gid uuid;
begin
  if auth.uid() is null then raise exception 'Sign in first'; end if;
  select id into gid from public.groups where invite_code = upper(trim(code));
  if gid is null then raise exception 'No group has that code'; end if;
  insert into public.group_members (group_id, user_id) values (gid, auth.uid()) on conflict do nothing;
  insert into public.messages (group_id, user_id, kind, body) values (gid, auth.uid(), 'system', 'joined the group');
  return gid;
end $$;

-- ---------- Messages and interactive content ----------
create table if not exists public.messages (
  id bigint generated always as identity primary key,
  group_id uuid not null references public.groups(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null default 'text' check (kind in ('text','verse','lesson','sticker','poll','qa','study','stats','challenge','system')),
  body text not null default '' check (char_length(body) <= 4000),
  data jsonb not null default '{}'::jsonb,
  reply_to bigint references public.messages(id) on delete set null,
  created_at timestamptz not null default now()
);
create index if not exists messages_group_time on public.messages(group_id, created_at desc);

create table if not exists public.responses (
  message_id bigint not null references public.messages(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  group_id uuid not null references public.groups(id) on delete cascade,
  value jsonb not null,
  created_at timestamptz not null default now(),
  primary key (message_id, user_id)
);

create table if not exists public.reactions (
  message_id bigint not null references public.messages(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  group_id uuid not null references public.groups(id) on delete cascade,
  emoji text not null check (char_length(emoji) <= 16),
  primary key (message_id, user_id, emoji)
);

-- ---------- Weekly challenges ----------
create table if not exists public.group_weeks (
  group_id uuid not null references public.groups(id) on delete cascade,
  week text not null,
  challenge int not null,
  primary key (group_id, week)
);
create table if not exists public.checkins (
  group_id uuid not null references public.groups(id) on delete cascade,
  week text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  task int not null,
  created_at timestamptz not null default now(),
  primary key (group_id, week, user_id, task)
);

-- ---------- Daily reading log (streaks) ----------
create table if not exists public.reading_log (
  user_id uuid not null references auth.users(id) on delete cascade,
  day date not null,
  ref text not null default '',
  primary key (user_id, day)
);

-- ---------- Stickers ----------
create table if not exists public.stickers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  path text not null,
  created_at timestamptz not null default now()
);

-- ---------- Row-level security ----------
alter table public.profiles enable row level security;
alter table public.groups enable row level security;
alter table public.group_members enable row level security;
alter table public.messages enable row level security;
alter table public.responses enable row level security;
alter table public.reactions enable row level security;
alter table public.group_weeks enable row level security;
alter table public.checkins enable row level security;
alter table public.reading_log enable row level security;
alter table public.stickers enable row level security;

do $$ declare r record; begin
  for r in select policyname, tablename from pg_policies where schemaname = 'public' and policyname like 'gc_%' loop
    execute format('drop policy %I on public.%I', r.policyname, r.tablename);
  end loop;
end $$;

create policy gc_profiles_read on public.profiles for select to authenticated using (public.shares_group(id));
create policy gc_profiles_ins on public.profiles for insert to authenticated with check (id = auth.uid());
create policy gc_profiles_upd on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

create policy gc_groups_read on public.groups for select to authenticated using (public.is_member(id) or owner = auth.uid());
create policy gc_groups_ins on public.groups for insert to authenticated with check (owner = auth.uid());
create policy gc_groups_upd on public.groups for update to authenticated using (public.is_admin(id));
create policy gc_groups_del on public.groups for delete to authenticated using (owner = auth.uid());

create policy gc_members_read on public.group_members for select to authenticated using (public.is_member(group_id));
create policy gc_members_upd on public.group_members for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy gc_members_del on public.group_members for delete to authenticated using (user_id = auth.uid() or public.is_admin(group_id));

create policy gc_msg_read on public.messages for select to authenticated using (public.is_member(group_id));
create policy gc_msg_ins on public.messages for insert to authenticated with check (user_id = auth.uid() and public.is_member(group_id) and kind <> 'system');
create policy gc_msg_del on public.messages for delete to authenticated using (user_id = auth.uid() or public.is_admin(group_id));

create policy gc_resp_read on public.responses for select to authenticated using (public.is_member(group_id));
create policy gc_resp_ins on public.responses for insert to authenticated with check (user_id = auth.uid() and public.is_member(group_id));
create policy gc_resp_upd on public.responses for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy gc_resp_del on public.responses for delete to authenticated using (user_id = auth.uid());

create policy gc_react_read on public.reactions for select to authenticated using (public.is_member(group_id));
create policy gc_react_ins on public.reactions for insert to authenticated with check (user_id = auth.uid() and public.is_member(group_id));
create policy gc_react_del on public.reactions for delete to authenticated using (user_id = auth.uid());

create policy gc_weeks_read on public.group_weeks for select to authenticated using (public.is_member(group_id));
create policy gc_weeks_ins on public.group_weeks for insert to authenticated with check (public.is_admin(group_id));
create policy gc_weeks_upd on public.group_weeks for update to authenticated using (public.is_admin(group_id));

create policy gc_chk_read on public.checkins for select to authenticated using (public.is_member(group_id));
create policy gc_chk_ins on public.checkins for insert to authenticated with check (user_id = auth.uid() and public.is_member(group_id));
create policy gc_chk_del on public.checkins for delete to authenticated using (user_id = auth.uid());

create policy gc_log_read on public.reading_log for select to authenticated using (public.shares_group(user_id));
create policy gc_log_ins on public.reading_log for insert to authenticated with check (user_id = auth.uid());
create policy gc_log_upd on public.reading_log for update to authenticated using (user_id = auth.uid());

create policy gc_stk_read on public.stickers for select to authenticated using (user_id = auth.uid());
create policy gc_stk_ins on public.stickers for insert to authenticated with check (user_id = auth.uid());
create policy gc_stk_del on public.stickers for delete to authenticated using (user_id = auth.uid());

-- ---------- Live updates ----------
do $$ begin
  begin alter publication supabase_realtime add table public.messages; exception when others then null; end;
  begin alter publication supabase_realtime add table public.responses; exception when others then null; end;
  begin alter publication supabase_realtime add table public.reactions; exception when others then null; end;
  begin alter publication supabase_realtime add table public.checkins; exception when others then null; end;
end $$;
alter table public.responses replica identity full;
alter table public.reactions replica identity full;
alter table public.checkins replica identity full;

-- ---------- Sticker images (public bucket; each user writes only in their own folder) ----------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('stickers', 'stickers', true, 1048576, array['image/png','image/webp','image/gif','image/jpeg'])
on conflict (id) do update set public = true, file_size_limit = 1048576;

drop policy if exists gc_stickers_read on storage.objects;
drop policy if exists gc_stickers_write on storage.objects;
drop policy if exists gc_stickers_delete on storage.objects;
create policy gc_stickers_read on storage.objects for select using (bucket_id = 'stickers');
create policy gc_stickers_write on storage.objects for insert to authenticated
  with check (bucket_id = 'stickers' and (storage.foldername(name))[1] = auth.uid()::text);
create policy gc_stickers_delete on storage.objects for delete to authenticated
  using (bucket_id = 'stickers' and (storage.foldername(name))[1] = auth.uid()::text);

-- ---------- Grants (new projects may not expose tables automatically) ----------
grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on all tables in schema public to authenticated;
grant usage, select on all sequences in schema public to authenticated;
grant execute on all functions in schema public to authenticated;
