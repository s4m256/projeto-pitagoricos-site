import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { getPosts } from "@/lib/sanity";

export const metadata: Metadata = { title: "Novidades", description: "Lançamentos, treinamentos, resultados e expansão do Projeto Pitagóricos." };

export default async function NewsPage() {
  const news = await getPosts();
  return <main id="conteudo"><PageHero eyebrow="Diário de bordo" title="Novas conquistas, materiais e caminhos." description="Acompanhe os principais movimentos da comunidade Pitagóricos."/><section className="section"><div className="shell news-grid">{news.map((post, index) => <article key={post.title} className={index === 0 ? "news-card featured-news" : "news-card"}><div className="news-meta"><span>{post.category}</span><time>{post.date}</time></div><h2>{post.title}</h2><p>{post.excerpt}</p><span className="pending-link">Publicação completa em breve</span></article>)}</div></section><section className="section section-soft"><div className="shell compact-callout"><div><p className="eyebrow">Conteúdo editorial</p><h2>Pronto para o painel da equipe.</h2></div><p>Lançamentos, treinamentos, resultados e parcerias estão modelados para publicação pelo Sanity Studio assim que o projeto for conectado.</p></div></section></main>;
}
