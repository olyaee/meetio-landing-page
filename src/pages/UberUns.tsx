import React from 'react';
import { useTranslation } from 'react-i18next';

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
            <div>
              <h3 className="font-body font-semibold text-lg text-foreground mb-1">
                {t('aboutUs.founder.name')}
              </h3>
              <p className="font-body text-foreground/50 text-[15px] leading-relaxed">
                {t('aboutUs.founder.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UberUns;
