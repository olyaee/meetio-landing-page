import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, ArrowRight } from "lucide-react";
import { InterestContactForm } from "./InterestContactForm";
import { motion } from "framer-motion";

export const ContactSection = () => {
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [formType, setFormType] = useState<'interest' | 'contact' | 'waitlist'>('contact');
  
  const [quoteRef, quoteInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [contactRef, contactInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });


  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-subtle">
      <div className="max-w-4xl mx-auto text-center">
        {/* Tolstoy Quote */}
        <div 
          ref={quoteRef}
          className={`mb-12 sm:mb-16 transition-all duration-700 ${
            quoteInView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <blockquote className="font-geist font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 sm:mb-6 leading-relaxed italic px-2">
            "Alle glücklichen Meetings sind einander ähnlich; jedes unglückliche Meeting ist auf seine Weise unglücklich."
          </blockquote>
          <p className="font-poppins font-medium text-lg sm:text-xl text-foreground/80 px-2">
            Möchtest du mehr happy Meetings?
          </p>
        </div>

        {/* Contact Section */}
        <div 
          ref={contactRef}
          className={`transition-all duration-700 ${
            contactInView ? 'animate-scale-in' : 'opacity-0'
          }`}
        >
          {/* <h2 className="font-geist font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 sm:mb-6 px-2">
            Lass uns deine Meeting-Herausforderungen lösen
          </h2> */}
          <p className="font-poppins font-medium text-base sm:text-lg text-foreground/70 mb-8 sm:mb-12 max-w-2xl mx-auto px-2">
            Jedes Unternehmen ist einzigartig. Erfahre, wie meetio.ai speziell für deine Branche und deine Bedürfnisse funktioniert.
          </p>

          {/* Contact CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
            {/* <Button 
              size="lg"
              onClick={() => {
                setFormType('contact');
                setFormModalOpen(true);
              }}
              className="w-full sm:w-auto bg-brand-primary hover:bg-brand-primary-dark text-white font-poppins font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-elegant hover:shadow-hover transition-all duration-300 group"
            >
              Jetzt Kontakt aufnehmen
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button> */}

            <Button 
              onClick={() => {
                setFormType('interest');
                setFormModalOpen(true);
              }}
              size="lg"
              className="w-full sm:w-auto bg-brand-primary hover:bg-brand-primary-dark text-white font-poppins font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-elegant hover:shadow-hover transition-all duration-300 group"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Interesse ermitteln
            </Button>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      <InterestContactForm
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        formType={formType}
      />
    </section>
  );
};