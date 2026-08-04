import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ExternalLink } from "@/components/ExternalLink";
import { assetUrl } from "@/lib/assets";
import { materials, siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projeto Pitagóricos | Olimpíadas científicas",
  description: "Treinamentos gratuitos, materiais e uma comunidade nacional para olimpíadas científicas.",
};

export default function Home() {
  return <main id="conteudo">
    <section className="home-hero">
      <div className="hero-grid-pattern" aria-hidden="true" />
      <div className="shell home-hero-grid">
        <div className="hero-copy">
          <p className="eyebrow light"><span /> Estudo gratuito para olimpíadas científicas</p>
          <h1>Prepare-se para a sua próxima <em>olimpíada.</em></h1>
          <p className="hero-lede">Aulas, materiais e grupos de estudo feitos por estudantes medalhistas. Escolha uma olimpíada e comece pelo que você precisa.</p>
          <div className="hero-actions">
            <Link className="button button-yellow" href="/materiais">Ver materiais <span aria-hidden="true">→</span></Link>
            <Link className="button button-outline-light" href="/estude">Como estudar</Link>
          </div>
          <p className="hero-footnote">OBA <span aria-hidden="true">·</span> OBMEP <span aria-hidden="true">·</span> OBF <span aria-hidden="true">·</span> Canguru <span aria-hidden="true">·</span> ONC</p>
        </div>
        <div className="hero-visual" aria-label="Projeto Pitagóricos">
          <div className="logo-core"><div className="logo-glow" /><Image src={assetUrl("/logo-rocket.png")} width={520} height={520} alt="Foguete, símbolo do Projeto Pitagóricos" priority /></div>
          <p className="home-logo-caption">De alunos para alunos, desde 2022.</p>
        </div>
      </div>
    </section>

    <section className="section"><div className="shell"><div className="split-heading"><div><p className="eyebrow">Comece por aqui</p><h2>O que você procura?</h2></div><p>O site tem dois caminhos principais: estudar para uma olimpíada ou conhecer o programa para escolas e redes.</p></div>
      <div className="journey-grid">
        <article className="journey-card student"><div className="journey-icon" aria-hidden="true">π</div><p className="card-kicker">Sou estudante</p><h3>Quero estudar para uma olimpíada.</h3><p>Veja as olimpíadas atendidas, encontre materiais e organize uma rotina de estudo.</p><ul><li>Conteúdo gratuito</li><li>Materiais por área e nível</li><li>Grupo para dúvidas e avisos</li></ul><Link className="text-link" href="/estude">Escolher uma olimpíada <span aria-hidden="true">→</span></Link></article>
        <article className="journey-card partner"><div className="journey-icon" aria-hidden="true">✦</div><p className="card-kicker">Represento uma instituição</p><h3>Quero levar o projeto para uma escola ou rede.</h3><p>Conheça o formato de trabalho, os materiais disponíveis e as possibilidades de parceria.</p><ul><li>Atuação complementar às aulas</li><li>Implementação por etapas</li><li>Acompanhamento do programa</li></ul><Link className="text-link light-link" href="/parceiros">Entender como funciona <span aria-hidden="true">→</span></Link></article>
      </div>
    </div></section>

    <section className="section section-soft"><div className="shell"><div className="split-heading align-end"><div><p className="eyebrow">Materiais</p><h2>Escolhas para começar a estudar.</h2></div><Link className="text-link" href="/materiais">Ver o catálogo completo <span aria-hidden="true">→</span></Link></div><div className="featured-materials">{materials.filter((item) => item.featured).map((item) => <article key={item.id} className="featured-card"><div className="material-meta"><span>{item.olympiad}</span><span>{item.type}</span></div><h3>{item.title}</h3><p>{item.description}</p><span className="pending-link">Link em atualização</span></article>)}</div></div></section>

    <section className="section"><div className="shell home-about"><div><p className="eyebrow">Sobre o projeto</p><h2>Estudantes que ajudam outros estudantes.</h2></div><div><p>O Pitagóricos começou em 2022. A equipe reúne jovens com experiência em olimpíadas para produzir materiais, organizar treinamentos e compartilhar o que aprendeu.</p><p>Os resultados e os números completos ficam reunidos em uma única página, com o contexto de cada informação.</p><div className="home-about-links"><Link className="text-link" href="/sobre">Conhecer a equipe <span aria-hidden="true">→</span></Link><Link className="text-link" href="/impacto">Ver resultados <span aria-hidden="true">→</span></Link></div></div></div></section>

    <section className="final-cta"><div className="shell final-cta-inner"><div><p className="eyebrow light">Próximo passo</p><h2>Escolha uma olimpíada e comece.</h2></div><div><Link className="button button-yellow" href="/materiais">Ver materiais</Link><Link className="button button-outline-light" href="/parceiros">Falar sobre parceria</Link><ExternalLink className="text-link light-link" href={siteConfig.whatsappUrl} eventName="whatsapp_click">Entrar no WhatsApp</ExternalLink></div></div></section>
  </main>;
}
