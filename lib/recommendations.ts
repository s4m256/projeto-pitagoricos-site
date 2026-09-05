import type { Material } from "./database.types";
import { getOlympiadLevel } from "./olympiad-levels";

export type RecommendationInput = { grade: string; subjects: string[]; olympiads: string[]; objective: string; experience: string };
export type Recommendation = { olympiads: { slug: string; name: string; level: string | null; reason: string }[]; materials: Material[]; nextStep: string };

const interestOlympiads: Record<string, string[]> = { matematica: ["OBMEP"], "matemática": ["OBMEP"], astronomia: ["OBA"], ciencias: ["ONC", "OBA"], ciências: ["ONC", "OBA"], física: ["ONC"], química: ["ONC"], biologia: ["ONC"], interdisciplinar: ["ONC"], incerto: ["OBA", "OBMEP", "ONC"] };

export function recommend(input: RecommendationInput, materials: Material[] = []): Recommendation {
  const selected = input.olympiads.filter((item) => item !== "incerto");
  const inferred = input.subjects.flatMap((subject) => interestOlympiads[subject.toLowerCase()] ?? []);
  const names = [...new Set([...selected, ...inferred])].slice(0, 3);
  const olympiads = names.map((name) => ({ slug: name.toLowerCase(), name, level: getOlympiadLevel(name, input.grade), reason: `${input.subjects.length ? `Seu interesse em ${input.subjects.join(", ")}` : "Seu perfil"} e sua série combinam com esta olimpíada.` }));
  const published = materials.filter((material) => material.status === "published");
  const ranked = published.map((material) => ({ material, score: (input.subjects.some((subject) => subject.toLowerCase() === material.subject.toLowerCase()) ? 3 : 0) + (names.includes(material.olympiad ?? "") ? 3 : 0) + (input.objective === material.objective ? 2 : 0) })).sort((a, b) => b.score - a.score || a.material.sort_order - b.material.sort_order);
  return { olympiads, materials: ranked.filter((item) => item.score > 0).slice(0, 6).map((item) => item.material), nextStep: names[0] ? `Conheça a ${names[0]} e escolha um primeiro material para ${input.objective || "começar"}.` : "Conheça as olimpíadas e escolha a que mais combina com você." };
}

export function recommendForVisitor(grade: string, interest: string) {
  return recommend({ grade, subjects: [interest], olympiads: [], objective: "começar", experience: "nunca" });
}
