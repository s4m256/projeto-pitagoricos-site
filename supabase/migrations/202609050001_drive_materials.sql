create temporary table seed_materials (
  material_key text primary key,
  title text not null,
  description text not null,
  subject text not null,
  olympiad text not null,
  levels text[] not null,
  material_type text not null,
  objective text not null,
  status public.material_status not null,
  sort_order integer not null
) on commit drop;

insert into seed_materials values
  ('oba-guia-2024', 'Guia completo para a OBA — 2024', 'Guia completo de preparação para a Olimpíada Brasileira de Astronomia e Astronáutica.', 'Astronomia', 'OBA', '{}', 'guia', 'aprender', 'published', 1),
  ('oba-simulado-2022-n3', 'Simulado OBA 2022 — Nível 3', 'Prova e gabarito para simular a OBA 2022 no Nível 3.', 'Astronomia', 'OBA', '{3}', 'simulado', 'simular', 'published', 2),
  ('oba-simulado-2022-n4', 'Simulado OBA 2022 — Nível 4', 'Prova e gabarito para simular a OBA 2022 no Nível 4.', 'Astronomia', 'OBA', '{4}', 'simulado', 'simular', 'published', 3),
  ('oba-sistema-solar-aula', 'Sistema Solar — Aula', 'Aula sobre os principais conceitos do Sistema Solar para preparação para a OBA.', 'Astronomia', 'OBA', '{}', 'aula', 'aprender', 'draft', 4),
  ('oba-sistema-solar-questoes', 'Sistema Solar — Questões', 'Lista de questões sobre o Sistema Solar para preparação para a OBA.', 'Astronomia', 'OBA', '{}', 'lista', 'praticar', 'draft', 5),
  ('oba-planeta-terra-aula', 'Planeta Terra — Aula', 'Aula sobre o planeta Terra para preparação para a OBA.', 'Astronomia', 'OBA', '{}', 'aula', 'aprender', 'draft', 6),
  ('oba-planeta-terra-questoes', 'Planeta Terra — Questões', 'Lista de questões sobre o planeta Terra para preparação para a OBA.', 'Astronomia', 'OBA', '{}', 'lista', 'praticar', 'draft', 7),
  ('oba-lua-eclipses-aula', 'Lua e eclipses — Aula', 'Aula sobre a Lua e os eclipses para preparação para a OBA.', 'Astronomia', 'OBA', '{}', 'aula', 'aprender', 'draft', 8),
  ('oba-constelacoes-questoes', 'Constelações — Questões', 'Lista de questões sobre constelações para preparação para a OBA.', 'Astronomia', 'OBA', '{}', 'lista', 'praticar', 'draft', 9),
  ('oba-matematica-interpretacao-questoes', 'Matemática e interpretação para OBA — Questões', 'Lista de questões de matemática e interpretação voltada à preparação para a OBA.', 'Matemática', 'OBA', '{}', 'lista', 'praticar', 'draft', 10),
  ('oba-astronautica', 'Astronáutica para OBA', 'Aula de astronáutica para preparação para a OBA.', 'Astronomia', 'OBA', '{}', 'aula', 'aprender', 'draft', 11),
  ('oba-kepler-newton', 'Leis de Kepler e Newton', 'Aula sobre as leis de Kepler e Newton para preparação para a OBA.', 'Astronomia', 'OBA', '{}', 'aula', 'aprender', 'draft', 12),
  ('obmep-simulado-2022-n1', 'Simulado 2ª fase OBMEP 2022 — Nível 1', 'Prova e correção para simular a segunda fase da OBMEP 2022 no Nível 1.', 'Matemática', 'OBMEP', '{1}', 'simulado', 'simular', 'published', 13),
  ('obmep-simulado-2022-n2', 'Simulado 2ª fase OBMEP 2022 — Nível 2', 'Prova e correção para simular a segunda fase da OBMEP 2022 no Nível 2.', 'Matemática', 'OBMEP', '{2}', 'simulado', 'simular', 'published', 14),
  ('obmep-simulado-2022-n3', 'Simulado 2ª fase OBMEP 2022 — Nível 3', 'Prova e correção para simular a segunda fase da OBMEP 2022 no Nível 3.', 'Matemática', 'OBMEP', '{3}', 'simulado', 'simular', 'published', 15),
  ('canguru-simulado-2022-p', 'Simulado Canguru 2022 — Nível P', 'Prova e gabarito geral para simular o Canguru de Matemática 2022 no Nível P.', 'Matemática', 'Canguru', '{P}', 'simulado', 'simular', 'published', 16),
  ('canguru-simulado-2022-e', 'Simulado Canguru 2022 — Nível E', 'Prova e gabarito geral para simular o Canguru de Matemática 2022 no Nível E.', 'Matemática', 'Canguru', '{E}', 'simulado', 'simular', 'published', 17),
  ('canguru-simulado-2022-b', 'Simulado Canguru 2022 — Nível B', 'Prova e gabarito geral para simular o Canguru de Matemática 2022 no Nível B.', 'Matemática', 'Canguru', '{B}', 'simulado', 'simular', 'published', 18),
  ('canguru-simulado-2022-c', 'Simulado Canguru 2022 — Nível C', 'Prova e gabarito geral para simular o Canguru de Matemática 2022 no Nível C.', 'Matemática', 'Canguru', '{C}', 'simulado', 'simular', 'published', 19),
  ('canguru-simulado-2022-j', 'Simulado Canguru 2022 — Nível J', 'Prova e gabarito geral para simular o Canguru de Matemática 2022 no Nível J.', 'Matemática', 'Canguru', '{J}', 'simulado', 'simular', 'published', 20),
  ('canguru-simulado-2022-s', 'Simulado Canguru 2022 — Nível S', 'Prova e gabarito geral para simular o Canguru de Matemática 2022 no Nível S.', 'Matemática', 'Canguru', '{S}', 'simulado', 'simular', 'published', 21),
  ('onc-guia-a', 'Guia ONC — Nível A', 'Guia interdisciplinar de preparação para a ONC no Nível A.', 'Interdisciplinar', 'ONC', '{A}', 'guia', 'aprender', 'published', 22),
  ('onc-guia-b', 'Guia ONC — Nível B', 'Guia interdisciplinar de preparação para a ONC no Nível B.', 'Interdisciplinar', 'ONC', '{B}', 'guia', 'aprender', 'published', 23),
  ('onc-guia-c', 'Guia ONC — Nível C', 'Guia interdisciplinar de preparação para a ONC no Nível C.', 'Interdisciplinar', 'ONC', '{C}', 'guia', 'aprender', 'published', 24),
  ('onc-guia-d', 'Guia ONC — Nível D', 'Guia interdisciplinar de preparação para a ONC no Nível D.', 'Interdisciplinar', 'ONC', '{D}', 'guia', 'aprender', 'published', 25),
  ('onc-guia-e', 'Guia ONC — Nível E', 'Guia interdisciplinar de preparação para a ONC no Nível E.', 'Interdisciplinar', 'ONC', '{E}', 'guia', 'aprender', 'published', 26);

create temporary table seed_resources (
  material_key text not null references seed_materials(material_key),
  title text not null,
  resource_type text not null,
  sort_order integer not null,
  external_url text not null
) on commit drop;

insert into seed_resources values
  ('oba-guia-2024', 'Guia', 'guia', 0, 'https://drive.google.com/file/d/1Kv_EkCvd7p3iPSssvcdczFKSlysZGPBO/view'),
  ('oba-simulado-2022-n3', 'Prova', 'simulado', 0, 'https://drive.google.com/file/d/1-riIRqidntPztHH8QjupAXkyrCm1ZJYK/view'),
  ('oba-simulado-2022-n3', 'Gabarito', 'gabarito', 1, 'https://drive.google.com/file/d/1O4IfSZz_d_00WxVC4M0oxaquXlRtG-Gc/view'),
  ('oba-simulado-2022-n4', 'Prova', 'simulado', 0, 'https://drive.google.com/file/d/1-lKidvPX4gPAEnEx9aDMEPHdIqxLiOp3/view'),
  ('oba-simulado-2022-n4', 'Gabarito', 'gabarito', 1, 'https://drive.google.com/file/d/10cr7s92BPp6NC4DZl4entcpndJ32K8QY/view'),
  ('oba-sistema-solar-aula', 'Aula', 'aula', 0, 'https://drive.google.com/file/d/1AwL7lbednI6x5rQuENIpwAY4ZSJyZqz1/view'),
  ('oba-sistema-solar-questoes', 'Lista de questões', 'lista', 0, 'https://drive.google.com/file/d/1uj4rqNRQ2qJrv7MIPcg-32K-cTKvAcIF/view'),
  ('oba-planeta-terra-aula', 'Aula', 'aula', 0, 'https://drive.google.com/file/d/1XWSHBM7zdthD5hb3i6qfvbRMvdtVip-6/view'),
  ('oba-planeta-terra-questoes', 'Lista de questões', 'lista', 0, 'https://drive.google.com/file/d/1dlv0ma8XEXLsiAepG79KQpJIQOAKB1eW/view'),
  ('oba-lua-eclipses-aula', 'Aula', 'aula', 0, 'https://drive.google.com/file/d/1JU_CvDP1SmqhNzrd5usGJ158oD0k9igJ/view'),
  ('oba-constelacoes-questoes', 'Lista de questões', 'lista', 0, 'https://drive.google.com/file/d/1APxMlf3LruGgMOipTJ37PzrJVbfnKJF7/view'),
  ('oba-matematica-interpretacao-questoes', 'Lista de questões', 'lista', 0, 'https://drive.google.com/file/d/1YG-1lr5Tffik9QfPXIv4l4E8LJcEBYcT/view'),
  ('oba-astronautica', 'Aula', 'aula', 0, 'https://drive.google.com/file/d/1M1czEcFWGpQleM0kUcPcHKpbIlB06itO/view'),
  ('oba-kepler-newton', 'Aula', 'aula', 0, 'https://drive.google.com/file/d/1TXZPSXJs4K5Zuo_9Y4Cidq2_oW9xFfV-/view'),
  ('obmep-simulado-2022-n1', 'Prova', 'simulado', 0, 'https://drive.google.com/file/d/13XjYpP6qlL5wAvkrs_Ih3Asq-HjXjigr/view'),
  ('obmep-simulado-2022-n1', 'Correção', 'solução', 1, 'https://drive.google.com/file/d/1MeX_HjIcCK-KDJOheLiZ_sblcQV3iM1l/view'),
  ('obmep-simulado-2022-n2', 'Prova', 'simulado', 0, 'https://drive.google.com/file/d/1LdrcO6ZGMqTiURJ0ROEXzjateb250p26/view'),
  ('obmep-simulado-2022-n2', 'Correção', 'solução', 1, 'https://drive.google.com/file/d/1Cz8tc93siCF2arPjVI-EAFnLz00y5RBV/view'),
  ('obmep-simulado-2022-n3', 'Prova', 'simulado', 0, 'https://drive.google.com/file/d/1HiXKBvlQNcBfSu5efUY0V-yxz9wrqGSf/view'),
  ('obmep-simulado-2022-n3', 'Correção', 'solução', 1, 'https://drive.google.com/file/d/1cCjVWi2NdzneJ_H__hHYBjR6_RmdFZiF/view'),
  ('canguru-simulado-2022-p', 'Prova', 'simulado', 0, 'https://drive.google.com/file/d/1dZRAGaf3yc1g_B9MFyoMWWXfBGTLxR01/view'),
  ('canguru-simulado-2022-e', 'Prova', 'simulado', 0, 'https://drive.google.com/file/d/1LfpR3hp50L6INR7zr69ycGKikUiucW9Y/view'),
  ('canguru-simulado-2022-b', 'Prova', 'simulado', 0, 'https://drive.google.com/file/d/1VP4bfLlFc19kJyf34RHMW_2rKKU3wh3T/view'),
  ('canguru-simulado-2022-c', 'Prova', 'simulado', 0, 'https://drive.google.com/file/d/1wdyAU9VM5M9-QptZAi-NjTFvA2PG7JJU/view'),
  ('canguru-simulado-2022-j', 'Prova', 'simulado', 0, 'https://drive.google.com/file/d/1dIwFhtIsYkEw5MoWJP39ytXTKibHj519/view'),
  ('canguru-simulado-2022-s', 'Prova', 'simulado', 0, 'https://drive.google.com/file/d/1BVYFhzbCfwHvrekOc9LIju7DFOEqBVkt/view'),
  ('canguru-simulado-2022-p', 'Gabarito geral', 'gabarito', 1, 'https://drive.google.com/file/d/1keslmBL-L0DTu30kj56lRaC7p52qPaey/view'),
  ('canguru-simulado-2022-e', 'Gabarito geral', 'gabarito', 1, 'https://drive.google.com/file/d/1keslmBL-L0DTu30kj56lRaC7p52qPaey/view'),
  ('canguru-simulado-2022-b', 'Gabarito geral', 'gabarito', 1, 'https://drive.google.com/file/d/1keslmBL-L0DTu30kj56lRaC7p52qPaey/view'),
  ('canguru-simulado-2022-c', 'Gabarito geral', 'gabarito', 1, 'https://drive.google.com/file/d/1keslmBL-L0DTu30kj56lRaC7p52qPaey/view'),
  ('canguru-simulado-2022-j', 'Gabarito geral', 'gabarito', 1, 'https://drive.google.com/file/d/1keslmBL-L0DTu30kj56lRaC7p52qPaey/view'),
  ('canguru-simulado-2022-s', 'Gabarito geral', 'gabarito', 1, 'https://drive.google.com/file/d/1keslmBL-L0DTu30kj56lRaC7p52qPaey/view'),
  ('onc-guia-a', 'Guia', 'guia', 0, 'https://drive.google.com/file/d/1xj7pumkJEiFgKbxFwM2Df7ZhN5U2rxVz/view'),
  ('onc-guia-b', 'Guia', 'guia', 0, 'https://drive.google.com/file/d/1O38BgEcRFjpI3iAOn44YAHLY1c0dvdcE/view'),
  ('onc-guia-c', 'Guia', 'guia', 0, 'https://drive.google.com/file/d/1nK07ZZe4fFfFOOt8iic1jbiuHzUqNqT1/view'),
  ('onc-guia-d', 'Guia', 'guia', 0, 'https://drive.google.com/file/d/1XBogZVlrgP9jfgZVJe_ST6ajPRKkPEte/view'),
  ('onc-guia-e', 'Guia', 'guia', 0, 'https://drive.google.com/file/d/15if99ii7NbhJ84GcRt7lVPiGxvwrEfLH/view');

do $$
begin
  if not exists (select 1 from public.profiles where role = 'admin') then
    raise exception 'Não há um perfil administrador para registrar os materiais.';
  end if;
end
$$;

update public.materials
set title = 'Sistema Solar — Aula'
where title = 'Sistema Solar'
  and olympiad = 'OBA'
  and not exists (
    select 1 from public.materials
    where title = 'Sistema Solar — Aula' and olympiad = 'OBA'
  );

update public.materials as material
set
  description = seed.description,
  subject = seed.subject,
  levels = seed.levels,
  material_type = seed.material_type,
  objective = seed.objective,
  source_kind = null,
  external_url = null,
  storage_path = null,
  status = seed.status,
  featured = false,
  sort_order = seed.sort_order,
  published_at = case when seed.status = 'published' then coalesce(material.published_at, now()) else null end
from seed_materials as seed
where material.title = seed.title
  and material.olympiad = seed.olympiad;

insert into public.materials (
  title, description, subject, olympiad, levels, material_type, objective,
  source_kind, external_url, storage_path, status, featured, sort_order,
  created_by, published_at
)
select
  seed.title, seed.description, seed.subject, seed.olympiad, seed.levels,
  seed.material_type, seed.objective, null, null, null, seed.status, false,
  seed.sort_order,
  (select id from public.profiles where role = 'admin' order by created_at limit 1),
  case when seed.status = 'published' then now() else null end
from seed_materials as seed
where not exists (
  select 1 from public.materials as material
  where material.title = seed.title
    and material.olympiad = seed.olympiad
);

delete from public.material_resources as resource
using public.materials as material, seed_materials as seed
where resource.material_id = material.id
  and material.title = seed.title
  and material.olympiad = seed.olympiad;

insert into public.material_resources (
  material_id, title, resource_type, sort_order, source_kind, external_url, storage_path
)
select
  material.id,
  resource.title,
  resource.resource_type,
  resource.sort_order,
  'external',
  resource.external_url,
  null
from seed_resources as resource
join seed_materials as seed using (material_key)
join public.materials as material
  on material.title = seed.title
 and material.olympiad = seed.olympiad;

do $$
declare
  material_count integer;
  published_count integer;
  draft_count integer;
  resource_count integer;
begin
  select
    count(*),
    count(*) filter (where material.status = 'published'),
    count(*) filter (where material.status = 'draft')
  into material_count, published_count, draft_count
  from public.materials as material
  join seed_materials as seed
    on material.title = seed.title
   and material.olympiad = seed.olympiad;

  select count(*) into resource_count
  from public.material_resources as resource
  join public.materials as material on material.id = resource.material_id
  join seed_materials as seed
    on material.title = seed.title
   and material.olympiad = seed.olympiad;

  if material_count <> 26 or published_count <> 17 or draft_count <> 9 or resource_count <> 37 then
    raise exception 'Carga incompleta: % materiais (% publicados, % drafts), % recursos',
      material_count, published_count, draft_count, resource_count;
  end if;
end
$$;
