/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PlausibleAnalytics } from "@/components/PlausibleAnalytics";
import { assetUrl } from "@/lib/assets";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://pitagoricos.org.br"),
  title: { default: "Projeto Pitagóricos", template: "%s | Projeto Pitagóricos" },
  description: "Formação gratuita para olimpíadas científicas, feita de estudantes para estudantes.",
  icons: { icon: assetUrl("/logo-rocket.png"), apple: assetUrl("/logo-rocket.png") },
  openGraph: { title: "Projeto Pitagóricos", description: "Preparação gratuita para olimpíadas científicas, feita por estudantes.", type: "website", locale: "pt_BR", images: [{ url: "/og.png", width: 1728, height: 909, alt: "Projeto Pitagóricos" }] },
  twitter: { card: "summary_large_image", title: "Projeto Pitagóricos", description: "Preparação gratuita para olimpíadas científicas.", images: ["/og.png"] },
};

export const viewport: Viewport = { themeColor: "#071d40", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = { "@context": "https://schema.org", "@type": "EducationalOrganization", name: "Projeto Pitagóricos", foundingDate: "2022", areaServed: "Brasil", description: "Iniciativa brasileira de formação gratuita para olimpíadas científicas." };
  return <html lang="pt-BR"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@500;600;700&display=swap" rel="stylesheet"/></head><body><Header />{children}<Footer /><PlausibleAnalytics /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></body></html>;
}
