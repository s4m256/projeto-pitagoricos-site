"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { getSiteUrl, getSupabaseBrowserClient } from "@/lib/supabase";
import { BrandLogo } from "./BrandLogo";

export function AuthForm({ mode }: { mode: "login" | "signup" | "recovery" }) {
  const params = useSearchParams();
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); const [busy, setBusy] = useState(false);
  const redirect = params.get("redirect")?.startsWith("/") ? params.get("redirect")! : "/area-do-aluno";
  async function submit(event: React.FormEvent) {
    event.preventDefault(); const client = getSupabaseBrowserClient();
    if (!client) { setMessage("A conexão com o Supabase ainda não foi configurada."); return; }
    setBusy(true); setMessage("");
    const callback = `${getSiteUrl()}/auth/callback?redirect=${encodeURIComponent(redirect)}`;
    const result = mode === "login" ? await client.auth.signInWithPassword({ email, password }) : mode === "signup" ? await client.auth.signUp({ email, password, options: { emailRedirectTo: callback } }) : await client.auth.resetPasswordForEmail(email, { redirectTo: `${getSiteUrl()}/auth/callback?redirect=/recuperar-senha` });
    setBusy(false);
    if (result.error) setMessage(result.error.message);
    else if (mode === "login") window.location.assign(redirect);
    else setMessage(mode === "signup" ? "Cadastro recebido. Confira seu email se a confirmação estiver ativada." : "Se o email existir, enviaremos as instruções de recuperação.");
  }
  async function google() {
    const client = getSupabaseBrowserClient(); if (!client) return setMessage("A conexão com o Supabase ainda não foi configurada.");
    setBusy(true); const { error } = await client.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${getSiteUrl()}/auth/callback?redirect=${encodeURIComponent(redirect)}` } });
    if (error) { setMessage(error.message); setBusy(false); }
  }
  return <div className="auth-card">
    <BrandLogo variant="blue-on-light" className="auth-brand-logo" />
    {mode !== "recovery" && <button className="button button-google" type="button" onClick={google} disabled={busy}>Continuar com Google</button>}
    {mode !== "recovery" && <div className="auth-divider"><span>ou</span></div>}
    <form onSubmit={submit} className="form-stack">
      <label>Email<input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></label>
      {mode !== "recovery" && <label>Senha<input type="password" minLength={8} autoComplete={mode === "login" ? "current-password" : "new-password"} required value={password} onChange={(e) => setPassword(e.target.value)} /></label>}
      <button className="button button-yellow" disabled={busy}>{busy ? "Aguarde…" : mode === "login" ? "Entrar" : mode === "signup" ? "Criar conta" : "Enviar instruções"}</button>
    </form>
    {message && <p className="form-message" role="status">{message}</p>}
    <div className="auth-links">{mode === "login" ? <><Link href="/recuperar-senha">Esqueci minha senha</Link><Link href="/cadastro">Criar uma conta</Link></> : <Link href="/entrar">Voltar para entrar</Link>}</div>
  </div>;
}
