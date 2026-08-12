"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { assetUrl } from "@/lib/assets";
import { navigation } from "@/lib/content";

export function Header() {
  const pathname = usePathname();
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="site-header">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Projeto Pitagóricos - início">
          <Image src={assetUrl("/logo-rocket.png")} width={60} height={60} alt="" priority />
          <span><strong>Pitagóricos</strong><small>Olimpíadas científicas</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map((item) => <Link key={item.href} href={item.href} className={isActive(item.href) ? "active" : undefined} aria-current={isActive(item.href) ? "page" : undefined}>{item.label}</Link>)}
        </nav>
        <div className="header-actions">
          <Link className="button button-yellow compact" href="/area-do-aluno">Meu progresso</Link>
        </div>
        <details className="mobile-nav">
          <summary aria-label="Abrir menu">Menu <span aria-hidden="true">≡</span></summary>
          <nav aria-label="Navegação para celular">
            {navigation.map((item) => <Link key={item.href} href={item.href} className={isActive(item.href) ? "active" : undefined} aria-current={isActive(item.href) ? "page" : undefined}>{item.label}</Link>)}
          </nav>
        </details>
      </div>
    </header>
  );
}
