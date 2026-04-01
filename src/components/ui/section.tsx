import { type ReactNode } from "react";

export function Section({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`px-6 py-12 md:py-24 max-w-[1100px] mx-auto ${className}`}>
      {children}
    </section>
  );
}

export function SectionDivider() {
  return <div className="h-px bg-border max-w-[1100px] mx-auto" />;
}
