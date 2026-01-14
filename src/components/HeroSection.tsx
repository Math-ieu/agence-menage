import { Link, useLocation } from "react-router-dom";
import heroParticulier from "@/assets/hero-home-particulier.png";
import heroEntreprise from "@/assets/hero-home-entreprise.png";

const HeroSection = () => {
  const location = useLocation();
  const isEntreprise = location.pathname === "/entreprise";
  const heroImage = isEntreprise ? heroEntreprise : heroParticulier;

  return (
    <section className="relative h-[550px] md:h-[650px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-transparent" />
      </div>

      <div className="relative container h-full flex flex-col justify-center py-12">
        {/* Texte centré verticalement à gauche sur desktop, centré sur mobile */}
        <div className="animate-fade-in mb-auto mt-auto text-center md:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight">
            Un espace propre,<br />
            une vie sereine.
          </h1>
        </div>

        {/* Toggle centré en bas */}
        <div className="mt-auto flex justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex flex-col items-center">

            <p className="text-primary font-bold text-xl md:text-2xl mb-4 bg-white rounded-lg px-4 py-2 inline-block shadow-md text-center">
              Opter pour Ménage ponctuel ou régulier
            </p>
            <div className="inline-flex rounded-full overflow-hidden bg-background/95 p-1 shadow-xl">
              <Link to="/">
                <button
                  className={`px-6 py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-[2000ms] ${!isEntreprise
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-transparent text-foreground hover:bg-muted"
                    }`}
                >
                  Services<br />pour particuliers
                </button>
              </Link>
              <Link to="/entreprise">
                <button
                  className={`px-6 py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-[2000ms] ${isEntreprise
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-transparent text-foreground hover:bg-muted"
                    }`}
                >
                  Services<br />pour entreprises
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
