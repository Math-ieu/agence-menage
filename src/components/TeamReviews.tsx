import { useState, useEffect } from "react";
import { MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";
import team1 from "@/assets/team-1.png";
import team2 from "@/assets/team-2.png";
import team3 from "@/assets/team-3.png";
import team4 from "@/assets/team-4.png";
import team5 from "@/assets/team-5.png";
import team6 from "@/assets/team-6.png";

const teamData = [
    { id: "01", name: "Sarah Inès", role: "Responsable Qualité", quote: "La satisfaction de nos clients est notre priorité absolue. Nous formons nos équipes pour l'excellence.", image: team1 },
    { id: "02", name: "Karim Benani", role: "Superviseur Propreté", quote: "Chaque détail compte. Notre méthode de travail garantit un environnement sain et impeccable.", image: team2 },
    { id: "03", name: "Thomas Dubois", role: "Expert Ménage Bureaux", quote: "La réactivité et le professionnalisme sont les clés de notre réussite auprès des entreprises.", image: team3 },
    { id: "04", name: "Leila Mansouri", role: "Coordinatrice Services", quote: "Nous créons des relations de confiance durable avec nos clients grâce à un service personnalisé.", image: team4 },
    { id: "05", name: "Youssef Alaoui", role: "Formateur Technique", quote: "L'innovation dans nos techniques de nettoyage permet de gagner en efficacité et en qualité.", image: team5 },
    { id: "06", name: "Meryem Idrissi", role: "Support Client", quote: "À l'écoute de vos besoins pour vous offrir la meilleure expérience de service possible.", image: team6 },
];

const TeamReviews = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const nextSlide = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setActiveIndex((prev) => (prev + 1) % teamData.length);
    };

    useEffect(() => {
        const timer = setTimeout(() => setIsTransitioning(false), 600);
        return () => clearTimeout(timer);
    }, [activeIndex]);

    const activeMember = teamData[activeIndex];

    // Logic for dynamic 3 thumbnails: we want to show activeIndex, and the next two
    const getThumbnailIndices = () => {
        return [
            activeIndex % teamData.length,
            (activeIndex + 1) % teamData.length,
            (activeIndex + 2) % teamData.length,
        ];
    };

    const thumbnailIndices = getThumbnailIndices();

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* We use a flex container that is shifted towards the left */}
                <div className="flex flex-col lg:flex-row items-center lg:items-end justify-start gap-8 lg:gap-12 transition-all duration-1000">

                    {/* Column 1: "Notre equipe" Title - Fixed width to push things left */}
                    <div className="w-full lg:w-[220px] flex-shrink-0">
                        <h2 className="text-5xl lg:text-7xl font-bold text-[#287271] leading-tight text-center lg:text-left transition-all duration-700">
                            Notre<br />equipe
                        </h2>
                    </div>

                    {/* Wrapper for the rest, allowing it to stay focused on the left half */}
                    <div className="flex flex-col lg:flex-row items-center lg:items-end gap-10 lg:gap-14 w-full">

                        {/* Column 2: The dynamic 3-slot Staircase */}
                        <div className="flex items-center gap-6 lg:gap-8 self-center lg:self-end">
                            <div className="flex flex-col items-center gap-4 min-w-[40px]">
                                <div className="text-[10px] font-bold tracking-widest text-slate-300 uppercase [writing-mode:vertical-lr] rotate-180">
                                    {activeMember.id} — {teamData.length.toString().padStart(2, '0')}
                                </div>
                                <div className="text-xs uppercase tracking-[0.4em] font-black text-slate-900 [writing-mode:vertical-lr] rotate-180 py-4 border-y border-slate-100">
                                    Equipe
                                </div>
                            </div>

                            <div className="flex items-end gap-3 h-[240px]">
                                {thumbnailIndices.map((idx, slotIndex) => {
                                    const member = teamData[idx];
                                    return (
                                        <button
                                            key={`${member.id}-${slotIndex}`}
                                            onClick={() => setActiveIndex(idx)}
                                            className={cn(
                                                "relative w-16 lg:w-20 rounded-sm overflow-hidden transition-all duration-700 ease-in-out",
                                                slotIndex === 0 ? "h-[100px]" : slotIndex === 1 ? "h-[150px]" : "h-[200px]",
                                                slotIndex === 0 ? "ring-2 ring-[#287271] ring-offset-4 scale-105 z-10 opacity-100 grayscale-0" : "opacity-40 hover:opacity-80 grayscale"
                                            )}
                                        >
                                            <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-all duration-700" />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Column 3: Main Profile Image */}
                        <div className="w-full lg:w-[280px] h-[450px] lg:h-[600px] relative overflow-hidden rounded-sm shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] bg-slate-100 flex-shrink-0">
                            <div
                                className="absolute inset-0 transition-transform duration-1000 cubic-bezier(0.23, 1, 0.32, 1) flex flex-col"
                                style={{ transform: `translateY(-${activeIndex * 100}%)` }}
                            >
                                {teamData.map((member) => (
                                    <div key={member.id} className="w-full h-full flex-shrink-0">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Column 4: Content and Navigation - Left-aligned within its space */}
                        <div className="flex flex-col justify-end pb-4 lg:pb-12 flex-1 max-w-sm space-y-8 text-center lg:text-left transition-all duration-700">
                            <div
                                className={cn(
                                    "space-y-1 transition-all duration-700",
                                    isTransitioning ? "opacity-0 -translate-y-8" : "opacity-100 translate-y-0"
                                )}
                            >
                                <h3 className="text-xl font-bold text-slate-900">{activeMember.name}</h3>
                                <p className="text-[#287271] font-semibold tracking-wider text-[10px] uppercase">
                                    {activeMember.role}
                                </p>
                                <div className="h-[1px] w-8 bg-slate-200 mt-4 mx-auto lg:mx-0" />
                            </div>

                            <div
                                className={cn(
                                    "transition-all duration-1000 delay-100 min-h-[140px]",
                                    isTransitioning ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
                                )}
                            >
                                <p className="text-lg lg:text-xl font-medium leading-relaxed text-slate-700 italic">
                                    "{activeMember.quote}"
                                </p>
                            </div>

                            <div className="pt-2 flex justify-center lg:justify-start">
                                <button
                                    onClick={nextSlide}
                                    className="group relative w-16 h-16 rounded-full bg-[#287271] flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 shadow-xl shadow-[#287271]/30 overflow-hidden"
                                >
                                    <MoveRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform z-10" />
                                    <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                </button>
                            </div>
                        </div>

                        {/* Empty space at the end to satisfy "leave some space on the right" */}
                        <div className="hidden lg:block w-[10%]" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeamReviews;
