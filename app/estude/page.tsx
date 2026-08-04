import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "@/components/ExternalLink";
import { PageHero } from "@/components/PageHero";
import { olympiads, siteConfig } from "@/lib/content";

export const metadata: Metadata = { title: "Estude", description: "Prepare-se gratuitamente para as principais olimpíadas científicas." };

export default function StudyPage() {
  return <main id="conteudo"><PageHero eyebrow="Para estudantes" title="Escolha uma olimpíada e comece a estudar." description="Reunimos materiais e treinamentos gratuitos para quem está começando e para quem já participa de competições."><Link className="button button-yellow" href="/materiais">Ver materiais</Link><ExternalLink className="button button-outline-light" href={siteConfig.whatsappUrl} eventName="whatsapp_click">Entrar no WhatsApp</ExternalLink></PageHero>
    <section className="section"><div className="shell"><div className="section-heading"><p className="eyebrow">Escolha sua rota</p><h2>Uma preparação para cada desafio.</h2><p>Do primeiro contato ao alto rendimento, organize os estudos no seu ritmo.</p></div><div className="olympiad-grid">{olympiads.map((item) => <article key={item.abbr}><span className="olympiad-abbr">{item.abbr}</span><h2>{item.name}</h2><p>{item.area}</p><Link href={`/materiais?olimpiada=${encodeURIComponent(item.abbr)}`} className="text-link">Ver preparação <span aria-hidden="true">→</span></Link></article>)}</div></div></section>
    <section className="section section-soft"><div className="shell"><div className="section-heading centered"><p className="eyebrow">Como organizar o estudo</p><h2>Um passo de cada vez.</h2></div><ol className="steps-grid"><li><span>1</span><h3>Escolha uma olimpíada</h3><p>Confira o nível, o formato da prova e as datas.</p></li><li><span>2</span><h3>Separe o conteúdo</h3><p>Combine teoria, listas, aulas e simulados.</p></li><li><span>3</span><h3>Resolva problemas</h3><p>Anote os erros e retome o que precisa de revisão.</p></li><li><span>4</span><h3>Tire dúvidas</h3><p>Converse com outros estudantes na comunidade.</p></li></ol></div></section>
    <section className="dark-section"><div className="shell callout-grid"><div><p className="eyebrow light">Preparação de alto nível</p><h2>Para a OBF, foram mais de 20 horas de aulas.</h2></div><div><p>O ciclo reuniu material de revisão com 160 páginas, e-books geral e experimental e mais de 400 inscritos.</p><Link className="button button-yellow" href="/materiais">Encontrar meu material</Link></div></div></section>
  </main>;
}
