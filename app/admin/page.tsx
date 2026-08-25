"use client";
import { AdminDashboard } from "@/components/AdminDashboard";
import { AuthGuard } from "@/components/AuthGuard";
export default function AdminPage() { return <main id="conteudo" className="admin-page"><div className="shell"><AuthGuard admin><AdminDashboard /></AuthGuard></div></main>; }
