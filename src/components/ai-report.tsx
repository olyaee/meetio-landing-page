"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/ui/section";
import { AiReportHeading } from "@/components/ai-report-heading";

const AI_REPORT_CHUNKS = [
  { tag: "h3", text: "Modal dialog cannot be dismissed" },
  { tag: "p", text: "The modal dialog component does not close when the user clicks the close button (X) or clicks outside the modal backdrop." },
  { tag: "label", text: "Steps to Reproduce:" },
  { tag: "step", text: "1. Navigate to any page that triggers a modal" },
  { tag: "step", text: "2. Click the X button in the top-right corner" },
  { tag: "step", text: "3. Modal remains open" },
  { tag: "step", text: "4. Click anywhere on the backdrop overlay" },
  { tag: "step", text: "5. Modal still remains open" },
  { tag: "label", text: "Expected Behavior:" },
  { tag: "p", text: "Modal should close when clicking X or outside." },
  { tag: "label", text: "Actual Behavior:" },
  { tag: "p", text: "Modal blocks all interaction. Only a page refresh dismisses it." },
  { tag: "error", text: "TypeError: Cannot read property 'close' of undefined" },
];

function MacOsDots() {
  return (
    <div className="flex gap-1.5 px-4 pt-3">
      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
      <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
      <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
    </div>
  );
}

function StreamedReport({ started, className = "" }: { started: boolean; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ranRef = useRef(false);

  useEffect(() => {
    if (!started || ranRef.current) return;
    ranRef.current = true;

    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;

    let chunkIdx = 0;
    let wordIdx = 0;
    let currentEl: HTMLElement | null = null;
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      if (chunkIdx >= AI_REPORT_CHUNKS.length || !container) return;

      const chunk = AI_REPORT_CHUNKS[chunkIdx];
      const words = chunk.text.split(" ");

      if (wordIdx === 0) {
        currentEl = document.createElement("div");
        if (chunk.tag === "h3") currentEl.className = isMobile ? "text-sm font-semibold text-[#222] mb-2" : "text-lg font-semibold text-[#222] mb-3";
        else if (chunk.tag === "label") currentEl.className = isMobile ? "font-semibold text-[10px] text-[#333] mt-2 mb-0.5" : "font-semibold text-xs text-[#333] mt-4 mb-1";
        else if (chunk.tag === "step") currentEl.className = isMobile ? "pl-3 text-[10px]" : "pl-[18px]";
        else if (chunk.tag === "error") currentEl.className = isMobile ? "bg-red-50 border border-red-100 rounded px-2 py-1 mt-2 font-mono text-[9px] text-red-600" : "bg-red-50 border border-red-100 rounded-md px-2.5 py-1.5 mt-3.5 font-mono text-[11px] text-red-600";
        else currentEl.className = isMobile ? "mt-0.5 text-[10px]" : "mt-0.5";
        container.appendChild(currentEl);
      }

      wordIdx++;
      if (currentEl) currentEl.textContent = words.slice(0, wordIdx).join(" ");

      if (wordIdx >= words.length) {
        chunkIdx++;
        wordIdx = 0;
        timer = setTimeout(tick, 80);
      } else {
        timer = setTimeout(tick, 30);
      }
    }

    tick();
    return () => clearTimeout(timer);
  }, [started]);

  return (
    <div
      ref={containerRef}
      className={`text-[13px] text-[#555] leading-[1.7] overflow-hidden ${className}`}
    />
  );
}

export function AiReport() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Section>
      <AiReportHeading />

      <div
        ref={sectionRef}
        className="relative flex justify-center items-start px-2 md:px-0"
      >
        {/* Transcript card */}
        <div className="w-[55%] md:w-[340px] z-[1] mt-16 md:mt-[70px] shrink-0 -ml-2 md:ml-0">
          <p className="text-xs md:text-base font-semibold text-[#333] mb-2 md:mb-3 text-center pr-[20%] md:pr-0">
            Your Transcript
          </p>
          <div className="bg-white border border-border rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-hidden">
            <MacOsDots />
            <div className="p-3 md:p-5 min-h-[100px] md:min-h-[160px]">
              <p className="text-[11px] md:text-[15px] text-[#555] leading-[1.7] md:leading-[1.9] italic">
                &ldquo;this modal won&apos;t close... i clicked the X button,
                clicked outside, nothing works... have to refresh every
                time...&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Chevron — desktop only */}
        <div className="hidden md:flex shrink-0 text-[#ccc] text-2xl z-[3] mx-5 mt-44 items-start">
          &#8250;
        </div>

        {/* AI enhanced card — overlaps on mobile */}
        <div className="w-[60%] md:w-[480px] z-[2] shrink-0 -ml-[15%] md:ml-0">
          <p className="text-sm md:text-base font-semibold text-[#333] mb-2 md:mb-3 text-center md:text-center">
            <span className="text-purple-500">&#10024;</span> AI enhanced
          </p>
          <div className="bg-white border border-border rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] overflow-hidden">
            <MacOsDots />
            <div className="p-3 md:px-6 md:py-5">
              <StreamedReport started={started} className="h-[280px] md:h-[400px] overflow-y-auto text-[11px] md:text-[13px]" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
