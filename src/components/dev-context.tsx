"use client";

import { useState } from "react";
import { Section } from "@/components/ui/section";
import { FeatureGrid, FeatureText, FeatureVisual } from "@/components/ui/feature-grid";

type DevTab = "events" | "network" | "environment";

const CONSOLE_LINES = [
  { time: "0:00.12", level: "log" as const, msg: "[App] Mounting modal component" },
  { time: "0:01.34", level: "info" as const, msg: "[Auth] Session refreshed, token valid" },
  { time: "0:04.87", level: "warn" as const, msg: "[Modal] closeHandler ref is null, fallback skipped" },
  { time: "0:05.02", level: "error" as const, msg: "TypeError: Cannot read property 'close' of undefined", isError: true },
  { time: "", level: "error" as const, msg: "at Modal.handleClose (modal.tsx:47)", isTrace: true },
  { time: "", level: "error" as const, msg: "at HTMLButtonElement.onclick (modal.tsx:12)", isTrace: true },
  { time: "0:07.91", level: "click" as const, msg: "button.btn-close — \"×\" (modal.tsx:12)" },
  { time: "0:08.03", level: "log" as const, msg: "[App] User clicked outside modal, backdrop handler fired" },
];

const NETWORK_ROWS = [
  { time: "0:00.08", method: "GET" as const, status: 200, url: "/api/v1/user/profile", duration: "45ms" },
  { time: "0:00.15", method: "GET" as const, status: 200, url: "/api/v1/user/preferences", duration: "32ms" },
  { time: "0:05.01", method: "POST" as const, status: 500, url: "/api/v1/modal/confirm", duration: "1.2s" },
  { time: "0:05.50", method: "GET" as const, status: 200, url: "/api/v1/auth/session", duration: "18ms" },
  { time: "0:07.93", method: "POST" as const, status: 404, url: "/api/v1/modal/dismiss", duration: "89ms" },
  { time: "0:08.10", method: "GET" as const, status: 200, url: "/api/v1/feature-flags", duration: "22ms" },
];

const LEVEL_STYLES: Record<string, string> = {
  log: "bg-[#f5f5f5] text-[#888]",
  info: "bg-blue-50 text-blue-600",
  warn: "bg-amber-50 text-amber-600",
  error: "bg-red-50 text-red-600",
  click: "bg-purple-50 text-purple-600",
};

function methodColor(m: string) {
  return m === "GET" ? "text-blue-600" : "text-green-600";
}

function statusStyle(s: number) {
  return s >= 400 ? "text-red-600 bg-red-50" : "text-green-600 bg-green-50";
}

function EventsTab() {
  return (
    <div className="p-4">
      {CONSOLE_LINES.map((line, i) => (
        <div key={i} className="flex items-start gap-2.5 px-2 py-1.5 border-b border-[#f5f5f5] font-mono text-[11px] rounded hover:bg-[#fafafa] transition-colors">
          <span className="text-muted shrink-0 min-w-[52px]">{line.time}</span>
          <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-wide shrink-0 ${LEVEL_STYLES[line.level]}`}>
            {line.level}
          </span>
          <span className={line.isError ? "text-red-600" : line.isTrace ? "text-muted pl-1" : "text-[#333]"}>
            {line.msg}
          </span>
        </div>
      ))}
    </div>
  );
}

function NetworkTab() {
  return (
    <div className="p-4">
      <div className="flex px-2 py-2 text-[11px] font-semibold text-muted uppercase tracking-wide border-b border-border">
        <span className="w-14 shrink-0">Time</span>
        <span className="w-14 shrink-0">Method</span>
        <span className="w-14 shrink-0">Status</span>
        <span className="flex-1 px-3">URL</span>
        <span className="w-[50px] shrink-0">Duration</span>
      </div>
      {NETWORK_ROWS.map((row, i) => (
        <div key={i} className="flex items-center px-2 py-2 border-b border-[#f5f5f5] text-xs rounded hover:bg-[#fafafa] transition-colors">
          <span className="text-muted w-14 shrink-0 font-mono text-[11px]">{row.time}</span>
          <span className={`w-14 shrink-0 font-semibold font-mono text-[11px] ${methodColor(row.method)}`}>{row.method}</span>
          <span className={`w-14 shrink-0 text-[11px] font-semibold px-1.5 py-0.5 rounded font-mono ${statusStyle(row.status)}`}>
            {row.status}
          </span>
          <span className="flex-1 text-[#555] overflow-hidden text-ellipsis whitespace-nowrap px-3 font-mono text-[11px]">{row.url}</span>
          <span className="text-muted w-[50px] shrink-0 font-mono text-[11px]">{row.duration}</span>
        </div>
      ))}
    </div>
  );
}

function EnvironmentTab() {
  return (
    <div className="p-4 overflow-y-auto max-h-[330px]">
      <EnvSection title="Device">
        <EnvRow label="Browser" value="Chrome 122.0.6261.94" />
        <EnvRow label="OS" value="macOS 14.3.1 (Sonoma)" />
        <EnvRow label="Device" value="Desktop" />
      </EnvSection>
      <EnvSection title="Page">
        <EnvRow label="URL" value="app.acme.com/settings/profile" mono />
        <EnvRow label="Title" value="Account Settings - Acme" />
      </EnvSection>
      <EnvSection title="Screen">
        <EnvRow label="Resolution" value="2880 x 1800" mono />
        <EnvRow label="Viewport" value="1440 x 900" mono />
        <EnvRow label="Pixel Ratio" value="2x" mono />
      </EnvSection>
      <EnvSection title="Performance">
        <PerfRow label="FCP" value="0.8s" percent={30} variant="good" />
        <PerfRow label="DOM Load" value="1.2s" percent={45} variant="good" />
        <PerfRow label="Page Load" value="2.4s" percent={70} variant="ok" />
      </EnvSection>
    </div>
  );
}

function EnvSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <div className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-2 pb-1.5 border-b border-[#f0f0f0]">
        {title}
      </div>
      {children}
    </div>
  );
}

function EnvRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex py-1 gap-3 text-[13px]">
      <span className="text-muted w-[110px] shrink-0">{label}</span>
      <span className={mono ? "font-mono text-xs text-[#333]" : "text-[#333]"}>{value}</span>
    </div>
  );
}

function PerfRow({ label, value, percent, variant }: { label: string; value: string; percent: number; variant: "good" | "ok" }) {
  return (
    <div className="flex items-center py-1 gap-3 text-[13px]">
      <span className="text-muted w-[110px] shrink-0">{label}</span>
      <span className="font-mono text-xs text-[#333]">{value}</span>
      <div className="h-1.5 rounded-full bg-[#eee] flex-1 max-w-[140px] overflow-hidden mt-0.5">
        <div
          className={`h-full rounded-full ${variant === "good" ? "bg-green-600" : "bg-amber-600"}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

const DEV_TABS: { id: DevTab; label: string }[] = [
  { id: "events", label: "Events" },
  { id: "network", label: "Network" },
  { id: "environment", label: "Environment" },
];

function DevPanel() {
  const [activeTab, setActiveTab] = useState<DevTab>("events");

  return (
    <div className="h-[440px] overflow-hidden">
      <div className="flex border-b border-border px-5">
        {DEV_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-[13px] font-medium border-b-2 transition-colors cursor-pointer ${
              activeTab === tab.id
                ? "text-foreground border-foreground"
                : "text-muted border-transparent hover:text-[#555]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab === "events" && <EventsTab />}
      {activeTab === "network" && <NetworkTab />}
      {activeTab === "environment" && <EnvironmentTab />}
    </div>
  );
}

export function DevContext() {
  return (
    <Section>
      <div className="hidden md:block">
        <FeatureGrid>
          <FeatureVisual className="!p-0 overflow-hidden">
            <DevPanel />
          </FeatureVisual>
          <FeatureText>
            <h2 className="text-4xl font-extrabold leading-[1.15] tracking-tight mb-4">
              Developers get{" "}
              <span className="text-muted">everything they need</span>
            </h2>
            <p className="text-base text-muted leading-relaxed mb-6">
              Every bug report includes console logs, network requests, environment
              info, and a full replay. No more &ldquo;can you send me a
              reproduce.&rdquo;
            </p>
            <ul className="space-y-4 mt-2">
              {[
                "Console logs with stack traces",
                "Network requests with status codes and timing",
                "Browser, OS, viewport, and performance metrics",
                "Full replay to see exactly what happened",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-[#444] leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground shrink-0 mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </FeatureText>
        </FeatureGrid>
      </div>

      <div className="md:hidden">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold leading-tight tracking-tight mb-2">
            Developers get{" "}
            <span className="text-muted">everything they need</span>
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            Console logs, network requests, environment info, and a full replay.
          </p>
        </div>
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <DevPanel />
        </div>
      </div>
    </Section>
  );
}
