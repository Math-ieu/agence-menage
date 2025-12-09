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
import serviceBureaux from "@/assets/service-bureaux.jpg";

const MenageBureaux = () => {
  const [formData, setFormData] = useState({
    officeSurface: "",
    frequency: "2foisMois",
    duration: 4,
    numberOfPeople: 1,
    city: "",
    neighborhood: "",
    rooms: {
      salleReunion: 0,
      salleRepos: 0,
      bureaux: 0,
      bureauNormal: 0,
      toilettes: 0,
      cuisine: 0,
      salleAttente: 0,
      cour: 0,
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

  const [totalPrice] = useState(350);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.phoneNumber) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    toast.success("Réservation confirmée! Nous vous contactons bientôt.");
  };

  const incrementPeople = () => setFormData({ ...formData, numberOfPeople: formData.numberOfPeople + 1 });
  const decrementPeople = () => setFormData({ ...formData, numberOfPeople: Math.max(1, formData.numberOfPeople - 1) });

  const incrementDuration = () => setFormData({ ...formData, duration: formData.duration + 1 });
  const decrementDuration = () => setFormData({ ...formData, duration: Math.max(1, formData.duration - 1) });

  const updateRoomCount = (room: string, increment: boolean) => {
    setFormData({
      ...formData,
      rooms: {
        ...formData.rooms,
        [room]: Math.max(0, formData.rooms[room as keyof typeof formData.rooms] + (increment ? 1 : -1))
      }
    });
  };

  const frequencies = [
    { value: "2foisMois", label: "2 fois par mois" },
    { value: "1foisSemaine", label: "Une fois par semaine" },
    { value: "5foisSemaine", label: "5 fois par semaine" },
    { value: "6foisSemaine", label: "6 fois par semaine" },
    { value: "7foisSemaine", label: "7 fois par semaine" },
    { value: "3foisSemaine", label: "3 fois par semaine" },
    { value: "1semaine2", label: "Une semaine sur deux" },
    { value: "1foisMois", label: "1 fois par mois" }
  ];

  const getFrequencyLabel = (value: string) => {
    const freq = frequencies.find(f => f.value === value);
    return freq ? freq.label : "Ponctuel";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <ServiceHeroSection
        title="Ménage Bureaux"
        description="Un service de nettoyage professionnel adapté aux besoins de votre entreprise. Nos équipes spécialisées garantissent un environnement de travail propre, sain et accueillant pour vos collaborateurs et clients, avec des solutions flexibles adaptées à vos horaires."
        image={serviceBureaux}
      />

      <main className="flex-1 bg-background py-12">
        <div className="container max-w-4xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-service-orange/10 rounded-lg p-6 text-center">
              <h2 className="text-2xl font-bold text-service-orange mb-2">
                FORMULAIRE DE RESERVATION
              </h2>
            </div>

            <div className="bg-card rounded-lg p-6 border shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-bold bg-service-orange text-white p-3 rounded-lg mb-4">
                  Superficie de votre cadre en M²
                </h3>
                <div className="p-4 bg-muted/30 rounded">
                  <Input
                    placeholder="55 m²"
                    value={formData.officeSurface}
                    onChange={(e) => setFormData({ ...formData, officeSurface: e.target.value })}
                    type="number"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold bg-service-orange text-white p-3 rounded-lg mb-4">
                    Choisissez la fréquence
                  </h3>
                  <div className="p-4 bg-muted/30 rounded">
                    <Select
                      value={formData.frequency}
                      onValueChange={(value) => setFormData({ ...formData, frequency: value })}
                    >
                      <SelectTrigger className="w-full">
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
                </div>

                <div className="bg-service-orange/10 rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold">Votre réservation du :</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Fréquence :</span>
                      <span className="font-medium">{getFrequencyLabel(formData.frequency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date :</span>
                      <span className="font-medium">
                        <Input
                          type="date"
                          value={formData.schedulingDate}
                          onChange={(e) => setFormData({ ...formData, schedulingDate: e.target.value })}
                          className="h-8 w-full"
                        />
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Heures réservées :</span>
                      <span className="font-medium">{formData.duration} heures</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Heure :</span>
                      <span className="font-medium w-32">
                        <Input
                          type="time"
                          value={formData.fixedTime}
                          onChange={(e) => setFormData({ ...formData, fixedTime: e.target.value })}
                          className="h-8"
                        />
                      </span>
                    </div>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="text-2xl font-bold text-service-orange text-center border-2 border-service-orange rounded-lg p-3">
                      {totalPrice} DH
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold bg-service-orange text-white p-3 rounded-lg mb-4">
                  Durée Estimée en heures
                </h3>
                <div className="flex items-center justify-center gap-4 p-4 bg-muted/30 rounded">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={decrementDuration}
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
                <h3 className="text-xl font-bold bg-service-orange text-white p-3 rounded-lg mb-4">
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
                <h3 className="text-xl font-bold bg-service-orange text-white p-3 rounded-lg mb-4">
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
                    placeholder="Donnez-nous des repères pour faciliter le travail de ménage"
                    value={formData.changeRepereNotes}
                    onChange={(e) => setFormData({ ...formData, changeRepereNotes: e.target.value })}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold bg-service-orange text-white p-3 rounded-lg mb-4">
                  Présentez-nous votre domicile ainsi que les pièces qu'il contient
                </h3>
                <div className="space-y-4 p-4 bg-muted/30 rounded">
                  {[
                    { key: "salleReunion", label: "Salle de réunion", time: "75 min - 90 min" },
                    { key: "salleRepos", label: "Salle de repos", time: "45 min - 60 min" },
                    { key: "bureaux", label: "Bureaux + toilette", time: "20 min - 40 min" },
                    { key: "bureauNormal", label: "Bureau normal", time: "30 min - 50 min" },
                    { key: "toilettes", label: "Toilettes", time: "30 min - 40 min" },
                    { key: "cuisine", label: "Cuisine", time: "30 min - 40 min" },
                    { key: "salleAttente", label: "Salle d'attente", time: "20 min - 30 min" },
                    { key: "cour", label: "Cour/Terrasse", time: "20 min - 30 min" },
                    { key: "escalier", label: "Escalier", time: "20 min - 30 min" }
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
                          className="h-8 w-8 rounded-full bg-service-orange/20 hover:bg-service-orange/30 text-foreground"
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
                          className="h-8 w-8 rounded-full bg-service-orange/20 hover:bg-service-orange/30 text-foreground"
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
                <h3 className="text-xl font-bold bg-service-orange text-white p-3 rounded-lg mb-4">
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
                        <RadioGroupItem value="morning" id="bureau-morning" />
                        <Label htmlFor="bureau-morning">Le matin (09h 00 - 12h 00)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="afternoon" id="bureau-afternoon" />
                        <Label htmlFor="bureau-afternoon">L'après midi (13h 00 - 18h 00)</Label>
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
                <h3 className="text-xl font-bold bg-service-orange text-white p-3 rounded-lg mb-4">
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
                <h3 className="text-xl font-bold bg-service-orange text-white p-3 rounded-lg mb-4 -m-6 mb-4">
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

              <div className="text-center pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="px-12 bg-service-orange hover:bg-service-orange/90 text-white"
                >
                  Confirmer ma réservation
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MenageBureaux;
