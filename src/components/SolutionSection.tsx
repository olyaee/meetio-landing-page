import { useInView } from "react-intersection-observer";
import { MessageSquare, Eye, FileCode } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const SolutionSection = () => {
  const { t } = useTranslation('pages');
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const steps = [
    {
      icon: MessageSquare,
      number: "01",
      title: t('solution.steps.interview.title'),
      points: t('solution.steps.interview.points', { returnObjects: true }) as string[],
    },
    {
      icon: Eye,
      number: "02",
      title: t('solution.steps.snapshot.title'),
      points: t('solution.steps.snapshot.points', { returnObjects: true }) as string[],
    },
    {
      icon: FileCode,
      number: "03",
      title: t('solution.steps.test.title'),
      points: t('solution.steps.test.points', { returnObjects: true }) as string[],
    },
  ];

  return (
    <section id="features" ref={ref} className="py-20 sm:py-28 px-4 sm:px-6 bg-foreground/[0.015]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-xs uppercase tracking-[0.2em] text-foreground/40 mb-4">
            How it works
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground tracking-[-0.02em] px-2">
            {t('solution.title')}
          </h2>
        </motion.div>

        {/* 3-Step Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-20">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className="relative"
            >
              <div className="group bg-background border border-foreground/[0.06] rounded-xl p-6 sm:p-8 hover:border-foreground/[0.12] transition-all duration-300 h-full">
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-lg bg-foreground/[0.04] flex items-center justify-center group-hover:bg-foreground/[0.06] transition-colors">
                    <step.icon className="h-5 w-5 text-foreground/60" />
                  </div>
                  <span className="font-body text-sm text-foreground/20 font-medium">
                    {step.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-body font-semibold text-lg text-foreground mb-4">
                  {step.title}
                </h3>

                {/* Points */}
                <ul className="space-y-2.5">
                  {step.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-foreground/30 mt-2 flex-shrink-0" />
                      <span className="font-body text-[15px] text-foreground/50 leading-relaxed">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Output Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <p className="font-body text-xs uppercase tracking-[0.2em] text-foreground/40 mb-3">
              What you get
            </p>
            <h3 className="font-display text-xl sm:text-2xl text-foreground tracking-[-0.01em]">
              {t('solution.output.title')}
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <div className="flex items-center gap-3 px-5 py-3 bg-foreground/[0.03] border border-foreground/[0.06] rounded-lg">
              <span className="w-6 h-6 rounded-md bg-foreground text-white flex items-center justify-center font-body text-xs font-semibold">
                1
              </span>
              <span className="font-body font-medium text-foreground">
                {t('solution.output.ticket')}
              </span>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 bg-foreground/[0.03] border border-foreground/[0.06] rounded-lg">
              <span className="w-6 h-6 rounded-md bg-foreground text-white flex items-center justify-center font-body text-xs font-semibold">
                2
              </span>
              <span className="font-body font-medium text-foreground">
                {t('solution.output.scripts')}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-foreground/[0.02] border border-foreground/[0.06] rounded-xl p-6 sm:p-8 text-center">
            <p className="font-body text-base sm:text-lg text-foreground/60 leading-relaxed italic">
              "{t('solution.tagline')}"
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
