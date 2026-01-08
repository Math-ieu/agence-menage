import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoPlaceholder from "@/assets/logo.png";
import { Menu, X } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isParticulier = location.pathname === "/" || location.pathname.startsWith("/services/particulier");
  const isEntreprise = location.pathname === "/entreprise" || location.pathname.startsWith("/services/entreprise");

  const navItems = [
    { label: "Accueil", href: "/" },
    { label: "Services pour particuliers", href: "/", active: isParticulier },
    { label: "Services pour entreprises", href: "/entreprise", active: isEntreprise },
    { label: "Espace employé", href: "/espace-employe", active: location.pathname === "/espace-employe" },
    { label: "Contactez-nous", href: "/contact", active: location.pathname === "/contact" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`sticky top-0 z-50 w-full shadow-sm border-b transition-colors duration-300 ${isEntreprise ? "bg-primary border-primary/20" : "bg-background"
      }`}>
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logoPlaceholder}
            alt="Agence Ménage"
            className={`h-16 w-auto transition-all duration-300 ${isEntreprise ? "brightness-0 invert" : ""}`}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`text-base font-bold transition-colors ${isEntreprise
                ? `hover:text-white/80 ${item.active ? "text-white border-b-2 border-white pb-1" : "text-white/90"}`
                : `hover:text-primary ${item.active ? "text-primary border-b-2 border-primary pb-1" : "text-foreground"}`
                }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 transition-colors ${isEntreprise ? "text-white hover:text-white/80" : "text-foreground hover:text-primary"}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden absolute top-16 left-0 w-full border-b shadow-lg animate-in slide-in-from-top-5 ${isEntreprise ? "bg-primary border-white/10" : "bg-background"
          }`}>
          <nav className="flex flex-col p-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`text-base font-medium transition-colors p-2 rounded-md ${isEntreprise
                  ? `hover:bg-white/10 ${item.active ? "text-white bg-white/20" : "text-white/90"}`
                  : `hover:text-primary hover:bg-accent ${item.active ? "text-primary bg-accent/50" : "text-foreground"}`
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
