"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import type { OlympiadPage as OlympiadPageData } from "@/lib/database.types";
import { LEVEL_MAPPING_YEAR, grades, getOlympiadLevel } from "@/lib/olympiad-levels";

const defaults: Record<string, OlympiadPageData> = {
  oba: { slug: "oba", name: "OBA", short_description: "Astronomia e astronáutica para estudantes do Ensino Fundamental e Médio.", intro: "Uma porta de entrada para estudar o céu, o espaço e a tecnologia espacial.", how_it_works: "Descubra seu nível e avance por temas, prática, simulados e leitura do manual oficial.", how_to_study: "Comece pelos conceitos, resolva questões e use simulados para revisar o que precisa de atenção.", published: true, updated_by: null, updated_at: "" },
  obmep: { slug: "obmep", name: "OBMEP", short_description: "Problemas de matemática que valorizam raciocínio e estratégia.", intro: "A preparação atual prioriza problemas e o treinamento para a segunda fase.", how_it_works: "Escolha o nível da sua série e treine explicando cada etapa da solução.", how_to_study: "Resolva problemas com tempo, compare estratégias e refaça aqueles em que travou.", published: true, updated_by: null, updated_at: "" },
  onc: { slug: "onc", name: "ONC", short_description: "Uma olimpíada interdisciplinar de ciências.", intro: "O ponto de partida é identificar o nível correto e organizar uma revisão integrada.", how_it_works: "O nível depende da série; a preparação combina diferentes áreas das ciências.", how_to_study: "Use um guia interdisciplinar e alterne teoria, questões e revisão dos erros.", published: true, updated_by: null, updated_at: "" },
};
export function OlympiadPage({ slug }: { slug: "oba" | "obmep" | "onc" }) {
  const [content, setContent] = useState(defaults[slug]); const client = getSupabaseBrowserClient();
  useEffect(() => { if (!client) return; client.from("olympiad_pages").select("*").eq("slug", slug).eq("published", true).maybeSingle().then(({ data }) => { if (data) setContent(data); }); }, [client, slug]);
  const code = slug.toUpperCase();
  return <main id="conteudo"><section className="olympiad-hero"><div className="shell"><p className="eyebrow light">Olimpíada científica</p><span className="olympiad-badge">{code}</span><h1>{content.short_description}</h1><p>{content.intro}</p><div className="hero-actions"><Link className="button button-yellow" href={`/materiais?olimpiada=${code}`}>Ver materiais publicados</Link><Link className="button button-outline-light" href="/comece">Descobrir meu caminho</Link></div></div></section>
    <section className="section"><div className="shell olympiad-content-grid"><article><p className="eyebrow">Como funciona</p><h2>Entenda antes de começar.</h2><p>{content.how_it_works}</p></article><article><p className="eyebrow">Como estudar</p><h2>Construa uma rotina possível.</h2><p>{content.how_to_study}</p></article></div></section>
    <section className="section section-soft"><div className="shell"><div className="section-heading"><p className="eyebrow">Níveis verificados para {LEVEL_MAPPING_YEAR}</p><h2>Descubra seu nível.</h2></div><div className="level-grid">{grades.map((grade) => <div key={grade.value}><span>{grade.label}</span><strong>{getOlympiadLevel(code, grade.value)}</strong></div>)}</div></div></section>
    {slug === "oba" && <section className="section"><div className="shell pathway"><h2>Trilha temática</h2><ol><li>Aprendizado</li><li>Prática</li><li>Simulados</li><li>Manual</li></ol></div></section>}
    {slug === "obmep" && <section className="section"><div className="shell pathway"><h2>Treinamento por problemas</h2><p>Foco especial na preparação para a segunda fase, com prática escrita e simulados.</p></div></section>}
    {slug === "onc" && <section className="section"><div className="shell pathway"><h2>Nível primeiro, guia depois</h2><p>Identifique sua faixa e siga uma preparação interdisciplinar.</p></div></section>}
  </main>;
}
