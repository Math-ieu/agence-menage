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
import serviceChantier from "@/assets/service-chantier-entreprise-new.png";
import { createWhatsAppLink, formatBookingMessage, DESTINATION_PHONE_NUMBER } from "@/lib/whatsapp";
import "@/styles/sticky-summary.css";

const MenageFinChantierEntreprise = () => {
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
        entityName: "",
        contactPerson: "",
        email: "",
        changeRepereNotes: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.entityName || !formData.contactPerson || !formData.phoneNumber) {
            toast.error("Veuillez remplir tous les champs obligatoires");
            return;
        }

        const message = formatBookingMessage("Ménage Fin de chantier (Entreprise)", formData, "Sur devis");
        const whatsappLink = createWhatsAppLink(DESTINATION_PHONE_NUMBER, message);

        window.open(whatsappLink, '_blank');
        toast.success("Redirection vers WhatsApp pour finaliser la demande de devis...");
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <div style={{ "--primary": "28 59% 45%" } as React.CSSProperties}>
                <ServiceHeroSection
                    title="Fin de chantier"
                    description={`Le ménage de fin de chantier consiste à effectuer un nettoyage approfondi du logement ou des locaux après des travaux, afin de les rendre propres, sains et prêts à être utilisés.

La prestation comprend : L’évacuation des poussières et résidus de chantier, Le nettoyage des sols (balayage, aspiration et lavage),Le dépoussiérage et le nettoyage des surfaces, murs et plinthes accessibles, Le nettoyage des vitres accessibles et encadrements, La désinfection des sanitaires, Le nettoyage de la cuisine, L’entretien des escaliers, balcons, terrasses et autres espaces accessibles.`}
                    image={serviceChantier}
                    primaryColor="#f3d299"
                />

                <main className="flex-1 bg-background py-12">
                    <div className="container max-w-5xl">
                        <div className="bg-[#fdf3e7] rounded-lg p-6 text-center mb-8 border border-[#f3d299]">
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
                                                <span className="font-medium text-right text-xs">Fin de chantier (Entreprise)</span>
                                            </div>
                                            <div className="flex justify-between gap-4">
                                                <span className="text-muted-foreground">Surface:</span>
                                                <span className="font-medium text-right">{formData.surfaceArea} m²</span>
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
                                        <h3 className="text-xl font-bold bg-[#f3d299] text-slate-800 p-3 rounded-lg mb-4 text-center">
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
                                        <h3 className="text-xl font-bold bg-[#f3d299] text-slate-800 p-3 rounded-lg mb-4 text-center">
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

                                    <div className="bg-muted/30 rounded-xl p-6 border border-muted">
                                        <h3 className="text-xl font-bold bg-[#f3d299] text-slate-800 p-3 rounded-lg text-center mb-6 uppercase">
                                            Les informations
                                        </h3>
                                        <p className="text-xs font-bold text-center text-slate-500 mb-6 uppercase tracking-wider">
                                            Un chargé de clientèle prendra contact avec vous dans les plus brefs délais.
                                        </p>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label className="text-xs font-bold text-muted-foreground uppercase">Nom de l'entreprise*</Label>
                                                <Input
                                                    placeholder="Nom de votre société"
                                                    value={formData.entityName}
                                                    onChange={(e) => setFormData({ ...formData, entityName: e.target.value })}
                                                    required
                                                    className="bg-white"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-xs font-bold text-muted-foreground uppercase">Personne à contacter*</Label>
                                                <Input
                                                    placeholder="Votre nom complet"
                                                    value={formData.contactPerson}
                                                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                                                    required
                                                    className="bg-white"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-xs font-bold text-muted-foreground uppercase">Numéro de téléphone*</Label>
                                                <div className="flex gap-2">
                                                    <div className="bg-slate-100 border rounded-lg w-20 flex items-center justify-center font-bold text-primary">+212</div>
                                                    <Input
                                                        placeholder="6 12 00 00 00"
                                                        value={formData.phoneNumber}
                                                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                                        required
                                                        className="bg-white"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-xs font-bold text-muted-foreground uppercase">Numéro whatsapp</Label>
                                                <div className="flex gap-2">
                                                    <div className="bg-slate-100 border rounded-lg w-20 flex items-center justify-center font-bold text-primary">+212</div>
                                                    <Input
                                                        placeholder="6 12 00 00 00"
                                                        value={formData.whatsappNumber}
                                                        onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                                                        className="bg-white"
                                                    />
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 space-y-2">
                                                <Label className="text-xs font-bold text-muted-foreground uppercase">Email*</Label>
                                                <Input
                                                    type="email"
                                                    placeholder="votre@email.com"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    required
                                                    className="bg-white"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold bg-[#f3d299] text-slate-800 p-3 rounded-lg text-center mb-4 uppercase">
                                            Où aura lieu votre ménage ?
                                        </h3>
                                        <div className="p-6 bg-muted/30 rounded-xl border border-muted space-y-6">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label className="text-xs font-bold text-muted-foreground uppercase">Ville</Label>
                                                    <Input
                                                        placeholder="ex: Casablanca"
                                                        value={formData.city}
                                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                                        className="bg-white"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-xs font-bold text-muted-foreground uppercase">Quartier</Label>
                                                    <Input
                                                        placeholder="ex: Maarif"
                                                        value={formData.neighborhood}
                                                        onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                                                        className="bg-white"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-xs font-bold text-muted-foreground uppercase">Champs de repère</Label>
                                                <Textarea
                                                    placeholder="Donnez-nous des repères visuels proches (Mosquée, École, Pharmacie...)"
                                                    value={formData.changeRepereNotes}
                                                    onChange={(e) => setFormData({ ...formData, changeRepereNotes: e.target.value })}
                                                    className="bg-white min-h-[80px] text-sm resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-center pt-8">
                                        <Button
                                            type="submit"
                                            className="bg-[#f3d299] hover:bg-[#eac485] text-slate-800 px-8 py-4 text-base font-bold shadow-lg shadow-[#f3d299]/20 h-auto rounded-full w-full md:w-auto md:min-w-[260px] transition-all hover:scale-105 active:scale-95"
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

export default MenageFinChantierEntreprise;
