import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoPlaceholder from "@/assets/logo.png";
import { Menu, X } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isParticulier = location.pathname === "/";

  const navItems = [
    { label: "Accueil", href: "/" },
    { label: "Services pour particuliers", href: "/", active: isParticulier },
    { label: "Services pour entreprises", href: "/entreprise", active: !isParticulier },
    { label: "Espace employé", href: "#" },
    { label: "Contactez-nous", href: "#" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-sm border-b">
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoPlaceholder} alt="Agence Ménage" className="h-16 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`text-base font-bold transition-colors hover:text-primary ${item.active
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-foreground"
                }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b shadow-lg animate-in slide-in-from-top-5">
          <nav className="flex flex-col p-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`text-base font-medium transition-colors hover:text-primary p-2 rounded-md hover:bg-accent ${item.active
                    ? "text-primary bg-accent/50"
                    : "text-foreground"
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
