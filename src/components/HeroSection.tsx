import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { MeetingCanvas } from "./MeetingCanvas";
import { InterestContactForm } from "./InterestContactForm";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [formType, setFormType] = useState<'interest' | 'contact' | 'waitlist'>('interest');
  const { t } = useTranslation('pages');

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleDemoClick = () => {
    window.open("https://youtu.be/-7oqsJ8nvzw", "_blank");
  };

  const handleROIClick = () => {
    // Scroll to ROI section on the same page
    const roiSection = document.getElementById('roi');
    if (roiSection) {
      roiSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-subtle px-4 sm:px-6"
    >
      {/* Mirage-style Canvas Background */}
      <MeetingCanvas />
      
      {/* Main Content */}
      <motion.div 
        className="relative z-10 max-w-6xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Main Headline */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <h1 className="font-geist font-bold text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-foreground mb-4 sm:mb-6 leading-tight px-2">
            {t('hero.title')}{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent animate-gradient-move bg-[length:200%_200%]">
              {t('hero.titleHighlight')}
            </span>
          </h1>
        </motion.div>

        {/* Subtitle
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          {/* <p className="font-poppins text-lg sm:text-xl md:text-2xl text-foreground/80 mb-3 sm:mb-4 max-w-4xl mx-auto leading-relaxed px-2">
            Stoppe den Verlust von 37 Milliarden Dollar durch unproduktive Meetings. 
            Spare 4+ Stunden wöchentlich pro Mitarbeiter durch KI, die erfasst, was Menschen übersehen.
          </p>
        </motion.div> */}

        {/* Value Proposition */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <p className="font-poppins font-medium text-base sm:text-lg text-foreground/70 mb-8 sm:mb-12 max-w-3xl mx-auto px-2">
            {t('hero.subtitle')}
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2.5 }}
        >
          <Button 
            onClick={handleDemoClick}
            size="lg"
            className="w-full sm:w-auto bg-brand-primary hover:bg-brand-primary-dark text-white font-geist font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-elegant hover:shadow-hover transition-all duration-300 group"
          >
            <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            {t('hero.ctaPrimary')}
          </Button>
          
          <Button 
            onClick={handleROIClick}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-geist font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 group"
          >
            {t('hero.ctaDemo')}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
      >
        <div className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-foreground/20 rounded-full flex justify-center">
          <div className="w-1 h-2 sm:h-3 bg-brand-primary rounded-full mt-1 sm:mt-2 animate-pulse"></div>
        </div>
      </motion.div>

      {/* Form Modal */}
      <InterestContactForm
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        formType={formType}
      />
    </section>
  );
};