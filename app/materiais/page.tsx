import type { Metadata } from "next";
import { Suspense } from "react";
import { MaterialCatalog } from "@/components/MaterialCatalog";
import { PageHero } from "@/components/PageHero";
export const metadata: Metadata = { title: "Materiais", description: "Materiais gratuitos organizados por matéria, olimpíada, nível, objetivo e tipo.", alternates: { canonical: "/materiais" } };
export default function MaterialsPage() { return <main id="conteudo"><PageHero eyebrow="Biblioteca gratuita" title="Estude por matéria, no seu ritmo." description="A matéria é o ponto de partida. Depois, refine por olimpíada, nível, objetivo ou tipo de conteúdo."/><section className="section"><div className="shell"><Suspense fallback={<p>Carregando catálogo…</p>}><MaterialCatalog /></Suspense></div></section></main>; }
