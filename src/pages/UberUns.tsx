import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const WHATSAPP_NUMBER = '4915788363568';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const WhatsAppButton: React.FC = () => {
  const { i18n } = useTranslation();
  const isGerman = i18n.language === 'de';

  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      {/* WhatsApp Icon Circle - matching the founder avatar style */}
      <motion.div
        className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[#25D366] group-hover:shadow-lg group-hover:shadow-[#25D366]/25"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 text-[#25D366] transition-colors duration-300 group-hover:text-white"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.div>

      {/* Text - matching the founder description style */}
      <div className="flex flex-col">
        <span className="font-body text-[15px] text-foreground/70 group-hover:text-[#25D366] transition-colors duration-300">
          {isGerman ? 'Schreib mir auf WhatsApp' : 'Message me on WhatsApp'}
        </span>
        <span className="font-body text-xs text-foreground/40">
          {isGerman ? 'Ich antworte schnell' : 'I respond quickly'}
        </span>
      </div>

      {/* Arrow - appears on hover */}
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4 text-[#25D366] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ml-1"
      >
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </motion.svg>
    </motion.a>
  );
};

const UberUns: React.FC = () => {
  const { t } = useTranslation('pages');

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-24 sm:py-32">
        {/* Header */}
        <p className="font-body text-xs uppercase tracking-[0.2em] text-foreground/40 mb-4 text-center">
          About
        </p>
        <h1 className="font-display text-4xl sm:text-5xl text-foreground mb-6 text-center tracking-[-0.02em]">
          {t('aboutUs.title')}
        </h1>

        <p className="font-body text-lg text-foreground/60 mb-12 text-center leading-relaxed">
          {t('aboutUs.subtitle')}
        </p>

        {/* Story */}
        <div className="space-y-6 mb-16">
          <p className="font-body text-foreground/70 leading-relaxed">
            {t('aboutUs.intro1')}
          </p>

          <p className="font-body text-foreground/70 leading-relaxed">
            {t('aboutUs.intro2')}
          </p>
        </div>

        {/* Founder */}
        <div className="border-t border-foreground/[0.08] pt-12">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-foreground/40 mb-6">
            Founder
          </p>

          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-foreground/[0.06] flex items-center justify-center flex-shrink-0">
              <span className="font-display text-xl text-foreground/60">E</span>
            </div>
            <div className="flex-1">
              <h3 className="font-body font-semibold text-lg text-foreground mb-1">
                {t('aboutUs.founder.name')}
              </h3>
              <p className="font-body text-foreground/50 text-[15px] leading-relaxed mb-1">
                {t('aboutUs.founder.description')}
              </p>

              {/* WhatsApp Contact - integrated as contact info */}
              <WhatsAppButton />
            </div>
          </div>
        </div>
        {/* Founder */}
        <div className="border-t border-foreground/[0.08] pt-12">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-foreground/40 mb-6">
            Co-Founder
          </p>

          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-foreground/[0.06] flex items-center justify-center flex-shrink-0">
              <span className="font-display text-xl text-foreground/60">K</span>
            </div>
            <div className="flex-1">
              <h3 className="font-body font-semibold text-lg text-foreground mb-1">
                {t('aboutUs.founder2.name')}
              </h3>
              <p className="font-body text-foreground/50 text-[15px] leading-relaxed mb-1">
                {t('aboutUs.founder2.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UberUns;
