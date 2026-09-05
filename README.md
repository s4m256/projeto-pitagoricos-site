# Projeto Pitagóricos — plataforma educacional

Site institucional e MVP educacional em Next.js 16/React 19 com exportação estática. Sanity e Drizzle/D1 continuam disponíveis para as áreas que já os utilizavam; a nova área educacional usa Supabase para autenticação, perfis, conteúdo, progresso, favoritos, metas, autorização e uploads.

## Desenvolvimento

Requisitos: Node.js 22.13 ou superior.

```bash
npm install
copy .env.example .env.local
npm run dev
```

O build funciona sem credenciais reais. Nesse caso, áreas dependentes de conta exibem um estado de configuração e o catálogo fica vazio — nenhum placeholder é apresentado como material real.

## Variáveis

- `NEXT_PUBLIC_SITE_URL=https://pitagoricos.com.br`
- `NEXT_PUBLIC_SUPABASE_URL`: URL pública do projeto.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: chave pública anon/publishable. RLS continua obrigatória.
- variáveis institucionais existentes de Sanity, Plausible e canais sociais permanecem opcionais.

Nunca use `SUPABASE_SERVICE_ROLE_KEY` em uma variável `NEXT_PUBLIC_*`. Ela pertence somente aos secrets das Edge Functions.

## Configurar o Supabase

1. Crie ou vincule um projeto Supabase.
2. Execute `supabase link --project-ref SEU_REF` e `supabase db push` para aplicar `supabase/migrations/`.
3. Publique `admin-users` e `material-file` com `supabase functions deploy NOME`.
4. Confirme os secrets internos `SUPABASE_URL`, `SUPABASE_ANON_KEY` e `SUPABASE_SERVICE_ROLE_KEY` nas Functions.
5. Em Authentication > URL Configuration, use `https://pitagoricos.com.br` como Site URL e autorize `https://pitagoricos.com.br/auth/callback` e `http://localhost:3000/auth/callback`.
6. Ative Google em Authentication > Providers, cadastrando as credenciais OAuth e o callback informado pelo painel Supabase.
7. Decida se confirmação de email ficará ativa; o frontend trata ambos os casos.
8. Crie o primeiro usuário e promova-o manualmente no SQL Editor: `update public.profiles set role = 'admin' where id = 'UUID';`.
9. Confirme que o bucket privado `materials` existe após a migration.
10. Rode `supabase test db` com o ambiente local para executar `supabase/tests/rls.sql`.

## Segurança

- RLS limita preferências, progresso, favoritos e metas ao proprietário.
- O público lê somente materiais e páginas de olimpíada publicados.
- Admins gerenciam conteúdo por policies baseadas em `is_admin()`.
- O browser nunca recebe service role.
- `admin-users` valida o JWT, consulta a role no banco, bloqueia auto-rebaixamento e protege o último admin antes de usar a API administrativa.
- Uploads ficam no bucket privado. `material-file` só assina por 10 minutos arquivos publicados ou drafts solicitados por admin.
- Salvar um material cria DRAFT; publicar é uma ação separada.

## Validação

```bash
npm run lint
npm test
npm run build
```

`npm test` cobre regras de nível/recomendação/draft e renderiza as rotas públicas no worker local. Os testes de RLS precisam do Supabase CLI/Docker e de uma instância local.

## Bloqueios de lançamento

- **BLOQUEIO DE LANÇAMENTO: confirmar que todo arquivo do Google Drive publicado está em anyone-with-link VIEWER, nunca WRITER.**

Os dois PNGs oficiais da marca já estão integrados e documentados em `docs/brand-assets.md`.

Não há deploy automático desta branch. O workflow existente só publica após merge/push em `main` e não deve ser acionado durante a revisão da PR.
