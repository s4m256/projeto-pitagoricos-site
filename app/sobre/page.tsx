import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { getDepartments, getMembers } from "@/lib/sanity";

export const metadata: Metadata = { title: "Sobre e equipe", description: "Conheça a história, os departamentos e a equipe do Projeto Pitagóricos." };

export default async function AboutPage() {
  const [departments, members] = await Promise.all([getDepartments(), getMembers()]);
  return <main id="conteudo"><PageHero eyebrow="Desde 2022" title="Um projeto feito por estudantes." description="Jovens com experiência em olimpíadas produzem materiais e ajudam outros estudantes a se preparar."/>
    <section className="section"><div className="shell story-grid"><div><p className="eyebrow">Por que existimos</p><h2>Nem todo estudante encontra apoio para começar.</h2></div><div><p>O Pitagóricos nasceu para reunir, de forma gratuita, materiais, treinamentos e pessoas com experiência em olimpíadas científicas.</p><p>Quem já participou ajuda quem está chegando. Esse é o centro do projeto.</p></div></div></section>
    <section className="section section-soft"><div className="shell"><div className="section-heading"><p className="eyebrow">Áreas de trabalho</p><h2>Quem produz os materiais e treinamentos.</h2></div><div className="department-grid">{departments.map((department) => <article key={department.name}><span>{department.symbol}</span><h2>{department.name}</h2><p>{department.description}</p></article>)}</div></div></section>
    <section className="section"><div className="shell team-section"><div className="section-heading centered"><p className="eyebrow">Nossa equipe</p><h2>51 voluntários movidos pela ciência.</h2><p>{members.length ? "Conheça os membros com perfis autorizados para publicação." : "Os perfis individuais serão publicados após o recebimento dos dados e dos consentimentos necessários."}</p></div>{members.length > 0 && <div className="member-grid">{members.map((member) => <article key={member.id}>{member.photoUrl ? <Image src={member.photoUrl} width={160} height={160} alt={`Foto de ${member.name}`}/> : <div className="member-initial" aria-hidden="true">{member.name.charAt(0)}</div>}<span>{member.department}</span><h2>{member.name}</h2><strong>{member.role}</strong><p>{member.bio}</p>{member.achievement && <small>{member.achievement}</small>}</article>)}</div>}<div className="consent-notice"><span aria-hidden="true">✓</span><div><strong>Privacidade faz parte do projeto.</strong><p>Nenhum perfil será publicado sem consentimento registrado. Para menores, também será necessária a autorização do responsável.</p></div></div></div></section>
    <section className="dark-section"><div className="shell quote-block"><blockquote>Quem já participou de uma olimpíada ajuda quem está começando.</blockquote><p>De alunos para alunos</p></div></section>
  </main>;
}
