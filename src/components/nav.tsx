"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

const SECTION_IDS = ["hero", "demo", "ai-report", "dev-context", "integrations", "video"];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibleSections = new Map<string, number>();

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visibleSections.set(id, entry.intersectionRatio);
          } else {
            visibleSections.delete(id);
          }
          // Active = the most visible section
          let best = "";
          let bestRatio = 0;
          visibleSections.forEach((ratio, sectionId) => {
            if (ratio > bestRatio) {
              best = sectionId;
              bestRatio = ratio;
            }
          });
          if (best) setActiveSection(best);
        },
        { threshold: [0, 0.25, 0.5, 0.75, 1] },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);


  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    if (mobileOpen) {
      const firstLink = menuRef.current?.querySelector("a");
      firstLink?.focus();
    } else {
      hamburgerRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) {
        setMobileOpen(false);
        return;
      }
      e.preventDefault();
      const id = href.replace("#", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    },
    [],
  );

  return (
    <>
      <div className="sticky top-0 z-50 flex justify-center px-4 pt-4">
        <nav
          className={`flex items-center justify-between w-full max-w-[700px] px-6 py-3 rounded-full border transition-all duration-300 ${
            scrolled
              ? "bg-white/90 backdrop-blur-md border-border shadow-sm"
              : "bg-white border-border/60"
          }`}
        >
          <a href="/" className="font-bold text-lg">
            meetio
          </a>

          <div className="hidden md:flex gap-8 text-sm text-muted">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`transition-colors ${
                  activeSection === link.href.replace("#", "")
                    ? "text-foreground font-medium"
                    : "hover:text-foreground"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://app.meetio.ai"
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                scrolled
                  ? "bg-foreground text-white hover:bg-[#333]"
                  : "bg-transparent text-foreground border border-border hover:bg-surface"
              }`}
            >
              Log in
            </a>
            <button
              ref={hamburgerRef}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-border text-foreground"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>
      </div>

      {mobileOpen && (
        <div ref={menuRef} id="mobile-nav" role="dialog" aria-modal="true" className="fixed inset-0 z-40 bg-white pt-20 px-6 md:hidden">
          <div className="flex flex-col gap-6 text-2xl font-medium">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="py-2 border-b border-border/60"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

