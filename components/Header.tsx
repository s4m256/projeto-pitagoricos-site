"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { assetUrl } from "@/lib/assets";
import { navigation } from "@/lib/content";
import { useAuth } from "./AuthProvider";

export function Header() {
  const pathname = usePathname();
  const { user, profile, loading, signOut } = useAuth();
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);
  const authLinks = <>{!loading && !user && <Link className="button button-yellow compact" href="/entrar">Entrar</Link>}{user && <><Link className="button button-yellow compact" href="/area-do-aluno">Área do aluno</Link>{profile?.role === "admin" && <Link className="button button-outline-light compact" href="/admin">Admin</Link>}<button className="header-logout" onClick={() => void signOut()}>Sair</button></>}</>;
  return <header className="site-header"><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><div className="shell header-inner"><Link className="brand" href="/" aria-label="Projeto Pitagóricos - início"><Image src={assetUrl("/logo-rocket.png")} width={552} height={1016} alt="" priority/><span><strong>Pitagóricos</strong><small>Olimpíadas científicas</small></span></Link><nav className="desktop-nav" aria-label="Navegação principal">{navigation.map((item) => <Link key={item.href} href={item.href} className={isActive(item.href) ? "active" : undefined} aria-current={isActive(item.href) ? "page" : undefined}>{item.label}</Link>)}</nav><div className="header-actions">{authLinks}</div><details className="mobile-nav"><summary aria-label="Abrir menu">Menu <span aria-hidden="true">≡</span></summary><nav aria-label="Navegação para celular">{navigation.map((item) => <Link key={item.href} href={item.href} className={isActive(item.href) ? "active" : undefined}>{item.label}</Link>)}<div className="mobile-auth">{authLinks}</div></nav></details></div></header>;
}
