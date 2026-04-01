import { Mic, Pencil, Square } from "lucide-react";

const STEPS = [
  { key: "capture", label: "Describe with voice" },
  { key: "blur", label: "Blur and draw" },
  { key: "report", label: "Stop to report" },
];

const ICONS = [Mic, Pencil, Square];

export function VerticalTimeline({
  phase,
  step1Progress,
  blurDrawUsed,
  stopPressed,
  step1DurationMs,
}: {
  phase: string;
  step1Progress: number;
  blurDrawUsed: boolean;
  stopPressed: boolean;
  step1DurationMs: number;
}) {
  const stepDone = [
    true,
    blurDrawUsed || stopPressed,
    stopPressed,
  ];

  const lineFill = [
    stopPressed || blurDrawUsed || phase !== "capture" ? 100 : step1Progress,
    blurDrawUsed || stopPressed ? 100 : 0,
  ];

  const lineTransition = [
    phase === "capture" && !blurDrawUsed && !stopPressed
      ? `height ${step1DurationMs}ms linear`
      : "height 500ms ease-out",
    "height 500ms ease-out",
  ];

  return (
    <div className="flex flex-col">
      {STEPS.map((step, i) => {
        const Icon = ICONS[i];
        return (
          <div key={step.key}>
            <div className="flex items-center gap-3">
              <div
                className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center transition-all duration-500 ${
                  stepDone[i] ? "bg-foreground text-white" : "bg-[#f0f0f0] text-[#ccc]"
                }`}
              >
                <Icon size={14} />
              </div>
              <span
                className={`text-sm transition-colors duration-500 ${
                  stepDone[i] ? "text-foreground font-medium" : "text-[#ccc]"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="w-[3px] h-6 bg-[#f0f0f0] rounded-full ml-3 my-1 overflow-hidden">
                <div
                  className="w-full rounded-full"
                  style={{
                    height: `${lineFill[i]}%`,
                    background: "var(--color-foreground)",
                    transition: lineTransition[i],
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
