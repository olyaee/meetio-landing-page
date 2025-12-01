import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const DemoSection = () => {
  const { t } = useTranslation('pages');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="demo"
      ref={ref}
      className="py-20 sm:py-28 px-4 sm:px-6 bg-background"
    >
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <p className="font-body text-xs uppercase tracking-[0.2em] text-foreground/40 mb-4">
            See it in action
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight tracking-[-0.02em]">
            {t('demo.title')}
          </h2>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-video bg-foreground/[0.02] rounded-xl border border-foreground/[0.08] overflow-hidden">
            <video
              src="/demo-video.mp4#t=0.001"
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-contain"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
