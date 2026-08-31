import type { Metadata } from "next"; import { OlympiadPage } from "@/components/OlympiadPage";
export const metadata: Metadata = { title: "OBA", description: "Níveis, preparação e materiais para a OBA.", alternates: { canonical: "/olimpiadas/oba" } }; export default function Page() { return <OlympiadPage slug="oba" />; }
