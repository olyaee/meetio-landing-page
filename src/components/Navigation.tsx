import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { InterestContactForm } from "./InterestContactForm";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [formType, setFormType] = useState<'interest' | 'contact' | 'waitlist'>('waitlist');

  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

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
    { name: "About", href: "/about-us" },
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
          ? "bg-background/95 backdrop-blur-md border-b border-foreground/[0.06]"
          : "bg-transparent"
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <Link to="/" onClick={(e) => handleNavLinkClick(e, "/")} className="flex items-center gap-2.5">
                <img
                  src="/logo.png"
                  alt="meetio.ai Logo"
                  className="h-7 w-7"
                />
                <span className="font-body font-semibold text-lg text-foreground tracking-tight">
                  meetio.ai
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href.startsWith("#") ? location.pathname + item.href : item.href}
                  onClick={(e) => handleNavLinkClick(e, item.href)}
                  className="font-body text-sm text-foreground/60 hover:text-foreground transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => handleOpenForm('waitlist')}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-body font-medium text-white bg-foreground hover:bg-foreground/90 rounded-md transition-all duration-200"
              >
                Join Waitlist
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground/70 hover:text-foreground transition-colors"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-foreground/[0.06] shadow-lg">
              <div className="flex flex-col gap-1 px-4 py-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href.startsWith("#") ? location.pathname + item.href : item.href}
                    onClick={(e) => handleNavLinkClick(e, item.href)}
                    className="font-body text-sm text-foreground/70 hover:text-foreground py-2 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-3 mt-2 border-t border-foreground/[0.06]">
                  <button
                    onClick={() => handleOpenForm('waitlist')}
                    className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-body font-medium text-white bg-foreground hover:bg-foreground/90 rounded-md transition-all duration-200"
                  >
                    Join Waitlist
                  </button>
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
