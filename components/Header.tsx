import Image from "next/image";
import Link from "next/link";
import { assetUrl } from "@/lib/assets";
import { navigation } from "@/lib/content";

export function Header() {
  return (
    <header className="site-header">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Projeto Pitagóricos - início">
          <Image src={assetUrl("/logo-rocket.png")} width={60} height={60} alt="" priority />
          <span><strong>Pitagóricos</strong><small>Olimpíadas científicas</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <div className="header-actions">
          <Link className="button button-ghost compact" href="/estude">Quero estudar</Link>
          <Link className="button button-yellow compact partner-header" href="/parceiros">Levar à minha rede</Link>
        </div>
        <details className="mobile-nav">
          <summary aria-label="Abrir menu">Menu <span aria-hidden="true">≡</span></summary>
          <nav aria-label="Navegação para celular">
            {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
            <Link className="mobile-cta" href="/estude">Quero estudar</Link>
            <Link className="mobile-cta yellow" href="/parceiros">Levar à minha rede</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
