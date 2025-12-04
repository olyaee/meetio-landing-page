import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check, ArrowRight, Shield, Lock, Server } from "lucide-react";

const PricingTier = ({
  name,
  price,
  roi,
  features,
  isPopular = false,
}: {
  name: string;
  price: string;
  roi: string;
  features: string[];
  isPopular?: boolean;
}) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <Card
      ref={ref}
      className={`relative transition-all duration-300 hover:shadow-hover ${
        isPopular ? 'border-2 border-brand-primary shadow-glow' : ''
      } ${inView ? 'animate-scale-in' : 'opacity-0'}`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-brand-primary text-white px-4 py-1 rounded-full text-sm font-poppins font-medium">
            Beliebt
          </div>
        </div>
      )}
      
      <CardHeader className="text-center pb-4">
        <h3 className="font-geist font-bold text-xl text-foreground mb-2">{name}</h3>
        <div className="mb-2">
          <span className="font-geist font-bold text-3xl text-foreground">{price}</span>
          <span className="font-poppins text-foreground/60">/Nutzer/Monat</span>
        </div>
        <div className="bg-brand-success/10 text-brand-success font-geist font-medium px-3 py-1 rounded-full text-sm inline-block">
          {roi}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-4 w-4 text-brand-primary mt-1 mr-3 flex-shrink-0" />
              <span className="font-poppins text-sm text-foreground/80">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          className={`w-full ${
            isPopular 
              ? 'bg-brand-primary hover:bg-brand-primary-dark text-white' 
              : 'bg-secondary hover:bg-secondary/80 text-foreground'
          }`}
        >
          ROI berechnen
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

const SecurityFeature = ({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={`text-center p-6 transition-all duration-300 ${
        inView ? 'animate-fade-in-up' : 'opacity-0'
      }`}
    >
      <div className="mb-4 flex justify-center">
        <div className="p-3 rounded-xl bg-brand-primary/10 text-brand-primary">
          <Icon size={24} />
        </div>
      </div>
      <h3 className="font-geist font-medium text-lg text-foreground mb-3">
        {title}
      </h3>
      <p className="font-poppins text-sm text-foreground/70 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export const PricingSection = () => {
  const [titleRef, titleInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [securityRef, securityInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const pricingTiers = [
    {
      name: "Business",
      price: "59€",
      roi: "Amortisation in 3 Wochen",
      features: [
        "Kern Bug-Intelligence",
        "Standard-Integrationen", 
        "Business Support",
        "Bis zu 50 Nutzer"
      ]
    },
    {
      name: "Professional",
      price: "99€",
      roi: "Amortisation in 2 Wochen",
      features: [
        "Erweiterte Bug-Analyse",
        "Unbegrenzte Bug-Reports",
        "Priority Support",
        "Erweiterte CRM-Integration"
      ],
      isPopular: true
    },
    {
      name: "Enterprise",
      price: "149€",
      roi: "Amortisation in 1 Woche",
      features: [
        "Vollständige Enterprise-Features",
        "On-Premise Deployment",
        "Dedicated Success Manager",
        "Custom Integrationen"
      ]
    }
  ];

  const securityFeatures = [
    {
      icon: Shield,
      title: "Ende-zu-Ende-Verschlüsselung",
      description: "AES-256 im Ruhezustand, TLS 1.3 bei der Übertragung"
    },
    {
      icon: Lock,
      title: "Vollständige Compliance",
      description: "GDPR, CCPA, HIPAA, SOX, FERPA—branchenspezifische Anforderungen erfüllt"
    },
    {
      icon: Server,
      title: "Flexible Bereitstellung",
      description: "Cloud, Hybrid oder vollständig On-Premise mit Daten-Souveränität"
    }
  ];

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Pricing Header */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-300 ${
            titleInView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <h2 className="font-geist font-bold text-4xl md:text-6xl text-foreground mb-6">
            Eine Investition, die sich in Wochen amortisiert
          </h2>
          <p className="font-poppins font-medium text-xl text-foreground/70 max-w-3xl mx-auto">
            Transparente Preisgestaltung mit garantierten ROI-Zeitleisten für jede Branche.
          </p>
        </div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {pricingTiers.map((tier, index) => (
            <PricingTier
              key={index}
              {...tier}
            />
          ))}
        </div>

        {/* Security Section */}
        <div
          ref={securityRef}
          className={`transition-all duration-300 ${
            securityInView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <div className="text-center mb-12">
            <h3 className="font-geist font-bold text-3xl md:text-4xl text-foreground mb-4">
              Enterprise-Sicherheit auf höchstem Niveau
            </h3>
            <p className="font-poppins text-lg text-foreground/70 max-w-2xl mx-auto">
              Ihre sensiblen Geschäftsdaten verdienen militärischen Schutz mit vollständiger Compliance-Abdeckung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {securityFeatures.map((feature, index) => (
              <SecurityFeature
                key={index}
                {...feature}
              />
            ))}
          </div>

          {/* Security Badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-12">
            {["SOC 2 Type II", "ISO 27001", "GDPR Compliant", "HIPAA Ready"].map((badge, index) => (
              <div key={index} className="bg-secondary/50 border border-foreground/10 rounded-lg px-4 py-2">
                <span className="font-poppins font-medium text-sm text-foreground/80">{badge}</span>
              </div>
            ))}
          </div>

          {/* Trust Statement */}
          <div className="bg-brand-primary/5 border border-brand-primary/20 rounded-2xl p-8 text-center">
            <h4 className="font-geist font-bold text-xl text-foreground mb-3">
              Zero-Trust-Architektur
            </h4>
            <p className="font-poppins text-foreground/80 leading-relaxed">
              Ihre Daten bleiben Ihre Daten. Wir sehen, speichern oder nutzen keine Geschäftsinhalte für Training oder andere Zwecke.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};