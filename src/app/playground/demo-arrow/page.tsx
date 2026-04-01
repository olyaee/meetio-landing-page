"use client";

import { useState } from "react";
import { Caveat } from "next/font/google";
import { RecordingDemo } from "@/components/recording-demo";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });

export default function DemoArrowPlayground() {
  const [mode, setMode] = useState<"desktop" | "mobile">("desktop");
  const [collapsed, setCollapsed] = useState(false);

  // Desktop
  const [textContent, setTextContent] = useState("Try buttons!");
  const [textTop, setTextTop] = useState(591);
  const [textLeft, setTextLeft] = useState(566);
  const [textSize, setTextSize] = useState(24);
  const [arrowTop, setArrowTop] = useState(544);
  const [arrowLeft, setArrowLeft] = useState(630);
  const [startX, setStartX] = useState(47);
  const [startY, setStartY] = useState(68);
  const [cp1X, setCp1X] = useState(104);
  const [cp1Y, setCp1Y] = useState(83);
  const [cp2X, setCp2X] = useState(92);
  const [cp2Y, setCp2Y] = useState(46);
  const [endX, setEndX] = useState(80);
  const [endY, setEndY] = useState(20);
  const [headSize, setHeadSize] = useState(18);

  // Mobile
  const [mTextContent, setMTextContent] = useState("Try buttons!");
  const [mTextTop, setMTextTop] = useState(760);
  const [mTextLeft, setMTextLeft] = useState(50);
  const [mTextSize, setMTextSize] = useState(20);
  const [mArrowTop, setMArrowTop] = useState(590);
  const [mArrowLeft, setMArrowLeft] = useState(130);
  const [mStartX, setMStartX] = useState(12);
  const [mStartY, setMStartY] = useState(190);
  const [mCp1X, setMCp1X] = useState(52);
  const [mCp1Y, setMCp1Y] = useState(195);
  const [mCp2X, setMCp2X] = useState(61);
  const [mCp2Y, setMCp2Y] = useState(200);
  const [mEndX, setMEndX] = useState(58);
  const [mEndY, setMEndY] = useState(160);
  const [mHeadSize, setMHeadSize] = useState(16);

  function buildArrow(s: { pathD: string; headD: string; aTop: number; aLeft: number; tTop: number; tLeft: number; tSize: number; text: string; className?: string }) {
    return (
      <>
        <svg className={`absolute z-30 pointer-events-none ${s.className ?? ""}`} style={{ top: `${s.aTop}px`, left: `${s.aLeft}px` }} width="200" height="200" viewBox="0 0 200 200" fill="none" overflow="visible">
          <path d={s.pathD} stroke="#111" strokeWidth="1.8" strokeLinecap="round" />
          <path d={s.headD} stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className={`${caveat.className} absolute z-30 text-[#555] pointer-events-none ${s.className ?? ""}`} style={{ top: `${s.tTop}px`, left: `${s.tLeft}px`, fontSize: `${s.tSize}px` }}>
          {s.text}
        </span>
      </>
    );
  }

  function computeHead(ex: number, ey: number, cx: number, cy: number, hs: number) {
    const a = Math.atan2(ey - cy, ex - cx);
    const h1x = ex - hs * Math.cos(a - 0.4);
    const h1y = ey - hs * Math.sin(a - 0.4);
    const h2x = ex - hs * Math.cos(a + 0.4);
    const h2y = ey - hs * Math.sin(a + 0.4);
    return `M${h1x.toFixed(1)} ${h1y.toFixed(1)} L${ex} ${ey} L${h2x.toFixed(1)} ${h2y.toFixed(1)}`;
  }

  const dPathD = `M${startX} ${startY} C${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
  const dHeadD = computeHead(endX, endY, cp2X, cp2Y, headSize);

  const mPathD = `M${mStartX} ${mStartY} C${mCp1X} ${mCp1Y}, ${mCp2X} ${mCp2Y}, ${mEndX} ${mEndY}`;
  const mHeadD = computeHead(mEndX, mEndY, mCp2X, mCp2Y, mHeadSize);

  const desktopValues = `textContent: "${textContent}", textTop: ${textTop}, textLeft: ${textLeft}, textSize: ${textSize}, arrowTop: ${arrowTop}, arrowLeft: ${arrowLeft}, start: (${startX},${startY}), cp1: (${cp1X},${cp1Y}), cp2: (${cp2X},${cp2Y}), end: (${endX},${endY}), headSize: ${headSize}`;
  const mobileValues = `textContent: "${mTextContent}", textTop: ${mTextTop}, textLeft: ${mTextLeft}, textSize: ${mTextSize}, arrowTop: ${mArrowTop}, arrowLeft: ${mArrowLeft}, start: (${mStartX},${mStartY}), cp1: (${mCp1X},${mCp1Y}), cp2: (${mCp2X},${mCp2Y}), end: (${mEndX},${mEndY}), headSize: ${mHeadSize}`;

  return (
    <div className="min-h-screen bg-white font-sans pb-[380px]">
      <RecordingDemo
        arrowOverlay={buildArrow({ pathD: dPathD, headD: dHeadD, aTop: arrowTop, aLeft: arrowLeft, tTop: textTop, tLeft: textLeft, tSize: textSize, text: textContent, className: "hidden md:block" })}
        mobileArrowOverlay={buildArrow({ pathD: mPathD, headD: mHeadD, aTop: mArrowTop, aLeft: mArrowLeft, tTop: mTextTop, tLeft: mTextLeft, tSize: mTextSize, text: mTextContent, className: "md:hidden" })}
      />

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#e5e5e5] shadow-lg">
        <div className="max-w-[900px] mx-auto px-4 py-2">
          <div className="flex gap-2 items-center">
            <button onClick={() => setMode("desktop")} className={`px-3 py-1.5 rounded-full text-xs font-medium border ${mode === "desktop" ? "bg-black text-white border-black" : "border-[#ddd]"}`}>Desktop</button>
            <button onClick={() => setMode("mobile")} className={`px-3 py-1.5 rounded-full text-xs font-medium border ${mode === "mobile" ? "bg-black text-white border-black" : "border-[#ddd]"}`}>Mobile</button>
            <button onClick={() => setCollapsed(!collapsed)} className="ml-auto px-3 py-1.5 rounded-full text-xs font-medium border border-[#ddd]">{collapsed ? "Show" : "Hide"}</button>
          </div>
        </div>
        <div className={`${collapsed ? "hidden" : ""} max-w-[900px] mx-auto px-4 pb-3 overflow-y-auto max-h-[35vh] space-y-3 text-xs`}>

          {mode === "desktop" ? (
            <>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-14 text-[#666]">Text</span>
                <input type="text" value={textContent} onChange={(e) => setTextContent(e.target.value)} className="flex-1 border border-[#ddd] rounded px-2 py-1 text-sm" />
              </div>
              <h3 className="font-bold text-sm">Text Position</h3>
              <div className="grid grid-cols-3 gap-3">
                <Sl label="Top" min={-200} max={800} value={textTop} onChange={setTextTop} />
                <Sl label="Left" min={-200} max={1800} value={textLeft} onChange={setTextLeft} />
                <Sl label="Size" min={14} max={40} value={textSize} onChange={setTextSize} />
              </div>
              <h3 className="font-bold text-sm">Arrow Position</h3>
              <div className="grid grid-cols-2 gap-3">
                <Sl label="Top" min={-200} max={800} value={arrowTop} onChange={setArrowTop} />
                <Sl label="Left" min={-200} max={1800} value={arrowLeft} onChange={setArrowLeft} />
              </div>
              <h3 className="font-bold text-sm">Arrow Shape</h3>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                <Sl label="Start X" min={0} max={200} value={startX} onChange={setStartX} />
                <Sl label="Start Y" min={0} max={200} value={startY} onChange={setStartY} />
                <Sl label="CP1 X" min={0} max={200} value={cp1X} onChange={setCp1X} />
                <Sl label="CP1 Y" min={0} max={200} value={cp1Y} onChange={setCp1Y} />
                <Sl label="CP2 X" min={0} max={200} value={cp2X} onChange={setCp2X} />
                <Sl label="CP2 Y" min={0} max={200} value={cp2Y} onChange={setCp2Y} />
                <Sl label="End X" min={0} max={200} value={endX} onChange={setEndX} />
                <Sl label="End Y" min={0} max={200} value={endY} onChange={setEndY} />
                <Sl label="Head" min={3} max={25} value={headSize} onChange={setHeadSize} />
              </div>
              <div className="mt-2 p-2 bg-[#f5f5f5] rounded text-[10px] font-mono break-all select-all">{desktopValues}</div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-14 text-[#666]">Text</span>
                <input type="text" value={mTextContent} onChange={(e) => setMTextContent(e.target.value)} className="flex-1 border border-[#ddd] rounded px-2 py-1 text-sm" />
              </div>
              <h3 className="font-bold text-sm">Text Position</h3>
              <div className="space-y-2">
                <Sl label="Top" min={-200} max={1200} value={mTextTop} onChange={setMTextTop} />
                <Sl label="Left" min={-200} max={1200} value={mTextLeft} onChange={setMTextLeft} />
                <Sl label="Size" min={10} max={40} value={mTextSize} onChange={setMTextSize} />
              </div>
              <h3 className="font-bold text-sm">Arrow Position</h3>
              <div className="space-y-2">
                <Sl label="Top" min={-200} max={1200} value={mArrowTop} onChange={setMArrowTop} />
                <Sl label="Left" min={-200} max={1200} value={mArrowLeft} onChange={setMArrowLeft} />
              </div>
              <h3 className="font-bold text-sm">Arrow Shape</h3>
              <div className="space-y-2">
                <Sl label="Start X" min={-300} max={300} value={mStartX} onChange={setMStartX} />
                <Sl label="Start Y" min={-300} max={300} value={mStartY} onChange={setMStartY} />
                <Sl label="CP1 X" min={-300} max={300} value={mCp1X} onChange={setMCp1X} />
                <Sl label="CP1 Y" min={-300} max={300} value={mCp1Y} onChange={setMCp1Y} />
                <Sl label="CP2 X" min={-300} max={300} value={mCp2X} onChange={setMCp2X} />
                <Sl label="CP2 Y" min={-300} max={300} value={mCp2Y} onChange={setMCp2Y} />
                <Sl label="End X" min={-300} max={300} value={mEndX} onChange={setMEndX} />
                <Sl label="End Y" min={-300} max={300} value={mEndY} onChange={setMEndY} />
                <Sl label="Head" min={3} max={30} value={mHeadSize} onChange={setMHeadSize} />
              </div>
              <div className="mt-2 p-2 bg-[#f5f5f5] rounded text-[10px] font-mono break-all select-all">{mobileValues}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Sl({ label, min, max, value, onChange }: {
  label: string; min: number; max: number; value: number; onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-14 text-[#666] shrink-0">{label}</span>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} className="flex-1 h-1 accent-black" />
      <input type="number" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-14 text-right font-mono text-[#333] border border-[#ddd] rounded px-1 py-0.5 text-xs" />
    </div>
  );
}
