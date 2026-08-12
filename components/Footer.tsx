import Image from "next/image";
import Link from "next/link";
import { assetUrl } from "@/lib/assets";
import { navigation, siteConfig } from "@/lib/content";
import { ExternalLink } from "./ExternalLink";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Image src={assetUrl("/logo-rocket.png")} width={72} height={72} alt="Símbolo do Projeto Pitagóricos" />
          <div><strong>Projeto Pitagóricos</strong><p>Preparação gratuita para olimpíadas científicas, feita por estudantes.</p></div>
        </div>
        <div><h2>Explore</h2>{navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div>
        <div><h2>Projeto</h2><Link href="/estude">Como estudar</Link><Link href="/impacto">Impacto</Link><Link href="/sobre">Sobre e equipe</Link><Link href="/parceiros">Escolas e parceiros</Link><Link href="/privacidade">Privacidade</Link></div>
        <div><h2>Comunidade</h2><ExternalLink href={siteConfig.instagramUrl} eventName="social_click">Instagram</ExternalLink><ExternalLink href={siteConfig.youtubeUrl} eventName="social_click">YouTube</ExternalLink><ExternalLink href={siteConfig.whatsappUrl} eventName="whatsapp_click">WhatsApp</ExternalLink>{!siteConfig.whatsappUrl && <p className="muted-small">Canais oficiais serão adicionados antes do lançamento.</p>}</div>
      </div>
      <div className="shell footer-bottom"><span>© {new Date().getFullYear()} Projeto Pitagóricos</span><span className="site-credit">Site por Samuel Santiago</span></div>
    </footer>
  );
}
