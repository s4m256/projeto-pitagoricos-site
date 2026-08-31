"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { getAuthErrorMessage, withAuthTimeout } from "@/lib/auth-helpers";
import { getSiteUrl, getSupabaseBrowserClient } from "@/lib/supabase";
import { BrandLogo } from "./BrandLogo";

type AuthMode = "login" | "signup" | "recovery";
type FormMessage = { kind: "error" | "success"; text: string } | null;

export function AuthForm({ mode }: { mode: AuthMode }) {
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<FormMessage>(null);
  const [busy, setBusy] = useState(false);
  const requestedRedirect = params.get("redirect");
  const redirect = requestedRedirect?.startsWith("/") ? requestedRedirect : "/area-do-aluno";

  function reportError(error: unknown) {
    setMessage({ kind: "error", text: getAuthErrorMessage(error) });
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const client = getSupabaseBrowserClient();

    if (!client) {
      reportError(new Error("A conexão pública com o Supabase não está configurada corretamente."));
      return;
    }

    setBusy(true);
    setMessage(null);

    try {
      const callback = `${getSiteUrl()}/auth/callback?redirect=${encodeURIComponent(redirect)}`;

      if (mode === "login") {
        const { data, error } = await withAuthTimeout(client.auth.signInWithPassword({ email, password }));
        if (error) throw error;
        if (!data.session) throw new Error("O Supabase não retornou uma sessão válida.");
        window.location.assign(redirect);
        return;
      }

      if (mode === "signup") {
        const { data, error } = await withAuthTimeout(
          client.auth.signUp({ email, password, options: { emailRedirectTo: callback } }),
        );
        if (error) throw error;

        if (data.session) {
          window.location.assign(redirect);
          return;
        }

        setMessage({
          kind: "success",
          text: "Cadastro recebido. Abra o email de confirmação para ativar sua conta.",
        });
        return;
      }

      const { error } = await withAuthTimeout(
        client.auth.resetPasswordForEmail(email, {
          redirectTo: `${getSiteUrl()}/auth/callback?redirect=/recuperar-senha`,
        }),
      );
      if (error) throw error;

      setMessage({
        kind: "success",
        text: "Se o email existir, enviaremos as instruções de recuperação.",
      });
    } catch (error) {
      reportError(error);
    } finally {
      setBusy(false);
    }
  }

  async function google() {
    const client = getSupabaseBrowserClient();

    if (!client) {
      reportError(new Error("A conexão pública com o Supabase não está configurada corretamente."));
      return;
    }

    setBusy(true);
    setMessage(null);

    try {
      const { error } = await withAuthTimeout(
        client.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: `${getSiteUrl()}/auth/callback?redirect=${encodeURIComponent(redirect)}`,
          },
        }),
      );
      if (error) throw error;
    } catch (error) {
      reportError(error);
    } finally {
      setBusy(false);
    }
  }

  const submitLabel = mode === "login" ? "Entrar" : mode === "signup" ? "Criar conta" : "Enviar instruções";

  return (
    <div className="auth-card">
      <BrandLogo variant="blue-on-light" className="auth-brand-logo" />
      {mode !== "recovery" && (
        <button className="button button-google" type="button" onClick={google} disabled={busy}>
          Continuar com Google
        </button>
      )}
      {mode !== "recovery" && <div className="auth-divider"><span>ou</span></div>}
      <form onSubmit={submit} className="form-stack">
        <label>
          Email
          <input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} disabled={busy} />
        </label>
        {mode !== "recovery" && (
          <label>
            Senha
            <input type="password" minLength={8} autoComplete={mode === "login" ? "current-password" : "new-password"} required value={password} onChange={(event) => setPassword(event.target.value)} disabled={busy} />
          </label>
        )}
        <button className="button button-yellow" type="submit" disabled={busy}>
          {busy ? "Aguarde…" : submitLabel}
        </button>
      </form>
      {message && (
        <p className={`form-message ${message.kind}`} role={message.kind === "error" ? "alert" : "status"} aria-live="polite">
          {message.text}
        </p>
      )}
      <div className="auth-links">
        {mode === "login" ? (
          <><Link href="/recuperar-senha">Esqueci minha senha</Link><Link href="/cadastro">Criar uma conta</Link></>
        ) : (
          <Link href="/entrar">Voltar para entrar</Link>
        )}
      </div>
    </div>
  );
}
