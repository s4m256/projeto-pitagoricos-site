import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { timeline, universities } from "@/lib/content";
import { getMetrics } from "@/lib/sanity";

export const metadata: Metadata = { title: "Impacto", description: "Resultados, alcance e trajetória do Projeto Pitagóricos." };

export default async function ImpactPage() {
  const impactMetrics = await getMetrics();
  return <main id="conteudo"><PageHero eyebrow="Resultados e alcance" title="O que o projeto já alcançou." description="Números informados pelo Projeto Pitagóricos. Metas e alcance potencial aparecem identificados separadamente."/>
    <section className="section"><div className="shell"><div className="metric-cards">{impactMetrics.map((metric) => <article key={metric.label}><strong>{metric.value}</strong><h2>{metric.label}</h2><p>{metric.note}</p></article>)}</div><p className="source-note">Dados fornecidos pelo Projeto Pitagóricos. Números sujeitos a atualização editorial.</p></div></section>
    <section className="dark-section"><div className="shell approvals-grid"><div><p className="eyebrow light">Trajetórias internacionais</p><h2>12 aprovações em universidades e programas de verão no exterior.</h2><p>A seleção ao lado reúne instituições citadas pelo projeto e não representa uma lista exaustiva das aprovações.</p></div><div className="university-list">{universities.map((university) => <span key={university}>{university}</span>)}</div></div></section>
    <section className="section"><div className="shell"><div className="section-heading"><p className="eyebrow">História</p><h2>Principais etapas do projeto.</h2></div><div className="timeline">{timeline.map((item) => <article key={item.year}><span>{item.year}</span><div><h2>{item.title}</h2><p>{item.description}</p></div></article>)}</div></div></section>
    <section className="section section-soft"><div className="shell"><div className="section-heading centered"><p className="eyebrow">Agenda 2030</p><h2>Educação que reduz distâncias.</h2></div><div className="ods-grid"><article><span>ODS 4</span><h2>Educação de qualidade</h2><p>Aprendizagem inclusiva, equitativa e acessível.</p></article><article><span>ODS 10</span><h2>Redução das desigualdades</h2><p>Oportunidades de excelência independentemente da origem.</p></article><article><span>ODS 17</span><h2>Parcerias e implementação</h2><p>Articulação entre estudantes, escolas, redes e instituições.</p></article></div></div></section>
  </main>;
}
