interface ServiceHeroSectionProps {
    title: string;
    description: string;
    image: string;
    primaryColor?: string;
}

const ServiceHeroSection = ({ title, description, image, primaryColor }: ServiceHeroSectionProps) => {
    const renderDescription = (text: string) => {
        return text.split("\n").map((line, index) => {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith("-")) {
                const content = trimmedLine.substring(1).trim();
                return (
                    <div key={index} className="flex items-start gap-3 mt-2">
                        <div
                            className="mt-2 w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: primaryColor || "var(--primary)" }}
                        />
                        <span className="text-lg text-foreground leading-relaxed">
                            {content}
                        </span>
                    </div>
                );
            }
            return (
                <p key={index} className="text-lg text-foreground leading-relaxed whitespace-pre-line">
                    {line}
                </p>
            );
        });
    };

    return (
        <section
            className="relative py-16 bg-gradient-to-br from-primary/10 to-accent"
            style={primaryColor ? { background: `linear-gradient(to bottom right, ${primaryColor}14, ${primaryColor}08)` } : {}}
        >
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <h1
                            className="text-3xl md:text-4xl font-bold text-primary"
                            style={primaryColor ? { color: primaryColor } : {}}
                        >
                            {title}
                        </h1>
                        <div className="space-y-1">
                            {renderDescription(description)}
                        </div>
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
