import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialCard = ({ 
  quote, 
  author, 
  metric, 
  delay = 0 
}: { 
  quote: string; 
  author: string; 
  metric: string; 
  delay?: number; 
}) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <Card 
      ref={ref}
      className={`transition-all duration-700 hover:shadow-hover ${
        inView ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <CardContent className="p-4 sm:p-6 md:p-8">
        {/* Stars */}
        <div className="flex mb-3 sm:mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-brand-accent text-brand-accent" />
          ))}
        </div>
        
        {/* Quote */}
        <blockquote className="font-poppins italic text-sm sm:text-base text-foreground/80 mb-4 sm:mb-6 leading-relaxed">
          "{quote}"
        </blockquote>
        
        {/* Author */}
        <div className="border-t border-foreground/10 pt-3 sm:pt-4">
          <p className="font-poppins font-medium text-xs sm:text-sm text-foreground mb-2">
            {author}
          </p>
          <div className="inline-block bg-brand-success/10 text-brand-success font-geist font-bold px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
            {metric}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const TestimonialsSection = () => {
  const [titleRef, titleInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const testimonials = [
    {
      quote: "3 Monate Reduzierung der Einarbeitungszeit für neue Mandanten. MeetioAI hat unsere gesamte Client-Intelligence revolutioniert.",
      author: "— Dr. Marcus Weber, Senior Partner, Globale Unternehmensberatung",
      metric: "3 Monate Reduzierung"
    },
    {
      quote: "30% schnellere Entwicklungszyklen seit der Implementierung. Endlich gehen keine Produktentscheidungen mehr verloren.",
      author: "— Sarah Zimmermann, VP Product, Enterprise SaaS",
      metric: "30% schneller"
    },
    {
      quote: "25% Verbesserung der Due-Diligence-Effizienz. Deal-Insights sind endlich miteinander verbunden.",
      author: "— Thomas Richter, Managing Director, Private Equity",
      metric: "25% Verbesserung"
    }
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-subtle">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div 
          ref={titleRef}
          className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${
            titleInView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <h2 className="font-geist font-bold text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-foreground mb-4 sm:mb-6 px-2">
            Vertraut von 500+ Unternehmen
          </h2>
          <p className="font-poppins font-medium text-base sm:text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto px-2">
            Führende Organisationen nutzen MeetioAI bereits für messbare Geschäftsergebnisse.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              {...testimonial}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
};