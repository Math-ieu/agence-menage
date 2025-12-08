const BookingSteps = () => {
  const steps = [
    {
      title: "Choisissez votre prestation",
      description: "Des services spécifiquement pensés pour satisfaire vos exigences.",
    },
    {
      title: "Nous vous trouvons un intervenant",
      description: "Des services spécifiquement pensés pour satisfaire vos exigences.",
    },
  ];

  return (
    <section className="py-16 bg-section-teal">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-12">
          Réservez votre ménage en 3 clics
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center md:text-left">
              <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingSteps;
