import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { StudentProgress } from "@/components/StudentProgress";

export const metadata: Metadata = { title: "Área do aluno", description: "Organize seus primeiros passos de estudo para olimpíadas científicas." };

export default function StudentAreaPage() {
  return <main id="conteudo">
    <PageHero eyebrow="Área do aluno" title="Organize seu começo." description="Marque os primeiros passos da sua preparação. Tudo fica salvo apenas neste aparelho." />
    <section className="section student-area"><div className="shell student-area-grid">
      <StudentProgress />
      <aside className="student-next"><p className="eyebrow">Continue estudando</p><h2>Encontre sua olimpíada.</h2><p>O catálogo reúne materiais por área, prova, nível e formato.</p><Link className="button button-yellow" href="/materiais">Abrir materiais</Link><Link className="text-link" href="/estude">Ver como organizar os estudos <span aria-hidden="true">→</span></Link></aside>
    </div></section>
  </main>;
}
