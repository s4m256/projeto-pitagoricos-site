import { defineArrayMember, defineField, defineType } from "sanity";

const externalLink = defineType({
  name: "externalLink", title: "Link externo", type: "object",
  fields: [
    defineField({ name: "label", title: "Rótulo", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "url", title: "URL", type: "url", validation: (rule) => rule.uri({ scheme: ["https"] }) }),
    defineField({ name: "eventName", title: "Evento de analytics", type: "string" }),
  ],
});

const material = defineType({
  name: "material", title: "Materiais", type: "document",
  fields: [
    defineField({ name: "title", title: "Título", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Descrição", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "area", title: "Área", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "olympiad", title: "Olimpíada", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "level", title: "Nível", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "type", title: "Formato", type: "string", options: { list: ["E-book", "Trilha", "Simulado", "Lista", "Aula"] } }),
    defineField({ name: "href", title: "Link oficial", type: "url", validation: (rule) => rule.uri({ scheme: ["https"] }) }),
    defineField({ name: "featured", title: "Destaque", type: "boolean", initialValue: false }),
  ],
});

const olympiad = defineType({
  name: "olympiad", title: "Olimpíadas", type: "document",
  fields: [
    defineField({ name: "abbr", title: "Sigla", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "name", title: "Nome", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "area", title: "Área", type: "string" }),
    defineField({ name: "description", title: "Descrição", type: "text" }),
  ],
});

const metric = defineType({
  name: "metric", title: "Indicadores", type: "document",
  fields: [
    defineField({ name: "value", title: "Valor", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "label", title: "Rótulo", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "note", title: "Nota de contexto", type: "string" }),
    defineField({ name: "referenceDate", title: "Data de referência", type: "date" }),
    defineField({ name: "sourceLabel", title: "Fonte", type: "string", initialValue: "Dados informados pelo Projeto Pitagóricos" }),
    defineField({ name: "order", title: "Ordem", type: "number" }),
  ],
});

const partner = defineType({
  name: "partner", title: "Parceiros", type: "document",
  fields: [
    defineField({ name: "name", title: "Nome", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "logo", title: "Logo autorizado", type: "image", options: { hotspot: true } }),
    defineField({ name: "description", title: "Descrição da parceria", type: "text" }),
    defineField({ name: "authorizationConfirmed", title: "Uso do logo autorizado", type: "boolean", validation: (rule) => rule.required().custom((value) => value === true ? true : "Confirme a autorização antes de publicar") }),
    defineField({ name: "order", title: "Ordem", type: "number" }),
  ],
});

const department = defineType({
  name: "department", title: "Departamentos", type: "document",
  fields: [
    defineField({ name: "name", title: "Nome", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "symbol", title: "Símbolo curto", type: "string", validation: (rule) => rule.max(3) }),
    defineField({ name: "description", title: "Descrição", type: "text", rows: 3 }),
    defineField({ name: "order", title: "Ordem", type: "number" }),
  ],
});

const member = defineType({
  name: "member", title: "Equipe", type: "document",
  fields: [
    defineField({ name: "name", title: "Nome", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "role", title: "Função", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "department", title: "Departamento", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "bio", title: "Biografia curta", type: "text", rows: 3, validation: (rule) => rule.max(360) }),
    defineField({ name: "achievement", title: "Conquista em destaque", type: "string" }),
    defineField({ name: "photo", title: "Foto autorizada", type: "image", options: { hotspot: true } }),
    defineField({ name: "isMinor", title: "Menor de idade", type: "boolean", initialValue: false }),
    defineField({ name: "consentVerified", title: "Consentimento registrado", type: "boolean", initialValue: false, validation: (rule) => rule.custom((value) => value === true ? true : "Obrigatório para publicar o perfil") }),
    defineField({ name: "guardianConsentVerified", title: "Autorização do responsável", type: "boolean", hidden: ({ parent }) => !parent?.isMinor, validation: (rule) => rule.custom((value, context) => context.parent && (context.parent as { isMinor?: boolean }).isMinor && value !== true ? "Obrigatório para menores" : true) }),
  ],
});

const testimonial = defineType({
  name: "testimonial", title: "Depoimentos", type: "document",
  fields: [
    defineField({ name: "quote", title: "Depoimento", type: "text", validation: (rule) => rule.required().max(500) }),
    defineField({ name: "author", title: "Autor", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "context", title: "Contexto", type: "string" }),
    defineField({ name: "consentVerified", title: "Consentimento registrado", type: "boolean", validation: (rule) => rule.required().custom((value) => value === true ? true : "Obrigatório para publicar") }),
  ],
});

const post = defineType({
  name: "post", title: "Novidades", type: "document",
  fields: [
    defineField({ name: "title", title: "Título", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Endereço", type: "slug", options: { source: "title" }, validation: (rule) => rule.required() }),
    defineField({ name: "category", title: "Categoria", type: "string", options: { list: ["Publicação", "Treinamento", "Resultado", "Parceria", "Expansão"] } }),
    defineField({ name: "excerpt", title: "Resumo", type: "text", rows: 3, validation: (rule) => rule.max(240) }),
    defineField({ name: "publishedAt", title: "Publicado em", type: "datetime" }),
    defineField({ name: "dateLabel", title: "Rótulo alternativo de data", type: "string" }),
    defineField({ name: "body", title: "Conteúdo", type: "array", of: [defineArrayMember({ type: "block" }), defineArrayMember({ type: "image", options: { hotspot: true } })] }),
  ],
});

const siteSettings = defineType({
  name: "siteSettings", title: "Configurações do site", type: "document",
  fields: [
    defineField({ name: "title", title: "Nome do projeto", type: "string" }),
    defineField({ name: "description", title: "Descrição para buscas", type: "text", rows: 3 }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({ name: "whatsapp", title: "WhatsApp", type: "externalLink" }),
    defineField({ name: "partnerForm", title: "Formulário de parceiros", type: "externalLink" }),
    defineField({ name: "socialLinks", title: "Redes sociais", type: "array", of: [defineArrayMember({ type: "externalLink" })] }),
  ],
});

export const schemaTypes = [externalLink, material, olympiad, metric, partner, department, member, testimonial, post, siteSettings];
