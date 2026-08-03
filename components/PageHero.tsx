import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return <section className="page-hero"><div className="orbit orbit-a" aria-hidden="true"/><div className="orbit orbit-b" aria-hidden="true"/><div className="shell page-hero-inner"><p className="eyebrow light">{eyebrow}</p><h1>{title}</h1><p className="page-lede">{description}</p>{children && <div className="hero-actions">{children}</div>}</div></section>;
}
