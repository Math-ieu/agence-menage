interface ServiceHeroSectionProps {
  title: string;
  description: string;
  image: string;
}

const ServiceHeroSection = ({ title, description, image }: ServiceHeroSectionProps) => {
  return (
    <section className="relative py-16 bg-gradient-to-br from-primary/10 to-accent">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-primary">
              {title}
            </h1>
            <p className="text-lg text-foreground leading-relaxed">
              {description}
            </p>
          </div> 
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src={image}
              alt={title}
              className="w-full h-[300px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHeroSection;
