"use client";

import { Camera, Mic, AppWindow, Sun, FileText, LogOut, ChevronDown } from "lucide-react";
import { caveat } from "@/lib/fonts";
import { buildArrowHeadPath } from "@/lib/arrow-utils";

export function Hero() {
  return (
    <section className="text-center pt-12 pb-16 md:pt-20 md:pb-32 px-6 max-w-[800px] mx-auto overflow-x-clip">
      <h1 className="text-3xl md:text-[56px] font-extrabold leading-[1.15] md:leading-[1.1] tracking-tight mb-4 md:mb-5">
        Report bugs in seconds.{" "}
        <span className="text-muted">Devs reproduce and fix them in minutes.</span>
      </h1>
      <p className="text-base md:text-lg text-muted leading-relaxed max-w-[520px] mx-auto mb-8 md:mb-12">
        Record your screen, describe the bug with your voice, and let AI write
        the report. Devs get console logs, network requests, and a full replay.
      </p>
      <div className="flex justify-center">
        <div className="relative">
          <ExtensionPopup />
          <HandDrawnHint />
        </div>
      </div>
    </section>
  );
}

function ExtensionPopup() {
  return (
    <div className="w-[260px] bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.15)] p-4 text-left scale-110 sm:scale-125 origin-top select-none">
      <div className="flex justify-between items-center mb-4">
        <span className="font-semibold text-base tracking-tight">meetio</span>
        <div className="flex gap-1">
          <IconBtn><Sun size={14} /></IconBtn>
          <IconBtn><FileText size={14} /></IconBtn>
          <IconBtn><LogOut size={14} /></IconBtn>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="w-10 h-10 rounded-full border border-border bg-white flex items-center justify-center text-muted shrink-0">
          <AppWindow size={16} />
        </div>
        <button
          className="flex-1 h-10 bg-foreground text-white rounded-full text-sm font-medium flex items-center justify-center cursor-pointer hover:bg-[#333] transition-colors"
          onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth", block: "start" })}
        >
          Record tab
        </button>
      </div>

      <div className="w-full h-10 mt-2 rounded-full border border-border bg-white text-sm font-medium flex items-center justify-center gap-2 text-foreground cursor-default select-none">
        <Camera size={14} />
        Take screenshot
      </div>

      <div className="flex items-center justify-between mt-3 px-1">
        <div className="flex items-center gap-2">
          <Mic size={14} className="text-muted" />
          <div className="w-11 h-6 bg-foreground rounded-full relative">
            <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm" />
          </div>
        </div>
        <div className="h-9 px-3 rounded-full border border-border flex items-center gap-1 text-sm text-muted cursor-default select-none">
          <span>My project</span>
          <ChevronDown size={12} />
        </div>
      </div>
    </div>
  );
}

const HEAD_D = buildArrowHeadPath(54, 55, 83, 44, 17);

function ArrowSvg() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
      <path d="M93 110 C106 44, 83 44, 54 55" stroke="#111" strokeWidth="1.8" strokeLinecap="round" />
      <path d={HEAD_D} stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HandDrawnHint() {
  return (
    <>
      <div className="absolute z-20 scale-75 origin-top-right sm:hidden" style={{ top: "45px", right: "-114px" }}>
        <ArrowSvg />
      </div>
      <span className={`${caveat.className} absolute z-20 text-[#555] scale-75 origin-top-right sm:hidden`} style={{ top: "124px", right: "-56px", fontSize: "27px" }}>
        try it!
      </span>
      <div className="absolute z-20 hidden sm:block" style={{ top: "43px", right: "-170px" }}>
        <ArrowSvg />
      </div>
      <span className={`${caveat.className} absolute z-20 text-[#555] hidden sm:block`} style={{ top: "146px", right: "-94px", fontSize: "27px" }}>
        try it!
      </span>
    </>
  );
}

function IconBtn({ children }: { children: React.ReactNode }) {
  return (
    <span aria-hidden="true" className="w-7 h-7 rounded-md flex items-center justify-center text-muted">
      {children}
    </span>
  );
}
