import { useInView } from "react-intersection-observer";
import { Shield, Lock, FileCheck, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const SecurityComplianceSection = () => {
  const { t } = useTranslation('pages');
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const features = [
    {
      icon: Shield,
      title: t('security.features.dataProtection.title'),
      description: t('security.features.dataProtection.description'),
    },
    {
      icon: Lock,
      title: t('security.features.encryption.title'),
      description: t('security.features.encryption.description'),
    },
    {
      icon: FileCheck,
      title: t('security.features.compliance.title'),
      description: t('security.features.compliance.description'),
    },
    {
      icon: Eye,
      title: t('security.features.privacy.title'),
      description: t('security.features.privacy.description'),
    },
  ];

  return (
    <section ref={ref} className="py-20 sm:py-28 px-4 sm:px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14 sm:mb-20"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <p className="font-body text-xs uppercase tracking-[0.2em] text-foreground/40 mb-4">
            {t('security.label')}
          </p>
          <h2 className="font-body font-medium text-3xl sm:text-4xl md:text-5xl text-foreground tracking-[-0.02em] px-2">
            {t('security.title')}
          </h2>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="group bg-foreground/[0.02] border border-foreground/[0.06] rounded-xl p-6 sm:p-8 hover:border-foreground/[0.12] transition-all duration-300 h-full">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-foreground/[0.04] flex items-center justify-center group-hover:bg-foreground/[0.06] transition-colors mb-4">
                  <feature.icon className="h-6 w-6 text-foreground/60" />
                </div>

                {/* Title */}
                <h3 className="font-body font-medium text-lg text-foreground mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="font-body text-[15px] text-foreground/50 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Statement */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-14 sm:mt-20"
        >
          <div className="bg-foreground/[0.02] border border-foreground/[0.06] rounded-xl p-6 sm:p-8 text-center">
            <p className="font-body text-base sm:text-lg text-foreground/60 leading-relaxed">
              {t('security.trustStatement')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
