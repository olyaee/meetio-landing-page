import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Handshake, Rocket, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { InterestContactForm } from "./InterestContactForm";

export const TractionSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [formType, setFormType] = useState<'interest' | 'contact' | 'waitlist'>('waitlist');
  const { t } = useTranslation('pages');

  const handleBookDemoClick = () => {
    setFormType('contact');
    setFormModalOpen(true);
  };

  const stats = [
    {
      icon: Handshake,
      number: "3",
      label: "Design partners",
    },
    {
      icon: Rocket,
      number: "Q1",
      label: "Pilots starting",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-20 sm:py-28 px-4 sm:px-6 bg-foreground/[0.015]"
    >
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="font-body text-xs uppercase tracking-[0.2em] text-foreground/40 mb-4">
            Momentum
          </p>
          <h2 className="font-body font-medium text-3xl sm:text-4xl md:text-5xl text-foreground tracking-[-0.02em]">
            Early traction
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 max-w-lg mx-auto mb-10"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex-1 text-center"
            >
              <div className="bg-background rounded-xl p-6 sm:p-8 border border-foreground/[0.06]">
                <div className="w-10 h-10 rounded-lg bg-foreground/[0.04] flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-5 w-5 text-foreground/60" />
                </div>
                <div className="font-body font-medium text-4xl sm:text-5xl text-foreground mb-1 tracking-tight">
                  {stat.number}
                </div>
                <p className="font-body text-foreground/50 text-sm">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA Text */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <p className="font-body text-base text-foreground/50">
            Want to be a pilot customer or design partner?
          </p>
        </motion.div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="relative bg-foreground rounded-2xl p-8 sm:p-12 md:p-16 text-center overflow-hidden"
        >
          {/* Subtle texture */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10">
            <h2 className="font-body font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-4 sm:mb-6 leading-tight tracking-[-0.02em]">
              {t('contact.title')}
            </h2>

            <p className="font-body text-base sm:text-lg text-white/60 mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed">
              {t('contact.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <button
                onClick={handleBookDemoClick}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-body font-medium text-foreground bg-white hover:bg-white/95 rounded-lg transition-all duration-200"
              >
                {t('contact.ctaPrimary')}
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>

              <a
                href="https://app.meetio.ai"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-body font-medium text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg transition-all duration-200"
              >
                {t('contact.ctaSecondary')}
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Form Modal */}
      <InterestContactForm
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        formType={formType}
      />
    </section>
  );
};
