import ServiceCard from "./ServiceCard";
import serviceMenagePonctuel from "@/assets/service-menage-ponctuel.jpg";
import serviceAirbnb from "@/assets/service-airbnb.jpg";
import serviceChantier from "@/assets/service-chantier.jpg";
import serviceDemenagement from "@/assets/service-demenagement.jpg";
import serviceRegulier from "@/assets/service-regulier.jpg";
import serviceGrandMenage from "@/assets/service-grand-menage.jpg";
import serviceGardeMalade from "@/assets/service-garde-malade.jpg";
import serviceBureaux from "@/assets/service-bureaux.jpg";

interface ServicesGridProps {
  type: "particulier" | "entreprise";
}

const particulierServices = [
  { title: "Ménage", subtitle: "standard", color: "#287271", image: serviceRegulier, url: "/services/particulier/menage-standard" },
  { title: "Grand", subtitle: "ménage", color: "#e6dec7", image: serviceGrandMenage, url: "/services/particulier/grand-menage" },
  { title: "Ménage", subtitle: "dans les Airbnb", color: "#9ed2ce", image: serviceAirbnb },
  { title: "Ménage", subtitle: "de fin de chantier", color: "#e9f6e9", image: serviceChantier },
  { title: "Ménage", subtitle: "pré-déménagement", color: "#d1a246", image: serviceDemenagement },
  { title: "Garde", subtitle: "malade", color: "#b46d2f", image: serviceGardeMalade, url: "/services/particulier/garde-malade" },
];

const entrepriseServices = [
  { title: "Ménage", subtitle: "Bureaux", color: "#05b5a0", image: serviceBureaux, url: "/services/entreprise/menage-bureaux" },
  { title: "Grand ménage", subtitle: "Bureaux", color: "#52bc7e", image: serviceGrandMenage, url: "/services/entreprise/grand-menage-bureaux" },
  { title: "Placement", subtitle: "de femme de ménage", color: "#bfd1a7", image: serviceMenagePonctuel },
  { title: "Ménage", subtitle: "de fin de chantier", color: "#f5cf90", image: serviceChantier },
];

const ServicesGrid = ({ type }: ServicesGridProps) => {
  const services = type === "particulier" ? particulierServices : entrepriseServices;
  const title = type === "particulier" ? "Services pour particuliers" : "Services pour entreprises";

  return (
    <section className="py-16 bg-background">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          {title}
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service: any, index: number) => (
              <div
                key={`${service.title}-${service.subtitle || index}`}
                className="animate-fade-in"
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
