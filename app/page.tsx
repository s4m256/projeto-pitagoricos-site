import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ExternalLink } from "@/components/ExternalLink";
import { departments, materials, metrics, pillars, siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projeto Pitagóricos | Ciência ao alcance de todos",
  description: "Treinamentos gratuitos, materiais e uma comunidade nacional para olimpíadas científicas.",
};

export default function Home() {
  return <main id="conteudo">
    <section className="home-hero">
      <div className="hero-grid-pattern" aria-hidden="true" />
      <div className="orbit orbit-a" aria-hidden="true" /><div className="orbit orbit-b" aria-hidden="true" />
      <div className="shell home-hero-grid">
        <div className="hero-copy">
          <p className="eyebrow light"><span /> Educação científica, de alunos para alunos</p>
          <h1>Talento está em todo lugar. <em>Oportunidade também deve estar.</em></h1>
          <p className="hero-lede">Treinamentos gratuitos, materiais completos e uma comunidade nacional para quem quer ir mais longe nas olimpíadas científicas.</p>
          <div className="hero-actions">
            <Link className="button button-yellow" href="/estude">Começar a estudar <span aria-hidden="true">→</span></Link>
            <Link className="button button-outline-light" href="/parceiros">Levar à minha escola ou rede</Link>
          </div>
          <p className="hero-footnote"><span aria-hidden="true">✓</span> Conteúdo gratuito <span aria-hidden="true">·</span> Presença nos 27 estados</p>
        </div>
        <div className="hero-visual" aria-label="Projeto Pitagóricos conecta estudantes à ciência">
          <div className="visual-orbit orbit-one"><span>OBF</span><span>OBA</span><span>ONC</span></div>
          <div className="visual-orbit orbit-two"><span>π</span><span>✦</span></div>
          <div className="logo-core"><div className="logo-glow" /><Image src="/logo-pitagoricos.png" width={360} height={360} alt="Logotipo do Projeto Pitagóricos" priority /></div>
          <div className="floating-card card-impact"><strong>+10 mil</strong><span>estudantes impactados</span></div>
          <div className="floating-card card-medals"><strong>+1.013</strong><span>medalhas nacionais</span></div>
        </div>
      </div>
    </section>

    <section className="metric-band" aria-label="Números do projeto"><div className="shell metric-grid">{metrics.slice(0, 4).map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span><small>{metric.note}</small></div>)}</div></section>

    <section className="section"><div className="shell"><div className="split-heading"><div><p className="eyebrow">Uma rede, duas jornadas</p><h2>Encontre o seu próximo passo.</h2></div><p>O mesmo ecossistema que prepara estudantes ajuda escolas e redes públicas a identificar e desenvolver talentos.</p></div>
      <div className="journey-grid">
        <article className="journey-card student"><div className="journey-icon" aria-hidden="true">π</div><p className="card-kicker">Para estudantes</p><h3>Prepare-se para a sua próxima olimpíada.</h3><p>Aulas, e-books, simulados e orientação produzidos por quem já percorreu esse caminho.</p><ul><li>OBA, OBMEP, OBF, Canguru e ONC</li><li>Materiais para estudar offline</li><li>Comunidade para tirar dúvidas</li></ul><Link className="text-link" href="/estude">Quero começar <span aria-hidden="true">→</span></Link></article>
        <article className="journey-card partner"><div className="journey-icon" aria-hidden="true">✦</div><p className="card-kicker">Para escolas e redes</p><h3>Transforme potencial em trajetória.</h3><p>Uma metodologia escalável para olimpíadas, pesquisa, carreira, liderança e inovação.</p><ul><li>Implementação gradual e acompanhada</li><li>Materiais de alto padrão</li><li>Indicadores para prestação de contas</li></ul><Link className="text-link light-link" href="/parceiros">Conhecer o programa <span aria-hidden="true">→</span></Link></article>
      </div>
    </div></section>

    <section className="section section-soft"><div className="shell"><div className="section-heading centered"><p className="eyebrow">Nosso jeito de fazer</p><h2>Excelência que inclui.</h2><p>Quatro princípios transformam experiência olímpica em oportunidade compartilhada.</p></div><div className="pillar-grid">{pillars.map((pillar) => <article key={pillar.number}><span>{pillar.number}</span><h3>{pillar.title}</h3><p>{pillar.description}</p></article>)}</div></div></section>

    <section className="section"><div className="shell"><div className="split-heading align-end"><div><p className="eyebrow">Comece por aqui</p><h2>Materiais em destaque.</h2></div><Link className="text-link" href="/materiais">Ver todos os materiais <span aria-hidden="true">→</span></Link></div><div className="featured-materials">{materials.filter((item) => item.featured).map((item, index) => <article key={item.id} className="featured-card"><div className="featured-number">0{index + 1}</div><div className="material-meta"><span>{item.olympiad}</span><span>{item.type}</span></div><h3>{item.title}</h3><p>{item.description}</p><span className="pending-link">Link em atualização</span></article>)}</div></div></section>

    <section className="dark-section"><div className="shell department-layout"><div><p className="eyebrow light">Conhecimento em movimento</p><h2>Sete áreas. Uma só comunidade.</h2><p>Medalhistas nacionais e internacionais trabalham juntos para transformar conteúdo avançado em aprendizagem acessível.</p><Link className="button button-yellow" href="/sobre">Conheça nossa equipe</Link></div><div className="department-cloud">{departments.map((department) => <div key={department.name}><span>{department.symbol}</span>{department.name}</div>)}</div></div></section>

    <section className="section"><div className="shell partnership-feature"><div className="partnership-copy"><p className="eyebrow">Parceria em destaque</p><h2>Conhecimento que chega mais longe.</h2><p>Com o apoio do Inesp, o e-book <em>Questões Comentadas de Olimpíadas Científicas</em> ganhou edição profissional e potencial de distribuição para até 700 mil estudantes cearenses.</p><p className="context-note">700 mil é o alcance potencial da parceria no Ceará.</p><Link className="text-link" href="/impacto">Veja nosso impacto <span aria-hidden="true">→</span></Link></div><div className="book-visual" aria-hidden="true"><span>PROJETO PITAGÓRICOS</span><strong>Questões<br/>comentadas</strong><small>Olimpíadas científicas</small><div>π</div></div></div></section>

    <section className="final-cta"><div className="shell final-cta-inner"><div><p className="eyebrow light">Pronto para a próxima descoberta?</p><h2>A ciência muda trajetórias.<br/>Comece hoje.</h2></div><div><Link className="button button-yellow" href="/estude">Quero estudar</Link><Link className="button button-outline-light" href="/parceiros">Quero ser parceiro</Link><ExternalLink className="text-link light-link" href={siteConfig.whatsappUrl} eventName="whatsapp_click">Entrar na comunidade</ExternalLink></div></div></section>
  </main>;
}
