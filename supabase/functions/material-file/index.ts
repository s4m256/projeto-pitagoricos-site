import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  try {
    const url = Deno.env.get("SUPABASE_URL")!;
    const service = createClient(url, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { resourceId } = await req.json();

    if (typeof resourceId !== "string") {
      return new Response(JSON.stringify({ error: "Recurso inválido" }), { status: 400, headers: cors });
    }

    const { data: resource, error: resourceError } = await service
      .from("material_resources")
      .select("material_id,storage_path")
      .eq("id", resourceId)
      .single();

    if (resourceError || !resource?.storage_path) {
      return new Response(JSON.stringify({ error: "Arquivo não encontrado" }), { status: 404, headers: cors });
    }

    const { data: material, error: materialError } = await service
      .from("materials")
      .select("status")
      .eq("id", resource.material_id)
      .single();

    if (materialError || !material) {
      return new Response(JSON.stringify({ error: "Material não encontrado" }), { status: 404, headers: cors });
    }

    if (material.status !== "published") {
      const authHeader = req.headers.get("Authorization");
      if (!authHeader) {
        return new Response(JSON.stringify({ error: "Acesso negado" }), { status: 403, headers: cors });
      }

      const verifier = createClient(url, Deno.env.get("SUPABASE_ANON_KEY")!, {
        global: { headers: { Authorization: authHeader } },
      });
      const { data: auth } = await verifier.auth.getUser();
      const { data: profile } = auth.user
        ? await service.from("profiles").select("role").eq("id", auth.user.id).single()
        : { data: null };

      if (profile?.role !== "admin") {
        return new Response(JSON.stringify({ error: "Acesso negado" }), { status: 403, headers: cors });
      }
    }

    const { data, error: signedError } = await service.storage
      .from("materials")
      .createSignedUrl(resource.storage_path, 600);
    if (signedError) throw signedError;

    return new Response(JSON.stringify({ signedUrl: data.signedUrl, expiresIn: 600 }), { headers: cors });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erro interno" }),
      { status: 500, headers: cors },
    );
  }
});
