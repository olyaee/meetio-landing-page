import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Produkt", href: "#product" },
    { name: "Lösungen", href: "#solutions" },
    { name: "Preise", href: "#pricing" },
    { name: "Ressourcen", href: "#resources" },
    { name: "Unternehmen", href: "#company" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-background/90 backdrop-blur-md shadow-elegant" 
        : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/7734cd4a-c927-4520-aafb-e3d822dfe71e.png" 
              alt="MeetioAI Logo" 
              className="h-8 w-8"
            />
            <span className="font-geist font-bold text-xl text-foreground">
              MeetioAI
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-poppins text-foreground/80 hover:text-brand-primary transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="font-poppins text-foreground/80 hover:text-brand-primary">
              Kontakt
            </Button>
            <Button className="bg-brand-primary hover:bg-brand-primary-dark text-white font-poppins font-medium px-6 py-2 rounded-lg shadow-elegant hover:shadow-hover transition-all duration-300">
              Demo buchen
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-foreground/10">
            <div className="flex flex-col space-y-4 mt-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="font-poppins text-foreground/80 hover:text-brand-primary transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="ghost" className="justify-start">
                  Kontakt
                </Button>
                <Button className="bg-brand-primary hover:bg-brand-primary-dark text-white">
                  Demo buchen
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};