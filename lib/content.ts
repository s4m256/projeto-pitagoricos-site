export type Material = {
  id: string;
  title: string;
  description: string;
  area: string;
  olympiad: string;
  level: string;
  type: string;
  href?: string;
  featured?: boolean;
};

export type Metric = {
  value: string;
  label: string;
  note?: string;
};

export type Department = { name: string; symbol: string; description: string };
export type Post = { date: string; category: string; title: string; excerpt: string };
export type Member = { id: string; name: string; role: string; department: string; bio: string; achievement?: string; photoUrl?: string };

export const siteConfig = {
  name: "Projeto Pitagóricos",
  description:
    "Formação gratuita para olimpíadas científicas, feita de estudantes para estudantes.",
  whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL || "",
  partnerFormUrl: process.env.NEXT_PUBLIC_PARTNER_FORM_URL || "",
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
  youtubeUrl: process.env.NEXT_PUBLIC_YOUTUBE_URL || "",
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "",
};

export const navigation = [
  { href: "/estude", label: "Estude" },
  { href: "/materiais", label: "Materiais" },
  { href: "/impacto", label: "Impacto" },
  { href: "/parceiros", label: "Escolas e parceiros" },
  { href: "/sobre", label: "Sobre e equipe" },
  { href: "/novidades", label: "Novidades" },
];

export const metrics: Metric[] = [
  { value: "+10 mil", label: "pessoas impactadas", note: "diretamente" },
  { value: "+50 mi", label: "visualizações", note: "em plataformas digitais" },
  { value: "27", label: "estados alcançados", note: "presença nacional" },
  { value: "+1.013", label: "medalhas nacionais", note: "entre membros e alunos" },
  { value: "14", label: "medalhas internacionais" },
  { value: "51", label: "voluntários", note: "de alunos para alunos" },
];

export const pillars = [
  {
    number: "01",
    title: "Formação integral",
    description:
      "Excelência acadêmica combinada a liderança, orientação e impacto social.",
  },
  {
    number: "02",
    title: "Acesso real",
    description:
      "Conteúdo gratuito, materiais para uso offline e alcance em escolas públicas e privadas.",
  },
  {
    number: "03",
    title: "Protagonismo estudantil",
    description:
      "Jovens medalhistas transformam experiência em formação para outros estudantes.",
  },
  {
    number: "04",
    title: "Tecnologia com propósito",
    description:
      "LaTeX, vídeo e colaboração digital para ampliar a qualidade e a escala do ensino.",
  },
];

export const olympiads = [
  { abbr: "OBA", name: "Astronomia e Astronáutica", area: "Astronomia" },
  { abbr: "OBMEP", name: "Matemática das Escolas Públicas", area: "Matemática" },
  { abbr: "OBF", name: "Física", area: "Física" },
  { abbr: "Canguru", name: "Matemática sem Fronteiras", area: "Matemática" },
  { abbr: "ONC", name: "Olimpíada Nacional de Ciências", area: "Ciências" },
  { abbr: "INT", name: "Seletivas internacionais", area: "Avançado" },
];

export const materials: Material[] = [
  {
    id: "obf-revisao",
    title: "Revisão completa para a OBF",
    description: "Roteiro de preparação com teoria, exercícios e revisão orientada.",
    area: "Física",
    olympiad: "OBF",
    level: "Ensino médio",
    type: "E-book",
    featured: true,
  },
  {
    id: "questoes-comentadas",
    title: "Questões comentadas de olimpíadas científicas",
    description: "Seleção comentada desenvolvida em parceria com o Inesp.",
    area: "Multidisciplinar",
    olympiad: "ONC",
    level: "Fundamental II e médio",
    type: "E-book",
    featured: true,
  },
  {
    id: "oba-trilha",
    title: "Trilha de astronomia para a OBA",
    description: "Sequência de estudo para começar e avançar com autonomia.",
    area: "Astronomia",
    olympiad: "OBA",
    level: "Todos os níveis",
    type: "Trilha",
    featured: true,
  },
  {
    id: "obmep-simulado",
    title: "Simulado de matemática olímpica",
    description: "Questões organizadas por dificuldade para testar sua preparação.",
    area: "Matemática",
    olympiad: "OBMEP",
    level: "Fundamental II",
    type: "Simulado",
  },
  {
    id: "canguru-problemas",
    title: "Problemas selecionados - Canguru",
    description: "Problemas de raciocínio com orientação de estudo.",
    area: "Matemática",
    olympiad: "Canguru",
    level: "Todos os níveis",
    type: "Lista",
  },
  {
    id: "onc-aulas",
    title: "Aulas intensivas para a ONC",
    description: "Conteúdo interdisciplinar para a Olimpíada Nacional de Ciências.",
    area: "Multidisciplinar",
    olympiad: "ONC",
    level: "Ensino médio",
    type: "Aula",
  },
];

export const departments: Department[] = [
  { name: "Física", symbol: "F", description: "Teoria, experimentação e preparação para OBF e seletivas." },
  { name: "Matemática", symbol: "π", description: "Resolução de problemas, provas e pensamento lógico." },
  { name: "Astronomia", symbol: "✦", description: "OBA, astronomia observacional e seletivas internacionais." },
  { name: "Biologia", symbol: "B", description: "Ciências da vida, investigação e preparação olímpica." },
  { name: "Química", symbol: "Q", description: "Fundamentos, experimentação e problemas avançados." },
  { name: "História", symbol: "H", description: "Leitura crítica, pesquisa e olimpíadas de humanas." },
  { name: "Mídias", symbol: "▶", description: "Comunicação científica, comunidade e produção audiovisual." },
];

export const timeline = [
  { year: "2022", title: "O projeto nasce", description: "Uma rede estudantil criada para democratizar a preparação olímpica." },
  { year: "2023", title: "Alcance nacional", description: "Comunidades e treinamentos passam a alcançar estudantes dos 27 estados." },
  { year: "2024", title: "Parceria com o Inesp", description: "Publicação e distribuição do e-book Questões Comentadas no Ceará." },
  { year: "Agora", title: "Próximos passos", description: "Planejamento de núcleos presenciais, formação em redes públicas e uma plataforma própria." },
];

export const universities = [
  "Duke University",
  "UC Berkeley",
  "Brown University",
  "Georgia Tech",
  "University of Hong Kong",
  "University of Korea",
  "Northwestern University",
  "Harvard University",
  "Oxford University",
];

export const posts: Post[] = [
  {
    date: "23 nov 2024",
    category: "Publicação",
    title: "Questões comentadas chega à Feira de Ciências e Tecnologia do Ceará",
    excerpt: "O e-book desenvolvido pelo Pitagóricos foi lançado com apoio do Inesp.",
  },
  {
    date: "Ciclo 2024",
    category: "Treinamento",
    title: "Preparação intensiva mobiliza mais de 400 estudantes para a OBF",
    excerpt: "Aulas, revisões e materiais completos reunidos em uma jornada gratuita.",
  },
  {
    date: "Próxima etapa",
    category: "Expansão",
    title: "Domingos Mourão será ponto de partida para os núcleos presenciais",
    excerpt: "O plano piloto considera um município com 1.132 matrículas na educação básica.",
  },
];
