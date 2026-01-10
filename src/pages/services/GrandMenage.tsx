import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceHeroSection from "@/components/ServiceHeroSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import serviceGrandMenage from "@/assets/service-grand-menage.jpg";
import cleaningProduct from "@/assets/cleaning-product.png";
import cleaningClothsMop from "@/assets/cleaning-cloths-mop.png";
import { createWhatsAppLink, formatBookingMessage } from "@/lib/whatsapp";
import "@/styles/sticky-summary.css";

const GrandMenage = () => {
  const [formData, setFormData] = useState({
    propertyType: "studio",
    frequency: "oneshot",
    subFrequency: "",
    surfaceArea: 50,
    duration: 4,
    numberOfPeople: 1,
    city: "",
    neighborhood: "",
    schedulingTime: "morning",
    schedulingHours: "09:00 - 12:00",
    schedulingDate: "",
    fixedTime: "14:00",
    additionalServices: {
      produitsEtOutils: false,
      torchonsEtSerpieres: false
    },
    phoneNumber: "",
    whatsappNumber: "",
    firstName: "",
    lastName: "",
    changeRepereNotes: ""
  });

  const baseRate = 65;
  const discountRate = formData.frequency === "subscription" ? 0.1 : 0;
  const subtotal = formData.duration * baseRate * formData.numberOfPeople;
  const discountAmount = subtotal * discountRate;
  const totalServicePrice = subtotal - discountAmount;
  const totalPrice = totalServicePrice + (formData.additionalServices.produitsEtOutils ? 90 : 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.phoneNumber) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const message = formatBookingMessage("Grand Ménage", formData, totalPrice);
    const whatsappLink = createWhatsAppLink("212669372603", message);

    window.open(whatsappLink, '_blank');
    toast.success("Redirection vers WhatsApp pour finaliser la réservation...");
  };

  const incrementPeople = () => setFormData({ ...formData, numberOfPeople: formData.numberOfPeople + 1 });
  const decrementPeople = () => setFormData({ ...formData, numberOfPeople: Math.max(1, formData.numberOfPeople - 1) });

  const incrementDuration = () => setFormData({ ...formData, duration: formData.duration + 1 });
  const decrementDuration = () => setFormData({ ...formData, duration: Math.max(1, formData.duration - 1) });

  const calculateEstimation = (surface: number) => {
    let finalDuration = 4;
    let finalPeople = 1;

    if (surface <= 70) {
      finalDuration = 6;
      finalPeople = 1;
    } else if (surface <= 150) {
      finalDuration = 4;
      finalPeople = 2;
    } else if (surface <= 300) {
      finalDuration = 8;
      finalPeople = 2;
    } else {
      finalDuration = 8;
      finalPeople = 3;
    }

    setFormData(prev => ({
      ...prev,
      surfaceArea: surface,
      duration: finalDuration,
      numberOfPeople: finalPeople
    }));
  };

  const frequencies = [
    { value: "1foisSemaine", label: "Une fois par semaine" },
    { value: "2foisMois", label: "2 fois par mois" },
    { value: "1foisMois", label: "Une fois par mois - Recommandé" },
    { value: "5foisSemaine", label: "5 fois par semaine" },
    { value: "6foisSemaine", label: "6 fois par semaine" },
    { value: "7foisSemaine", label: "7 fois par semaine" },
    { value: "3foisSemaine", label: "3 fois par semaine" },
    { value: "1semaine2", label: "Une semaine sur deux" },
    { value: "1foisAn", label: "1 fois par an" }
  ];

  const getFrequencyLabel = (value: string, subValue: string) => {
    if (value === "oneshot") return "One shot";
    const freq = frequencies.find(f => f.value === subValue);
    return freq ? `Abonnement - ${freq.label}` : "Abonnement";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div style={{ "--primary": "45 30% 35%", "--secondary": "45 30% 90%" } as React.CSSProperties}>
        <ServiceHeroSection
          title="Grand Ménage"
          description={`Le grand ménage a pour objectif d’assurer la propreté et l’entretien courant des espaces attribués.
Il comprend le :
- Nettoyage de cuisine
- Lavage de vaisselle
- Balayage du sol et des tapis
- Nettoyage du sol
- Nettoyage des portes de placard
- Nettoyage des chambres
- Nettoyages des salles de bains et toilettes
- Depoussierage des meubles
- Nettoyage de vitres intérieures accessibles
- Changement des draps
- Rangement de la vaisselle
- Vidage et nettoyage de la poubelle
- Lessivage murs
- Nettoyage des dessous de lits et canapés
- Nettoyage des placards de cuisine
- Organisation du dressing
- Nettoyage du frigo`}
          image={serviceGrandMenage}
          primaryColor="#e2d9c2"
        />

        <main className="flex-1 bg-background py-12">
          <div className="container max-w-5xl">
            <div className="bg-[#f3efdf] rounded-lg p-6 text-center mb-8 border border-[#e2d9c2]">
              <h2 className="text-2xl font-bold text-[#4a4a4a] mb-2 uppercase tracking-wide">
                FORMULAIRE DE RESERVATION/GRAND MENAGE
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 lg:order-last sticky-reservation-summary-container">
                <div className="lg:sticky lg:top-24 space-y-6">
                  <div className="bg-[#fdfcf9] rounded-lg border border-[#e2d9c2]/30 shadow-sm p-6 space-y-4">
                    <h3 className="text-xl font-bold text-[#c5b89a] border-b border-[#e2d9c2]/30 pb-2 text-center">
                      Ma Réservation
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between gap-4 border-b border-[#e2d9c2]/20 pb-2">
                        <span className="text-muted-foreground">Service:</span>
                        <span className="font-medium text-right">Grand Ménage</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-muted-foreground">Fréquence:</span>
                        <span className="font-medium text-right text-sm">{getFrequencyLabel(formData.frequency, formData.subFrequency)}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-muted-foreground">Durée:</span>
                        <span className="font-medium text-right">{formData.duration} heures</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-muted-foreground">Personnes:</span>
                        <span className="font-medium text-right">{formData.numberOfPeople}</span>
                      </div>
                      {discountRate > 0 && (
                        <div className="flex justify-between gap-4 text-red-600 font-bold bg-red-50 p-2 rounded">
                          <span>Réduction (10%):</span>
                          <span>-{discountAmount} DH</span>
                        </div>
                      )}
                      <div className="flex justify-between gap-4 border-t border-[#e2d9c2]/20 pt-2">
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
                        <span className="text-2xl font-bold text-[#c5b89a]">{totalPrice} DH</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-8">
                <div className="bg-card rounded-lg p-8 border shadow-sm space-y-10">
                  <div>
                    <h3 className="text-xl font-bold bg-[#e2d9c2] text-[#4a4a4a] p-3 rounded-lg text-center mb-4 uppercase">
                      Type d'habitation
                    </h3>
                    <RadioGroup
                      value={formData.propertyType}
                      onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                      className="flex flex-wrap items-center justify-center gap-8 p-4"
                    >
                      {["Studio", "Appartement", "Duplex", "Villa", "Maison"].map((type) => (
                        <div key={type} className="flex items-center space-x-3">
                          <RadioGroupItem value={type.toLowerCase()} id={`gm-${type}`} className="border-[#e2d9c2] text-[#e2d9c2]" />
                          <Label htmlFor={`gm-${type}`} className="font-bold text-slate-700">{type}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold bg-[#e2d9c2] text-[#4a4a4a] p-3 rounded-lg text-center mb-4">
                      Indiquez la superficie de votre espace en m².
                    </h3>
                    <div className="px-8 py-10 border rounded-xl bg-white shadow-sm space-y-8">
                      <div className="relative pt-6">
                        <div className="absolute -top-4 left-0 transition-all duration-200" style={{ left: `${(formData.surfaceArea / 5000) * 100}%`, transform: 'translateX(-50%)' }}>
                          <span className="bg-primary/10 text-primary font-bold px-3 py-1 rounded-full text-sm border border-primary/20 whitespace-nowrap">
                            {formData.surfaceArea}m²
                          </span>
                        </div>
                        <Slider
                          value={[formData.surfaceArea]}
                          onValueChange={(value) => calculateEstimation(value[0])}
                          max={5000}
                          min={0}
                          step={1}
                          className="cursor-pointer"
                        />
                        <div className="flex justify-between mt-4 text-xs font-medium text-slate-400">
                          <span>0m²</span>
                          <span>5000m²</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-red-500 text-center font-medium leading-tight px-10">
                        Selon la superficie indiquée, le système détermine automatiquement la durée et
                        l’effectif minimum requis ; ces minimums ne peuvent pas être réduits.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold bg-[#e2d9c2] text-[#4a4a4a] p-3 rounded-lg text-center mb-4">
                      Choisissez la fréquence
                    </h3>
                    <div className="p-4 space-y-4">
                      <div className="flex flex-col items-center gap-4">
                        <div className="flex bg-slate-100 p-1 rounded-full w-full max-w-md mx-auto">
                          <button
                            type="button"
                            className={`flex-1 py-3 px-6 rounded-full font-bold transition-all ${formData.frequency === "oneshot"
                              ? "bg-primary text-white shadow-sm"
                              : "text-slate-500 hover:text-primary"
                              }`}
                            onClick={() => setFormData({ ...formData, frequency: "oneshot", subFrequency: "" })}
                          >
                            une fois
                          </button>
                          <button
                            type="button"
                            className={`flex-1 py-3 px-6 rounded-full font-bold transition-all ${formData.frequency === "subscription"
                              ? "bg-primary text-white shadow-sm"
                              : "text-slate-500 hover:text-primary"
                              }`}
                            onClick={() => setFormData({ ...formData, frequency: "subscription" })}
                          >
                            Abonnement
                          </button>
                        </div>

                        {formData.frequency === "subscription" && (
                          <div className="w-full space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="flex justify-center">
                              <span className="text-red-600 font-bold px-3 py-1 bg-red-50 rounded-full text-xs animate-pulse">
                                -10 % de réduction sur l'abonnement
                              </span>
                            </div>
                            <Select
                              value={formData.subFrequency}
                              onValueChange={(value) => setFormData({ ...formData, subFrequency: value })}
                            >
                              <SelectTrigger className="w-full border-primary/20">
                                <SelectValue placeholder="Sélectionnez une fréquence" />
                              </SelectTrigger>
                              <SelectContent>
                                {frequencies.map((freq) => (
                                  <SelectItem key={freq.value} value={freq.value}>
                                    {freq.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold bg-[#e2d9c2] text-[#4a4a4a] p-3 rounded-lg text-center mb-4">
                      Durée de prestation
                    </h3>
                    <div className="flex items-center justify-center gap-8 p-4 bg-white border rounded-xl">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-slate-100 text-[#c5b89a] hover:bg-slate-200 border border-slate-200 shadow-sm"
                        onClick={decrementDuration}
                        disabled={true}
                      >
                        <span className="text-2xl">-</span>
                      </Button>
                      <span className="text-3xl font-extrabold text-[#c5b89a] min-w-[60px] text-center">
                        {formData.duration}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-slate-100 text-[#c5b89a] hover:bg-slate-200 border border-slate-200 shadow-sm"
                        onClick={incrementDuration}
                        disabled={true}
                      >
                        <span className="text-2xl">+</span>
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold bg-[#e2d9c2] text-[#4a4a4a] p-3 rounded-lg text-center mb-4">
                      Nombre de personne
                    </h3>
                    <div className="flex items-center justify-center gap-8 p-4 bg-white border rounded-xl">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-slate-100 text-[#c5b89a] hover:bg-slate-200 border border-slate-200 shadow-sm"
                        onClick={decrementPeople}
                        disabled={true}
                      >
                        <span className="text-2xl">-</span>
                      </Button>
                      <span className="text-3xl font-extrabold text-[#c5b89a] min-w-[60px] text-center">
                        {formData.numberOfPeople}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-slate-100 text-[#c5b89a] hover:bg-slate-200 border border-slate-200 shadow-sm"
                        onClick={incrementPeople}
                        disabled={true}
                      >
                        <span className="text-2xl">+</span>
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold bg-[#e2d9c2] text-[#4a4a4a] p-3 rounded-lg text-center mb-4">
                      Planning pour votre demande
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6 p-6 bg-white border rounded-xl shadow-sm">
                      <div className="text-center space-y-3">
                        <div className="font-bold text-[#c5b89a] text-sm">Je souhaite une heure fixe</div>
                        <div className="flex justify-center">
                          <Input
                            type="time"
                            value={formData.fixedTime}
                            onChange={(e) => setFormData({ ...formData, fixedTime: e.target.value })}
                            className="w-32 text-center text-xl font-bold h-12 border-[#e2d9c2]/30"
                          />
                        </div>
                      </div>
                      <div className="text-center space-y-3">
                        <div className="font-bold text-[#c5b89a] text-sm">Je suis flexible et disponible</div>
                        <RadioGroup
                          value={formData.schedulingTime}
                          onValueChange={(value) => setFormData({ ...formData, schedulingTime: value })}
                          className="space-y-2 text-left inline-block"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="morning" id="morning" className="border-[#e2d9c2] text-[#c5b89a]" />
                            <Label htmlFor="morning" className="text-sm font-medium">Le matin (09h - 12h)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="afternoon" id="afternoon" className="border-[#e2d9c2] text-[#c5b89a]" />
                            <Label htmlFor="afternoon" className="text-sm font-medium">L'après midi (13h - 18h)</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="text-center space-y-3">
                        <div className="font-bold text-[#c5b89a] text-sm text-wrap">Quand souhaitez-vous votre premier ménage ?</div>
                        <Input
                          type="date"
                          value={formData.schedulingDate}
                          onChange={(e) => setFormData({ ...formData, schedulingDate: e.target.value })}
                          className="w-full border-slate-300"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold bg-[#e2d9c2] text-[#4a4a4a] p-3 rounded-lg text-center mb-4">
                      Service Optionnels
                    </h3>
                    <div className="p-6 border rounded-xl bg-slate-50/50 space-y-6">
                      <div className="text-center font-bold text-[#c5b89a] mb-2 uppercase text-xs tracking-wider">
                        Produit fournis par l'agence ménage :
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-2 gap-x-4 max-w-2xl mx-auto mb-6 text-center">
                        {[
                          "Nettoyage cuisine",
                          "Entretien des sols",
                          "Salle de bain",
                          "Produit multi surface",
                          "Nettoyage sanitaire"
                        ].map((item) => (
                          <div key={item} className="flex items-center justify-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#c5b89a]" />
                            <span className="text-[11px] font-bold text-slate-600">{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-4 max-w-lg mx-auto">
                        <div className="flex items-center justify-between p-4 bg-white border border-[#e2d9c2]/20 rounded-xl shadow-sm">
                          <div className="flex items-center gap-4">
                            <img
                              src={cleaningProduct}
                              alt="Produits"
                              className="w-10 h-10 object-contain"
                            />
                            <div className="flex flex-col">
                              <span className="font-bold text-[#c5b89a] text-sm">Produits : + 90 dh</span>
                            </div>
                          </div>
                          <Switch
                            checked={formData.additionalServices.produitsEtOutils}
                            onCheckedChange={(checked) =>
                              setFormData({
                                ...formData,
                                additionalServices: { ...formData.additionalServices, produitsEtOutils: checked }
                              })
                            }
                            className="data-[state=checked]:bg-[#c5b89a]"
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white border border-[#e2d9c2]/20 rounded-xl shadow-sm">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
                              <img
                                src={cleaningClothsMop}
                                alt="Torchons"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="font-bold text-[#c5b89a] text-sm">Torchons et serpières</span>
                          </div>
                          <Switch
                            checked={formData.additionalServices.torchonsEtSerpieres}
                            onCheckedChange={(checked) =>
                              setFormData({
                                ...formData,
                                additionalServices: { ...formData.additionalServices, torchonsEtSerpieres: checked }
                              })
                            }
                            className="data-[state=checked]:bg-[#c5b89a]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold bg-[#e2d9c2] text-[#4a4a4a] p-3 rounded-lg mb-4 text-center">
                      où aura lieu votre ménage ?
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 p-4 border rounded-xl bg-white mb-4 shadow-sm">
                      <Input
                        placeholder="Ville , Casablanca"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="border-slate-300 h-11"
                      />
                      <Input
                        placeholder="Quartier : j'inscris le nom"
                        value={formData.neighborhood}
                        onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                        className="border-slate-300 h-11"
                      />
                    </div>
                    <div className="p-4 border rounded-xl bg-white shadow-sm">
                      <Label className="font-bold text-[#c5b89a] text-xs uppercase mb-2 block">Champs de repère</Label>
                      <Textarea
                        placeholder="Donnez-nous des repères pour faciliter le travail de ménage"
                        value={formData.changeRepereNotes}
                        onChange={(e) => setFormData({ ...formData, changeRepereNotes: e.target.value })}
                        className="mt-2 border-slate-300 min-h-[100px]"
                      />
                    </div>
                  </div>

                  <div className="bg-white border border-[#e2d9c2]/40 rounded-xl overflow-hidden shadow-sm">
                    <h3 className="text-xl font-bold bg-[#e2d9c2] text-[#4a4a4a] p-3 text-center">
                      Mes Informations
                    </h3>
                    <div className="p-6 grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="font-bold text-[#c5b89a] text-xs uppercase">Numéro de téléphone*</Label>
                        <div className="flex gap-2">
                          <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-[#c5b89a] flex items-center">
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
                        <Label className="font-bold text-[#c5b89a] text-xs uppercase">Numéro whatsapp</Label>
                        <div className="flex gap-2">
                          <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-[#c5b89a] flex items-center">
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
                        <Label className="font-bold text-[#c5b89a] text-xs uppercase">Nom*</Label>
                        <Input
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          required
                          className="border-slate-300 h-11"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-bold text-[#c5b89a] text-xs uppercase">Prénom*</Label>
                        <Input
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          required
                          className="border-slate-300 h-11"
                          placeholder="Votre prénom"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center pt-8">
                    <Button
                      type="submit"
                      className="bg-[#c5b89a] hover:bg-[#b8a985] text-white px-10 py-4 text-lg font-bold shadow-lg shadow-[#c5b89a]/20 h-auto rounded-full w-full md:w-auto md:min-w-[300px] transition-all hover:scale-105 active:scale-95 uppercase tracking-wider"
                    >
                      Confirmer ma réservation
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

export default GrandMenage;
