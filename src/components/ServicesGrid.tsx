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
  { title: "Ménage", subtitle: "Ponctuel", color: "orange" as const, image: serviceMenagePonctuel },
  { title: "Ménage", subtitle: "dans les Airbnb", color: "yellow" as const, image: serviceAirbnb },
  { title: "Ménage", subtitle: "fin de chantier", color: "purple" as const, image: serviceChantier },
  { title: "Ménage", subtitle: "Prédéménagement", color: "green" as const, image: serviceDemenagement },
  { title: "Ménage", subtitle: "régulier avec abonnement", color: "blue" as const, image: serviceRegulier },
  { title: "Grand", subtitle: "ménage", color: "orange" as const, image: serviceGrandMenage },
  { title: "Garde malade", subtitle: "à la journée", color: "yellow" as const, image: serviceGardeMalade },
  { title: "Garde malade", subtitle: "régulier", color: "purple" as const, image: serviceGardeMalade },
];

const entrepriseServices = [
  { title: "Ménage", subtitle: "Bureaux", color: "orange" as const, image: serviceBureaux },
  { title: "Grand Ménage", subtitle: "des locaux", color: "yellow" as const, image: serviceGrandMenage },
  { title: "Ménage", subtitle: "régulier/abonnement", color: "purple" as const, image: serviceRegulier },
  { title: "Placement", subtitle: "de femme de ménage", color: "green" as const, image: serviceMenagePonctuel },
  { title: "Ménage", subtitle: "fin de chantier", color: "blue" as const, image: serviceChantier },
];

const ServicesGrid = ({ type }: ServicesGridProps) => {
  const services = type === "particulier" ? particulierServices : entrepriseServices;
  const title = type === "particulier" ? "Services particulier" : "Services entreprise";

  return (
    <section className="py-16 bg-background">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          {title}
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div 
                key={`${service.title}-${service.subtitle}`}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ServiceCard
                  title={service.title}
                  subtitle={service.subtitle}
                  color={service.color}
                  image={service.image}
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
