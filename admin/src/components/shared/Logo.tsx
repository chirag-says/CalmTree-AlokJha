import { Link } from "@tanstack/react-router";
import { SITE } from "@/data/constants";

interface LogoProps {
  /** Size variant — "sm" for footer, "md" for header */
  size?: "sm" | "md";
  /** If true, render as a plain div (no link) */
  static?: boolean;
  className?: string;
}

function LogoMark({ size = "md" }: { size: "sm" | "md" }) {
  const dim = size === "sm" ? "h-8 w-8" : "h-11 w-11";
  return (
    <img
      src={SITE.logoPath}
      alt={`${SITE.name} logo`}
      className={`${dim} rounded-full object-cover`}
      width={size === "sm" ? 32 : 44}
      height={size === "sm" ? 32 : 44}
    />
  );
}

export function Logo({ size = "md", static: isStatic, className = "" }: LogoProps) {
  const content = (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark size={size} />
      <span className="font-semibold text-xl tracking-tight">{SITE.name}</span>
    </span>
  );

  if (isStatic) return content;

  return (
    <Link to="/" className="group" aria-label={`${SITE.name} home`}>
      {content}
    </Link>
  );
}
