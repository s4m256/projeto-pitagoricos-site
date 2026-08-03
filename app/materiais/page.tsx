import type { Metadata } from "next";
import { MaterialCatalog } from "@/components/MaterialCatalog";
import { PageHero } from "@/components/PageHero";
import { getMaterials } from "@/lib/sanity";

export const metadata: Metadata = { title: "Materiais", description: "E-books, trilhas, simulados e aulas para olimpíadas científicas." };

export default async function MaterialsPage() {
  const items = await getMaterials();
  return <main id="conteudo"><PageHero eyebrow="Biblioteca aberta" title="Conhecimento para baixar, estudar e compartilhar." description="Filtre por área, olimpíada e formato. Os links oficiais serão ativados assim que forem fornecidos pela equipe."/><section className="section"><div className="shell"><MaterialCatalog materials={items}/></div></section><section className="section section-soft"><div className="shell compact-callout"><div><p className="eyebrow">Acesso real</p><h2>Sem conexão contínua? Sem problema.</h2></div><p>Os materiais são pensados para download e uso offline, ampliando o acesso em regiões com conectividade limitada.</p></div></section></main>;
}
