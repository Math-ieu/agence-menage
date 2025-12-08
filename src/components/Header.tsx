import { Link, useLocation } from "react-router-dom";
import logoPlaceholder from "@/assets/logo-placeholder.png";

const Header = () => {
  const location = useLocation();
  const isEntreprise = location.pathname === "/entreprise";

  const navItems = [
    { label: "Accueil", href: "/" },
    { label: "Service particulier", href: "/", active: !isEntreprise },
    { label: "Service entreprise", href: "/entreprise", active: isEntreprise },
    { label: "Espace employé", href: "#" },
    { label: "Espace client", href: "#" },
    { label: "Contactez-nous", href: "#" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoPlaceholder} alt="Agence Ménage" className="h-12 w-auto" />
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`text-sm font-bold transition-colors hover:text-primary ${
                item.active 
                  ? "text-primary border-b-2 border-primary pb-1" 
                  : "text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
