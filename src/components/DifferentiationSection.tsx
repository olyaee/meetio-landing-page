import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Camera, Video, Sparkles, Minus, Check } from "lucide-react";

export const DifferentiationSection = () => {
  const { t } = useTranslation('pages');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const columns = [
    {
      title: t('differentiation.columns.bugTools.title'),
      icon: Camera,
      points: t('differentiation.columns.bugTools.points', { returnObjects: true }) as string[],
      isHighlighted: false,
    },
    {
      title: t('differentiation.columns.sessionReplay.title'),
      icon: Video,
      points: t('differentiation.columns.sessionReplay.points', { returnObjects: true }) as string[],
      isHighlighted: false,
    },
    {
      title: t('differentiation.columns.meetio.title'),
      icon: Sparkles,
      points: t('differentiation.columns.meetio.points', { returnObjects: true }) as string[],
      isHighlighted: true,
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
          <p className="font-body text-xs uppercase tracking-[0.2em] text-foreground/40 mb-4">
            Why meetio
          </p>
          <h2 className="font-body font-medium text-3xl sm:text-4xl md:text-5xl text-foreground tracking-[-0.02em]">
            {t('differentiation.title')}{" "}
            <span className="text-brand-primary">
              {t('differentiation.titleHighlight')}
            </span>
          </h2>
        </motion.div>

        {/* Comparison Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
        >
          {columns.map((column) => (
            <div
              key={column.title}
              className={`rounded-xl p-6 sm:p-8 border transition-all duration-300 h-full ${
                column.isHighlighted
                  ? 'bg-foreground text-white border-foreground'
                  : 'bg-foreground/[0.02] border-foreground/[0.06] hover:border-foreground/[0.12]'
              }`}
            >
              {/* Icon & Title */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  column.isHighlighted
                    ? 'bg-white/10'
                    : 'bg-foreground/[0.04]'
                }`}>
                  <column.icon className={`h-4.5 w-4.5 ${
                    column.isHighlighted ? 'text-white/80' : 'text-foreground/50'
                  }`} />
                </div>
                <h3 className={`font-body font-medium text-base ${
                  column.isHighlighted ? 'text-white' : 'text-foreground/70'
                }`}>
                  {column.title}
                </h3>
              </div>

              {/* Points */}
              <ul className="space-y-3">
                {column.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-start gap-3">
                    {column.isHighlighted ? (
                      <Check className="h-4 w-4 text-brand-success flex-shrink-0 mt-0.5" />
                    ) : (
                      <Minus className="h-4 w-4 text-foreground/20 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={`font-body text-[15px] leading-relaxed ${
                      column.isHighlighted ? 'text-white/70' : 'text-foreground/50'
                    }`}>
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
