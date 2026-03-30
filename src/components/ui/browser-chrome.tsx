import { type ReactNode } from "react";

export function BrowserChrome({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white rounded-xl shadow-[0_4px_40px_rgba(0,0,0,0.1)] overflow-hidden relative ${className}`}
    >
      <div className="flex items-center gap-2 px-4 py-3.5 bg-surface border-b border-border">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        <div className="flex-1 ml-3 px-3.5 py-1.5 bg-white border border-border rounded-md">
          <div className="flex items-center gap-1.5">
            <span className="text-muted text-[11px]">&#128274;</span>
            <div className="h-2 w-40 bg-border rounded" />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
