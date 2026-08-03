# Projeto Pitagóricos - website

Website institucional multipágina do Projeto Pitagóricos, com jornadas para estudantes e para escolas, secretarias e parceiros.

## Desenvolvimento

Requisitos: Node.js 22.13 ou superior.

```bash
npm install
npm run dev
```

O site usa Next.js App Router e está preparado para publicação na Vercel. A compilação de produção é feita com `npm run build`.

## Conteúdo e links oficiais

Copie `.env.example` para `.env.local` e preencha apenas os valores disponíveis. CTAs externos sem URL permanecem ocultos ou identificados como pendentes.

- `NEXT_PUBLIC_SITE_URL`: domínio definitivo.
- `NEXT_PUBLIC_WHATSAPP_URL`: comunidade oficial.
- `NEXT_PUBLIC_PARTNER_FORM_URL`: formulário externo para escolas e parceiros.
- `NEXT_PUBLIC_INSTAGRAM_URL` e `NEXT_PUBLIC_YOUTUBE_URL`: redes oficiais.
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`: domínio configurado no Plausible.
- `NEXT_PUBLIC_SANITY_PROJECT_ID` e `NEXT_PUBLIC_SANITY_DATASET`: conteúdo editorial.

## Sanity Studio

O painel editorial fica em `studio/` e contém os modelos de materiais, olimpíadas, indicadores, parceiros, departamentos, equipe, depoimentos, novidades, links e configurações do site.

```bash
cd studio
npm install
npm run dev
```

Defina `SANITY_STUDIO_PROJECT_ID` e `SANITY_STUDIO_DATASET` no ambiente do Studio. Perfis sem consentimento e perfis de menores sem autorização do responsável são excluídos das consultas públicas.

## Validação

```bash
npm run build
npm test
npm run lint
```

Os dados exibidos são os informados pelo documento do Projeto Pitagóricos. Antes da publicação pública, devem ser adicionados os links oficiais, dados autorizados da equipe, logos de parceiros e domínio final.
