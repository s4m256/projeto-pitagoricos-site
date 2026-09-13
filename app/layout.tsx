/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PlausibleAnalytics } from "@/components/PlausibleAnalytics";
import { assetUrl } from "@/lib/assets";
import { AuthProvider } from "@/components/AuthProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://pitagoricos.com.br"),
  title: { default: "Projeto Pitagóricos", template: "%s | Projeto Pitagóricos" },
  description: "Formação gratuita para olimpíadas científicas, feita de estudantes para estudantes.",
  icons: { icon: assetUrl("/favicon.png") },
  openGraph: { title: "Projeto Pitagóricos", description: "Preparação gratuita para olimpíadas científicas, feita por estudantes.", type: "website", locale: "pt_BR", images: [{ url: "/brand/pitagoricos-white-on-dark-original.png", width: 1254, height: 1254, alt: "Projeto Pitagóricos" }] },
  twitter: { card: "summary", title: "Projeto Pitagóricos", description: "Preparação gratuita para olimpíadas científicas.", images: ["/brand/pitagoricos-white-on-dark-original.png"] },
};

export const viewport: Viewport = { themeColor: "#071d40", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = { "@context": "https://schema.org", "@type": "EducationalOrganization", name: "Projeto Pitagóricos", foundingDate: "2022", areaServed: "Brasil", description: "Iniciativa brasileira de formação gratuita para olimpíadas científicas." };
  const cloudflareAnalyticsToken = process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN;
  return <html lang="pt-BR"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@500;600;700&display=swap" rel="stylesheet"/></head><body><AuthProvider><Header />{children}<Footer /><PlausibleAnalytics /></AuthProvider><Analytics />{cloudflareAnalyticsToken && <Script src="https://static.cloudflareinsights.com/beacon.min.js" strategy="afterInteractive" data-cf-beacon={JSON.stringify({ token: cloudflareAnalyticsToken })} />}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></body></html>;
}
