import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { getPosts } from "@/lib/sanity";

export const metadata: Metadata = { title: "Novidades", description: "Lançamentos, treinamentos, resultados e expansão do Projeto Pitagóricos." };

export default async function NewsPage() {
  const news = await getPosts();
  return <main id="conteudo"><PageHero eyebrow="Novidades" title="O que está acontecendo no projeto." description="Materiais, treinamentos, resultados e novas parcerias."/><section className="section"><div className="shell news-grid">{news.map((post, index) => <article key={post.title} className={index === 0 ? "news-card featured-news" : "news-card"}><div className="news-meta"><span>{post.category}</span><time>{post.date}</time></div><h2>{post.title}</h2><p>{post.excerpt}</p><span className="pending-link">Mais informações em breve</span></article>)}</div></section></main>;
}
