"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { getAuthErrorMessage, withAuthTimeout } from "@/lib/auth-helpers";
import { getSupabaseBrowserClient } from "@/lib/supabase";

function Callback() {
  const params = useSearchParams();
  const [error, setError] = useState(() =>
    getSupabaseBrowserClient() ? "" : "Supabase não configurado.",
  );

  useEffect(() => {
    const client = getSupabaseBrowserClient();
    const requestedRedirect = params.get("redirect");
    const redirect = requestedRedirect?.startsWith("/") ? requestedRedirect : "/area-do-aluno";
    if (!client) return;

    let active = true;
    void (async () => {
      try {
        const queryError = params.get("error_description");
        const hashError = new URLSearchParams(window.location.hash.slice(1)).get("error_description");
        if (queryError || hashError) {
          throw new Error(queryError || hashError || "Não foi possível confirmar a conta.");
        }

        const code = params.get("code");
        if (code) {
          const { error: exchangeError } = await withAuthTimeout(
            client.auth.exchangeCodeForSession(code),
          );
          if (exchangeError) throw exchangeError;
        }

        const { data, error: sessionError } = await withAuthTimeout(client.auth.getSession());
        if (sessionError) throw sessionError;
        if (!data.session) throw new Error("Não foi possível confirmar a sessão. Tente entrar novamente.");

        window.location.replace(
          redirect === "/recuperar-senha" ? "/recuperar-senha?mode=update" : redirect,
        );
      } catch (callbackError) {
        if (active) setError(getAuthErrorMessage(callbackError));
      }
    })();

    return () => {
      active = false;
    };
  }, [params]);

  return error ? (
    <div className="state-card error-state">
      <h1>Não foi possível entrar</h1>
      <p>{error}</p>
      <Link className="button button-yellow" href="/entrar">Voltar para entrar</Link>
    </div>
  ) : (
    <p className="loading-state" role="status">Confirmando sua conta…</p>
  );
}

export default function AuthCallbackPage() {
  return (
    <main id="conteudo" className="auth-page">
      <section className="shell">
        <Suspense fallback={<p>Confirmando…</p>}><Callback /></Suspense>
      </section>
    </main>
  );
}
