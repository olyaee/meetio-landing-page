import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mail, MessageSquare, X, CheckCircle, Loader2 } from "lucide-react";
import emailjs from '@emailjs/browser';

type FormType = 'interest' | 'contact' | 'waitlist';
type ContactMethod = 'email' | 'whatsapp';

interface InterestContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  formType: FormType;
}

export const InterestContactForm = ({ isOpen, onClose, formType }: InterestContactFormProps) => {
  const [contactMethod, setContactMethod] = useState<ContactMethod>('email');
  const [formData, setFormData] = useState({
    email: '',
    whatsapp: '',
    message: '',
    company: '',
    name: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const getFormTitle = () => {
    switch (formType) {
      case 'interest':
        return 'Interesse ermitteln';
      case 'waitlist':
        return 'Frühzugang sichern';
      case 'contact':
        return 'Kontaktiere uns';
      default:
        return 'Kontakt';
    }
  };

  const getFormDescription = () => {
    switch (formType) {
      case 'interest':
        return 'Erzähle uns von deinen Meeting-Herausforderungen. Wir melden uns binnen 24 Stunden.';
      case 'waitlist':
        return 'Sichere dir frühzeitigen Zugang zu MeetioAI. Wir informieren dich, sobald wir verfügbar sind.';
      case 'contact':
        return 'Hast du Fragen oder möchtest eine Demo? Wir sind hier, um zu helfen.';
      default:
        return '';
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name ist erforderlich';
    }

    if (contactMethod === 'email') {
      if (!formData.email.trim()) {
        newErrors.email = 'E-Mail ist erforderlich';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Bitte gib eine gültige E-Mail-Adresse ein';
      }
    }

    if (contactMethod === 'whatsapp') {
      if (!formData.whatsapp.trim()) {
        newErrors.whatsapp = 'WhatsApp-Nummer ist erforderlich';
      } else if (!/^\+?[\d\s-()]+$/.test(formData.whatsapp)) {
        newErrors.whatsapp = 'Bitte gib eine gültige Telefonnummer ein';
      }
    }

    if (formType === 'contact' && !formData.message.trim()) {
      newErrors.message = 'Nachricht ist erforderlich';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // This object's keys MUST match the variable names in your EmailJS template
    const templateParams = {
      formType: formType,
      contactMethod: contactMethod,
      name: formData.name,
      company: formData.company || 'Nicht angegeben',
      email: formData.email,
      whatsapp: formData.whatsapp,
      message: formData.message || 'Keine zusätzliche Nachricht hinterlassen.',
    };
    
    try {
      // Use the environment variables from your .env file
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      
      setIsSubmitted(true);
      
      // Close modal after success message
      setTimeout(() => {
        handleClose(); // handleClose resets the form
      }, 2000);
      
    } catch (error) {
      console.error('FAILED...', error);
      alert('Fehler beim Senden. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleClose = () => {
    onClose();
    setIsSubmitted(false);
    setFormData({ email: '', whatsapp: '', message: '', company: '', name: '' });
    setErrors({});
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-geist font-bold text-xl sm:text-2xl text-center pr-8">
            {getFormTitle()}
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-8"
            >
              <CheckCircle className="h-16 w-16 text-brand-success mx-auto mb-4" />
              <h3 className="font-geist font-bold text-lg mb-2">Erfolgreich gesendet!</h3>
              <p className="font-poppins text-foreground/70">
                Danke für dein Interesse. Wir melden uns binnen 24 Stunden bei dir.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="font-poppins text-foreground/70 text-center mb-6">
                {getFormDescription()}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-medium">
                    Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Dein Name"
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm">{errors.name}</p>
                  )}
                </div>

                {/* Company Field */}
                <div className="space-y-2">
                  <Label htmlFor="company" className="font-medium">
                    Unternehmen
                  </Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder="Dein Unternehmen (optional)"
                  />
                </div>

                {/* Contact Method Selection */}
                <div className="space-y-4">
                  <Label className="font-medium">
                    Wie sollen wir dich erreichen? *
                  </Label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant={contactMethod === 'email' ? 'default' : 'outline'}
                      onClick={() => setContactMethod('email')}
                      className="justify-start h-auto p-4"
                    >
                      <Mail className="mr-3 h-5 w-5" />
                      <div className="text-left">
                        <div className="font-medium">📧 E-Mail</div>
                        <div className="text-xs opacity-70">Professionell</div>
                      </div>
                    </Button>
                    
                    <Button
                      type="button"
                      variant={contactMethod === 'whatsapp' ? 'default' : 'outline'}
                      onClick={() => setContactMethod('whatsapp')}
                      className="justify-start h-auto p-4"
                    >
                      <MessageSquare className="mr-3 h-5 w-5" />
                      <div className="text-left">
                        <div className="font-medium">📱 WhatsApp</div>
                        <div className="text-xs opacity-70">Schnell</div>
                      </div>
                    </Button>
                  </div>
                </div>

                {/* Email Input */}
                {contactMethod === 'email' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="email" className="font-medium">
                      E-Mail Adresse *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="deine@email.com"
                      className={errors.email ? 'border-destructive' : ''}
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm">{errors.email}</p>
                    )}
                  </motion.div>
                )}

                {/* WhatsApp Input */}
                {contactMethod === 'whatsapp' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="whatsapp" className="font-medium">
                      WhatsApp Nummer *
                    </Label>
                    <Input
                      id="whatsapp"
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                      placeholder="+49 123 456 7890"
                      className={errors.whatsapp ? 'border-destructive' : ''}
                    />
                    {errors.whatsapp && (
                      <p className="text-destructive text-sm">{errors.whatsapp}</p>
                    )}
                  </motion.div>
                )}

                {/* Message Field (for contact form) */}
                {formType === 'contact' && (
                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-medium">
                      Nachricht *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Erzähle uns von deinen Meeting-Herausforderungen oder stelle deine Fragen..."
                      rows={4}
                      className={errors.message ? 'border-destructive' : ''}
                    />
                    {errors.message && (
                      <p className="text-destructive text-sm">{errors.message}</p>
                    )}
                  </div>
                )}

                {/* Optional Message Field (for interest/waitlist) */}
                {(formType === 'interest' || formType === 'waitlist') && (
                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-medium">
                      Nachricht (optional)
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Zusätzliche Informationen oder spezielle Anforderungen..."
                      rows={3}
                    />
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-primary hover:bg-brand-primary-dark text-white font-medium py-3 rounded-xl shadow-elegant hover:shadow-hover transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Wird gesendet...
                    </>
                  ) : (
                    'Absenden'
                  )}
                </Button>
              </form>

              <p className="text-center text-xs text-foreground/60 mt-4">
                Wir antworten normalerweise binnen 24 Stunden. Deine Daten werden vertraulich behandelt.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};