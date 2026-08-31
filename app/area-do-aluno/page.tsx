"use client";
import { AuthGuard } from "@/components/AuthGuard";
import { StudentDashboard } from "@/components/StudentDashboard";
export default function StudentAreaPage() { return <main id="conteudo" className="dashboard-page"><div className="shell"><AuthGuard><StudentDashboard /></AuthGuard></div></main>; }
