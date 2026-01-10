import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceHeroSection from "@/components/ServiceHeroSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import serviceChantier from "@/assets/service-chantier.jpg";
import { createWhatsAppLink, formatBookingMessage } from "@/lib/whatsapp";
import "@/styles/sticky-summary.css";

const MenageFinChantier = () => {
    const [formData, setFormData] = useState({
        propertyType: "studio",
        surfaceArea: 50,
        city: "",
        neighborhood: "",
        schedulingTime: "morning",
        schedulingHours: "09:00 - 12:00",
        schedulingDate: "",
        fixedTime: "14:00",
        additionalServices: {},
        phoneNumber: "",
        whatsappNumber: "",
        firstName: "",
        lastName: "",
        changeRepereNotes: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.firstName || !formData.lastName || !formData.phoneNumber) {
            toast.error("Veuillez remplir tous les champs obligatoires");
            return;
        }

        const message = formatBookingMessage("Ménage Fin de chantier", formData, "Sur devis");
        const whatsappLink = createWhatsAppLink("212669372603", message);

        window.open(whatsappLink, '_blank');
        toast.success("Redirection vers WhatsApp pour finaliser la demande de devis...");
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <div style={{ "--primary": "142 45% 40%", "--secondary": "142 30% 85%" } as React.CSSProperties}>
                <ServiceHeroSection
                    title="Fin de chantier"
                    description={`Le ménage de fin de chantier consiste à effectuer un nettoyage approfondi du logement ou des locaux après des travaux, afin de les rendre propres, sains et prêts à être utilisés.

La prestation comprend : L’évacuation des poussières et résidus de chantier, Le nettoyage des sols (balayage, aspiration et lavage),Le dépoussiérage et le nettoyage des surfaces, murs et plinthes accessibles, Le nettoyage des vitres accessibles et encadrements, La désinfection des sanitaires, Le nettoyage de la cuisine, L’entretien des escaliers, balcons, terrasses et autres espaces accessibles.`}
                    image={serviceChantier}
                    primaryColor="#c2e5c2"
                />

                <main className="flex-1 bg-background py-12">
                    <div className="container max-w-5xl">
                        <div className="bg-[#f0f9f0] rounded-lg p-6 text-center mb-8 border border-[#c2e5c2]">
                            <h2 className="text-2xl font-bold text-primary mb-2 uppercase tracking-wide">
                                FORMULAIRE DE RESERVATION
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-1 lg:order-last sticky-reservation-summary-container">
                                <div className="lg:sticky lg:top-24 space-y-6">
                                    <div className="bg-primary/5 rounded-lg border shadow-sm p-6 space-y-4">
                                        <h3 className="text-xl font-bold text-primary border-b pb-2 text-center">
                                            Ma Réservation
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between gap-4 border-b border-primary/10 pb-2">
                                                <span className="text-muted-foreground">Service:</span>
                                                <span className="font-medium text-right text-xs">Ménage Fin de chantier</span>
                                            </div>
                                            <div className="flex justify-between gap-4">
                                                <span className="text-muted-foreground">Surface:</span>
                                                <span className="font-medium text-right">{formData.surfaceArea} m²</span>
                                            </div>
                                            <div className="flex justify-between gap-4 border-t border-primary/10 pt-2">
                                                <span className="text-muted-foreground">Date:</span>
                                                <span className="font-medium text-right">{formData.schedulingDate || "Non définie"}</span>
                                            </div>
                                            <div className="flex justify-between gap-4">
                                                <span className="text-muted-foreground">Heure:</span>
                                                <span className="font-medium text-right">{formData.fixedTime}</span>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t">
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-bold">Total</span>
                                                <span className="text-xl font-bold text-primary italic">Sur devis</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-2 space-y-8">

                                <div className="bg-card rounded-lg p-6 border shadow-sm space-y-6">
                                    <div>
                                        <h3 className="text-xl font-bold bg-[#c2e5c2] text-slate-800 p-3 rounded-lg mb-4 text-center">
                                            Type d'habitation
                                        </h3>
                                        <RadioGroup
                                            value={formData.propertyType}
                                            onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                                            className="flex flex-wrap gap-8 p-4"
                                        >
                                            {["Studio", "Appartement", "Duplex", "Villa", "Maison"].map((type) => (
                                                <div key={type} className="flex items-center space-x-3">
                                                    <RadioGroupItem value={type.toLowerCase()} id={type} className="border-primary text-primary" />
                                                    <Label htmlFor={type} className="font-medium text-slate-700">{type}</Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </div>

                                    <div className="bg-card rounded-lg border shadow-sm space-y-6">
                                        <h3 className="text-xl font-bold bg-[#c2e5c2] text-slate-800 p-3 rounded-lg mb-4 text-center">
                                            Indiquez la superficie de votre espace en m².
                                        </h3>
                                        <div className="p-8 space-y-8">
                                            <div className="relative pt-6">
                                                <div className="absolute -top-4 left-0 transition-all duration-200" style={{ left: `${(formData.surfaceArea / 5000) * 100}%`, transform: 'translateX(-50%)' }}>
                                                    <span className="bg-primary/10 text-primary font-bold px-3 py-1 rounded-full text-sm border border-primary/20 whitespace-nowrap">
                                                        {formData.surfaceArea}m²
                                                    </span>
                                                </div>
                                                <Slider
                                                    value={[formData.surfaceArea]}
                                                    onValueChange={(value) => setFormData({ ...formData, surfaceArea: value[0] })}
                                                    max={5000}
                                                    step={10}
                                                    className="cursor-pointer"
                                                />
                                                <div className="flex justify-between mt-4 text-xs font-medium text-slate-400">
                                                    <span>0m²</span>
                                                    <span>5000m²</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold bg-[#c2e5c2] text-slate-800 p-3 rounded-lg mb-4 text-center">
                                            Où aura lieu votre ménage ?
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-4 p-4 border rounded-xl bg-white mb-4">
                                            <Input
                                                placeholder="Ville , Casablanca"
                                                value={formData.city}
                                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                                className="border-slate-300"
                                            />
                                            <Input
                                                placeholder="Quartier : j'inscris le nom"
                                                value={formData.neighborhood}
                                                onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                                                className="border-slate-300"
                                            />
                                        </div>
                                        <div className="p-4 border rounded-xl bg-white">
                                            <Label className="font-bold text-slate-700">Champs de repère</Label>
                                            <Textarea
                                                placeholder="Donnez-nous des repères pour faciliter le travail de ménage (points de référence pour la tournée du nettoyeur) après les points de repère"
                                                value={formData.changeRepereNotes}
                                                onChange={(e) => setFormData({ ...formData, changeRepereNotes: e.target.value })}
                                                className="mt-2 border-slate-300"
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                                        <h3 className="text-xl font-bold bg-[#c2e5c2] text-slate-800 p-3 text-center">
                                            Mes informations
                                        </h3>
                                        <div className="p-4 bg-primary/5 text-center">
                                            <p className="text-sm font-bold text-primary">
                                                Un chargé de clientèle prendra contact avec vous dans les plus brefs délais.
                                            </p>
                                        </div>
                                        <div className="p-6 grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="font-bold text-slate-700 text-sm">Numéro de téléphone*</Label>
                                                <div className="flex gap-2">
                                                    <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-600 flex items-center">
                                                        +212
                                                    </div>
                                                    <Input
                                                        placeholder="6 12 00 00 00"
                                                        value={formData.phoneNumber}
                                                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                                        required
                                                        className="border-slate-300 h-11"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="font-bold text-slate-700 text-sm">Numéro whatsapp</Label>
                                                <div className="flex gap-2">
                                                    <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-600 flex items-center">
                                                        +212
                                                    </div>
                                                    <Input
                                                        placeholder="6 12 00 00 00"
                                                        value={formData.whatsappNumber}
                                                        onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                                                        className="border-slate-300 h-11"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="font-bold text-slate-700 text-sm">Nom*</Label>
                                                <Input
                                                    value={formData.lastName}
                                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                    required
                                                    className="mt-1 border-slate-300 h-11"
                                                    placeholder="Votre nom"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="font-bold text-slate-700 text-sm">Prénom*</Label>
                                                <Input
                                                    value={formData.firstName}
                                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                    required
                                                    className="mt-1 border-slate-300 h-11"
                                                    placeholder="Votre prénom"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-center pt-8">
                                        <Button
                                            type="submit"
                                            className="bg-[#c2e5c2] hover:bg-[#b0dbb0] text-slate-800 px-8 py-4 text-base font-bold shadow-lg shadow-[#c2e5c2]/20 h-auto rounded-full w-full md:w-auto md:min-w-[250px] transition-all hover:scale-105 active:scale-95"
                                        >
                                            Demander un devis
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
};

export default MenageFinChantier;
