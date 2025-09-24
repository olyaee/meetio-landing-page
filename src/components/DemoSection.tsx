import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Play, CheckCircle } from "lucide-react";

export const DemoSection = () => {
  const [titleRef, titleInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [featuresRef, featuresInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const features = [
    {
      title: "Echtzeit-Transkription",
      description: "95%+ Genauigkeit mit Sprecheridentifikation in 20+ Sprachen"
    },
    {
      title: "Automatische CRM-Updates",
      description: "Opportunity-Updates, Task-Erstellung und Deal-Progression in 5 Minuten"
    },
    {
      title: "Meeting-übergreifende Insights",
      description: "Verbinden Sie Erkenntnisse über Monate und Teams hinweg"
    }
  ];

  const handleDemoClick = () => {
    window.open("https://youtu.be/qWjb6uPpT80", "_blank");
  };

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div 
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleInView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <h2 className="font-geist font-bold text-4xl md:text-6xl text-foreground mb-6">
            Sehen Sie MeetioAI in Aktion
          </h2>
          <p className="font-poppins font-medium text-xl text-foreground/70 max-w-3xl mx-auto">
            Erleben Sie, wie KI Ihr nächstes Meeting in strukturierte Geschäftsintelligenz verwandelt.
          </p>
        </div>

        {/* Demo Video Section */}
        <div className="relative mb-16">
          <div className="aspect-video bg-gradient-subtle rounded-2xl shadow-elegant flex items-center justify-center relative overflow-hidden">
            {/* Video Placeholder */}
            <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
            <Button
              onClick={handleDemoClick}
              size="lg"
              className="bg-brand-primary hover:bg-brand-primary-dark text-white font-poppins font-medium px-8 py-4 rounded-full shadow-hover hover:shadow-glow transition-all duration-300 relative z-10 group"
            >
              <Play className="mr-2 h-6 w-6 group-hover:scale-110 transition-transform" />
              Demo starten
            </Button>
            
            {/* Floating Elements */}
            <div className="absolute top-4 left-4 bg-white/90 rounded-lg px-3 py-2 shadow-card">
              <span className="font-poppins text-sm font-medium text-foreground">3-minütige Produktdemonstration</span>
            </div>
          </div>
        </div>

        {/* Feature Callouts */}
        <div 
          ref={featuresRef}
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700 ${
            featuresInView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-xl bg-card shadow-card hover:shadow-hover transition-all duration-300"
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="mb-4 flex justify-center">
                <CheckCircle className="h-8 w-8 text-brand-primary" />
              </div>
              <h3 className="font-geist font-medium text-lg text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="font-poppins text-foreground/70 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};