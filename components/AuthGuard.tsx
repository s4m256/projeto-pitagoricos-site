"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

export function AuthGuard({ children, admin = false }: { children: React.ReactNode; admin?: boolean }) {
  const { user, profile, loading, configured } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (loading || !configured) return;
    if (!user) router.replace(`/entrar?redirect=${encodeURIComponent(pathname)}`);
    else if (admin && profile && profile.role !== "admin") router.replace("/area-do-aluno");
  }, [user, profile, loading, configured, admin, pathname, router]);
  if (!configured) return <div className="state-card error-state"><h2>Supabase ainda não configurado</h2><p>Adicione as variáveis públicas do Supabase para ativar esta área.</p></div>;
  if (loading || (user && !profile)) return <p className="loading-state" role="status">Carregando sua conta…</p>;
  if (!user || (admin && profile?.role !== "admin")) return <p className="loading-state" role="status">Redirecionando…</p>;
  return children;
}
