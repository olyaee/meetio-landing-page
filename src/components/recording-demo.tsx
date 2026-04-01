"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Pencil, EyeOff, Square, RotateCcw } from "lucide-react";
import { Section } from "@/components/ui/section";
import { BrowserChrome } from "@/components/ui/browser-chrome";
import { VerticalTimeline } from "@/components/vertical-timeline";

// ── Constants ──

const TRANSCRIPT =
  "this modal won't close... I clicked the X button, clicked outside, nothing works...";
const CHAR_INTERVAL = 50;
const STROKE_FADE_DELAY = 3000;
const STROKE_FADE_DURATION = 600;

// ── Subcomponents ──

function WireframeSidebar() {
  return (
    <div className="w-[200px] bg-[#fafafa] border-r border-[#f0f0f0] p-5 pl-4 shrink-0">
      <div className="h-2.5 w-[70px] bg-[#d5d5d5] rounded-[5px] mb-7" />
      {[
        { w: "w-[60%]", active: true },
        { w: "w-[80%]" },
        { w: "w-[50%]" },
        { w: "w-[70%]" },
      ].map((item, i) => (
        <div
          key={i}
          className={`flex items-center gap-2.5 px-2.5 py-2 mb-1 rounded-md ${item.active ? "bg-[#f0f0f0]" : ""}`}
        >
          <div
            className={`w-4 h-4 rounded shrink-0 ${item.active ? "bg-[#bbb]" : "bg-[#d5d5d5]"}`}
          />
          <div
            className={`h-2 rounded ${item.w} ${item.active ? "bg-[#c0c0c0]" : "bg-[#e0e0e0]"}`}
          />
        </div>
      ))}
      <div className="h-px bg-[#eee] my-3" />
      {[{ w: "w-[60%]" }, { w: "w-[80%]" }].map((item, i) => (
        <div key={i} className="flex items-center gap-2.5 px-2.5 py-2 mb-1 rounded-md">
          <div className="w-4 h-4 rounded bg-[#d5d5d5] shrink-0" />
          <div className={`h-2 rounded bg-[#e0e0e0] ${item.w}`} />
        </div>
      ))}
    </div>
  );
}

function WireframeTopbar() {
  return (
    <div className="flex items-center justify-between px-6 py-3.5 border-b border-[#f0f0f0]">
      <div className="flex items-center gap-3">
        <div className="h-2 w-[50px] bg-[#e5e5e5] rounded" />
        <span className="text-[#ddd] text-xs">/</span>
        <div className="h-2 w-[70px] bg-[#ccc] rounded" />
      </div>
      <div className="flex items-center gap-3.5">
        <div className="w-[18px] h-[18px] rounded bg-[#e8e8e8]" />
        <div className="w-[18px] h-[18px] rounded bg-[#e8e8e8]" />
        <div className="w-7 h-7 rounded-full bg-[#d5d5d5]" />
      </div>
    </div>
  );
}

function WireframeContent() {
  return (
    <div className="p-7 px-6 flex-1">
      <div className="h-3.5 w-[180px] bg-[#d5d5d5] rounded-md mb-1.5" />
      <div className="h-2 w-[260px] bg-[#eee] rounded mb-6" />
      {/* Tabs */}
      <div className="flex gap-0 mb-6 border-b border-[#f0f0f0]">
        {[true, false, false].map((active, i) => (
          <div key={i} className="py-2.5 px-4 relative">
            <div
              className={`h-2 w-[50px] rounded ${active ? "bg-[#bbb]" : "bg-[#e5e5e5]"}`}
            />
            {active && (
              <div className="absolute bottom-[-1px] left-4 right-4 h-0.5 bg-[#bbb] rounded-sm" />
            )}
          </div>
        ))}
      </div>
      {/* Form rows */}
      <FormRow fields={[{ tw: "w-[60%]" }, { tw: "w-[40%]" }]} />
      <FormRow fields={[{ tw: "w-[80%]" }]} />
      <FormRow fields={[{ tw: "w-[60%]" }]} />
      <FormRow fields={[{ tw: "w-[70%]" }, { tw: "w-[60%]" }]} />
      {/* Buttons */}
      <div className="flex gap-2.5 mt-6">
        <div className="h-[34px] w-[100px] bg-[#d5d5d5] rounded-md flex items-center justify-center">
          <div className="h-2 w-[50px] bg-[#bbb] rounded" />
        </div>
        <div className="h-[34px] w-[80px] bg-[#f0f0f0] border border-[#e5e5e5] rounded-md flex items-center justify-center">
          <div className="h-2 w-[50px] bg-[#d5d5d5] rounded" />
        </div>
      </div>
    </div>
  );
}

function FormRow({ fields }: { fields: { tw: string }[] }) {
  return (
    <div className="flex gap-5 mb-5">
      {fields.map((f, i) => (
        <div key={i} className="flex-1">
          <div className="h-1.5 w-[60px] bg-[#e5e5e5] rounded-sm mb-2" />
          <div className="h-9 bg-[#fafafa] border border-[#eee] rounded-md relative">
            <div
              className={`absolute top-1/2 left-3 -translate-y-1/2 h-2 bg-[#ddd] rounded ${f.tw}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

interface ModalFieldProps {
  label: string;
  value: string;
  blurred: boolean;
  blurMode: boolean;
  onToggle: () => void;
}

function ModalField({ label, value, blurred, blurMode, onToggle }: ModalFieldProps) {
  return (
    <div
      className={`flex items-center py-2.5 border-b border-[#f0f0f0] last:border-b-0 ${
        blurMode ? "cursor-pointer" : ""
      }`}
      onClick={blurMode ? onToggle : undefined}
    >
      <span className="text-xs text-muted w-[50px] shrink-0">{label}</span>
      <span
        className={`text-sm text-foreground transition-[filter] duration-300 ${blurred ? "blur-[6px]" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

function Waveform() {
  const heights = [8, 14, 10, 16, 8];
  const delays = [0, 0.1, 0.2, 0.3, 0.4];
  return (
    <span className="inline-flex items-center gap-0.5 mr-2 align-middle">
      {heights.map((h, i) => (
        <span
          key={i}
          className="inline-block w-[3px] bg-white rounded-sm animate-[wave_0.6s_ease-in-out_infinite]"
          style={{
            height: `${h}px`,
            animationDelay: `${delays[i]}s`,
          }}
        />
      ))}
    </span>
  );
}

// ── Cursor animation helpers ──

function moveCursorTo(
  cursorEl: HTMLDivElement,
  x: number,
  y: number,
  duration: number,
): Promise<void> {
  return new Promise((resolve) => {
    cursorEl.style.transition = `left ${duration}ms ease-in-out, top ${duration}ms ease-in-out`;
    cursorEl.style.left = `${x}px`;
    cursorEl.style.top = `${y}px`;
    setTimeout(resolve, duration);
  });
}

function showClick(
  containerEl: HTMLDivElement,
  x: number,
  y: number,
) {
  const ripple = document.createElement("div");
  ripple.style.cssText = `
    position:absolute;width:30px;height:30px;border:2px solid rgba(0,0,0,0.2);
    border-radius:50%;pointer-events:none;z-index:6;
    left:${x - 15}px;top:${y - 15}px;
    animation:clickRipple 0.6s ease-out forwards;
  `;
  containerEl.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

function wait(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

// ── Stroke layer (fading canvas) ──

interface StrokeLayer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

function createStrokeLayer(container: HTMLDivElement): StrokeLayer {
  const dpr = window.devicePixelRatio || 1;
  const c = document.createElement("canvas");
  c.style.position = "absolute";
  c.style.top = "0";
  c.style.left = "0";
  c.style.pointerEvents = "none";
  c.style.zIndex = "7";
  c.style.opacity = "1";
  c.style.transition = `opacity ${STROKE_FADE_DURATION}ms ease-out`;
  c.width = container.offsetWidth * dpr;
  c.height = container.offsetHeight * dpr;
  c.style.width = `${container.offsetWidth}px`;
  c.style.height = `${container.offsetHeight}px`;
  const sCtx = c.getContext("2d")!;
  sCtx.scale(dpr, dpr);
  sCtx.strokeStyle = "#e53935";
  sCtx.lineWidth = 3;
  sCtx.lineCap = "round";
  container.appendChild(c);
  return { canvas: c, ctx: sCtx };
}

function fadeStrokeLayer(canvas: HTMLCanvasElement) {
  setTimeout(() => {
    canvas.style.opacity = "0";
    setTimeout(() => canvas.remove(), STROKE_FADE_DURATION);
  }, STROKE_FADE_DELAY);
}

// ── Main component ──

export function RecordingDemo() {
  // ── State ──
  const [showModal, setShowModal] = useState(false);
  const [showToolbar, setShowToolbar] = useState(false);
  const [showVoice, setShowVoice] = useState(false);
  const [showBugLabel, setShowBugLabel] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [recording, setRecording] = useState(false);
  const [drawMode, setDrawMode] = useState(false);
  const [blurMode, setBlurMode] = useState(false);
  const [blurredFields, setBlurredFields] = useState<Record<string, boolean>>({});
  const [transcript, setTranscript] = useState("");
  const [phase, setPhase] = useState<"idle" | "capture" | "blur" | "report">("idle");
  const [step1Progress, setStep1Progress] = useState(0);
  const [blurDrawUsed, setBlurDrawUsed] = useState(false);
  const [stopPressed, setStopPressed] = useState(false);
  const [timerText, setTimerText] = useState("00:00");
  const [drawCanvasActive, setDrawCanvasActive] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showDrawHint, setShowDrawHint] = useState(false);
  const [showDrawGuide, setShowDrawGuide] = useState(false);

  // ── Refs ──
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLDivElement>(null);
  const hitCanvasRef = useRef<HTMLCanvasElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transcriptRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const secondsRef = useRef(0);
  const drawingRef = useRef(false);
  const activeStrokeRef = useRef<StrokeLayer | null>(null);
  const sequenceIdRef = useRef(0);
  const strokeLayersRef = useRef<HTMLCanvasElement[]>([]);
  const hintTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Mobile detection ──
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Cleanup on unmount ──
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (transcriptRef.current) clearInterval(transcriptRef.current);
      if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
      sequenceIdRef.current++;
    };
  }, []);

  // ── IntersectionObserver: auto-start ──
  useEffect(() => {
    if (hasStarted) return;
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
          startSequence();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasStarted]);

  // ── Setup hit canvas for drawing ──
  const setupHitCanvas = useCallback(() => {
    const hitCanvas = hitCanvasRef.current;
    const container = contentRef.current;
    if (!hitCanvas || !container) return;
    const dpr = window.devicePixelRatio || 1;
    hitCanvas.width = container.offsetWidth * dpr;
    hitCanvas.height = container.offsetHeight * dpr;
    hitCanvas.style.width = `${container.offsetWidth}px`;
    hitCanvas.style.height = `${container.offsetHeight}px`;
  }, []);

  // ── Timer ──
  const startTimer = useCallback(() => {
    secondsRef.current = 0;
    setTimerText("00:00");
    timerRef.current = setInterval(() => {
      secondsRef.current++;
      const m = String(Math.floor(secondsRef.current / 60)).padStart(2, "0");
      const s = String(secondsRef.current % 60).padStart(2, "0");
      setTimerText(`${m}:${s}`);
    }, 1000);
  }, []);

  // ── Transcript typing ──
  const startTranscript = useCallback(() => {
    let idx = 0;
    setTranscript("");
    transcriptRef.current = setInterval(() => {
      if (idx < TRANSCRIPT.length) {
        idx++;
        setTranscript(TRANSCRIPT.substring(0, idx));
      } else {
        if (transcriptRef.current) clearInterval(transcriptRef.current);
      }
    }, CHAR_INTERVAL);
  }, []);

  // ── Main animated sequence ──
  const startSequence = useCallback(async () => {
    const myId = ++sequenceIdRef.current;
    setRecording(true);
    setShowToolbar(true);
    setupHitCanvas();
    startTimer();

    const check = () => {
      if (sequenceIdRef.current !== myId) throw new Error("aborted");
    };

    try {
      setPhase("capture");
      // Start smooth progress — will animate via CSS transition
      requestAnimationFrame(() => setStep1Progress(100));

      // Show voice transcript immediately
      setShowVoice(true);
      startTranscript();

      // Show modal
      await wait(500);
      check();
      setShowModal(true);

      // Get positions
      await wait(400);
      check();
      const container = contentRef.current;
      const closeBtn = closeBtnRef.current;
      if (!container || !closeBtn) return;
      const contentRect = container.getBoundingClientRect();
      const closeRect = closeBtn.getBoundingClientRect();
      const closeX = closeRect.left - contentRect.left + closeRect.width / 2;
      const closeY = closeRect.top - contentRect.top + closeRect.height / 2;

      const cursor = cursorRef.current;
      if (!cursor) return;
      cursor.style.transition = "none";
      cursor.style.left = "350px";
      cursor.style.top = "280px";
      setCursorVisible(true);

      await wait(50);
      check();

      // Click #1
      await moveCursorTo(cursor, closeX, closeY, 700);
      check();
      await wait(150);
      check();
      showClick(container, closeX, closeY);

      // Click #2
      await wait(500);
      check();
      showClick(container, closeX, closeY);

      // Click #3 — outside
      await wait(400);
      check();
      await moveCursorTo(cursor, 280, 360, 400);
      check();
      await wait(100);
      check();
      showClick(container, 280, 360);

      // Click #4 — frustrated
      await wait(300);
      check();
      await moveCursorTo(cursor, closeX, closeY, 250);
      check();
      await wait(60);
      check();
      showClick(container, closeX, closeY);

      // Bug is clear
      await wait(300);
      check();
      setShowBugLabel(true);
      setCursorVisible(false);

      // Wait for transcript to finish
      await wait(TRANSCRIPT.length * CHAR_INTERVAL + 500);
      check();

      // Step 1 complete, move to step 2
      setPhase("blur");

    } catch {
      // aborted
    }
  }, [setupHitCanvas, startTimer, startTranscript]);

  // ── Draw / Blur toggle ──
  const handleToggleDraw = useCallback(() => {
    if (isMobile) {
      setShowDrawHint(true);
      if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
      hintTimeoutRef.current = setTimeout(() => setShowDrawHint(false), 1000);
      return;
    }
    setDrawMode((prev) => {
      const next = !prev;
      setBlurMode(false);
      setDrawCanvasActive(next);
      if (next) {
        setShowDrawGuide(true);
        if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
        hintTimeoutRef.current = setTimeout(() => setShowDrawGuide(false), 1000);
        setBlurDrawUsed(true);
        setPhase((p) => p === "blur" || p === "capture" ? "report" : p);
      } else {
        setShowDrawGuide(false);
      }
      return next;
    });
  }, [isMobile]);

  const [showBlurHint, setShowBlurHint] = useState(false);

  const handleToggleBlur = useCallback(() => {
    setBlurMode((prev) => {
      const next = !prev;
      setDrawMode(false);
      setDrawCanvasActive(false);
      if (next) {
        setShowBlurHint(true);
        if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
        hintTimeoutRef.current = setTimeout(() => setShowBlurHint(false), 1000);
        setBlurDrawUsed(true);
        setPhase((p) => p === "blur" || p === "capture" ? "report" : p);
      } else {
        setShowBlurHint(false);
      }
      return next;
    });
  }, []);

  const handleToggleFieldBlur = useCallback((key: string) => {
    setBlurredFields((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const resetAll = useCallback(() => {
    sequenceIdRef.current++;
    if (timerRef.current) clearInterval(timerRef.current);
    if (transcriptRef.current) clearInterval(transcriptRef.current);
    setShowModal(false);
    setShowToolbar(false);
    setShowVoice(false);
    setShowBugLabel(false);
    setPhase("idle");
    setStep1Progress(0);
    setBlurDrawUsed(false);
    setStopPressed(false);
    setCursorVisible(false);
    setRecording(false);
    setDrawMode(false);
    setBlurMode(false);
    setBlurredFields({});
    setTranscript("");
    setTimerText("00:00");
    setDrawCanvasActive(false);
    secondsRef.current = 0;
    strokeLayersRef.current.forEach((c) => c.remove());
    strokeLayersRef.current = [];
  }, []);

  const handleRestart = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (transcriptRef.current) clearInterval(transcriptRef.current);
    resetAll();
    requestAnimationFrame(() => {
      setHasStarted(true);
      startSequence();
    });
  }, [resetAll, startSequence]);

  const handleStop = useCallback(() => {
    sequenceIdRef.current++;
    if (timerRef.current) clearInterval(timerRef.current);
    if (transcriptRef.current) clearInterval(transcriptRef.current);
    setTimeout(() => {
      setShowToolbar(false);
      setShowVoice(false);
      setCursorVisible(false);
      setDrawMode(false);
      setBlurMode(false);
      setDrawCanvasActive(false);
      setPhase("report");
      setStopPressed(true);
      setTimeout(() => {
        document.getElementById("ai-report")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }, 50);
  }, []);

  // ── Canvas drawing handlers ──
  const handleCanvasMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!drawMode || !contentRef.current) return;
      drawingRef.current = true;
      const stroke = createStrokeLayer(contentRef.current);
      activeStrokeRef.current = stroke;
      strokeLayersRef.current.push(stroke.canvas);
      const rect = e.currentTarget.getBoundingClientRect();
      stroke.ctx.beginPath();
      stroke.ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    },
    [drawMode],
  );

  const handleCanvasMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!drawingRef.current || !drawMode || !activeStrokeRef.current) return;
      const rect = e.currentTarget.getBoundingClientRect();
      activeStrokeRef.current.ctx.lineTo(
        e.clientX - rect.left,
        e.clientY - rect.top,
      );
      activeStrokeRef.current.ctx.stroke();
    },
    [drawMode],
  );

  const handleCanvasMouseUp = useCallback(() => {
    if (drawingRef.current && activeStrokeRef.current) {
      fadeStrokeLayer(activeStrokeRef.current.canvas);
    }
    drawingRef.current = false;
    activeStrokeRef.current = null;
  }, []);

  // ── Modal fields ──
  const fields = [
    { key: "name", label: "Name", value: "Sarah Chen" },
    { key: "email", label: "Email", value: "sarah.chen@acme.com" },
    { key: "phone", label: "Phone", value: "+1 (555) 234-5678" },
    { key: "card", label: "Card", value: "**** **** **** 4242" },
  ];

  return (
    <Section className="!py-10 md:!py-16 !px-3 md:!px-6">
      <style>{`
        @keyframes wave {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.4); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes clickRipple {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>

      <div ref={sectionRef} id="recording-demo">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center">
          {/* Left: Title + vertical timeline */}
          <div className="md:w-[320px] shrink-0 text-center md:text-left flex flex-col items-center md:items-start">
            <h2 className="text-2xl md:text-[32px] font-extrabold leading-tight tracking-tight mb-2">
              Draw to highlight,<br />
              <span className="text-muted">blur to protect</span>
            </h2>
            <p className="text-sm text-muted mb-6">
              Annotate what matters and blur sensitive data before submitting.
            </p>

            {/* Vertical timeline */}
            {phase !== "idle" && <VerticalTimeline
              phase={phase}
              step1Progress={step1Progress}
              blurDrawUsed={blurDrawUsed}
              stopPressed={stopPressed}
              step1DurationMs={TRANSCRIPT.length * CHAR_INTERVAL + 500}
            />}
          </div>

          {/* Right: Demo */}
          <div className="flex-1 w-full relative md:-mr-6">
            <BrowserChrome>
            <div
              ref={contentRef}
              className="relative md:min-h-[280px] select-none overflow-hidden"
              style={{
                height: isMobile ? "400px" : undefined,
                outline: recording ? "2px solid rgba(229,57,53,0.15)" : "none",
                outlineOffset: "-2px",
                borderRadius: "0 0 12px 12px",
              }}
            >
              {/* Wireframe app */}
              <div className="flex md:min-h-[340px]">
                <div className="hidden md:block">
                  <WireframeSidebar />
                </div>
                <div className="flex-1 flex flex-col">
                  <WireframeTopbar />
                  <WireframeContent />
                </div>
              </div>

              {/* Modal backdrop */}
              {showModal && (
                <div className="absolute inset-0 bg-black/25 z-[5]" />
              )}

              {/* Modal */}
              {showModal && (
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-[340px] bg-white border border-border rounded-xl p-4 md:p-6 z-[6]"
                  style={{
                    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                  }}
                >
                  {/* Bug label */}
                  <div
                    className="absolute -top-7 left-1/2 bg-foreground/80 text-white text-[11px] font-medium px-3 py-1 rounded-full whitespace-nowrap z-[7] transition-all duration-500"
                    style={{
                      opacity: showBugLabel ? 1 : 0,
                      transform: `translateX(-50%) translateY(${showBugLabel ? "0" : "4px"})`,
                      pointerEvents: "none",
                    }}
                  >
                    Won&apos;t close
                  </div>

                  {/* Header */}
                  <div className="flex items-center justify-between mb-[18px]">
                    <span className="text-[15px] font-semibold text-foreground">
                      Confirm your details
                    </span>
                    <div
                      ref={closeBtnRef}
                      className="w-7 h-7 rounded-md bg-surface border border-border flex items-center justify-center text-muted text-base leading-none"
                    >
                      &times;
                    </div>
                  </div>

                  {/* Fields */}
                  <div className="flex flex-col">
                    {fields.map((f) => (
                      <ModalField
                        key={f.key}
                        label={f.label}
                        value={f.value}
                        blurred={!!blurredFields[f.key]}
                        blurMode={blurMode}
                        onToggle={() => handleToggleFieldBlur(f.key)}
                      />
                    ))}
                  </div>

                  {/* Modal buttons */}
                  <div className="flex gap-2 justify-end mt-4">
                    <div className="h-8 rounded-md flex items-center justify-center px-4 bg-[#f0f0f0] border border-border">
                      <div className="h-2 w-10 bg-[#d0d0d0] rounded" />
                    </div>
                    <div className="h-8 rounded-md flex items-center justify-center px-4 bg-[#d0d0d0]">
                      <div className="h-2 w-10 bg-[#bbb] rounded" />
                    </div>
                  </div>
                </div>
              )}

              {/* Animated cursor */}
              <div
                ref={cursorRef}
                className="absolute z-[6] pointer-events-none transition-opacity duration-300 hidden md:block"
                style={{
                  width: 20,
                  height: 20,
                  opacity: cursorVisible ? 1 : 0,
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" width={20} height={20}>
                  <path
                    d="M5 3l14 8-6.5 1.5L11 19z"
                    fill="#111"
                    stroke="#fff"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              {/* Draw canvas (hit area) */}
              <canvas
                ref={hitCanvasRef}
                className="absolute top-0 left-0 w-full h-full z-[8]"
                style={{
                  cursor: "crosshair",
                  display: drawCanvasActive ? "block" : "none",
                }}
                onMouseDown={handleCanvasMouseDown}
                onMouseMove={handleCanvasMouseMove}
                onMouseUp={handleCanvasMouseUp}
                onMouseLeave={handleCanvasMouseUp}
              />

              {/* Draw guide hint (above toolbar) */}
              <div
                className="absolute bottom-16 md:bottom-20 left-1/2 bg-foreground text-white text-xs md:text-sm px-4 py-2 rounded-full z-[11] flex items-center gap-2 shadow-lg transition-all duration-300 whitespace-nowrap pointer-events-none"
                style={{
                  opacity: showDrawGuide || showDrawHint ? 1 : 0,
                  transform: `translateX(-50%) translateY(${showDrawGuide || showDrawHint ? "0" : "8px"})`,
                }}
              >
                <Pencil size={14} />
                <span className="hidden md:inline">Click and drag to draw</span>
                <span className="md:hidden">Try drawing on desktop version</span>
              </div>

              {/* Blur hint (above toolbar) */}
              <div
                className="absolute bottom-16 md:bottom-20 left-1/2 bg-foreground text-white text-xs md:text-sm px-4 py-2 rounded-full z-[11] flex items-center gap-2 shadow-lg transition-all duration-300 whitespace-nowrap pointer-events-none"
                style={{
                  opacity: showBlurHint ? 1 : 0,
                  transform: `translateX(-50%) translateY(${showBlurHint ? "0" : "8px"})`,
                }}
              >
                <EyeOff size={14} />
                <span className="hidden md:inline">Click items to blur</span>
                <span className="md:hidden">Tap items to blur</span>
              </div>

              {/* Recording toolbar (matches real extension) */}
              <div
                className="absolute bottom-2 md:bottom-5 left-1/2 bg-white/95 backdrop-blur-sm rounded-full border border-border flex items-center gap-1.5 md:gap-3 px-2 md:px-4 py-1.5 md:py-2.5 z-10 transition-all duration-300 whitespace-nowrap"
                style={{
                  boxShadow: "0 7px 16px rgba(0,0,0,0.04)",
                  opacity: showToolbar ? 1 : 0,
                  pointerEvents: showToolbar ? "auto" : "none",
                  transform: showToolbar
                    ? "translateX(-50%) translateY(0)"
                    : "translateX(-50%) translateY(10px)",
                }}
              >
                <div
                  className="w-2.5 md:w-3 h-2.5 md:h-3 rounded-full bg-[#e53935] shrink-0"
                  style={{ animation: "pulseDot 1.5s ease-in-out infinite" }}
                />
                <span className="text-xs md:text-sm font-bold font-mono tabular-nums text-foreground">
                  {timerText}
                </span>
                <button
                  type="button"
                  className={`flex items-center gap-1 text-xs md:text-sm px-1.5 md:px-3 py-1 transition-colors shrink-0 ${
                    drawMode ? "bg-surface border border-border rounded-full text-foreground" : "text-muted hover:text-foreground rounded-md"
                  }`}
                  onClick={handleToggleDraw}
                >
                  <Pencil size={14} />
                  {drawMode ? "Done" : "Draw"}
                </button>
                <button
                  type="button"
                  className={`flex items-center gap-1 text-xs md:text-sm px-1.5 md:px-3 py-1 transition-colors shrink-0 ${
                    blurMode ? "bg-surface border border-border rounded-full text-foreground" : "text-muted hover:text-foreground rounded-md"
                  }`}
                  onClick={handleToggleBlur}
                >
                  <EyeOff size={14} />
                  {blurMode ? "Done" : "Blur"}
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1 text-xs md:text-sm text-muted hover:text-foreground px-1.5 md:px-2 py-1 rounded-md transition-colors shrink-0 cursor-pointer"
                  onClick={handleRestart}
                >
                  <RotateCcw size={14} />
                  Restart
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1 bg-[#e53935] text-white border-none rounded-full px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-medium hover:bg-[#c62828] transition-colors cursor-pointer ml-0.5 md:ml-2 shrink-0"
                  onClick={handleStop}
                >
                  <Square size={14} fill="currentColor" />
                  Stop
                </button>
              </div>

              {/* Voice transcript overlay */}
              <div
                className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 bg-black/[0.88] text-white py-2 md:py-3 px-3 md:px-5 rounded-lg md:rounded-[10px] text-xs md:text-sm max-w-[85%] md:max-w-[500px] text-center z-10 transition-opacity duration-300 pointer-events-none leading-relaxed"
                style={{ opacity: showVoice && !showBlurHint && !showDrawGuide ? 1 : 0 }}
              >
                <Waveform />
                <span>{transcript}</span>
              </div>
            </div>
          </BrowserChrome>
          </div>
        </div>
      </div>


    </Section>
  );
}
