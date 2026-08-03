import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://pitagoricos.org.br";
  return ["", "/estude", "/materiais", "/impacto", "/parceiros", "/sobre", "/novidades", "/privacidade"].map((route, index) => ({ url: `${base}${route}`, changeFrequency: index === 0 ? "weekly" : "monthly", priority: index === 0 ? 1 : .8 }));
}
