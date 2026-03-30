import { Camera, Mic, AppWindow, Sun, FileText, LogOut, ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="text-center pt-20 pb-16 px-6 max-w-[800px] mx-auto">
      <h1 className="text-[56px] font-extrabold leading-[1.1] tracking-tight mb-5">
        Bug reporting that{" "}
        <span className="text-muted">developers actually love</span>
      </h1>
      <p className="text-lg text-muted leading-relaxed max-w-[520px] mx-auto mb-12">
        Record your screen, describe the bug with your voice, and let AI write
        the report. Devs get console logs, network requests, and a full replay.
      </p>
      <div className="flex justify-center">
        <ExtensionPopup />
      </div>
    </section>
  );
}

function ExtensionPopup() {
  return (
    <div className="w-[260px] bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.15)] p-4 text-left scale-125 origin-top">
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
        <button className="flex-1 h-10 bg-foreground text-white rounded-full text-sm font-medium flex items-center justify-center cursor-pointer hover:bg-[#333] transition-colors">
          Record tab
        </button>
      </div>

      <div className="w-full h-10 mt-2 rounded-full border border-border bg-white text-sm font-medium flex items-center justify-center gap-2 text-foreground">
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
        <div className="h-9 px-3 rounded-full border border-border flex items-center gap-1 text-sm text-muted">
          <span>My project</span>
          <ChevronDown size={12} />
        </div>
      </div>
    </div>
  );
}

function IconBtn({ children }: { children: React.ReactNode }) {
  return (
    <span className="w-7 h-7 rounded-md flex items-center justify-center text-muted">
      {children}
    </span>
  );
}
