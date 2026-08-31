import Image from "next/image";
import { assetUrl } from "@/lib/assets";

type BrandLogoProps = {
  variant: "blue-on-light" | "white-on-dark";
  className?: string;
  priority?: boolean;
};

const logos = {
  "blue-on-light": "/brand/pitagoricos-blue-on-light-original.png",
  "white-on-dark": "/brand/pitagoricos-white-transparent.png",
} as const;

export function BrandLogo({ variant, className = "", priority = false }: BrandLogoProps) {
  return (
    <span className={`brand-logo-frame ${className}`.trim()}>
      <Image src={assetUrl(logos[variant])} width={1254} height={1254} alt="Projeto Pitagóricos" priority={priority} />
    </span>
  );
}
