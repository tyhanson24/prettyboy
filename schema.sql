-- PrettyBoy — Database Schema
-- Run this in your Supabase SQL editor

create table if not exists prettyboy_profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text not null,
  email text not null,
  schedule jsonb not null default '["monday","tuesday","thursday","friday"]'::jsonb,
  program_start_date date not null default current_date,
  created_at timestamptz default now()
);

alter table prettyboy_profiles enable row level security;

create policy "Users read own profile" on prettyboy_profiles
  for select using (auth.uid() = id);

create policy "Users update own profile" on prettyboy_profiles
  for update using (auth.uid() = id);

create policy "Users insert own profile" on prettyboy_profiles
  for insert with check (auth.uid() = id);

-- Auto-create profile on signup (trigger)
create or replace function handle_prettyboy_new_user()
returns trigger as $$
begin
  insert into prettyboy_profiles (id, display_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

-- Only create trigger if it doesn't exist
do $$
begin
  if not exists (select 1 from pg_trigger where tgname = 'on_prettyboy_auth_user_created') then
    create trigger on_prettyboy_auth_user_created
      after insert on auth.users
      for each row execute function handle_prettyboy_new_user();
  end if;
end $$;
