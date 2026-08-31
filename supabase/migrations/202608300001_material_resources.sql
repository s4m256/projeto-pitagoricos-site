create table public.material_resources (
  id uuid primary key default gen_random_uuid(),
  material_id uuid not null references public.materials(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 200),
  resource_type text not null check (char_length(resource_type) between 1 and 80),
  sort_order integer not null default 0,
  source_kind public.material_source not null,
  external_url text,
  storage_path text,
  created_at timestamptz not null default now(),
  constraint material_resource_source_exactly_one check (
    (source_kind = 'external' and external_url is not null and storage_path is null)
    or
    (source_kind = 'upload' and storage_path is not null and external_url is null)
  )
);

create index material_resources_material_idx
  on public.material_resources(material_id, sort_order, created_at);

alter table public.materials drop constraint material_source_exactly_one;
alter table public.materials alter column source_kind drop not null;

insert into public.material_resources (
  material_id,
  title,
  resource_type,
  sort_order,
  source_kind,
  external_url,
  storage_path,
  created_at
)
select
  id,
  case material_type
    when 'aula' then 'Aula'
    when 'lista' then 'Lista'
    when 'guia' then 'Guia'
    when 'simulado' then 'Simulado'
    when 'vídeo' then 'Vídeo'
    when 'solução' then 'Solução'
    else title
  end,
  material_type,
  0,
  source_kind,
  external_url,
  storage_path,
  created_at
from public.materials
where source_kind is not null
  and (external_url is not null or storage_path is not null);

alter table public.material_resources enable row level security;

create policy material_resources_public_published
  on public.material_resources
  for select
  using (
    exists (
      select 1
      from public.materials
      where materials.id = material_resources.material_id
        and materials.status = 'published'
    )
  );

create policy material_resources_admin_all
  on public.material_resources
  for all
  using (public.is_admin())
  with check (public.is_admin());

grant select on public.material_resources to anon, authenticated;
grant insert, update, delete on public.material_resources to authenticated;
