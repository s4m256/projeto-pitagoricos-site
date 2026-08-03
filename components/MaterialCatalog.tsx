"use client";

import { useMemo, useState } from "react";
import type { Material } from "@/lib/content";

const all = "Todos";

export function MaterialCatalog({ materials }: { materials: Material[] }) {
  const [area, setArea] = useState(all);
  const [olympiad, setOlympiad] = useState(all);
  const [type, setType] = useState(all);
  const options = (key: keyof Pick<Material, "area" | "olympiad" | "type">) => [all, ...Array.from(new Set(materials.map((item) => item[key])))];
  const filtered = useMemo(() => materials.filter((item) => (area === all || item.area === area) && (olympiad === all || item.olympiad === olympiad) && (type === all || item.type === type)), [area, olympiad, type, materials]);

  return <>
    <div className="filters" aria-label="Filtros de materiais">
      <label>Área<select value={area} onChange={(event) => setArea(event.target.value)}>{options("area").map((value) => <option key={value}>{value}</option>)}</select></label>
      <label>Olimpíada<select value={olympiad} onChange={(event) => setOlympiad(event.target.value)}>{options("olympiad").map((value) => <option key={value}>{value}</option>)}</select></label>
      <label>Tipo<select value={type} onChange={(event) => setType(event.target.value)}>{options("type").map((value) => <option key={value}>{value}</option>)}</select></label>
      <button className="clear-filters" onClick={() => { setArea(all); setOlympiad(all); setType(all); }}>Limpar filtros</button>
    </div>
    <p className="result-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? "material encontrado" : "materiais encontrados"}</p>
    <div className="material-grid">
      {filtered.map((item) => <article className="material-card" key={item.id}>
        <div className="material-meta"><span>{item.olympiad}</span><span>{item.type}</span></div>
        <h2>{item.title}</h2><p>{item.description}</p><p className="material-level">{item.area} · {item.level}</p>
        {item.href ? <a className="text-link" href={item.href} target="_blank" rel="noreferrer" onClick={() => window.plausible?.("material_open", { props: { material: item.id } })}>Abrir material <span aria-hidden="true">↗</span></a> : <span className="pending-link">Link em atualização</span>}
      </article>)}
    </div>
  </>;
}
