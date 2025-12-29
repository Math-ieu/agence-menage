import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import logoPlaceholder from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="flex flex-col items-start">
            <img src={logoPlaceholder} alt="Agence Ménage" className="h-16 w-auto mb-6 brightness-0 invert" />
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Votre partenaire de confiance pour un espace propre et serein.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 border-b border-primary-foreground/20 pb-2">À PROPOS</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors flex items-center gap-2 text-sm">
                  QUI SOMMES-NOUS
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 border-b border-primary-foreground/20 pb-2">NOS SERVICES</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  SERVICES POUR PARTICULIERS
                </Link>
              </li>
              <li>
                <Link to="/entreprise" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  SERVICES POUR ENTREPRISES
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 border-b border-primary-foreground/20 pb-2">CONTACTEZ-NOUS</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                <Phone className="w-4 h-4" />
                +212 6 12 34 56 78
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                <Mail className="w-4 h-4" />
                contact@agence-menage.com
              </li>
              <li className="flex items-start gap-2 text-primary-foreground/80 text-sm">
                <MapPin className="w-4 h-4 mt-0.5" />
                123 Rue de George Sand, Casablanca, Maroc
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-primary-foreground/60 text-sm">
              © 2025 Agence Ménage. Tous droits réservés.
              <span className="hidden md:inline mx-2 text-primary-foreground/40">|</span>
              <span className="block md:inline mt-2 md:mt-0">
                Developed by{" "}
                <a href="https://new-folio-nu.vercel.app/" className="font-medium hover:text-white transition-colors underline decoration-primary-foreground/30 underline-offset-4 hover:decoration-white">
                  MathDev
                </a>
              </span>
            </p>

            <div className="flex items-center gap-6">
              <span className="text-primary-foreground/80 font-medium">Suivez-nous</span>
              <div className="flex items-center gap-4">
                <a href="#" className="bg-primary-foreground/10 p-2.5 rounded-full hover:bg-primary-foreground/20 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="bg-primary-foreground/10 p-2.5 rounded-full hover:bg-primary-foreground/20 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="bg-primary-foreground/10 p-2.5 rounded-full hover:bg-primary-foreground/20 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer >
  );
};

export default Footer;
