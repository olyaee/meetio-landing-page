import { useInView } from "react-intersection-observer";
import { Brain, Zap, Shield } from "lucide-react";

const FeaturePillar = ({ 
  icon: Icon, 
  title, 
  description, 
  delay = 0 
}: { 
  icon: any; 
  title: string; 
  description: string; 
  delay?: number; 
}) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div 
      ref={ref}
      className={`text-center p-4 sm:p-6 md:p-8 transition-all duration-700 ${
        inView ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="mb-4 sm:mb-6 flex justify-center">
        <div className="p-3 sm:p-4 rounded-2xl bg-brand-primary/10 text-brand-primary">
          <Icon size={24} className="sm:w-8 sm:h-8" />
        </div>
      </div>
      <h3 className="font-geist font-medium text-lg sm:text-xl text-foreground mb-3 sm:mb-4">
        {title}
      </h3>
      <p className="font-poppins text-sm sm:text-base text-foreground/70 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export const SolutionSection = () => {
  const [titleRef, titleInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [calloutRef, calloutInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const pillars = [
    {
      icon: Brain,
      title: "Individuelle Befreiung",
      description: "Nie wieder Notizen machen. Nie wieder Aktionspunkte verlieren. Immer perfekt vorbereitet ankommen."
    },
    {
      icon: Zap,
      title: "Team-Beschleunigung",
      description: "Entscheidungen bewegen sich 3x schneller mit vollständigem Kontext. Keine verlorenen Diskussionen mehr."
    },
    {
      icon: Shield,
      title: "Organisatorische Intelligenz",
      description: "Bewahren Sie Wissen, das normalerweise mit kündigenden Mitarbeitern das Unternehmen verlässt."
    }
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div 
          ref={titleRef}
          className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${
            titleInView ? 'animate-fade-in-down' : 'opacity-0'
          }`}
        >
          <h2 className="font-geist font-bold text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-foreground mb-4 sm:mb-6 px-2">
            Mehr als Transkription:{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Echte Meeting-Intelligence
            </span>
          </h2>
          <p className="font-poppins font-medium text-base sm:text-lg md:text-xl text-foreground/70 max-w-4xl mx-auto px-2">
            MeetioAI verwandelt chaotische Gespräche in strukturierte, durchsuchbare und umsetzbare Geschäftsintelligenz.
          </p>
        </div>

        {/* Three Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {pillars.map((pillar, index) => (
            <FeaturePillar
              key={index}
              {...pillar}
              delay={index * 200}
            />
          ))}
        </div>

        {/* Unique Differentiator Callout */}
        <div 
          ref={calloutRef}
          className={`max-w-4xl mx-auto transition-all duration-700 px-4 ${
            calloutInView ? 'animate-scale-in' : 'opacity-0'
          }`}
        >
          <div className="bg-secondary/50 border-2 border-brand-primary/20 rounded-2xl p-6 sm:p-8 text-center shadow-card">
            <h3 className="font-geist font-bold text-xl sm:text-2xl text-foreground mb-3 sm:mb-4">
              Implizites Wissen erfassen
            </h3>
            <p className="font-poppins text-base sm:text-lg text-foreground/80 leading-relaxed">
              Wir hören nicht nur, was gesagt wird—wir verstehen, was gemeint ist. 
              Erfassen Sie unausgesprochene Bedenken, Beziehungsdynamiken und strategischen Kontext.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};