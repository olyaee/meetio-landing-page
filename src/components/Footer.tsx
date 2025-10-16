import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation('pages');
  const productLinks = [
    { name: "Features", href: "#features" },
    { name: "Integrationen", href: "#integrations" },
    { name: "Sicherheit", href: "#security" },
    { name: "API", href: "#api" }
  ];

  const solutionLinks = [
    { name: "Unternehmensberatung", href: "#consulting" },
    { name: "SaaS", href: "#saas" },
    { name: "Private Equity", href: "#pe" },
    { name: "Anwaltskanzleien", href: "#legal" }
  ];

  const resourceLinks = [
    { name: "Dokumentation", href: "#docs" },
    { name: "Help Center", href: "#help" },
    { name: "ROI-Studien", href: "#roi" },
    { name: "Best Practices", href: "#practices" }
  ];

  const companyLinks = [
    { name: "Über uns", href: "/uber-uns" },
    { name: "Karriere", href: "#careers" },
    { name: "Presse", href: "#press" },
    { name: "Kontakt", href: "#contact" }
  ];

  const legalLinks = [
    { name: "Datenschutz", href: "/datenschutz" },
    { name: "AGB", href: "/agbs" },
    { name: "Cookie-Richtlinie", href: "/cookie-richtlinie" },
    { name: "Impressum", href: "/impressum" }
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
              <Button variant="ghost" size="sm" className="text-background/80 hover:text-background hover:bg-background/10">
                <Mail className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-background/80 hover:text-background hover:bg-background/10">
                <MessageSquare className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-background/80 hover:text-background hover:bg-background/10">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-background/80 hover:text-background hover:bg-background/10">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-geist font-bold text-lg mb-4">Produkt</h3>
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
          </div>

          {/* Solution Links */}
          <div>
            <h3 className="font-geist font-bold text-lg mb-4">Lösungen</h3>
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
          </div>

          {/* Resource Links */}
          <div>
            <h3 className="font-geist font-bold text-lg mb-4">Ressourcen</h3>
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
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-geist font-bold text-lg mb-4">Unternehmen</h3>
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
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="font-poppins text-background/60 text-sm">
                © 2025 meetio.ai. Alle Rechte vorbehalten.
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

        {/* Contact Information */}
        <div className="mt-8 pt-8 border-t border-background/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <p className="font-poppins font-medium text-background/80 mb-1">Support</p>
              <p className="font-poppins text-background/60 text-sm">support@meetio.ai</p>
            </div>
            <div>
              <p className="font-poppins font-medium text-background/80 mb-1">Enterprise</p>
              <p className="font-poppins text-background/60 text-sm">enterprise@meetio.ai</p>
            </div>
            <div>
              <p className="font-poppins font-medium text-background/80 mb-1">Sicherheit</p>
              <p className="font-poppins text-background/60 text-sm">security@meetio.ai</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};