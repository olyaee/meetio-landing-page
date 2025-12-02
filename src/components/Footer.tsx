import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getLocalizedRoute } from "@/utils/routes";
import { InterestContactForm } from "./InterestContactForm";

export const Footer = () => {
  const { t, i18n } = useTranslation('pages');
  const [formModalOpen, setFormModalOpen] = useState(false);

  const handleOpenContactForm = () => {
    setFormModalOpen(true);
  };
  
  // const productLinks = [
  //   { name: t('footer.links.product.howItWorks'), href: "#features" },
  //   { name: t('footer.links.product.integrations'), href: "#integrations" },
  //   { name: t('footer.links.product.security'), href: "#security" },
  //   { name: t('footer.links.product.api'), href: "#api" }
  // ];

  // const solutionLinks = [
  //   { name: t('footer.links.solutions.productTeams'), href: "#product-teams" },
  //   { name: t('footer.links.solutions.saas'), href: "#saas" },
  //   { name: t('footer.links.solutions.startups'), href: "#startups" },
  //   { name: t('footer.links.solutions.enterprise'), href: "#enterprise" }
  // ];

  // const resourceLinks = [
  //   { name: t('footer.links.resources.documentation'), href: "#docs" },
  //   { name: t('footer.links.resources.helpCenter'), href: "#help" },
  //   { name: t('footer.links.resources.roiStudies'), href: "#roi" },
  //   { name: t('footer.links.resources.bestPractices'), href: "#practices" }
  // ];

  // const companyLinks = [
  //   { name: t('footer.links.company.about'), href: getLocalizedRoute('aboutUs', i18n.language) },
  //   { name: t('footer.links.company.careers'), href: "#careers" },
  //   { name: t('footer.links.company.press'), href: "#press" },
  //   { name: t('footer.links.company.contact'), href: "#contact" }
  // ];

  const legalLinks = [
    { name: t('footer.links.legal.privacy'), href: getLocalizedRoute('privacy', i18n.language) },
    { name: t('footer.links.legal.terms'), href: getLocalizedRoute('terms', i18n.language) },
    { name: t('footer.links.legal.cookies'), href: getLocalizedRoute('cookies', i18n.language) },
    { name: t('footer.links.legal.imprint'), href: getLocalizedRoute('imprint', i18n.language) }
  ];

  return (
    <footer className="bg-foreground text-background py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/logo.png" 
                alt="meetio.ai Logo" 
                className="h-8 w-8 filter brightness-0 invert"
              />
              <span className="font-geist font-bold text-xl">meetio.ai</span>
            </div>
            <p className="font-poppins text-background/80 leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-background/80 hover:text-background hover:bg-background/10"
                onClick={handleOpenContactForm}
                aria-label="Contact us"
              >
                <Mail className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-background/80 hover:text-background hover:bg-background/10"
                asChild
              >
                <a 
                  href="https://www.linkedin.com/company/meetio-ai/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Follow meetio.ai on LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              {/* <Button variant="ghost" size="sm" className="text-background/80 hover:text-background hover:bg-background/10">
                <Twitter className="h-4 w-4" />
              </Button> */}
            </div>
          </div>

          {/* Product Links */}
          {/* <div>
            <h3 className="font-geist font-bold text-lg mb-4">{t('footer.sections.product')}</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="font-poppins text-background/80 hover:text-background transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Solution Links */}
          {/* <div>
            <h3 className="font-geist font-bold text-lg mb-4">{t('footer.sections.solutions')}</h3>
            <ul className="space-y-3">
              {solutionLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="font-poppins text-background/80 hover:text-background transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Resource Links */}
          {/* <div>
            <h3 className="font-geist font-bold text-lg mb-4">{t('footer.sections.resources')}</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="font-poppins text-background/80 hover:text-background transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Company Links */}
          {/* <div>
            <h3 className="font-geist font-bold text-lg mb-4">{t('footer.sections.company')}</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="font-poppins text-background/80 hover:text-background transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="font-poppins text-background/60 text-sm">
                {t('footer.copyright', { year: new Date().getFullYear() })}
              </p>
            </div>
            <div className="flex space-x-6">
              {legalLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.href}
                  className="font-poppins text-background/60 hover:text-background text-sm transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Information
        <div className="mt-8 pt-8 border-t border-background/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <p className="font-poppins font-medium text-background/80 mb-1">{t('footer.contact.support')}</p>
              <p className="font-poppins text-background/60 text-sm">support@meetio.ai</p>
            </div>
            <div>
              <p className="font-poppins font-medium text-background/80 mb-1">{t('footer.contact.enterprise')}</p>
              <p className="font-poppins text-background/60 text-sm">enterprise@meetio.ai</p>
            </div>
            <div>
              <p className="font-poppins font-medium text-background/80 mb-1">{t('footer.contact.security')}</p>
              <p className="font-poppins text-background/60 text-sm">security@meetio.ai</p>
            </div>
          </div>
        </div> */}
      </div>

      {/* Contact Form Modal */}
      <InterestContactForm
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        formType="contact"
      />
    </footer>
  );
};