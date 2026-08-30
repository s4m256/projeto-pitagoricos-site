"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Material, MaterialResource } from "@/lib/database.types";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { useAuth } from "./AuthProvider";

const all = "Todos";
const labels: Record<string, string> = { aprender: "Aprender", praticar: "Praticar", revisar: "Revisar", simular: "Simular" };

export function MaterialCatalog() {
  const params = useSearchParams();
  const { user } = useAuth();
  const client = getSupabaseBrowserClient();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [resources, setResources] = useState<MaterialResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [subject, setSubject] = useState(params.get("materia") || all);
  const [olympiad, setOlympiad] = useState(params.get("olimpiada") || all);
  const [level, setLevel] = useState(all);
  const [objective, setObjective] = useState(all);
  const [type, setType] = useState(all);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!client) {
        setLoading(false);
        return;
      }
      void Promise.all([
        client.from("materials").select("*").eq("status", "published").order("sort_order").order("title"),
        client.from("material_resources").select("*").order("sort_order").order("created_at"),
      ]).then(([materialRows, resourceRows]) => {
        if (materialRows.error || resourceRows.error) setError("Não foi possível carregar os materiais agora.");
        else {
          setMaterials(materialRows.data ?? []);
          setResources(resourceRows.data ?? []);
        }
        setLoading(false);
      });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [client]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!client || !user) {
        setFavorites([]);
        setCompleted([]);
        return;
      }
      void Promise.all([
        client.from("favorites").select("material_id"),
        client.from("material_progress").select("material_id"),
      ]).then(([favoriteRows, progressRows]) => {
        setFavorites((favoriteRows.data ?? []).map((item) => item.material_id));
        setCompleted((progressRows.data ?? []).map((item) => item.material_id));
      });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [client, user]);

  const resourcesByMaterial = useMemo(() => {
    const grouped = new Map<string, MaterialResource[]>();
    for (const resource of resources) {
      const current = grouped.get(resource.material_id) ?? [];
      current.push(resource);
      grouped.set(resource.material_id, current);
    }
    return grouped;
  }, [resources]);

  const subjects = useMemo(() => Array.from(new Set(materials.map((item) => item.subject))).sort(), [materials]);
  const materialOptions = (key: "olympiad" | "objective") => [all, ...Array.from(new Set(materials.map((item) => item[key]).filter(Boolean) as string[])).sort()];
  const resourceTypes = [all, ...Array.from(new Set(resources.map((item) => item.resource_type))).sort()];
  const levels = [all, ...Array.from(new Set(materials.flatMap((item) => item.levels))).sort()];
  const filtered = useMemo(() => materials.filter((item) => (
    (subject === all || item.subject === subject)
    && (olympiad === all || item.olympiad === olympiad)
    && (level === all || item.levels.includes(level))
    && (objective === all || item.objective === objective)
    && (type === all || (resourcesByMaterial.get(item.id) ?? []).some((resource) => resource.resource_type === type))
  )), [materials, objective, olympiad, level, resourcesByMaterial, subject, type]);

  async function toggleFavorite(id: string) {
    if (!client || !user) return window.location.assign("/entrar?redirect=/materiais");
    if (favorites.includes(id)) {
      await client.from("favorites").delete().eq("material_id", id);
      setFavorites((current) => current.filter((item) => item !== id));
    } else {
      const { error: mutationError } = await client.from("favorites").insert({ user_id: user.id, material_id: id, created_at: new Date().toISOString() });
      if (!mutationError) setFavorites((current) => [...current, id]);
    }
  }

  async function toggleComplete(id: string) {
    if (!client || !user) return window.location.assign("/entrar?redirect=/materiais");
    if (completed.includes(id)) {
      await client.from("material_progress").delete().eq("material_id", id);
      setCompleted((current) => current.filter((item) => item !== id));
    } else {
      const { error: mutationError } = await client.from("material_progress").insert({ user_id: user.id, material_id: id, completed_at: new Date().toISOString() });
      if (!mutationError) setCompleted((current) => [...current, id]);
    }
  }

  async function openResource(resource: MaterialResource) {
    setError("");
    if (resource.source_kind === "external" && resource.external_url) {
      try {
        const url = new URL(resource.external_url);
        if (!["http:", "https:"].includes(url.protocol)) throw new Error();
        window.open(url.href, "_blank", "noopener,noreferrer");
      } catch {
        setError("Este recurso tem um link inválido.");
      }
      return;
    }
    if (!client) return;
    const { data, error: invokeError } = await client.functions.invoke("material-file", { body: { resourceId: resource.id } });
    if (invokeError || !data?.signedUrl) setError("Não foi possível abrir este arquivo agora.");
    else window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  }

  return <>
    {subjects.length > 0 && <nav className="subject-tabs" aria-label="Matérias disponíveis"><button className={subject === all ? "active" : ""} onClick={() => setSubject(all)}>Todas</button>{subjects.map((item) => <button className={subject === item ? "active" : ""} key={item} onClick={() => setSubject(item)}>{item}</button>)}</nav>}
    <div className="filters" aria-label="Filtros de materiais"><label>Matéria<select value={subject} onChange={(event) => setSubject(event.target.value)}><option>{all}</option>{subjects.map((item) => <option key={item}>{item}</option>)}</select></label><label>Olimpíada<select value={olympiad} onChange={(event) => setOlympiad(event.target.value)}>{materialOptions("olympiad").map((item) => <option key={item}>{item}</option>)}</select></label><label>Nível<select value={level} onChange={(event) => setLevel(event.target.value)}>{levels.map((item) => <option key={item}>{item}</option>)}</select></label><label>Objetivo<select value={objective} onChange={(event) => setObjective(event.target.value)}>{materialOptions("objective").map((item) => <option key={item} value={item}>{labels[item] ?? item}</option>)}</select></label><label>Tipo<select value={type} onChange={(event) => setType(event.target.value)}>{resourceTypes.map((item) => <option key={item}>{item}</option>)}</select></label><button className="clear-filters" onClick={() => { setSubject(all); setOlympiad(all); setLevel(all); setObjective(all); setType(all); }}>Limpar</button></div>
    {error && <p className="form-message" role="alert">{error}</p>}
    {loading ? <p className="loading-state">Carregando materiais…</p> : <p className="result-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? "material encontrado" : "materiais encontrados"}</p>}
    {!loading && filtered.length === 0 ? <div className="state-card"><h2>Nenhum material publicado aqui ainda.</h2><p>O catálogo mostra somente conteúdos revisados e publicados pela equipe.</p></div> : <div className="material-grid">{filtered.map((item) => <article className="material-card" key={item.id}><div className="material-meta"><span>{item.subject}</span>{item.olympiad && <span>{item.olympiad}</span>}<span>{labels[item.objective] ?? item.objective}</span></div><h2>{item.title}</h2><p>{item.description}</p><p className="material-level">{item.levels.join(" · ")}</p><div className="material-actions">{(resourcesByMaterial.get(item.id) ?? []).map((resource) => <button className="button button-yellow compact" key={resource.id} onClick={() => void openResource(resource)}>{resource.title}</button>)}<button className="button button-outline-light compact" aria-pressed={favorites.includes(item.id)} onClick={() => void toggleFavorite(item.id)}>{favorites.includes(item.id) ? "Remover favorito" : "Favoritar"}</button><button className="text-button" aria-pressed={completed.includes(item.id)} onClick={() => void toggleComplete(item.id)}>{completed.includes(item.id) ? "Desfazer conclusão" : "Marcar como concluído"}</button></div></article>)}</div>}
  </>;
}
