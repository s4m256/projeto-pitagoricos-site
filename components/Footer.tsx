import Link from "next/link";
import { navigation, siteConfig } from "@/lib/content";
import { BrandLogo } from "./BrandLogo";
import { ExternalLink } from "./ExternalLink";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <BrandLogo variant="white-on-dark" className="footer-brand-logo" />
          <p>Preparação gratuita para olimpíadas científicas, feita por estudantes.</p>
        </div>
        <div><h2>Explore</h2>{navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div>
        <div><h2>Projeto</h2><Link href="/estude">Como estudar</Link><Link href="/impacto">Impacto</Link><Link href="/sobre">Sobre e equipe</Link><Link href="/parceiros">Escolas e parceiros</Link><Link href="/privacidade">Privacidade</Link></div>
        <div><h2>Contato</h2><ExternalLink href={siteConfig.instagramUrl} eventName="social_click">Instagram: @pitagoricos</ExternalLink><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></div>
      </div>
      <div className="shell footer-bottom"><span>© {new Date().getFullYear()} Projeto Pitagóricos</span><span className="site-credit">Site por Samuel Santiago</span></div>
    </footer>
  );
}
