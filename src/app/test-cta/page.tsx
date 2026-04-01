"use client";

import { useState } from "react";
import { VideoPreviewCard } from "@/components/video-preview-card";

export default function TestCta() {
  // Particles
  const [particleCount, setParticleCount] = useState(200);
  const [particleSize, setParticleSize] = useState(3);

  // Layout
  const [maxWidth, setMaxWidth] = useState(615);
  const [totalHeight, setTotalHeight] = useState(120);
  const [gap, setGap] = useState(23);
  const [videoPercent, setVideoPercent] = useState(34);

  // Gradient
  const [centerR, setCenterR] = useState(120);
  const [centerG, setCenterG] = useState(120);
  const [centerB, setCenterB] = useState(120);
  const [edgeR, setEdgeR] = useState(0);
  const [edgeG, setEdgeG] = useState(0);
  const [edgeB, setEdgeB] = useState(0);
  const [gradientSize, setGradientSize] = useState(85);
  const [ovalX, setOvalX] = useState(89);
  const [ovalY, setOvalY] = useState(77);

  // Typography
  const [fontSize, setFontSize] = useState(24);
  const [fontWeight, setFontWeight] = useState(900);
  const [textOpacity, setTextOpacity] = useState(100);
  const [strokeWidth, setStrokeWidth] = useState(0);
  const [letterSpacing, setLetterSpacing] = useState(8);
  const [fontChoice, setFontChoice] = useState("space");

  // Sizing
  const [borderRadius, setBorderRadius] = useState(32);
  const [innerPadding, setInnerPadding] = useState(17);

  // Mobile
  const [mobileCtaHeight, setMobileCtaHeight] = useState(100);
  const [mobileVideoHeight, setMobileVideoHeight] = useState(180);
  const [mobileGap, setMobileGap] = useState(22);
  const [mobileFontSize, setMobileFontSize] = useState(18);
  const [mobileBorderRadius, setMobileBorderRadius] = useState(24);

  const fontFamilies: Record<string, string> = {
    inter: "var(--font-inter)",
    space: "var(--font-space-grotesk)",
    mono: "var(--font-geist-mono)",
  };

  const bg = `radial-gradient(${ovalX}% ${ovalY}% at 50% 50%, rgb(${centerR},${centerG},${centerB}) 0%, rgb(${edgeR},${edgeG},${edgeB}) ${gradientSize}%)`;

  const allValues = `maxWidth=${maxWidth} totalHeight=${totalHeight} videoPercent=${videoPercent} gap=${gap} centerRGB=${centerR},${centerG},${centerB} edgeRGB=${edgeR},${edgeG},${edgeB} gradientSize=${gradientSize} ovalX=${ovalX} ovalY=${ovalY} font=${fontChoice} fontSize=${fontSize} fontWeight=${fontWeight} textOpacity=${textOpacity} strokeWidth=${strokeWidth} letterSpacing=${letterSpacing} borderRadius=${borderRadius} innerPadding=${innerPadding} particleCount=${particleCount} particleSize=${particleSize} mobileCtaHeight=${mobileCtaHeight} mobileVideoHeight=${mobileVideoHeight} mobileGap=${mobileGap} mobileFontSize=${mobileFontSize} mobileBorderRadius=${mobileBorderRadius}`;

  return (
    <div className="min-h-screen bg-white font-sans p-6">
      <h1 className="text-xl font-bold text-center mb-6">CTA Playground</h1>

      <div className="w-full mx-auto px-6 mb-8" style={{ maxWidth: `${maxWidth}px` }}>
        <VideoPreviewCard
          tintColor={bg}
          fontFamily={fontFamilies[fontChoice]}
          fontWeight={String(fontWeight)}
          strokeWidth={`${strokeWidth}px`}
          fontSize={fontSize}
          textOpacity={textOpacity}
          letterSpacing={letterSpacing}
          videoPercent={videoPercent}
          borderRadius={borderRadius}
          innerPadding={innerPadding}
          gap={gap}
          showInnerBorder={false}
          particleCount={particleCount}
          particleSize={particleSize}
          height={totalHeight}
          mobileCtaHeight={mobileCtaHeight}
          mobileVideoHeight={mobileVideoHeight}
          mobileGap={mobileGap}
          mobileFontSize={mobileFontSize}
          mobileBorderRadius={mobileBorderRadius}
        />
      </div>

      <div className="max-w-[700px] mx-auto grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
        <SectionLabel>Particles</SectionLabel>
        <Slider label="Count" value={particleCount} onChange={setParticleCount} min={10} max={200} />
        <Slider label="Size" value={particleSize} onChange={setParticleSize} min={1} max={12} />

        <SectionLabel>Layout</SectionLabel>
        <Slider label="Max width" value={maxWidth} onChange={setMaxWidth} min={400} max={1400} suffix="px" />
        <Slider label="Height" value={totalHeight} onChange={setTotalHeight} min={50} max={400} suffix="px" />
        <Slider label="Video %" value={videoPercent} onChange={setVideoPercent} min={0} max={60} suffix="%" />
        <Slider label="Gap" value={gap} onChange={setGap} min={0} max={32} suffix="px" />

        <SectionLabel>Gradient</SectionLabel>
        <Slider label="Center R" value={centerR} onChange={setCenterR} max={255} />
        <Slider label="Edge R" value={edgeR} onChange={setEdgeR} max={255} />
        <Slider label="Center G" value={centerG} onChange={setCenterG} max={255} />
        <Slider label="Edge G" value={edgeG} onChange={setEdgeG} max={255} />
        <Slider label="Center B" value={centerB} onChange={setCenterB} max={255} />
        <Slider label="Edge B" value={edgeB} onChange={setEdgeB} max={255} />
        <Slider label="Size" value={gradientSize} onChange={setGradientSize} min={20} max={100} suffix="%" />
        <div />
        <Slider label="Oval W" value={ovalX} onChange={setOvalX} min={20} max={150} suffix="%" />
        <Slider label="Oval H" value={ovalY} onChange={setOvalY} min={20} max={150} suffix="%" />

        <SectionLabel>Typography</SectionLabel>
        <div className="col-span-2">
          <div className="flex gap-2">
            {(["inter", "space", "mono"] as const).map((f) => (
              <button key={f} onClick={() => setFontChoice(f)} className={`px-3 py-1 rounded-full text-xs border ${fontChoice === f ? "bg-black text-white border-black" : "border-[#ddd]"}`}>
                {f === "inter" ? "Inter" : f === "space" ? "Space Grotesk" : "Mono"}
              </button>
            ))}
          </div>
        </div>
        <Slider label="Font size" value={fontSize} onChange={setFontSize} min={16} max={64} suffix="px" />
        <Slider label="Weight" value={fontWeight} onChange={setFontWeight} min={100} max={900} step={100} />
        <Slider label="Opacity" value={textOpacity} onChange={setTextOpacity} min={10} max={100} suffix="%" />
        <Slider label="Stroke" value={strokeWidth} onChange={setStrokeWidth} min={0} max={3} step={0.5} suffix="px" />
        <Slider label="Spacing" value={letterSpacing} onChange={setLetterSpacing} min={0} max={16} suffix="px" />

        <SectionLabel>Sizing</SectionLabel>
        <Slider label="Radius" value={borderRadius} onChange={setBorderRadius} min={0} max={48} suffix="px" />
        <Slider label="Inner pad" value={innerPadding} onChange={setInnerPadding} min={0} max={32} suffix="px" />

        <SectionLabel>Mobile</SectionLabel>
        <Slider label="CTA height" value={mobileCtaHeight} onChange={setMobileCtaHeight} min={60} max={200} suffix="px" />
        <Slider label="Video height" value={mobileVideoHeight} onChange={setMobileVideoHeight} min={80} max={300} suffix="px" />
        <Slider label="Gap" value={mobileGap} onChange={setMobileGap} min={0} max={32} suffix="px" />
        <Slider label="Font size" value={mobileFontSize} onChange={setMobileFontSize} min={12} max={36} suffix="px" />
        <Slider label="Radius" value={mobileBorderRadius} onChange={setMobileBorderRadius} min={0} max={48} suffix="px" />

        <div className="col-span-2 mt-4 p-3 bg-[#f8f8f8] rounded-lg flex justify-between items-start gap-2">
          <pre className="text-[10px] font-mono text-[#888] break-all flex-1">{allValues}</pre>
          <button onClick={() => navigator.clipboard.writeText(allValues)} className="text-xs px-3 py-1 rounded-full bg-black text-white shrink-0">Copy</button>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="col-span-2 text-xs font-semibold text-[#888] uppercase tracking-wide border-b border-[#eee] pb-1 mt-4">{children}</div>;
}

function Slider({ label, value, onChange, min = 0, max = 100, step = 1, suffix = "" }: {
  label: string; value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number; suffix?: string;
}) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-0.5">
        <span className="text-[#666]">{label}</span>
        <span className="font-mono text-[#999]">{value}{suffix}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full" />
    </div>
  );
}
