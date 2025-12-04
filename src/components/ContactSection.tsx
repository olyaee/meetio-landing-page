import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { InterestContactForm } from "./InterestContactForm";
import { motion } from "framer-motion";

export const ContactSection = () => {
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [formType, setFormType] = useState<'interest' | 'contact' | 'waitlist'>('waitlist');
  const { t } = useTranslation('pages');

  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const handleWaitlistClick = () => {
    setFormType('waitlist');
    setFormModalOpen(true);
  };

  const handleDemoClick = () => {
    setFormType('contact');
    setFormModalOpen(true);
  };

  return (
    <section ref={ref} className="pt-4 sm:pt-8 pb-16 sm:pb-24 px-4 sm:px-6 bg-background">
      <div className="max-w-3xl mx-auto">
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
            {/* Title */}
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-4 sm:mb-6 leading-tight tracking-[-0.02em]">
              {t('contact.title')}
            </h2>

            {/* Subtitle */}
            <p className="font-body text-base sm:text-lg text-white/60 mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed">
              {t('contact.subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <button
                onClick={handleWaitlistClick}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-body font-semibold text-foreground bg-white hover:bg-white/95 rounded-lg transition-all duration-200"
              >
                {t('contact.ctaPrimary')}
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={handleDemoClick}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-body font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg transition-all duration-200"
              >
                <Mail className="w-4 h-4" />
                {t('contact.ctaSecondary')}
              </button>
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
