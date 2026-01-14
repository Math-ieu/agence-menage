import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoPlaceholder from "@/assets/logo.png";
import { Menu, X, Phone } from "lucide-react";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

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
    <header className={`sticky top-0 z-50 w-full shadow-sm border-b transition-all duration-[2000ms] ${isEntreprise ? "bg-primary border-primary/20" : "bg-background"
      }`}>
      <div className="w-full px-4 md:px-8 lg:px-12 flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <img
            src={logoPlaceholder}
            alt="Agence Ménage"
            className={`h-16 w-auto transition-all duration-[2000ms] ${isEntreprise ? "brightness-0 invert" : ""}`}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center flex-1 justify-center gap-[2vw] px-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`text-base font-bold transition-all duration-[2000ms] whitespace-nowrap ${isEntreprise
                ? `hover:text-white/80 ${item.active ? "text-white border-b-2 border-white pb-1" : "text-white/90"}`
                : `hover:text-primary ${item.active ? "text-primary border-b-2 border-primary pb-1" : "text-foreground"}`
                }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Contact Info (Desktop) */}
        <div className="hidden md:flex items-center flex-shrink-0">
          <div className={`
            flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all duration-300 whitespace-nowrap
            ${isEntreprise
              ? "border-white/30 text-white hover:bg-white/5"
              : "border-primary/30 text-primary hover:bg-primary/5 hover:border-primary hover:shadow-sm"}
          `}>
            <a
              href="https://wa.me/+212664331463"
              target="_blank"
              rel="noreferrer"
              className="text-[#25D366] hover:scale-110 transition-transform flex items-center justify-center"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="w-6 h-6" />
            </a>
            <a
              href="https://wa.me/+212664331463"
              target="_blank"
              rel="noreferrer"
              className="flex items-center group"
            >
              <span className={`text-lg xl:text-xl font-black tracking-tighter ${isEntreprise ? "text-white" : "text-primary"}`}>06 64 33 14 63</span>
            </a>
          </div>
        </div>

        {/* Mobile Menu Button - Visible on non-desktop */}
        <button
          className={`xl:hidden p-2 transition-all duration-[2000ms] ${isEntreprise ? "text-white hover:text-white/80" : "text-foreground hover:text-primary"}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu - Visible on non-desktop */}
      {isMobileMenuOpen && (
        <div className={`xl:hidden absolute top-16 left-0 w-full border-b shadow-lg animate-in slide-in-from-top-5 z-50 ${isEntreprise ? "bg-primary border-white/10" : "bg-background"
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
            <div className="pt-4 border-t border-slate-200 mt-2 space-y-4">
              <div className={`
                flex items-center justify-center gap-4 p-4 rounded-xl border-2
                ${isEntreprise ? "border-white/20 bg-white/5" : "border-primary/20 bg-primary/5"}
              `}>
                <a
                  href="https://wa.me/+212664331463"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#25D366] text-white p-2 rounded-lg shadow-sm"
                >
                  <WhatsAppIcon className="w-6 h-6" />
                </a>
                <a
                  href="https://wa.me/+212664331463"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center flex-1"
                >
                  <span className={`text-xl font-black tracking-tight ${isEntreprise ? "text-white" : "text-primary"}`}>06 64 33 14 63</span>
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
