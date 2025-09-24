import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const StatisticCard = ({ 
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
  const [isVisible, setIsVisible] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timer);
    }
  }, [inView, delay]);

  return (
    <div 
      ref={ref}
      className={`text-center p-8 rounded-2xl bg-card shadow-card transition-all duration-700 ${
        isVisible ? 'animate-scale-in' : 'opacity-0 scale-90'
      }`}
    >
      <div className="mb-4">
        <span className="font-geist font-bold text-6xl md:text-7xl text-brand-accent block">
          {number}
        </span>
        <span className="font-geist font-bold text-2xl text-brand-accent">
          {unit}
        </span>
      </div>
      <p className="font-poppins text-foreground/80 text-lg leading-relaxed max-w-sm mx-auto">
        {description}
      </p>
    </div>
  );
};

export const ProblemSection = () => {
  const [titleRef, titleInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const statistics = [
    {
      number: "50",
      unit: "%",
      description: "aller Aktionspunkte gehen nach Meetings verloren"
    },
    {
      number: "23",
      unit: "Stunden",
      description: "verbringen Führungskräfte wöchentlich in Meetings—72% ihrer Arbeitszeit"
    },
    {
      number: "5.500",
      unit: "€",
      description: "kostet jeder Mitarbeiter jährlich durch Wissensmanagement-Versagen"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-subtle">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div 
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleInView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <h2 className="font-geist font-bold text-4xl md:text-6xl text-foreground mb-6">
            Die 37-Milliarden-Dollar Meeting-Krise
          </h2>
          <p className="font-poppins font-medium text-xl text-foreground/70 max-w-3xl mx-auto">
            Jedes Meeting ohne MeetioAI ist verlorenes Geld, verlorene Zeit und verlorenes Wissen.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {statistics.map((stat, index) => (
            <StatisticCard
              key={index}
              {...stat}
              delay={index * 200}
            />
          ))}
        </div>

        {/* Context Text */}
        <div className={`text-center transition-all duration-700 delay-600 ${
          titleInView ? 'animate-fade-in-up' : 'opacity-0'
        }`}>
          <p className="font-poppins text-lg text-foreground/70 max-w-4xl mx-auto leading-relaxed">
            Während Ihre Teams sprechen, entscheiden und planen, verschwindet kritisches Wissen ins Nichts. 
            Kundeneinblicke, strategische Überlegungen und Entscheidungslogik—alles geht verloren, 
            sobald das Meeting endet.
          </p>
        </div>
      </div>
    </section>
  );
};