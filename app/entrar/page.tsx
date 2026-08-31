import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthForm } from "@/components/AuthForm";
export const metadata: Metadata = { title: "Entrar", description: "Entre na sua área de estudos do Projeto Pitagóricos." };
export default function LoginPage() { return <main id="conteudo" className="auth-page"><section className="shell auth-layout"><div><p className="eyebrow light">Área do aluno</p><h1>Continue de onde parou.</h1><p>Suas preferências, metas, favoritos e progresso ficam vinculados à sua conta.</p></div><Suspense fallback={<p>Carregando…</p>}><AuthForm mode="login" /></Suspense></section></main>; }
