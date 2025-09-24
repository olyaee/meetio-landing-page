import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";
import { ParticleNetwork } from "./ParticleNetwork";

export const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleInterestClick = () => {
    // This would open a modal or contact form
    console.log("Opening contact modal");
  };

  const handleDemoClick = () => {
    window.open("https://youtu.be/qWjb6uPpT80", "_blank");
  };

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-subtle"
    >
      {/* Particle Network Background */}
      <ParticleNetwork />
      
      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Main Headline */}
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h1 className="font-geist font-bold text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 leading-tight">
            Verwandeln Sie jedes Meeting in{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent animate-gradient-move bg-[length:200%_200%]">
              umsetzbare Erkenntnisse
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="font-poppins text-xl md:text-2xl text-foreground/80 mb-4 max-w-4xl mx-auto leading-relaxed">
            Stoppen Sie den Verlust von 37 Milliarden Dollar durch unproduktive Meetings. 
            Sparen Sie 4+ Stunden wöchentlich pro Mitarbeiter durch KI, die erfasst, was Menschen übersehen.
          </p>
        </div>

        {/* Value Proposition */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="font-poppins font-medium text-lg text-foreground/70 mb-12 max-w-3xl mx-auto">
            MeetioAI transformiert Meetings von Zeitfressern zu Intelligenz-Motoren. Erfassen Sie implizites Wissen, 
            automatisieren Sie Arbeitsabläufe und bewahren Sie institutionelles Gedächtnis—mit einem ROI von 180% bis 20.000% branchenübergreifend.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-700 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
          <Button 
            onClick={handleInterestClick}
            size="lg"
            className="bg-brand-primary hover:bg-brand-primary-dark text-white font-geist font-medium px-8 py-4 rounded-xl shadow-elegant hover:shadow-hover transition-all duration-300 group"
          >
            Interesse ermitteln
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            onClick={handleDemoClick}
            variant="outline"
            size="lg"
            className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-geist font-medium px-8 py-4 rounded-xl transition-all duration-300 group"
          >
            <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            3-Minuten Demo ansehen
          </Button>
        </div>

        {/* Social Proof */}
        <div className={`mt-16 transition-all duration-1000 delay-900 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="font-poppins text-sm text-foreground/60 mb-6">Vertraut von 500+ Unternehmen</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {/* These would be actual customer logos */}
            <div className="bg-foreground/10 rounded-lg px-6 py-3">
              <span className="font-geist font-medium text-foreground/70">Enterprise Corp</span>
            </div>
            <div className="bg-foreground/10 rounded-lg px-6 py-3">
              <span className="font-geist font-medium text-foreground/70">Global Consulting</span>
            </div>
            <div className="bg-foreground/10 rounded-lg px-6 py-3">
              <span className="font-geist font-medium text-foreground/70">Tech Solutions</span>
            </div>
            <div className="bg-foreground/10 rounded-lg px-6 py-3">
              <span className="font-geist font-medium text-foreground/70">Private Equity</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/20 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-brand-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};