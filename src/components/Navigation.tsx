import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { InterestContactForm } from "./InterestContactForm";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [formType, setFormType] = useState<'interest' | 'contact' | 'waitlist'>('interest');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "Über uns", href: "/uber-uns" },
  ];

  const handleOpenForm = (type: 'interest' | 'contact' | 'waitlist') => {
    setFormType(type);
    setFormModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      if (location.pathname !== "/") {
        navigate(`/${href}`);
      } else {
        const element = document.getElementById(href.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/90 backdrop-blur-md shadow-elegant" 
          : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Link to="/" onClick={(e) => handleNavLinkClick(e, "/")}>
                <img 
                  src="/logo.png" 
                  alt="meetio.ai Logo" 
                  className="h-8 w-8"
                />
              </Link>
              <Link to="/" onClick={(e) => handleNavLinkClick(e, "/")}>
                <span className="font-geist font-bold text-xl text-foreground">
                  meetio.ai
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href.startsWith("#") ? location.pathname + item.href : item.href}
                  onClick={(e) => handleNavLinkClick(e, item.href)}
                  className="font-poppins text-foreground/80 hover:text-brand-primary transition-colors duration-200 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => handleOpenForm('waitlist')}
                className="font-poppins text-foreground border-foreground/20 hover:border-brand-primary hover:text-brand-primary transition-all duration-300"
              >
                Frühzugang sichern
              </Button>
              <Button 
                onClick={() => handleOpenForm('contact')}
                className="bg-brand-primary hover:bg-brand-primary-dark text-white font-poppins font-medium px-6 py-2 rounded-lg shadow-elegant hover:shadow-hover transition-all duration-300"
              >
                Kontaktiere uns
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:text-brand-primary transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-foreground/10">
              <div className="flex flex-col space-y-4 mt-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href.startsWith("#") ? location.pathname + item.href : item.href}
                    onClick={(e) => handleNavLinkClick(e, item.href)}
                    className="font-poppins text-foreground/80 hover:text-brand-primary transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex flex-col space-y-3 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => handleOpenForm('waitlist')}
                    className="justify-center border-foreground/20 hover:border-brand-primary hover:text-brand-primary"
                  >
                    Frühzugang sichern
                  </Button>
                  <Button 
                    onClick={() => handleOpenForm('contact')}
                    className="justify-center bg-brand-primary hover:bg-brand-primary-dark text-white"
                  >
                    Kontaktiere uns
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Form Modal */}
      <InterestContactForm
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        formType={formType}
      />
    </>
  );
};