"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Material, MaterialResource, MaterialSource, OlympiadPage, UserRole } from "@/lib/database.types";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { useAuth } from "./AuthProvider";

type UserRow = { id: string; email: string | null; display_name: string | null; role: UserRole; created_at: string };
type ResourceDraft = {
  key: string;
  id?: string;
  title: string;
  resource_type: string;
  sort_order: number;
  source_kind: MaterialSource;
  external_url: string;
  storage_path: string | null;
  file: File | null;
};

const resourceTypes = ["aula", "lista", "gabarito", "vídeo", "guia", "simulado", "solução", "outro"];
const blank = { title: "", description: "", subject: "Matemática", olympiad: "", levels: [] as string[], objective: "aprender", featured: false, sort_order: 0 };

function blankResource(key: string, sortOrder = 0): ResourceDraft {
  return { key, title: "", resource_type: "aula", sort_order: sortOrder, source_kind: "external", external_url: "", storage_path: null, file: null };
}

export function AdminDashboard() {
  const client = getSupabaseBrowserClient();
  const { user } = useAuth();
  const [tab, setTab] = useState("overview");
  const [materials, setMaterials] = useState<Material[]>([]);
  const [materialResources, setMaterialResources] = useState<Record<string, MaterialResource[]>>({});
  const [pages, setPages] = useState<OlympiadPage[]>([]);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [form, setForm] = useState(blank);
  const [resources, setResources] = useState<ResourceDraft[]>(() => [blankResource("initial")]);
  const [originalResources, setOriginalResources] = useState<MaterialResource[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    if (!client) return;
    const [materialRows, olympiadRows, resourceRows] = await Promise.all([
      client.from("materials").select("*").order("updated_at", { ascending: false }),
      client.from("olympiad_pages").select("*").order("slug"),
      client.from("material_resources").select("*").order("sort_order").order("created_at"),
    ]);
    setMaterials(materialRows.data ?? []);
    setPages(olympiadRows.data ?? []);
    const grouped: Record<string, MaterialResource[]> = {};
    for (const resource of resourceRows.data ?? []) {
      grouped[resource.material_id] = [...(grouped[resource.material_id] ?? []), resource];
    }
    setMaterialResources(grouped);
  }, [client]);

  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  const loadUsers = useCallback(async () => {
    if (!client) return;
    setBusy(true);
    const { data, error } = await client.functions.invoke("admin-users", { body: { action: "list" } });
    setBusy(false);
    if (error) setMessage(error.message);
    else setUsers(data.users ?? []);
  }, [client]);

  useEffect(() => {
    if (tab !== "users" && tab !== "overview") return;
    const timer = window.setTimeout(() => void loadUsers(), 0);
    return () => window.clearTimeout(timer);
  }, [tab, loadUsers]);

  function resetMaterialForm() {
    setForm(blank);
    setResources([blankResource("initial")]);
    setOriginalResources([]);
    setEditingId(null);
  }

  function edit(material: Material) {
    const savedResources = materialResources[material.id] ?? [];
    setEditingId(material.id);
    setForm({
      title: material.title,
      description: material.description,
      subject: material.subject,
      olympiad: material.olympiad ?? "",
      levels: material.levels,
      objective: material.objective,
      featured: material.featured,
      sort_order: material.sort_order,
    });
    setOriginalResources(savedResources);
    setResources(savedResources.length > 0
      ? savedResources.map((resource) => ({
          key: resource.id,
          id: resource.id,
          title: resource.title,
          resource_type: resource.resource_type,
          sort_order: resource.sort_order,
          source_kind: resource.source_kind,
          external_url: resource.external_url ?? "",
          storage_path: resource.storage_path,
          file: null,
        }))
      : [blankResource("initial")]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateResource(index: number, patch: Partial<ResourceDraft>) {
    setResources((current) => current.map((resource, position) => position === index ? { ...resource, ...patch } : resource));
  }

  async function saveMaterial(event: React.FormEvent) {
    event.preventDefault();
    if (!client || !user) return;
    if (resources.length === 0) return setMessage("Adicione pelo menos um recurso.");
    for (const resource of resources) {
      if (!resource.title.trim() || !resource.resource_type.trim()) return setMessage("Informe título e tipo de todos os recursos.");
      if (resource.source_kind === "external" && !resource.external_url.trim()) return setMessage(`Informe o link de “${resource.title}”.`);
      if (resource.source_kind === "upload" && !resource.file && !resource.storage_path) return setMessage(`Escolha o arquivo de “${resource.title}”.`);
    }

    setBusy(true);
    setMessage("");
    const uploadedPaths: string[] = [];
    let createdMaterialId: string | null = null;

    try {
      const prepared = [];
      for (const resource of resources) {
        let storagePath = resource.source_kind === "upload" ? resource.storage_path : null;
        if (resource.source_kind === "upload" && resource.file) {
          const safeName = resource.file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
          storagePath = `${user.id}/${crypto.randomUUID()}-${safeName}`;
          const { error } = await client.storage.from("materials").upload(storagePath, resource.file, { upsert: false });
          if (error) throw error;
          uploadedPaths.push(storagePath);
        }
        prepared.push({
          id: resource.id ?? crypto.randomUUID(),
          title: resource.title.trim(),
          resource_type: resource.resource_type.trim(),
          sort_order: Number(resource.sort_order),
          source_kind: resource.source_kind,
          external_url: resource.source_kind === "external" ? resource.external_url.trim() : null,
          storage_path: storagePath,
        });
      }

      const materialPayload = {
        title: form.title,
        description: form.description,
        subject: form.subject,
        olympiad: form.olympiad || null,
        levels: form.levels,
        material_type: prepared[0].resource_type,
        objective: form.objective,
        source_kind: null,
        external_url: null,
        storage_path: null,
        featured: form.featured,
        sort_order: Number(form.sort_order),
        created_by: user.id,
      };

      let materialId = editingId;
      if (editingId) {
        const { error } = await client.from("materials").update(materialPayload).eq("id", editingId);
        if (error) throw error;
      } else {
        const { data, error } = await client.from("materials").insert(materialPayload).select("id").single();
        if (error || !data) throw error ?? new Error("Não foi possível criar o material.");
        materialId = data.id;
        createdMaterialId = data.id;
      }

      if (!materialId) throw new Error("Material inválido.");
      const resourceRows = prepared.map((resource) => ({ ...resource, material_id: materialId }));
      const { error: resourceError } = await client.from("material_resources").upsert(resourceRows);
      if (resourceError) throw resourceError;

      const keptIds = new Set(prepared.map((resource) => resource.id));
      const removedIds = originalResources.filter((resource) => !keptIds.has(resource.id)).map((resource) => resource.id);
      if (removedIds.length > 0) {
        const { error } = await client.from("material_resources").delete().in("id", removedIds);
        if (error) throw error;
      }

      const keptPaths = new Set(prepared.map((resource) => resource.storage_path).filter((path): path is string => Boolean(path)));
      const obsoletePaths = originalResources
        .map((resource) => resource.storage_path)
        .filter((path): path is string => path !== null)
        .filter((path) => !keptPaths.has(path));
      if (obsoletePaths.length > 0) await client.storage.from("materials").remove(obsoletePaths);

      setMessage(editingId ? "Material e recursos atualizados sem alterar sua publicação." : "Material salvo como DRAFT.");
      resetMaterialForm();
      await load();
    } catch (error) {
      if (uploadedPaths.length > 0) await client.storage.from("materials").remove(uploadedPaths);
      if (createdMaterialId) await client.from("materials").delete().eq("id", createdMaterialId);
      setMessage(error instanceof Error ? error.message : "Não foi possível salvar o material.");
    } finally {
      setBusy(false);
    }
  }

  async function setStatus(material: Material, status: "draft" | "published") {
    if (!client) return;
    const { error } = await client.from("materials").update({ status, published_at: status === "published" ? new Date().toISOString() : null }).eq("id", material.id);
    if (error) setMessage(error.message);
    else await load();
  }

  async function deleteMaterial(material: Material) {
    if (!client || !window.confirm(`Apagar “${material.title}”?`)) return;
    const paths = new Set((materialResources[material.id] ?? []).map((resource) => resource.storage_path).filter((path): path is string => Boolean(path)));
    if (material.storage_path) paths.add(material.storage_path);
    if (paths.size > 0) await client.storage.from("materials").remove([...paths]);
    const { error } = await client.from("materials").delete().eq("id", material.id);
    if (error) setMessage(error.message);
    else await load();
  }

  async function savePage(page: OlympiadPage) {
    if (!client) return;
    const { error } = await client.from("olympiad_pages").update({ short_description: page.short_description, intro: page.intro, how_it_works: page.how_it_works, how_to_study: page.how_to_study, published: page.published, updated_by: user?.id ?? null }).eq("slug", page.slug);
    setMessage(error?.message ?? `Página ${page.name} salva.`);
    if (!error) await load();
  }

  async function changeRole(target: UserRow, role: UserRole) {
    if (!client || target.id === user?.id) return;
    const { data, error } = await client.functions.invoke("admin-users", { body: { action: "set-role", userId: target.id, role } });
    if (error || data?.error) setMessage(error?.message ?? data.error);
    else await loadUsers();
  }

  const visible = useMemo(() => materials.filter((item) => `${item.title} ${item.subject} ${item.olympiad}`.toLowerCase().includes(search.toLowerCase())), [materials, search]);
  const published = materials.filter((material) => material.status === "published").length;
  const bySubject = materials.reduce<Record<string, number>>((current, material) => ({ ...current, [material.subject]: (current[material.subject] ?? 0) + 1 }), {});

  return <div>
    <div className="admin-heading"><div><p className="eyebrow">Administração</p><h1>Conteúdo e acesso.</h1></div><nav className="admin-tabs" aria-label="Seções do Admin">{[["overview", "Visão geral"], ["materials", "Materiais"], ["olympiads", "Olimpíadas"], ["users", "Usuários"]].map(([id, label]) => <button aria-pressed={tab === id} key={id} onClick={() => setTab(id)}>{label}</button>)}</nav></div>
    {message && <p className="form-message" role="status">{message}</p>}
    {tab === "overview" && <div className="stats-grid"><article><strong>{published}</strong><span>publicados</span></article><article><strong>{materials.length - published}</strong><span>drafts</span></article><article><strong>{busy ? "…" : users.length}</strong><span>usuários</span></article>{Object.entries(bySubject).map(([subject, count]) => <article key={subject}><strong>{count}</strong><span>{subject}</span></article>)}</div>}
    {tab === "materials" && <div className="admin-split">
      <form className="admin-form form-stack" onSubmit={saveMaterial}>
        <h2>{editingId ? "Editar material" : "Novo material"}</h2>
        <label>Título<input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /></label>
        <label>Descrição<textarea required rows={4} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></label>
        <div className="form-columns"><label>Matéria<input required value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} /></label><label>Olimpíada<input value={form.olympiad} onChange={(event) => setForm({ ...form, olympiad: event.target.value.toUpperCase() })} /></label></div>
        <label>Níveis (separados por vírgula)<input value={form.levels.join(", ")} onChange={(event) => setForm({ ...form, levels: event.target.value.split(",").map((value) => value.trim()).filter(Boolean) })} /></label>
        <label>Objetivo<select value={form.objective} onChange={(event) => setForm({ ...form, objective: event.target.value })}>{["aprender", "praticar", "revisar", "simular"].map((value) => <option key={value}>{value}</option>)}</select></label>
        <h3>Recursos</h3>
        {resources.map((resource, index) => <fieldset className="resource-editor" key={resource.key}>
          <legend>Recurso {index + 1}</legend>
          <label>Título<input required value={resource.title} onChange={(event) => updateResource(index, { title: event.target.value })} /></label>
          <div className="form-columns"><label>Tipo<select value={resource.resource_type} onChange={(event) => updateResource(index, { resource_type: event.target.value })}>{resourceTypes.map((value) => <option key={value}>{value}</option>)}</select></label><label>Ordem<input type="number" value={resource.sort_order} onChange={(event) => updateResource(index, { sort_order: Number(event.target.value) })} /></label></div>
          <div><label><input type="radio" checked={resource.source_kind === "external"} onChange={() => updateResource(index, { source_kind: "external", file: null })} /> Link externo</label><label><input type="radio" checked={resource.source_kind === "upload"} onChange={() => updateResource(index, { source_kind: "upload", external_url: "" })} /> Upload</label></div>
          {resource.source_kind === "external" ? <label>URL externa<input type="url" value={resource.external_url} onChange={(event) => updateResource(index, { external_url: event.target.value })} /></label> : <label>Arquivo<input type="file" onChange={(event) => updateResource(index, { file: event.target.files?.[0] ?? null })} />{resource.storage_path && !resource.file && <small>Arquivo atual preservado.</small>}</label>}
          <button type="button" className="text-button" disabled={resources.length === 1} onClick={() => setResources((current) => current.filter((_, position) => position !== index))}>Remover recurso</button>
        </fieldset>)}
        <button type="button" className="button button-outline-light" onClick={() => setResources((current) => [...current, blankResource(crypto.randomUUID(), current.length)])}>Adicionar recurso</button>
        <div className="form-columns"><label>Ordem<input type="number" value={form.sort_order} onChange={(event) => setForm({ ...form, sort_order: Number(event.target.value) })} /></label><label><input type="checkbox" checked={form.featured} onChange={(event) => setForm({ ...form, featured: event.target.checked })} /> Destaque</label></div>
        <button className="button button-yellow" disabled={busy}>{busy ? "Salvando…" : editingId ? "Salvar alterações" : "Salvar como DRAFT"}</button>
        {editingId && <button type="button" className="text-button" onClick={resetMaterialForm}>Cancelar edição</button>}
      </form>
      <section><div className="list-toolbar"><h2>Materiais</h2><input aria-label="Pesquisar materiais" placeholder="Pesquisar" value={search} onChange={(event) => setSearch(event.target.value)} /></div><div className="admin-list">{visible.map((material) => <article key={material.id}><div><span className={`status-pill ${material.status}`}>{material.status.toUpperCase()}</span><h3>{material.title}</h3><p>{material.subject} · {material.olympiad || "Sem olimpíada"} · {(materialResources[material.id] ?? []).length} recursos</p></div><div><button onClick={() => edit(material)}>Editar</button><button onClick={() => void setStatus(material, material.status === "draft" ? "published" : "draft")}>{material.status === "draft" ? "Publicar" : "Despublicar"}</button><button onClick={() => void deleteMaterial(material)}>Apagar</button></div></article>)}</div></section>
    </div>}
    {tab === "olympiads" && <div className="admin-list page-editors">{pages.map((page, index) => <form key={page.slug} onSubmit={(event) => { event.preventDefault(); void savePage(page); }}><h2>{page.name}</h2><label>Descrição curta<textarea value={page.short_description} onChange={(event) => setPages((current) => current.map((item, position) => position === index ? { ...item, short_description: event.target.value } : item))} /></label><label>Introdução<textarea value={page.intro} onChange={(event) => setPages((current) => current.map((item, position) => position === index ? { ...item, intro: event.target.value } : item))} /></label><label>Como funciona<textarea value={page.how_it_works} onChange={(event) => setPages((current) => current.map((item, position) => position === index ? { ...item, how_it_works: event.target.value } : item))} /></label><label>Como estudar<textarea value={page.how_to_study} onChange={(event) => setPages((current) => current.map((item, position) => position === index ? { ...item, how_to_study: event.target.value } : item))} /></label><label><input type="checkbox" checked={page.published} onChange={(event) => setPages((current) => current.map((item, position) => position === index ? { ...item, published: event.target.checked } : item))} /> Publicada</label><button className="button button-yellow">Salvar página</button></form>)}</div>}
    {tab === "users" && <div className="admin-list"><div className="list-toolbar"><h2>Usuários</h2><button className="button button-yellow compact" onClick={() => void loadUsers()} disabled={busy}>Atualizar</button></div>{users.map((row) => <article key={row.id}><div><h3>{row.display_name || row.email || "Usuário"}</h3><p>{row.email} · {row.role}</p></div><button disabled={row.id === user?.id} onClick={() => void changeRole(row, row.role === "admin" ? "student" : "admin")}>{row.id === user?.id ? "Sua própria role" : row.role === "admin" ? "Rebaixar para student" : "Promover para admin"}</button></article>)}</div>}
  </div>;
}
