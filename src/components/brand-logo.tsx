import Image from "next/image";
import { BRAND_LOGO_INVERSE_SVG, BRAND_LOGO_SVG, BRAND_NAME } from "@/lib/brand";

type BrandLogoProps = {
  className?: string;
  iconSize?: number;
  textClassName?: string;
  variant?: "default" | "inverse";
};

export function BrandLogo({
  className = "",
  iconSize = 24,
  textClassName = "font-bold text-lg",
  variant = "default",
}: BrandLogoProps) {
  const logoSrc = variant === "inverse" ? BRAND_LOGO_INVERSE_SVG : BRAND_LOGO_SVG;

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Image
        src={logoSrc}
        alt=""
        aria-hidden="true"
        width={iconSize}
        height={iconSize}
        unoptimized
        className="shrink-0"
      />
      <span className={textClassName}>{BRAND_NAME}</span>
    </span>
  );
}
