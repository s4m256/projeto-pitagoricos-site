import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { getDepartments, getMembers } from "@/lib/sanity";

export const metadata: Metadata = { title: "Sobre e equipe", description: "Conheça a história, os departamentos e a equipe do Projeto Pitagóricos." };

export default async function AboutPage() {
  const [departments, members] = await Promise.all([getDepartments(), getMembers()]);
  return <main id="conteudo"><PageHero eyebrow="Desde 2022" title="Uma comunidade criada por quem acredita no poder da oportunidade." description="Jovens medalhistas transformam conhecimento em caminhos possíveis para estudantes de todo o Brasil."/>
    <section className="section"><div className="shell story-grid"><div><p className="eyebrow">Por que existimos</p><h2>O talento está igualmente distribuído. As oportunidades, não.</h2></div><div><p>O Pitagóricos nasceu para reduzir essa distância. O projeto conecta estudantes a treinamentos, materiais, comunidades e referências que muitas vezes ficam restritos a instituições com maior capacidade de investimento.</p><p>O resultado é uma rede em que estudantes aprendem, avançam e retornam para formar a próxima geração.</p></div></div></section>
    <section className="section section-soft"><div className="shell"><div className="section-heading"><p className="eyebrow">Nossos departamentos</p><h2>Especialidades diferentes. Uma missão comum.</h2></div><div className="department-grid">{departments.map((department) => <article key={department.name}><span>{department.symbol}</span><h2>{department.name}</h2><p>{department.description}</p></article>)}</div></div></section>
    <section className="section"><div className="shell team-section"><div className="section-heading centered"><p className="eyebrow">Nossa equipe</p><h2>51 voluntários movidos pela ciência.</h2><p>{members.length ? "Conheça os membros com perfis autorizados para publicação." : "Os perfis individuais serão publicados após o recebimento dos dados e dos consentimentos necessários."}</p></div>{members.length > 0 && <div className="member-grid">{members.map((member) => <article key={member.id}>{member.photoUrl ? <Image src={member.photoUrl} width={160} height={160} alt={`Foto de ${member.name}`}/> : <div className="member-initial" aria-hidden="true">{member.name.charAt(0)}</div>}<span>{member.department}</span><h2>{member.name}</h2><strong>{member.role}</strong><p>{member.bio}</p>{member.achievement && <small>{member.achievement}</small>}</article>)}</div>}<div className="consent-notice"><span aria-hidden="true">✓</span><div><strong>Privacidade faz parte do projeto.</strong><p>Nenhum perfil será publicado sem consentimento registrado. Para menores, também será necessária a autorização do responsável.</p></div></div></div></section>
    <section className="dark-section"><div className="shell quote-block"><blockquote>“De alunos para alunos” não é apenas uma frase. É um ciclo em que cada conquista abre caminho para a próxima pessoa.</blockquote><p>Modelo de protagonismo estudantil do Projeto Pitagóricos</p></div></section>
  </main>;
}
