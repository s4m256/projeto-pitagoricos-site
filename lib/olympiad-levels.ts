export const LEVEL_MAPPING_YEAR = 2026;

export const grades = [
  { value: "6ef", label: "6º ano do Ensino Fundamental" }, { value: "7ef", label: "7º ano do Ensino Fundamental" },
  { value: "8ef", label: "8º ano do Ensino Fundamental" }, { value: "9ef", label: "9º ano do Ensino Fundamental" },
  { value: "1em", label: "1º ano do Ensino Médio" }, { value: "2em", label: "2º ano do Ensino Médio" }, { value: "3em", label: "3º ano do Ensino Médio" },
] as const;

export const olympiadLevels: Record<string, Record<string, string>> = {
  OBA: { "6ef": "Nível 3", "7ef": "Nível 3", "8ef": "Nível 3", "9ef": "Nível 3", "1em": "Nível 4", "2em": "Nível 4", "3em": "Nível 4" },
  OBMEP: { "6ef": "Nível 1", "7ef": "Nível 1", "8ef": "Nível 2", "9ef": "Nível 2", "1em": "Nível 3", "2em": "Nível 3", "3em": "Nível 3" },
  ONC: { "6ef": "Nível A", "7ef": "Nível A", "8ef": "Nível B", "9ef": "Nível B", "1em": "Nível C", "2em": "Nível D", "3em": "Nível E" },
};

export function getOlympiadLevel(olympiad: string, grade: string) { return olympiadLevels[olympiad]?.[grade] ?? null; }
