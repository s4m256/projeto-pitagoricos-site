import type { Metadata } from "next";
import { StartGuide } from "@/components/StartGuide";
import { PageHero } from "@/components/PageHero";
export const metadata: Metadata = { title: "Comece aqui", description: "Descubra uma olimpíada científica compatível com sua série e seus interesses.", alternates: { canonical: "/comece" } };
export default function StartPage() { return <main id="conteudo"><PageHero eyebrow="Comece sem login" title="Qual olimpíada combina com você?" description="Responda duas perguntas. Nada será salvo e você receberá uma recomendação explicável." /><section className="section"><div className="shell"><StartGuide /></div></section></main>; }
