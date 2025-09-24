import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const ContactSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [quoteRef, quoteInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [contactRef, contactInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const handleEmailContact = () => {
    window.location.href = "mailto:hello@meetio.ai";
  };

  const handleWhatsAppContact = () => {
    // Replace with actual WhatsApp number
    window.open("https://wa.me/1234567890", "_blank");
  };

  return (
    <section className="py-20 px-6 bg-gradient-subtle">
      <div className="max-w-4xl mx-auto text-center">
        {/* Tolstoy Quote */}
        <div 
          ref={quoteRef}
          className={`mb-16 transition-all duration-700 ${
            quoteInView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <blockquote className="font-geist font-medium text-2xl md:text-4xl text-foreground mb-6 leading-relaxed italic">
            "Alle glücklichen Meetings sind einander ähnlich; jedes unglückliche Meeting ist auf seine Weise unglücklich."
          </blockquote>
          <p className="font-poppins font-medium text-xl text-foreground/80">
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
          <h2 className="font-geist font-bold text-3xl md:text-5xl text-foreground mb-6">
            Lassen Sie uns Ihre Meeting-Herausforderungen lösen
          </h2>
          <p className="font-poppins font-medium text-lg text-foreground/70 mb-12 max-w-2xl mx-auto">
            Jedes Unternehmen ist einzigartig. Erfahren Sie, wie MeetioAI speziell für Ihre Branche und Ihre Bedürfnisse funktioniert.
          </p>

          {/* Contact CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="lg"
                  className="bg-brand-primary hover:bg-brand-primary-dark text-white font-poppins font-medium px-8 py-4 rounded-xl shadow-elegant hover:shadow-hover transition-all duration-300 group"
                >
                  Jetzt Kontakt aufnehmen
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </DialogTrigger>
              
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-geist font-bold text-xl text-center">
                    Wie möchten Sie uns erreichen?
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <Button
                    onClick={handleEmailContact}
                    variant="outline"
                    className="w-full justify-start text-left h-auto p-4"
                  >
                    <Mail className="mr-3 h-5 w-5 text-brand-primary" />
                    <div>
                      <div className="font-medium">📧 E-Mail</div>
                      <div className="text-sm text-muted-foreground">hello@meetio.ai</div>
                    </div>
                  </Button>
                  
                  <Button
                    onClick={handleWhatsAppContact}
                    variant="outline"
                    className="w-full justify-start text-left h-auto p-4"
                  >
                    <MessageSquare className="mr-3 h-5 w-5 text-brand-success" />
                    <div>
                      <div className="font-medium">📱 WhatsApp</div>
                      <div className="text-sm text-muted-foreground">Sofortige Antwort</div>
                    </div>
                  </Button>
                  
                  <p className="text-center text-sm text-muted-foreground pt-2">
                    Wir melden uns binnen 24 Stunden zurück
                  </p>
                </div>
              </DialogContent>
            </Dialog>

            <Button 
              onClick={handleWhatsAppContact}
              size="lg"
              className="bg-brand-success hover:bg-brand-success/90 text-white font-poppins font-medium px-8 py-4 rounded-xl shadow-elegant hover:shadow-hover transition-all duration-300"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              WhatsApp uns
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};