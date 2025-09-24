import { useInView } from "react-intersection-observer";
import { Brain, Zap, Shield, Clock, TrendingUp } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { useIsMobile } from "../hooks/use-mobile";


// Hauptkomponente, die Demo und Lösung kombiniert
export const SolutionSection = () => {
  const isMobile = useIsMobile();
  const [titleRef, titleInView] = useInView({ threshold: 0.5, triggerOnce: true });
  const [demoRef, demoInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [calloutRef, calloutInView] = useInView({ threshold: 0.3, triggerOnce: true });
  
  // Animation controls for sequential animations
  const titleControls = useAnimation();
  const imageControls = useAnimation();
  const roiControls = useAnimation();
  const pillarsAnimationControls = useAnimation();
  const calloutAnimationControls = useAnimation();
  const [animationStep, setAnimationStep] = useState(0);
  
  const startSequentialAnimation = useCallback(async () => {
    // Step 1: Show title
    setAnimationStep(1);
    await titleControls.start({ opacity: 1, y: 0 });
    
    // Step 2: Show image at full width
    setAnimationStep(2);
    await imageControls.start({ opacity: 1, scale: 1 });
    
    // Wait a bit for user to see full image
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 3: Move image left and make smaller, show ROI (desktop only)
    if (!isMobile) {
      setAnimationStep(3);
      await Promise.all([
        imageControls.start({ 
          width: "70%", 
          x: 0,
          transition: { duration: 0.8, ease: "easeInOut" }
        }),
        roiControls.start({ 
          opacity: 1, 
          x: 0,
          transition: { duration: 0.8, ease: "easeInOut", delay: 0.3 }
        })
      ]);
    } else {
      // On mobile, just show the stats below the image
      setAnimationStep(3);
      await roiControls.start({ 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.8, ease: "easeInOut" }
      });
    }
    
    // Step 4: Show 3-column pillars after stats are visible
    await new Promise(resolve => setTimeout(resolve, 800));
    setAnimationStep(4);
    await pillarsAnimationControls.start({ 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    });
    
    // Step 5: Show callout box after pillars are complete
    await new Promise(resolve => setTimeout(resolve, 600));
    setAnimationStep(5);
    await calloutAnimationControls.start({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    });
  }, [isMobile, titleControls, imageControls, roiControls, pillarsAnimationControls, calloutAnimationControls, setAnimationStep]);

  // Sequential animation trigger
  useEffect(() => {
    if (demoInView && animationStep === 0) {
      startSequentialAnimation();
    }
  }, [demoInView, animationStep, startSequentialAnimation]);
  

  const statistics = [
    { icon: Clock, number: "23h", label: "Meeting-Zeit wöchentlich gespart" },
    { icon: TrendingUp, number: "180%", label: "Durchschnittlicher ROI" },
    { icon: Zap, number: "50%", label: "Weniger unproduktive Meetings" },
  ];

  const pillars = [
    { icon: Brain, title: "Entscheidungen bewegen sich 3x schneller", description: "Mit vollständigem Kontext. Keine verlorenen Diskussionen mehr." },
    { icon: Zap, title: "Nie wieder Multitasken um Notizen machen", description: "Konzentriere dich voll auf die Diskussion, während meetio.ai automatisch alles erfasst." },
    { icon: Shield, title: "Implizites Wissen bewahren", description: "Das normalerweise mit kündigenden Mitarbeitern das Unternehmen verlässt." }
  ];

  return (
    <section id="features" className="py-16 sm:py-20 px-4 sm:px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* 1. Section Header with Motion */}
        <div ref={titleRef}>
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={titleControls}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-geist font-bold text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-foreground mb-4 sm:mb-6 px-2">
              Mehr als Transkription:{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Echte Meeting-Intelligence
              </span>
            </h2>
            <p className="font-poppins font-medium text-base sm:text-lg md:text-xl text-foreground/70 max-w-4xl mx-auto px-2">
              meetio.ai verwandelt chaotische Gespräche in strukturierte, durchsuchbare und umsetzbare Geschäftsintelligenz.
            </p>
          </motion.div>
        </div>

        {/* 2. Demo Animation Container */}
        <div ref={demoRef} className="mb-16 sm:mb-20">
          <div className="flex flex-col md:flex-row items-start justify-center">
            {/* Demo Image - starts full width, then moves left and shrinks */}
            <motion.div
              className="relative w-full md:w-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={imageControls}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="/interface_demo.png" 
                alt="Meetio AI Interface - Meeting Intelligence Dashboard" 
                className="w-full rounded-2xl shadow-2xl border border-foreground/10"
              />
            </motion.div>
            
            {/* ROI Statistics - appears on the right (25% width) */}
            <motion.div
              className="w-full md:w-1/4 md:ml-8 mt-8 md:mt-0 flex-shrink-0"
              initial={{ opacity: 0, x: isMobile ? 0 : 0, y: isMobile ? 20 : 0 }}
              animate={roiControls}
              transition={{ duration: 0.8 }}
            >
              <div className="flex flex-col gap-4">
                {statistics.map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="flex flex-col text-center p-4 rounded-xl bg-card shadow-card hover:shadow-hover transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <div className="mb-3 flex justify-center">
                      <div className="p-3 rounded-full bg-brand-primary/10 group-hover:bg-brand-primary/20 transition-colors">
                        <stat.icon className="h-6 w-6 text-brand-primary" />
                      </div>
                    </div>
                    <div className="font-geist font-bold text-3xl md:text-4xl text-brand-primary mb-2">
                      {stat.number}
                    </div>
                    <p className="font-poppins text-sm text-foreground/70 leading-tight">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* 3. Drei Säulen (Pillars) with Motion */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={pillarsAnimationControls}
        >
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              className="text-center p-4 sm:p-6 md:p-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 + 0.3, duration: 0.6 }}
            >
              <div className="mb-4 sm:mb-6 flex justify-center">
                <div className="p-3 sm:p-4 rounded-2xl bg-brand-primary/10 text-brand-primary">
                  <pillar.icon size={24} className="sm:w-8 sm:h-8" />
                </div>
              </div>
              <h3 className="font-geist font-medium text-lg sm:text-xl text-foreground mb-3 sm:mb-4">
                {pillar.title}
              </h3>
              <p className="font-poppins text-sm sm:text-base text-foreground/70 leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* 4. Callout-Box - Animated after pillars */}
        <motion.div
          className="max-w-4xl mx-auto px-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={calloutAnimationControls}
        >
          <div className="bg-secondary/50 border-2 border-brand-primary/20 rounded-2xl p-6 sm:p-8 text-center shadow-card">
            <h3 className="font-geist font-bold text-xl sm:text-2xl text-foreground mb-3 sm:mb-4">
              Implizites Wissen erfassen
            </h3>
            <p className="font-poppins text-base sm:text-lg text-foreground/80 leading-relaxed">
              Wir hören nicht nur, was gesagt wird—wir verstehen, was gemeint ist. 
              Erfasse unausgesprochene Bedenken, Beziehungsdynamiken und strategischen Kontext.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};