create extension if not exists pgcrypto;
create type public.user_role as enum ('student', 'admin');
create type public.material_status as enum ('draft', 'published');
create type public.material_source as enum ('external', 'upload');

create table public.profiles (id uuid primary key references auth.users(id) on delete cascade, display_name text, role public.user_role not null default 'student', created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table public.student_preferences (user_id uuid primary key references public.profiles(id) on delete cascade, grade text not null default '', subjects text[] not null default '{}', olympiads text[] not null default '{}', objective text not null default '', experience text not null default '', onboarding_completed boolean not null default false, updated_at timestamptz not null default now());
create table public.materials (id uuid primary key default gen_random_uuid(), title text not null, description text not null, subject text not null, olympiad text, levels text[] not null default '{}', material_type text not null, objective text not null, source_kind public.material_source not null, external_url text, storage_path text, status public.material_status not null default 'draft', featured boolean not null default false, sort_order integer not null default 0, created_by uuid not null references public.profiles(id), published_at timestamptz, created_at timestamptz not null default now(), updated_at timestamptz not null default now(), constraint material_source_exactly_one check ((source_kind = 'external' and external_url is not null and storage_path is null) or (source_kind = 'upload' and storage_path is not null and external_url is null)));
create table public.material_progress (user_id uuid references public.profiles(id) on delete cascade, material_id uuid references public.materials(id) on delete cascade, completed_at timestamptz not null default now(), primary key (user_id, material_id));
create table public.favorites (user_id uuid references public.profiles(id) on delete cascade, material_id uuid references public.materials(id) on delete cascade, created_at timestamptz not null default now(), primary key (user_id, material_id));
create table public.goals (id uuid primary key default gen_random_uuid(), user_id uuid not null references public.profiles(id) on delete cascade, text text not null check (char_length(text) between 1 and 500), completed boolean not null default false, position integer not null default 0, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table public.olympiad_pages (slug text primary key check (slug in ('oba','obmep','onc')), name text not null, short_description text not null, intro text not null, how_it_works text not null, how_to_study text not null, published boolean not null default false, updated_by uuid references public.profiles(id), updated_at timestamptz not null default now());
create index materials_public_idx on public.materials(status, subject, olympiad, sort_order);
create index goals_user_idx on public.goals(user_id, position);

create or replace function public.set_updated_at() returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end $$;
create trigger profiles_updated before update on public.profiles for each row execute function public.set_updated_at();
create trigger preferences_updated before update on public.student_preferences for each row execute function public.set_updated_at();
create trigger materials_updated before update on public.materials for each row execute function public.set_updated_at();
create trigger goals_updated before update on public.goals for each row execute function public.set_updated_at();
create trigger olympiad_pages_updated before update on public.olympiad_pages for each row execute function public.set_updated_at();

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = '' as $$ begin insert into public.profiles (id, display_name) values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1))); insert into public.student_preferences (user_id) values (new.id); return new; end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path = '' as $$ select exists(select 1 from public.profiles where id = auth.uid() and role = 'admin') $$;
revoke all on function public.is_admin() from public; grant execute on function public.is_admin() to anon, authenticated;

alter table public.profiles enable row level security; alter table public.student_preferences enable row level security; alter table public.materials enable row level security; alter table public.material_progress enable row level security; alter table public.favorites enable row level security; alter table public.goals enable row level security; alter table public.olympiad_pages enable row level security;
create policy profiles_select_self_or_admin on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy profiles_update_self on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());
revoke update on public.profiles from authenticated; grant update(display_name) on public.profiles to authenticated;
create policy preferences_own_all on public.student_preferences for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy progress_own_all on public.material_progress for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy favorites_own_all on public.favorites for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy goals_own_all on public.goals for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy materials_public_published on public.materials for select using (status = 'published');
create policy materials_admin_all on public.materials for all using (public.is_admin()) with check (public.is_admin());
create policy olympiad_pages_public_published on public.olympiad_pages for select using (published);
create policy olympiad_pages_admin_all on public.olympiad_pages for all using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public, file_size_limit) values ('materials', 'materials', false, 52428800) on conflict (id) do update set public = false;
create policy materials_storage_admin_select on storage.objects for select using (bucket_id = 'materials' and public.is_admin());
create policy materials_storage_admin_insert on storage.objects for insert with check (bucket_id = 'materials' and public.is_admin());
create policy materials_storage_admin_update on storage.objects for update using (bucket_id = 'materials' and public.is_admin()) with check (bucket_id = 'materials' and public.is_admin());
create policy materials_storage_admin_delete on storage.objects for delete using (bucket_id = 'materials' and public.is_admin());

insert into public.olympiad_pages (slug,name,short_description,intro,how_it_works,how_to_study,published) values
('oba','OBA','Astronomia e astronáutica para estudantes do Ensino Fundamental e Médio.','Uma porta de entrada para estudar o céu, o espaço e a tecnologia espacial.','Descubra seu nível e avance por temas, prática, simulados e leitura do manual oficial.','Comece pelos conceitos, resolva questões e use simulados para revisar o que precisa de atenção.',true),
('obmep','OBMEP','Problemas de matemática que valorizam raciocínio e estratégia.','A preparação atual prioriza problemas e o treinamento para a segunda fase.','Escolha o nível da sua série e treine explicando cada etapa da solução.','Resolva problemas com tempo, compare estratégias e refaça aqueles em que travou.',true),
('onc','ONC','Uma olimpíada interdisciplinar de ciências.','O ponto de partida é identificar o nível correto e organizar uma revisão integrada.','O nível depende da série; a preparação combina diferentes áreas das ciências.','Use um guia interdisciplinar e alterne teoria, questões e revisão dos erros.',true)
on conflict (slug) do nothing;
