import type { Metadata } from "next"; import { OlympiadPage } from "@/components/OlympiadPage";
export const metadata: Metadata = { title: "OBMEP", description: "Níveis, preparação e materiais para a OBMEP.", alternates: { canonical: "/olimpiadas/obmep" } }; export default function Page() { return <OlympiadPage slug="obmep" />; }
