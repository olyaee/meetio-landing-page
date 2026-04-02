"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { DemoForm } from "@/components/demo-form";
import { toast } from "@/components/toast";

interface VideoPreviewCardProps {
  ctaText?: string;
  ctaSubtext?: string;
  demoVideoLink?: string;
  videoThumbnail?: string;
  tintColor?: string;
  fontFamily?: string;
  fontWeight?: string;
  strokeWidth?: string;
  fontSize?: number;
  textOpacity?: number;
  letterSpacing?: number;
  videoPercent?: number;
  borderRadius?: number;
  innerPadding?: number;
  gap?: number;
  showInnerBorder?: boolean;
  particleCount?: number;
  particleSize?: number;
  height?: number;
  mobileCtaHeight?: number;
  mobileVideoHeight?: number;
  mobileGap?: number;
  mobileFontSize?: number;
  mobileBorderRadius?: number;
}

export function VideoPreviewCard({
  ctaText = "BOOK A DEMO",
  ctaSubtext = "See meetio in action",
  demoVideoLink = "https://www.youtube.com/embed/K2CeOGOyl10",
  videoThumbnail = "https://img.youtube.com/vi/K2CeOGOyl10/maxresdefault.jpg",
  tintColor = "radial-gradient(89% 77% at 50% 50%, rgb(120,120,120) 0%, rgb(0,0,0) 85%)",
  fontFamily = "var(--font-space-grotesk)",
  fontWeight = "900",
  strokeWidth = "0px",
  fontSize = 24,
  textOpacity = 100,
  letterSpacing = 8,
  videoPercent = 34,
  borderRadius = 32,
  innerPadding = 17,
  gap = 23,
  showInnerBorder = false,
  particleCount = 200,
  particleSize = 3,
  height = 120,
  mobileCtaHeight = 100,
  mobileVideoHeight = 180,
  mobileGap = 22,
  mobileFontSize = 18,
  mobileBorderRadius = 24,
}: VideoPreviewCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <>
      <style>{`
        @media(min-width:768px){[data-video-percent="${videoPercent}"]{flex:0 0 ${videoPercent}%!important}}
        @media(max-width:767px){
          [data-cta-mobile]{gap:${mobileGap}px!important}
          [data-cta-mobile]>[data-particle-card]{height:${mobileCtaHeight}px!important;border-radius:${mobileBorderRadius}px!important}
          [data-cta-mobile]>[data-particle-card] h2{font-size:${mobileFontSize}px!important}
          [data-cta-mobile]>[data-video-percent]{min-height:${mobileVideoHeight}px!important;border-radius:${mobileBorderRadius}px!important}
        }
      `}</style>
      <div data-cta-mobile className="flex flex-col md:flex-row items-stretch" style={{ gap: `${gap}px` }}>
        {/* Left: Particle rain CTA */}
        <ParticleRainCard
          text={ctaText}
          subtext={ctaSubtext}
          tintColor={tintColor}
          fontFamily={fontFamily}
          fontWeight={fontWeight}
          strokeWidth={strokeWidth}
          fontSize={fontSize}
          textOpacity={textOpacity}
          letterSpacing={letterSpacing}
          borderRadius={borderRadius}
          innerPadding={innerPadding}
          showInnerBorder={showInnerBorder}
          particleCount={particleCount}
          particleSize={particleSize}
          height={height}
          onClick={() => setIsDemoOpen(true)}
        />

        {/* Right: Video thumbnail */}
        <div
          className="overflow-hidden cursor-pointer relative group"
          style={{ minHeight: `${height}px`, borderRadius: `${borderRadius}px` }}
          data-video-percent={videoPercent}
          onClick={() => demoVideoLink && setIsModalOpen(true)}
        >
          {videoThumbnail ? (
            <Image
              src={videoThumbnail}
              alt="Demo video"
              fill
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 34vw"
            />
          ) : (
            <div className="w-full h-full bg-[#2a2a2a] flex items-center justify-center">
              <span className="text-white/30 text-sm">Video preview</span>
            </div>
          )}
          {/* YouTube play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-11 bg-[#FF0000] rounded-xl flex items-center justify-center group-hover:bg-[#cc0000] transition-colors shadow-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <VideoModal onClose={() => setIsModalOpen(false)}>
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Close video"
            onClick={() => setIsModalOpen(false)}
          >
            <X size={28} />
          </button>
          <div
            className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={demoVideoLink}
              className="w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
              sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
              title="meetio demo video"
            />
          </div>
        </VideoModal>
      )}

      {isDemoOpen && (
        <VideoModal onClose={() => setIsDemoOpen(false)}>
          <div
            className="w-full max-w-md mx-4 bg-white rounded-2xl p-6 md:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold">Request a demo</h2>
                <p className="text-sm text-muted mt-1">We&apos;ll get back to you within 24 hours.</p>
              </div>
              <button
                onClick={() => setIsDemoOpen(false)}
                aria-label="Close form"
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface transition-colors text-muted cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <DemoForm onSuccess={() => {
              setIsDemoOpen(false);
              toast("Sent! We'll get back to you within 24 hours.");
            }} />
          </div>
        </VideoModal>
      )}
    </>
  );
}

function VideoModal({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  const closeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const firstBtn = closeRef.current?.querySelector("button");
    firstBtn?.focus();
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      prev?.focus();
    };
  }, [onClose]);

  return (
    <div
      ref={closeRef}
      role="dialog"
      aria-modal="true"
      aria-label="Demo video"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      {children}
    </div>
  );
}

/* ── Particle Rain Card ── */

function ParticleRainCard({
  text,
  subtext,
  tintColor,
  fontFamily,
  fontWeight,
  strokeWidth,
  fontSize,
  textOpacity,
  letterSpacing,
  borderRadius,
  innerPadding,
  showInnerBorder,
  particleCount,
  particleSize,
  height,
  onClick,
}: {
  text: string;
  subtext: string;
  tintColor: string;
  fontFamily: string;
  fontWeight: string;
  strokeWidth: string;
  fontSize: number;
  textOpacity: number;
  letterSpacing: number;
  borderRadius: number;
  innerPadding: number;
  showInnerBorder: boolean;
  particleCount: number;
  particleSize: number;
  height: number;
  onClick?: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<RainParticle[]>([]);
  const animFrameRef = useRef<number>(0);
  const speedRef = useRef(1);
  const targetSpeedRef = useRef(1);
  const visibleRef = useRef(true);

  const handleMouseEnter = useCallback(() => {
    targetSpeedRef.current = 10;
  }, []);

  const handleMouseLeave = useCallback(() => {
    targetSpeedRef.current = 1;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
    };
    resize();
    window.addEventListener("resize", resize);

    // Init particles radiating from center
    const count = particleCount;
    const spawn = (): RainParticle => {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 0.3;
      return {
        x: 0.5 + Math.cos(angle) * dist,
        y: 0.5 + Math.sin(angle) * dist,
        baseVelocity: Math.random() * 0.8 + 0.3,
        size: Math.random() * particleSize + (particleSize * 0.5),
        opacity: Math.random() * 0.5 + 0.2,
        drift: angle, // reuse as angle
      };
    };
    particlesRef.current = Array.from({ length: count }, spawn);

    // Compute once outside loop
    const isLight = isLightColor(tintColor);
    const particleColor = isLight ? "0, 0, 0" : "255, 255, 255";

    // Skip particle animation if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      if (!visibleRef.current) return;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.08;

      ctx.clearRect(0, 0, w, h);

      for (const p of particlesRef.current) {
        const angle = p.drift;
        const vel = p.baseVelocity * speedRef.current * 0.003;
        p.x += Math.cos(angle) * vel;
        p.y += Math.sin(angle) * vel;

        const px = p.x * w;
        const py = p.y * h;

        // Reset when off screen
        if (px < -20 || px > w + 20 || py < -20 || py > h + 20) {
          Object.assign(p, spawn());
        }

        // Distance from center for sizing
        const dx = px - cx;
        const dy = py - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.sqrt(cx * cx + cy * cy);
        const distRatio = dist / maxDist;

        // Ray length scales with distance from center and speed
        const speedFactor = speedRef.current;
        const streakLen = distRatio * p.baseVelocity * speedFactor * 8;
        const alpha = p.opacity * (0.3 + distRatio * 0.7);
        const lineWidth = p.size * (0.6 + distRatio * 1.0);

        // Direction unit vector from center
        const dirX = dist > 0 ? dx / dist : Math.cos(angle);
        const dirY = dist > 0 ? dy / dist : Math.sin(angle);

        const particleAlpha = isLight ? alpha * 0.3 : alpha;

        // Draw ray
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px - dirX * streakLen, py - dirY * streakLen);
        ctx.strokeStyle = `rgba(${particleColor}, ${particleAlpha})`;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";
        ctx.stroke();

        // Bright dot at tip
        ctx.beginPath();
        ctx.arc(px, py, p.size * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${Math.min(particleAlpha * 1.3, 1)})`;
        ctx.fill();
      }

    };

    animate();

    // Pause when off-screen
    const card = cardRef.current;
    const visObs = card ? new IntersectionObserver(([e]) => { visibleRef.current = e.isIntersecting; }, { threshold: 0 }) : null;
    if (card && visObs) visObs.observe(card);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      visObs?.disconnect();
    };
  }, [particleCount, particleSize, tintColor]);

  return (
    <div
      ref={cardRef}
      data-particle-card
      className="relative flex-1 overflow-hidden cursor-pointer select-none"
      style={{ borderRadius: `${borderRadius}px`, height: `${height}px` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Background — supports solid colors and gradients */}
      <div className="absolute inset-0" style={{ background: tintColor }} />
      {/* Light center glow overlay */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 60%)" }} />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "none" }}
      />

      {/* Inner border */}
      {showInnerBorder && (
        <div
          className="absolute border"
          style={{
            inset: `${innerPadding}px`,
            borderRadius: `${Math.max(borderRadius - innerPadding, 4)}px`,
            borderColor: "rgba(255,255,255,0.1)",
          }}
        />
      )}

      {/* Text content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full py-4 gap-1 pointer-events-none">
        <h2
          className="uppercase"
          style={{
            fontSize: `${fontSize}px`,
            color: strokeWidth === "0px" ? `rgba(255,255,255,${textOpacity / 100})` : "transparent",
            WebkitTextStroke: strokeWidth !== "0px" ? `${strokeWidth} rgba(255,255,255,${textOpacity / 100})` : undefined,
            fontFamily,
            fontWeight,
            letterSpacing: `${letterSpacing}px`,
          }}
        >
          {text}
        </h2>
        <p
          className="text-xs tracking-widest uppercase"
          style={{ color: isLightColor(tintColor) ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.5)" }}
        >
          {subtext}
        </p>
      </div>
    </div>
  );
}

function isLightColor(color: string): boolean {
  // Extract first rgb() or hex from the string
  const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (rgbMatch) {
    const [, r, g, b] = rgbMatch.map(Number);
    return (r * 299 + g * 587 + b * 114) / 1000 > 128;
  }
  const hex = color.replace("#", "");
  if (hex.length >= 6) {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 128;
  }
  return false; // default to dark
}

interface RainParticle {
  x: number;
  y: number;
  baseVelocity: number;
  size: number;
  opacity: number;
  drift: number;
}
