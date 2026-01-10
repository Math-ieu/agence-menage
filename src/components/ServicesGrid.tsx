import ServiceCard from "./ServiceCard";
import { cn } from "@/lib/utils";
import serviceAirbnb from "@/assets/service-airbnb-new.png";
import serviceChantierParticulier from "@/assets/service-chantier-particulier-new.png";
import serviceChantierEntreprise from "@/assets/service-chantier-entreprise-new.png";
import serviceDemenagement from "@/assets/service-demenagement-new.png";
import serviceRegulier from "@/assets/service-standard-new.png";
import serviceGrandMenage from "@/assets/service-grand-new.png";
import serviceGardeMalade from "@/assets/service-garde-malade-new.png";
import serviceBureaux from "@/assets/service-bureaux-new.png";
import servicePlacement from "@/assets/service-placement-new.png";

interface ServicesGridProps {
  type: "particulier" | "entreprise";
}

const particulierServices = [
  { title: "Ménage", subtitle: "standard", color: "#287271", image: serviceRegulier, url: "/services/particulier/menage-standard" },
  { title: "Grand", subtitle: "ménage", color: "#e6dec7", image: serviceGrandMenage, url: "/services/particulier/grand-menage" },
  { title: "Ménage", subtitle: "dans les Airbnb", color: "#9ed2ce", image: serviceAirbnb, url: "/services/particulier/menage-airbnb" },
  { title: "Ménage", subtitle: "de fin de chantier", color: "#e9f6e9", image: serviceChantierParticulier, url: "/services/particulier/menage-fin-chantier" },
  { title: "Ménage", subtitle: "post - déménagement", color: "#d1a246", image: serviceDemenagement, url: "/services/particulier/menage-demenagement" },
  { title: "Garde", subtitle: "malade", color: "#b46d2f", image: serviceGardeMalade, url: "/services/particulier/garde-malade" },
];

const entrepriseServices = [
  { title: "Ménage", subtitle: "Bureaux", color: "#1caf9a", image: serviceBureaux, url: "/services/entreprise/menage-bureaux" },
  { title: "Placement & Gestion", subtitle: "de propriété", color: "#5bbd82", image: servicePlacement, url: "/services/entreprise/placement" },
  { title: "Ménage", subtitle: "de fin de chantier", color: "#f3d299", image: serviceChantierEntreprise, url: "/services/entreprise/menage-fin-chantier" },
];

const ServicesGrid = ({ type }: ServicesGridProps) => {
  const services = type === "particulier" ? particulierServices : entrepriseServices;
  const title = type === "particulier" ? "Services pour particuliers" : "Services pour entreprises";

  return (
    <section className={`py-16 transition-colors duration-[2000ms] ${type === "entreprise" ? "bg-primary" : "bg-background"}`}>
      <div className="container">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 transition-colors duration-[2000ms] ${type === "entreprise" ? "text-white" : "text-foreground"
          }`}>
          {title}
        </h2>

        <div className="max-w-5xl mx-auto">
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${type === "entreprise" ? "md:max-w-4xl mx-auto" : ""}`}>
            {services.map((service: any, index: number) => (
              <div
                key={`${service.title}-${service.subtitle || index}`}
                className={cn(
                  "animate-fade-in",
                  type === "entreprise" && index === 2 && "md:col-span-2 md:w-1/2 md:mx-auto"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ServiceCard
                  title={service.title}
                  subtitle={service.subtitle}
                  color={service.color}
                  image={service.image}
                  url={service.url}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
