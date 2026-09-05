import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type", "Content-Type": "application/json" };
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const url = Deno.env.get("SUPABASE_URL")!; const anon = Deno.env.get("SUPABASE_ANON_KEY")!; const service = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!; const authHeader = req.headers.get("Authorization");
    if (!authHeader) return new Response(JSON.stringify({ error: "Não autenticado" }), { status: 401, headers: cors });
    const verifier = createClient(url, anon, { global: { headers: { Authorization: authHeader } } }); const { data: auth, error: authError } = await verifier.auth.getUser();
    if (authError || !auth.user) return new Response(JSON.stringify({ error: "JWT inválido" }), { status: 401, headers: cors });
    const admin = createClient(url, service); const { data: requester } = await admin.from("profiles").select("role").eq("id", auth.user.id).single();
    if (requester?.role !== "admin") return new Response(JSON.stringify({ error: "Acesso negado" }), { status: 403, headers: cors });
    const body = await req.json();
    if (body.action === "list") { const { data: authUsers, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 }); if (error) throw error; const { data: profiles } = await admin.from("profiles").select("id,display_name,role,created_at"); const byId = new Map((profiles ?? []).map((p) => [p.id, p])); return new Response(JSON.stringify({ users: authUsers.users.map((u) => ({ id: u.id, email: u.email ?? null, display_name: byId.get(u.id)?.display_name ?? null, role: byId.get(u.id)?.role ?? "student", created_at: u.created_at })) }), { headers: cors }); }
    if (body.action === "set-role" && ["student","admin"].includes(body.role)) { if (body.userId === auth.user.id && body.role === "student") return new Response(JSON.stringify({ error: "Você não pode rebaixar a si mesmo." }), { status: 409, headers: cors }); if (body.role === "student") { const { count } = await admin.from("profiles").select("id", { count: "exact", head: true }).eq("role", "admin"); const { data: target } = await admin.from("profiles").select("role").eq("id", body.userId).single(); if (target?.role === "admin" && (count ?? 0) <= 1) return new Response(JSON.stringify({ error: "O último admin não pode ser rebaixado." }), { status: 409, headers: cors }); } const { error } = await admin.from("profiles").update({ role: body.role }).eq("id", body.userId); if (error) throw error; return new Response(JSON.stringify({ ok: true }), { headers: cors }); }
    return new Response(JSON.stringify({ error: "Ação inválida" }), { status: 400, headers: cors });
  } catch (error) { return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Erro interno" }), { status: 500, headers: cors }); }
});
