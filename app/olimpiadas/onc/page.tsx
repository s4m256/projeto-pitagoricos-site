import type { Metadata } from "next"; import { OlympiadPage } from "@/components/OlympiadPage";
export const metadata: Metadata = { title: "ONC", description: "Níveis, preparação e materiais para a ONC.", alternates: { canonical: "/olimpiadas/onc" } }; export default function Page() { return <OlympiadPage slug="onc" />; }
