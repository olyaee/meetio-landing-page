import { type ReactNode } from "react";

export function Section({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`px-6 py-12 md:py-24 max-w-[1100px] mx-auto ${className}`}>
      {children}
    </div>
  );
}

export function SectionDivider() {
  return <div className="h-px bg-border max-w-[1100px] mx-auto" />;
}
