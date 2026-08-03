"use client";

import type { ReactNode } from "react";

declare global {
  interface Window { plausible?: (event: string, options?: { props?: Record<string, string> }) => void; }
}

export function ExternalLink({ href, eventName, className = "", children }: { href?: string; eventName: string; className?: string; children: ReactNode }) {
  if (!href) return null;
  return <a className={className} href={href} target="_blank" rel="noreferrer" onClick={() => window.plausible?.(eventName)}>{children}<span className="external-mark" aria-hidden="true">↗</span><span className="sr-only"> (abre em nova aba)</span></a>;
}
