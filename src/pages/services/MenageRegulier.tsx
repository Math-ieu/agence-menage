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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import serviceRegulier from "@/assets/service-regulier.jpg";
import cleaningProduct from "@/assets/cleaning-product.png";
import { createWhatsAppLink, formatBookingMessage } from "@/lib/whatsapp";
import "@/styles/sticky-summary.css";

const MenageRegulier = () => {
  const [formData, setFormData] = useState({
    propertyType: "studio",
    frequency: "oneshot",
    subFrequency: "",
    duration: 4,
    numberOfPeople: 1,
    city: "",
    neighborhood: "",
    rooms: {
      cuisine: 0,
      suiteAvecBain: 0,
      suiteSansBain: 0,
      salleDeBain: 0,
      chambre: 0,
      salonMezzanine: 0,
      salonEuropeen: 0,
      toilettesLavabo: 0,
      rooftop: 0,
      escalier: 0
    },
    schedulingTime: "morning",
    schedulingHours: "09:00 - 12:00",
    schedulingDate: "",
    fixedTime: "14:00",
    additionalServices: {
      produitsEtOutils: false
    },
    phoneNumber: "",
    whatsappNumber: "",
    firstName: "",
    lastName: "",
    changeRepereNotes: ""
  });

  const baseRate = 60;
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

    const message = formatBookingMessage("Ménage Régulier", formData, totalPrice);
    const whatsappLink = createWhatsAppLink("212669372603", message);

    window.open(whatsappLink, '_blank');
    toast.success("Redirection vers WhatsApp pour finaliser la réservation...");
  };

  const incrementPeople = () => setFormData({ ...formData, numberOfPeople: formData.numberOfPeople + 1 });
  const decrementPeople = () => setFormData({ ...formData, numberOfPeople: Math.max(1, formData.numberOfPeople - 1) });

  const incrementDuration = () => setFormData({ ...formData, duration: formData.duration + 1 });
  const decrementDuration = () => setFormData({ ...formData, duration: Math.max(4, formData.duration - 1) });

  const calculateEstimation = (rooms: typeof formData.rooms) => {
    const roomTimes: Record<string, number> = {
      cuisine: 45,
      suiteAvecBain: 75,
      suiteSansBain: 45,
      salleDeBain: 30,
      chambre: 40,
      salonMezzanine: 35,
      salonEuropeen: 35,
      toilettesLavabo: 25,
      rooftop: 30,
      escalier: 25
    };

    let totalMinutes = 0;
    Object.entries(rooms).forEach(([key, count]) => {
      totalMinutes += (roomTimes[key] || 0) * count;
    });

    const calculatedHours = Math.ceil(totalMinutes / 60);
    const finalDuration = Math.max(4, calculatedHours);

    // Logic for number of people: 1 person for <= 6 hours, 2 for > 6 hours
    const finalPeople = finalDuration > 6 ? 2 : 1;

    setFormData(prev => ({
      ...prev,
      duration: finalDuration,
      numberOfPeople: finalPeople,
      rooms
    }));
  };

  const updateRoomCount = (room: string, increment: boolean) => {
    const newCount = Math.max(0, formData.rooms[room as keyof typeof formData.rooms] + (increment ? 1 : -1));
    const newRooms = {
      ...formData.rooms,
      [room]: newCount
    };
    calculateEstimation(newRooms);
  };

  const frequencies = [
    { value: "1fois", label: "Une fois par semaine" },
    { value: "2fois", label: "2 fois par semaine" },
    { value: "3fois", label: "3 fois par semaine - Recommandé" },
    { value: "5fois", label: "5 fois par semaine" },
    { value: "6fois", label: "6 fois par semaine" },
    { value: "7fois", label: "7 fois par semaine" },
    { value: "3foisMois", label: "3 fois par mois" },
    { value: "1semaine2", label: "Une semaine sur deux" },
    { value: "1foisMois", label: "1 fois par mois" }
  ];

  const getFrequencyLabel = (value: string, subValue: string) => {
    if (value === "oneshot") return "One shot";
    const freq = frequencies.find(f => f.value === subValue);
    return freq ? `Abonnement - ${freq.label}` : "Abonnement";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div style={{ "--primary": "179 48% 30%" } as React.CSSProperties}>
        <ServiceHeroSection
          title="Ménage standard"
          description={`Le ménage standard a pour objectif d’assurer la propreté et l’entretien courant des espaces attribués.
Il comprend le :

- Nettoyage de cuisine
- Lavage de vaisselle
- Balayage du sol et des tapis
- Nettoyage du sol
- Nettoyage des portes de placard
- Nettoyage des chambres
- Nettoyages des salles de bains et toilettes
- Depoussierage des meubles
- Nettoyage des vitres intérieurs accessibles
- Changement des draps
- Rangement de la vaisselle
- Vidage et nettoyage de la poubelle`}
          image={serviceRegulier}
          primaryColor="#287271"
        />

        <main className="flex-1 bg-background py-12">
          <div className="container max-w-5xl">
            <div className="bg-[#e9f2f2] rounded-lg p-6 text-center mb-8 border border-[#d1e0e0]">
              <h2 className="text-2xl font-bold text-[#1c6664] mb-2 uppercase tracking-wide">
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
                        <span className="font-medium text-right">Ménage standard</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-muted-foreground">Fréquence:</span>
                        <span className="font-medium text-right">{getFrequencyLabel(formData.frequency, formData.subFrequency)}</span>
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
                        <span className="text-2xl font-bold text-primary">{totalPrice} DH</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-8">

                <div className="bg-card rounded-lg p-6 border shadow-sm space-y-6">
                  <div>
                    <h3 className="text-xl font-bold bg-[#1c6664] text-white p-3 rounded-lg mb-4 text-center">
                      Type d'habitation
                    </h3>
                    <RadioGroup
                      value={formData.propertyType}
                      onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                      className="flex flex-wrap gap-8 p-4"
                    >
                      {["Studio", "Appartement", "Duplex", "Villa", "Maison"].map((type) => (
                        <div key={type} className="flex items-center space-x-3">
                          <RadioGroupItem value={type.toLowerCase()} id={type} className="border-[#1c6664] text-[#1c6664]" />
                          <Label htmlFor={type} className="font-medium text-slate-700">{type}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold bg-[#1c6664] text-white p-3 rounded-lg mb-4 text-center">
                      Choisissez la fréquence
                    </h3>
                    <div className="p-4 space-y-4">
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
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Sélectionnez un abonnement" />
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
                  </div>

                  <div>
                    <h3 className="text-xl font-bold bg-[#1c6664] text-white p-3 rounded-lg text-center mb-2">
                      Merci de nous décrire votre domicile ainsi que les différentes pièces qui le composent
                    </h3>
                    <p className="text-red-500 text-xs text-right mb-4">
                      cliquez sur + ou - pour décrire les pièces de votre logement
                    </p>
                    <div className="space-y-4 p-4 border rounded-xl bg-white">
                      {[
                        { key: "cuisine", label: "Cuisine", time: "45 min" },
                        { key: "suiteAvecBain", label: "Suite parentale avec salle de bain", time: "75 min" },
                        { key: "suiteSansBain", label: "Suite parentale sans salle de bain", time: "45 min" },
                        { key: "salleDeBain", label: "Salle de bain", time: "30 min" },
                        { key: "chambre", label: "Chambre/pièce/bureau/chambre d'enfant", time: "40 min" },
                        { key: "salonMezzanine", label: "salon Mezzanine", time: "35 min" },
                        { key: "salonEuropeen", label: "salon européen", time: "35 min" },
                        { key: "toilettesLavabo", label: "toilette Lavabo", time: "25 min" },
                        { key: "rooftop", label: "Rooftop", time: "30 min", type: "checkbox" },
                        { key: "escalier", label: "Escalier", time: "25 min", type: "checkbox" }
                      ].map((room) => (
                        <div key={room.key} className="flex items-center justify-between border-b border-dashed pb-3 last:border-0 last:pb-0">
                          <div className="flex-1">
                            <div className="font-bold text-slate-800">{room.label}</div>
                            <div className="text-xs text-slate-400 italic">{room.time}</div>
                          </div>
                          <div className="flex items-center gap-4">
                            {room.type === "checkbox" ? (
                              <Checkbox
                                checked={formData.rooms[room.key as keyof typeof formData.rooms] > 0}
                                onCheckedChange={(checked) => {
                                  updateRoomCount(room.key, !!checked);
                                }}
                                className="h-6 w-6 rounded border-slate-300 data-[state=checked]:bg-[#1c6664] data-[state=checked]:border-[#1c6664]"
                              />
                            ) : (
                              <div className="flex items-center gap-3 bg-[#f0f7f7] rounded-full p-1">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 rounded-full bg-slate-200 text-[#1c6664] hover:bg-slate-300"
                                  onClick={() => updateRoomCount(room.key, false)}
                                >
                                  -
                                </Button>
                                <span className="w-4 text-center font-bold text-[#1c6664] text-sm">
                                  {formData.rooms[room.key as keyof typeof formData.rooms]}
                                </span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 rounded-full bg-slate-200 text-[#1c6664] hover:bg-slate-300"
                                  onClick={() => updateRoomCount(room.key, true)}
                                >
                                  +
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="bg-[#f8fafc] border border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center space-y-2 mb-8 shadow-inner">
                      <p className="text-red-500 text-xs text-center font-medium">
                        D'après les options choisies, nous recommandons {formData.duration} heures pour un ménage total.
                      </p>
                      <div className="bg-[#94a3a3] text-white text-3xl font-bold px-10 py-3 rounded-full shadow-lg">
                        {formData.duration}H : 00
                      </div>
                    </div>

                    <h3 className="text-xl font-bold bg-[#1c6664] text-white p-3 rounded-lg text-center mb-2">
                      Précisez le temps qui vous convient le mieux.
                    </h3>
                    <p className="text-red-500 text-[10px] text-center mb-4">
                      La durée initiale de votre ménage est de {formData.duration} h
                    </p>
                    <div className="flex items-center justify-center gap-8 p-4">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-[#f0f7f7] text-[#1c6664] hover:bg-[#e0eded] shadow-sm border border-slate-100"
                        onClick={decrementDuration}
                        disabled={formData.duration <= 4}
                      >
                        <span className="text-2xl">-</span>
                      </Button>
                      <span className="text-2xl font-bold text-[#1c6664] min-w-[40px] text-center">
                        {formData.duration}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-[#f0f7f7] text-[#1c6664] hover:bg-[#e0eded] shadow-sm border border-slate-100"
                        onClick={incrementDuration}
                      >
                        <span className="text-2xl">+</span>
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold bg-[#1c6664] text-white p-3 rounded-lg text-center mb-4">
                      Nombre de personne
                    </h3>
                    <div className="flex items-center justify-center gap-8 p-4">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-[#f0f7f7] text-[#1c6664] hover:bg-[#e0eded] shadow-sm border border-slate-100"
                        onClick={decrementPeople}
                      >
                        <span className="text-2xl">-</span>
                      </Button>
                      <span className="text-2xl font-bold text-[#1c6664] min-w-[40px] text-center">
                        {formData.numberOfPeople}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-[#f0f7f7] text-[#1c6664] hover:bg-[#e0eded] shadow-sm border border-slate-100"
                        onClick={incrementPeople}
                      >
                        <span className="text-2xl">+</span>
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold bg-[#1c6664] text-white p-3 rounded-lg mb-4 text-center">
                      Planning pour votre demande
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6 p-4 border rounded-xl bg-white">
                      <div className="text-center space-y-3">
                        <div className="font-bold text-[#1c6664] text-sm">Je souhaite une heure fixe</div>
                        <div className="flex justify-center">
                          <Input
                            type="time"
                            value={formData.fixedTime}
                            onChange={(e) => setFormData({ ...formData, fixedTime: e.target.value })}
                            className="w-32 text-center text-xl font-bold h-12 border-[#1c6664]/30"
                          />
                        </div>
                      </div>
                      <div className="text-center space-y-3">
                        <div className="font-bold text-[#1c6664] text-sm">Je suis flexible et disponible</div>
                        <RadioGroup
                          value={formData.schedulingTime}
                          onValueChange={(value) => setFormData({ ...formData, schedulingTime: value })}
                          className="space-y-2 text-left inline-block"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="morning" id="morning" className="border-[#1c6664] text-[#1c6664]" />
                            <Label htmlFor="morning" className="text-sm font-medium">Le matin (09h - 12h)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="afternoon" id="afternoon" className="border-[#1c6664] text-[#1c6664]" />
                            <Label htmlFor="afternoon" className="text-sm font-medium">L'après midi (13h - 18h)</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="text-center space-y-3">
                        <div className="font-bold text-[#1c6664] text-sm">Premier ménage ?</div>
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
                    <h3 className="text-xl font-bold bg-[#1c6664] text-white p-3 rounded-lg mb-4 text-center">
                      Services optionnels
                    </h3>
                    <div className="p-6 border rounded-xl bg-slate-50/50 space-y-4">
                      <div className="text-center font-bold text-[#1c6664] mb-4">
                        Produit fournis par l'agence ménage :
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto mb-6">
                        {[
                          "Chiffon microfibre",
                          "Produit multi surface",
                          "Nettoyant sanitaire",
                          "Nettoyant dégraissant",
                          "Nettoyant vitre & miroir"
                        ].map((item) => (
                          <div key={item} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#1c6664]" />
                            <span className="text-sm font-medium text-slate-700">{item}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                        <div className="flex items-center gap-4">
                          <img
                            src={cleaningProduct}
                            alt="Produits"
                            className="w-12 h-12 object-contain"
                          />
                          <span className="font-bold text-[#1c6664]">Produit : + 90 dh</span>
                        </div>
                        <Switch
                          checked={formData.additionalServices.produitsEtOutils}
                          onCheckedChange={(checked) =>
                            setFormData({
                              ...formData,
                              additionalServices: { ...formData.additionalServices, produitsEtOutils: checked }
                            })
                          }
                          className="data-[state=checked]:bg-[#1c6664]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold bg-[#1c6664] text-white p-3 rounded-lg mb-4 text-center">
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
                      <Label className="font-bold text-[#1c6664]">Champs de repère</Label>
                      <Textarea
                        placeholder="Donnez-nous des repères pour faciliter le travail de ménage (points de référence pour la tournée du nettoyeur) après les points de repère"
                        value={formData.changeRepereNotes}
                        onChange={(e) => setFormData({ ...formData, changeRepereNotes: e.target.value })}
                        className="mt-2 border-slate-300"
                      />
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <h3 className="text-xl font-bold bg-[#1c6664] text-white p-3 text-center">
                      Mes informations
                    </h3>
                    <div className="p-6 grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="font-bold text-[#1c6664] text-sm">Numéro de téléphone*</Label>
                        <div className="flex gap-2">
                          <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-[#1c6664] flex items-center">
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
                        <Label className="font-bold text-[#1c6664] text-sm">Numéro whatsapp</Label>
                        <div className="flex gap-2">
                          <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-[#1c6664] flex items-center">
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
                        <Label className="font-bold text-[#1c6664] text-sm">Nom*</Label>
                        <Input
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          required
                          className="mt-1 border-slate-300 h-11"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-bold text-[#1c6664] text-sm">Prénom*</Label>
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
                      className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-base font-bold shadow-lg shadow-primary/20 h-auto rounded-full w-full md:w-auto md:min-w-[250px] transition-all hover:scale-105 active:scale-95"
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

export default MenageRegulier;
