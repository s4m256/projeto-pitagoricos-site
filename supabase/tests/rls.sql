-- Execute com `supabase test db` após iniciar o Supabase local.
begin;
select plan(4);
select has_function('public', 'is_admin', 'is_admin existe');
select policies_are('public', 'materials', array['materials_public_published','materials_admin_all'], 'materials tem policies pública e admin');
select policies_are('public', 'goals', array['goals_own_all'], 'goals pertence ao usuário');
select policies_are('public', 'student_preferences', array['preferences_own_all'], 'preferências pertencem ao usuário');
select * from finish();
rollback;
