import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { MeetingCanvas } from "./MeetingCanvas";
import { InterestContactForm } from "./InterestContactForm";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [formType, setFormType] = useState<'interest' | 'contact' | 'waitlist'>('waitlist');
  const { t } = useTranslation('pages');

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleWaitlistClick = () => {
    setFormType('waitlist');
    setFormModalOpen(true);
  };

  const handleDemoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background px-4 sm:px-6">
      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Mirage-style Canvas Background */}
      <MeetingCanvas />

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* Eyebrow / Badge - understated */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-body font-medium text-foreground/70 bg-foreground/[0.03] border border-foreground/[0.08] rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
            AI Intake Engineer for bug reports
          </span>
        </motion.div>

        {/* Main Headline - Editorial serif for impact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-[1.1] tracking-[-0.02em] px-2">
            {t('hero.painLine')}
          </h1>
        </motion.div>

        {/* Subheadline - Confident, not screaming */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <p className="font-body text-xl sm:text-2xl md:text-3xl text-foreground/60 mb-12 px-2 max-w-2xl mx-auto leading-relaxed">
            {t('hero.solutionLine')}
          </p>
        </motion.div>

        {/* CTA Buttons - Refined, human-crafted */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          {/* Primary CTA - Solid, confident */}
          <button
            onClick={handleWaitlistClick}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-body font-semibold text-white bg-foreground hover:bg-foreground/90 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {t('hero.ctaPrimary')}
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>

          {/* Secondary CTA - Understated elegance */}
          <button
            onClick={handleDemoClick}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-body font-semibold text-foreground bg-transparent hover:bg-foreground/[0.04] border border-foreground/20 hover:border-foreground/30 rounded-lg transition-all duration-200"
          >
            {t('hero.ctaDemo')}
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </motion.div>

        {/* Social proof hint - subtle credibility */}
        <motion.p
          className="mt-8 text-sm font-body text-foreground/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          Join 50+ teams already on the waitlist
        </motion.p>
      </motion.div>

      {/* Scroll Indicator - Minimal */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.8 }}
      >
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-foreground/20 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Form Modal */}
      <InterestContactForm
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        formType={formType}
      />
    </section>
  );
};
