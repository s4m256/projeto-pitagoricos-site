import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthForm } from "@/components/AuthForm";
export const metadata: Metadata = { title: "Cadastro", description: "Crie sua conta gratuita no Projeto Pitagóricos." };
export default function SignupPage() { return <main id="conteudo" className="auth-page"><section className="shell auth-layout"><div><p className="eyebrow light">Conta gratuita</p><h1>Comece sua preparação.</h1><p>Depois do cadastro, um onboarding curto organiza sua experiência de estudos.</p></div><Suspense fallback={<p>Carregando…</p>}><AuthForm mode="signup" /></Suspense></section></main>; }
