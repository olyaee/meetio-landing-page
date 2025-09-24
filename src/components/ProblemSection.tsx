import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

// This component is now clean and only contains its own logic.
const AnimatedStatistic = ({ 
  number, 
  unit, 
  description, 
  delay = 0 
}: { 
  number: string; 
  unit: string; 
  description: string; 
  delay?: number; 
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          duration: 0.8,
          delay: delay / 1000,
          ease: [0.23, 1, 0.320, 1]
        }
      });
    }
  }, [inView, controls, delay]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={controls}
      className="text-center p-6 sm:p-8 rounded-2xl bg-card shadow-card hover:shadow-hover transition-shadow duration-300"
    >
      <div className="mb-4">
        <motion.span 
          className="font-geist font-bold text-5xl sm:text-6xl md:text-7xl text-brand-accent block"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: (delay + 300) / 1000, duration: 0.6 }}
        >
          {number}
        </motion.span>
        <motion.span 
          className="font-geist font-bold text-xl sm:text-2xl text-brand-accent"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: (delay + 500) / 1000, duration: 0.6 }}
        >
          {unit}
        </motion.span>
      </div>
      <motion.p 
        className="font-poppins text-foreground/80 text-base sm:text-lg leading-relaxed max-w-sm mx-auto"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: (delay + 700) / 1000, duration: 0.6 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

export const ProblemSection = () => {
  // --- FIX 1: Moved state logic here from AnimatedStatistic ---
  const [currentProblem, setCurrentProblem] = useState(0);

  const meetingProblems = [
    "verlorene Aktionspunkte",
    "vergessene Entscheidungen", 
    "unklare Verantwortlichkeiten",
    "wiederholte Diskussionen",
    "verschwendete Zeit",
    "verpasste Deadlines"
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProblem((prev) => (prev + 1) % meetingProblems.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []); // Empty dependency array is correct here.

  // --- FIX 2: Created separate refs for each animated section ---
  const [mainTitleRef, mainTitleInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [contextTextRef, contextTextInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  const [dynamicTextRef, dynamicTextInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const statistics = [
    { number: "50", unit: "%", description: "aller Aktionspunkte gehen nach Meetings verloren" },
    { number: "23", unit: "Stunden", description: "verbringen Führungskräfte wöchentlich in Meetings—72% ihrer Arbeitszeit" },
    { number: "5.500", unit: "€", description: "kostet jeder Mitarbeiter jährlich durch Wissensmanagement-Versagen" }
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto">

        {/* Section Title */}
        <motion.div 
          ref={mainTitleRef}
          initial={{ opacity: 0, y: 50 }}
          animate={mainTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }} // Adjusted delay
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="font-geist font-bold text-3xl sm:text-4xl md:text-6xl text-foreground mb-4 sm:mb-6">
            Die 37-Milliarden-Dollar Meeting-Krise
          </h2>
        </motion.div>
        {/* Animated Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {statistics.map((stat, index) => (
            <AnimatedStatistic key={index} {...stat} delay={index * 400} />
          ))}
        </div>



        {/* Context Text - FIX 3: Using a proper ref and hook now */}
        <motion.div 
          ref={contextTextRef}
          initial={{ opacity: 0, y: 30 }}
          animate={contextTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }} // Adjusted delay
          className="text-center"
        >
          <p className="font-poppins text-base sm:text-lg text-foreground/70 max-w-4xl mx-auto leading-relaxed">
            Während deine Teams sprechen, entscheiden und planen, verschwindet kritisches Wissen ins Nichts. 
            Kundeneinblicke, strategische Überlegungen und Entscheidungslogik—alles geht verloren, 
            sobald das Meeting endet.
          </p>
        </motion.div>

        {/* Dynamic Text Section - FIX 2: Using its own unique ref */}
        <div 
          ref={dynamicTextRef}
          className={`text-center mt-12 sm:mt-16 transition-opacity duration-700 ${
            dynamicTextInView ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="mb-6 sm:mb-8">
            <h2 className="font-geist font-bold text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-foreground mb-3 sm:mb-4 px-2">
              <span className="wave-hand">👋</span> Wave goodbye to
            </h2>
            <div className="relative h-16 sm:h-20 flex items-center justify-center px-2">
              {meetingProblems.map((problem, index) => (
                <div
                  key={problem}
                  className={`absolute transition-all duration-500 ${
                    index === currentProblem
                      ? 'opacity-100 transform translate-y-0'
                      : 'opacity-0 transform -translate-y-4' // Changed to -translate-y for a better exit animation
                  }`}
                >
                  <span className="font-geist font-bold text-xl sm:text-2xl md:text-4xl lg:text-5xl text-destructive text-center">
                    {problem}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <p className="font-poppins font-medium text-base sm:text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto px-2">
            Mit meetio.ai verwandelst du chaotische Meetings in strukturierte Geschäftsintelligenz
          </p>
        </div>
      </div>
    </section>
  );
};