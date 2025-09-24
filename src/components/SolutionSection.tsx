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
      className={`text-center p-8 transition-all duration-700 ${
        inView ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="mb-6 flex justify-center">
        <div className="p-4 rounded-2xl bg-brand-primary/10 text-brand-primary">
          <Icon size={32} />
        </div>
      </div>
      <h3 className="font-geist font-medium text-xl text-foreground mb-4">
        {title}
      </h3>
      <p className="font-poppins text-foreground/70 leading-relaxed">
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
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div 
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleInView ? 'animate-fade-in-down' : 'opacity-0'
          }`}
        >
          <h2 className="font-geist font-bold text-4xl md:text-6xl text-foreground mb-6">
            Mehr als Transkription:{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Echte Meeting-Intelligence
            </span>
          </h2>
          <p className="font-poppins font-medium text-xl text-foreground/70 max-w-4xl mx-auto">
            MeetioAI verwandelt chaotische Gespräche in strukturierte, durchsuchbare und umsetzbare Geschäftsintelligenz.
          </p>
        </div>

        {/* Three Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
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
          className={`max-w-4xl mx-auto transition-all duration-700 ${
            calloutInView ? 'animate-scale-in' : 'opacity-0'
          }`}
        >
          <div className="bg-secondary/50 border-2 border-brand-primary/20 rounded-2xl p-8 text-center shadow-card">
            <h3 className="font-geist font-bold text-2xl text-foreground mb-4">
              Implizites Wissen erfassen
            </h3>
            <p className="font-poppins text-lg text-foreground/80 leading-relaxed">
              Wir hören nicht nur, was gesagt wird—wir verstehen, was gemeint ist. 
              Erfassen Sie unausgesprochene Bedenken, Beziehungsdynamiken und strategischen Kontext.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};