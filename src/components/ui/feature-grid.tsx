import { type ReactNode } from "react";

export function FeatureGrid({
  children,
  reverse = false,
}: {
  children: ReactNode;
  reverse?: boolean;
}) {
  return (
    <div
      className={`flex gap-15 items-center ${reverse ? "flex-row-reverse" : ""}`}
    >
      {children}
    </div>
  );
}

export function FeatureText({ children }: { children: ReactNode }) {
  return <div className="flex-1">{children}</div>;
}

export function FeatureVisual({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex-1 bg-surface border border-border rounded-xl p-6 min-h-[300px] ${className}`}
    >
      {children}
    </div>
  );
}
