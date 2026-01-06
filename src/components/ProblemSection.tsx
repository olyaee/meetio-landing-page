import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Clock, HelpCircle, XCircle } from "lucide-react";

export const ProblemSection = () => {
  const { t } = useTranslation('pages');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const painPoints = [
    {
      icon: Clock,
      title: t('problem.painPoints.reproductionTax.title'),
      description: t('problem.painPoints.reproductionTax.description'),
    },
    {
      icon: HelpCircle,
      title: t('problem.painPoints.vagueReports.title'),
      description: t('problem.painPoints.vagueReports.description'),
    },
    {
      icon: XCircle,
      title: t('problem.painPoints.cannotReproduce.title'),
      description: t('problem.painPoints.cannotReproduce.description'),
    },
  ];

  return (
    <section
      ref={ref}
      className="py-20 sm:py-28 px-4 sm:px-6 bg-background"
    >
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-14 sm:mb-20"
        >
          <h2 className="font-body font-medium text-3xl sm:text-4xl md:text-5xl text-foreground mb-4 tracking-[-0.02em]">
            {t('problem.title')}
          </h2>
          <p className="font-body text-lg sm:text-xl text-foreground/50 max-w-2xl mx-auto">
            {t('problem.subtitle')}
          </p>
        </motion.div>

        {/* Pain Points Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-20"
        >
          {painPoints.map((point) => (
            <div
              key={point.title}
              className="group p-6 sm:p-8 bg-foreground/[0.02] border border-foreground/[0.06] rounded-xl hover:border-foreground/[0.12] hover:bg-foreground/[0.03] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-foreground/[0.06] flex items-center justify-center mb-5">
                <point.icon className="h-5 w-5 text-foreground/70" />
              </div>
              <h3 className="font-body font-medium text-lg text-foreground mb-2">
                {point.title}
              </h3>
              <p className="font-body text-foreground/50 text-[15px] leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </motion.div>

        {/* The Reproduction Tax - Editorial Style */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <div className="bg-foreground/[0.02] border border-foreground/[0.08] rounded-xl p-8 sm:p-12 overflow-hidden">
            <div className="relative z-10">
              <p className="font-body text-xs uppercase tracking-[0.2em] text-foreground/40 mb-4 text-center">
                The hidden cost
              </p>
              <h3 className="font-body font-medium text-2xl sm:text-3xl text-foreground mb-8 text-center tracking-[-0.02em]">
                The Reproduction Tax
              </h3>

              {/* The Formula - Clean, typographic */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8">
                <div className="px-5 py-3 border border-foreground/10 rounded-lg">
                  <span className="font-body font-medium text-lg text-foreground">
                    {t('problem.tax.volume')}
                  </span>
                </div>
                <span className="text-xl text-foreground/30 font-light">×</span>
                <div className="px-5 py-3 border border-foreground/10 rounded-lg">
                  <span className="font-body font-medium text-lg text-foreground">
                    {t('problem.tax.time')}
                  </span>
                </div>
                <span className="text-xl text-foreground/30 font-light">=</span>
                <div className="px-5 py-3 bg-foreground rounded-lg">
                  <span className="font-body font-medium text-lg text-white">
                    {t('problem.tax.cost')}
                  </span>
                </div>
              </div>

              {/* Tagline */}
              <p className="font-body text-center text-foreground/50 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                {t('problem.tax.tagline')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
