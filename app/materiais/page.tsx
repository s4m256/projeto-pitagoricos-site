import type { Metadata } from "next";
import { MaterialCatalog } from "@/components/MaterialCatalog";
import { PageHero } from "@/components/PageHero";
import { getMaterials } from "@/lib/sanity";

export const metadata: Metadata = { title: "Materiais", description: "E-books, trilhas, simulados e aulas para olimpíadas científicas." };

export default async function MaterialsPage() {
  const items = await getMaterials();
  return <main id="conteudo"><PageHero eyebrow="Materiais gratuitos" title="Encontre o conteúdo que você precisa." description="Use os filtros para escolher uma área, olimpíada ou tipo de material. Os links oficiais serão adicionados pela equipe."/><section className="section"><div className="shell"><MaterialCatalog materials={items}/></div></section><section className="section section-soft"><div className="shell compact-callout"><div><p className="eyebrow">Uso offline</p><h2>Baixe para estudar quando quiser.</h2></div><p>Os arquivos podem ser usados sem conexão contínua, inclusive em sala de aula ou em grupos de estudo.</p></div></section></main>;
}
