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
import { toast } from "sonner";
import serviceRegulier from "@/assets/service-regulier.jpg";
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
      sallePrincipale: 0,
      salleSansBain: 0,
      salleDeBain: 0,
      chambre: 0,
      salonMezzanine: 0,
      salonEuropeen: 0,
      toilettesLavabo: 0,
      cour: 0,
      escalier: 0,
      menageRangement: 0
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

  const totalPrice = formData.duration * 85;

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
  const decrementDuration = () => setFormData({ ...formData, duration: Math.max(1, formData.duration - 1) });

  const calculateEstimation = (rooms: typeof formData.rooms) => {
    const roomTimes: Record<string, number> = {
      sallePrincipale: 82.5,
      salleSansBain: 52.5,
      salleDeBain: 30,
      chambre: 40,
      salonMezzanine: 35,
      salonEuropeen: 35,
      toilettesLavabo: 25,
      cour: 25,
      escalier: 25,
      menageRangement: 37.5
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
    <div className="min-h-screen flex flex-col" style={{ "--primary": "179 48% 30%" } as React.CSSProperties}>
      <Header />

      <ServiceHeroSection
        title="Ménage standard"
        description="Un service de ménage professionnel et ponctuel pour maintenir votre espace toujours propre. Nos équipes qualifiées interviennent à la fréquence de votre choix pour un confort optimal au quotidien."
        image={serviceRegulier}
        primaryColor="#287271"
      />

      <main className="flex-1 bg-background py-12">
        <div className="container max-w-5xl">
          <div className="bg-primary/10 rounded-lg p-6 text-center mb-8">
            <h2 className="text-2xl font-bold text-primary mb-2">
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
                    <div className="flex justify-between gap-4">
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
                    <div className="flex justify-between gap-4">
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
                  <h3 className="text-xl font-bold bg-primary text-white p-3 rounded-t-lg">
                    Type d'habitation
                  </h3>
                  <RadioGroup
                    value={formData.propertyType}
                    onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30"
                  >
                    {["Studio", "Appartement", "Duplex", "Villa", "Maison"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <RadioGroupItem value={type.toLowerCase()} id={type} />
                        <Label htmlFor={type}>{type}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <h3 className="text-xl font-bold bg-primary text-white p-3 rounded-lg mb-4">
                    Choisissez la fréquence
                  </h3>
                  <div className="p-4 bg-muted/30 rounded space-y-4">
                    <RadioGroup
                      value={formData.frequency}
                      onValueChange={(value) => setFormData({ ...formData, frequency: value, subFrequency: value === "oneshot" ? "" : formData.subFrequency })}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="oneshot" id="oneshot" />
                        <Label htmlFor="oneshot">One shot</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="subscription" id="subscription" />
                        <Label htmlFor="subscription">Abonnement</Label>
                      </div>
                    </RadioGroup>

                    {formData.frequency === "subscription" && (
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
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold bg-primary text-white p-3 rounded-lg mb-4">
                    Présentez-nous votre domicile ainsi que les pièces qu'il contient
                  </h3>
                  <div className="space-y-4 p-4 bg-muted/30 rounded">
                    {[
                      { key: "sallePrincipale", label: "Salle principale + salle de bain", time: "75 min - 90 min" },
                      { key: "salleSansBain", label: "Salle principale sans salle de bain", time: "45 min - 60 min" },
                      { key: "salleDeBain", label: "Salle de bain", time: "20 min - 40 min" },
                      { key: "chambre", label: "Chambre/Pièce/bureau/chambre d'enfant", time: "30 min - 50 min" },
                      { key: "salonMezzanine", label: "Salon Mezzanine", time: "30 min - 40 min" },
                      { key: "salonEuropeen", label: "Salon Européen", time: "30 min - 40 min" },
                      { key: "toilettesLavabo", label: "Toilettes lavabo", time: "20 min - 30 min" },
                      { key: "cour", label: "Cour/Terrasse", time: "20 min - 30 min" },
                      { key: "escalier", label: "Escalier", time: "20 min - 30 min" },
                      { key: "menageRangement", label: "Ménage / rangement", time: "30 min - 45 min" }
                    ].map((room) => (
                      <div key={room.key} className="flex items-center justify-between border-b pb-2">
                        <div className="flex-1">
                          <div className="font-medium">{room.label}</div>
                          <div className="text-sm text-muted-foreground">{room.time}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-primary/20 hover:bg-primary/30 text-foreground"
                            onClick={() => updateRoomCount(room.key, false)}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center font-semibold">
                            {formData.rooms[room.key as keyof typeof formData.rooms]}
                          </span>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-primary/20 hover:bg-primary/30 text-foreground"
                            onClick={() => updateRoomCount(room.key, true)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold bg-primary text-white p-3 rounded-lg mb-4">
                    Durée estimée
                  </h3>
                  <div className="flex items-center justify-center gap-4 p-4 bg-muted/30 rounded">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      onClick={decrementDuration}
                      disabled={formData.duration <= 4}
                    >
                      -
                    </Button>
                    <span className="text-xl font-semibold min-w-[60px] text-center">
                      {formData.duration}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      onClick={incrementDuration}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold bg-primary text-white p-3 rounded-lg mb-4">
                    Nombre de personne
                  </h3>
                  <div className="flex items-center justify-center gap-4 p-4 bg-muted/30 rounded">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      onClick={decrementPeople}
                    >
                      -
                    </Button>
                    <span className="text-xl font-semibold min-w-[60px] text-center">
                      {formData.numberOfPeople}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      onClick={incrementPeople}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold bg-primary text-white p-3 rounded-lg mb-4">
                    Où aura lieu votre ménage ?
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded">
                    <Input
                      placeholder="Ville , Casablanca"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                    <Input
                      placeholder="Quartier : j'inscris le nom"
                      value={formData.neighborhood}
                      onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                    />
                  </div>
                  <div className="mt-4 p-4 bg-muted/20 rounded">
                    <Label className="font-semibold">Champs de repère</Label>
                    <Textarea
                      placeholder="Donnez-nous des repères pour faciliter le travail de ménage (points de référence pour la tournée du nettoyeur) après les points de repère"
                      value={formData.changeRepereNotes}
                      onChange={(e) => setFormData({ ...formData, changeRepereNotes: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                </div>



                <div>
                  <h3 className="text-xl font-bold bg-primary text-white p-3 rounded-lg mb-4">
                    Planning pour votre demande
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6 p-4 bg-muted/30 rounded">
                    <div className="text-center">
                      <div className="font-semibold mb-2">Je souhaite une heure fixe</div>
                      <div className="flex justify-center">
                        <Input
                          type="time"
                          value={formData.fixedTime}
                          onChange={(e) => setFormData({ ...formData, fixedTime: e.target.value })}
                          className="w-32 text-center text-xl font-bold h-12"
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold mb-2">Je suis flexible et disponible</div>
                      <RadioGroup
                        value={formData.schedulingTime}
                        onValueChange={(value) => setFormData({ ...formData, schedulingTime: value })}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="morning" id="morning" />
                          <Label htmlFor="morning">Le matin (09h 00 - 12h 00)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="afternoon" id="afternoon" />
                          <Label htmlFor="afternoon">L'après midi (13h 00 - 18h 00)</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold mb-2">Quand souhaitez-vous votre premier ménage ?</div>
                      <Input
                        type="date"
                        value={formData.schedulingDate}
                        onChange={(e) => setFormData({ ...formData, schedulingDate: e.target.value })}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold bg-primary text-white p-3 rounded-lg mb-4">
                    Services optionnels
                  </h3>
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">🧴</span>
                      <span className="font-medium">Produits et outils + 150dh</span>
                    </div>
                    <Switch
                      checked={formData.additionalServices.produitsEtOutils}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          additionalServices: { ...formData.additionalServices, produitsEtOutils: checked }
                        })
                      }
                    />
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-6">
                  <h3 className="text-xl font-bold bg-primary text-white p-3 rounded-lg mb-4 -m-6 mb-4">
                    Mes informations
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Numéro de téléphone*</Label>
                      <div className="flex gap-2 mt-1">
                        <Input value="+212" disabled className="w-20" />
                        <Input
                          placeholder="6 12 00 00 00"
                          value={formData.phoneNumber}
                          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Numéro whatsapp*</Label>
                      <div className="flex gap-2 mt-1">
                        <Input value="+212" disabled className="w-20" />
                        <Input
                          placeholder="6 12 00 00 00"
                          value={formData.whatsappNumber}
                          onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Nom*</Label>
                      <Input
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Prénom*</Label>
                      <Input
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center pt-8">
                  <Button
                    type="submit"
                    className="w-full md:w-auto px-12 bg-primary hover:bg-primary/90 text-white py-6 text-lg font-bold"
                  >
                    Confirmer ma réservation
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MenageRegulier;
