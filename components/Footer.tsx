import Image from "next/image";
import Link from "next/link";
import { navigation, siteConfig } from "@/lib/content";
import { ExternalLink } from "./ExternalLink";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Image src="/logo-pitagoricos.png" width={72} height={72} alt="Símbolo do Projeto Pitagóricos" />
          <div><strong>Projeto Pitagóricos</strong><p>Transformando a educação por meio das olimpíadas científicas.</p></div>
        </div>
        <div><h2>Explore</h2>{navigation.slice(0, 4).map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div>
        <div><h2>Projeto</h2>{navigation.slice(4).map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}<Link href="/privacidade">Privacidade</Link></div>
        <div><h2>Comunidade</h2><ExternalLink href={siteConfig.instagramUrl} eventName="social_click">Instagram</ExternalLink><ExternalLink href={siteConfig.youtubeUrl} eventName="social_click">YouTube</ExternalLink><ExternalLink href={siteConfig.whatsappUrl} eventName="whatsapp_click">WhatsApp</ExternalLink>{!siteConfig.whatsappUrl && <p className="muted-small">Canais oficiais serão adicionados antes do lançamento.</p>}</div>
      </div>
      <div className="shell footer-bottom"><span>© {new Date().getFullYear()} Projeto Pitagóricos</span><span>De alunos para alunos, em todo o Brasil.</span></div>
    </footer>
  );
}
