import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ExternalLink } from "@/components/ExternalLink";
import { assetUrl } from "@/lib/assets";
import { materials, metrics, posts, siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Olimpíadas científicas",
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

    <section className="impact-strip"><div className="shell impact-strip-grid">{metrics.slice(0, 3).map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div><div className="shell impact-strip-link"><Link href="/impacto">Ver resultados com contexto <span aria-hidden="true">→</span></Link></div></section>

    <section className="section home-story"><div className="shell home-about"><div><p className="eyebrow light">Sobre o projeto</p><h2>Estudantes que ajudam outros estudantes.</h2></div><div><p>O Pitagóricos começou em 2022. A equipe reúne jovens com experiência em olimpíadas para produzir materiais, organizar treinamentos e compartilhar o que aprendeu.</p><p>O projeto também trabalha com escolas e instituições para ampliar o acesso à preparação olímpica.</p><div className="home-about-links"><Link className="text-link light-link" href="/sobre">Conhecer a história <span aria-hidden="true">→</span></Link><Link className="text-link light-link" href="/parceiros">Escolas e parceiros <span aria-hidden="true">→</span></Link></div></div></div></section>

    <section className="section home-materials"><div className="shell"><div className="split-heading align-end"><div><p className="eyebrow light">Materiais</p><h2>Escolhas para começar a estudar.</h2></div><Link className="text-link light-link" href="/materiais">Ver o catálogo completo <span aria-hidden="true">→</span></Link></div><div className="featured-materials">{materials.filter((item) => item.featured).map((item) => <article key={item.id} className="featured-card"><div className="material-meta"><span>{item.olympiad}</span><span>{item.type}</span></div><h3>{item.title}</h3><p>{item.description}</p><span className="pending-link">Link em atualização</span></article>)}</div></div></section>

    <section className="section home-news"><div className="shell"><div className="split-heading align-end"><div><p className="eyebrow light">Notícias</p><h2>Novidades do projeto.</h2></div><Link className="text-link light-link" href="/novidades">Ver todas <span aria-hidden="true">→</span></Link></div><div className="home-news-grid">{posts.slice(0, 3).map((post) => <article key={post.title}><div><span>{post.category}</span><time>{post.date}</time></div><h3>{post.title}</h3><p>{post.excerpt}</p></article>)}</div></div></section>

    <section className="final-cta"><div className="shell final-cta-inner"><div><p className="eyebrow light">Área do aluno</p><h2>Comece e acompanhe seu progresso.</h2></div><div><Link className="button button-yellow" href="/area-do-aluno">Abrir minha área</Link><Link className="button button-outline-light" href="/materiais">Ver materiais</Link><ExternalLink className="text-link light-link" href={siteConfig.whatsappUrl} eventName="whatsapp_click">Entrar no WhatsApp</ExternalLink></div></div></section>
  </main>;
}
