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
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import serviceGardeMalade from "@/assets/service-garde-malade.jpg";
import { createWhatsAppLink, formatBookingMessage } from "@/lib/whatsapp";

const GardeMalade = () => {
  const [formData, setFormData] = useState({
    frequency: "3foisSemaine",
    duration: 4,
    numberOfPeople: 1,
    careLocation: "domicile",
    careAddress: "",
    city: "",
    neighborhood: "",
    patientAge: "",
    patientGender: "",
    mobility: "",
    healthIssues: "",
    careTasks: {
      cases: false,
      surveillance: false,
      aideToilette: false,
      aideHabillage: false,
      preparerRepas: false,
      aideAlimentation: false,
      priseMedicaments: false,
      accompagnementRDV: false,
      entretenirLinge: false,
      menageLeger: false,
      autre: false
    },
    isOvernight: false,
    schedulingTime: "morning",
    schedulingHours: "09:00 - 12:00",
    schedulingDate: "",
    fixedTime: "14:00",
    numberOfDays: 1,
    additionalNotes: "",
    additionalServices: {
      produitsEtOutils: false
    },
    phoneNumber: "",
    whatsappNumber: "",
    firstName: "",
    lastName: ""
  });

  const totalPrice = formData.duration * 90;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.phoneNumber) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const message = formatBookingMessage("Garde Malade", formData, totalPrice);
    const whatsappLink = createWhatsAppLink("212669372603", message);

    window.open(whatsappLink, '_blank');
    toast.success("Redirection vers WhatsApp pour finaliser la réservation...");
  };

  const incrementPeople = () => setFormData({ ...formData, numberOfPeople: formData.numberOfPeople + 1 });
  const decrementPeople = () => setFormData({ ...formData, numberOfPeople: Math.max(1, formData.numberOfPeople - 1) });

  const incrementDuration = () => setFormData({ ...formData, duration: formData.duration + 1 });
  const decrementDuration = () => setFormData({ ...formData, duration: Math.max(1, formData.duration - 1) });

  const incrementDays = () => setFormData({ ...formData, numberOfDays: formData.numberOfDays + 1 });
  const decrementDays = () => setFormData({ ...formData, numberOfDays: Math.max(1, formData.numberOfDays - 1) });

  const frequencies = [
    { value: "3foisSemaine", label: "3 fois par semaine" },
    { value: "1foisSemaine", label: "Une fois par semaine" },
    { value: "5foisSemaine", label: "5 fois par semaine" },
    { value: "6foisSemaine", label: "6 fois par semaine" },
    { value: "7foisSemaine", label: "7 fois par semaine" },
    { value: "2foisSemaine", label: "2 fois par semaine" },
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

      <div style={{ "--primary": "28 59% 45%" } as React.CSSProperties}>
        <ServiceHeroSection
          title="Garde Malade"
          description="Un accompagnement professionnel et bienveillant pour vos proches. Nos auxiliaires de vie qualifiés offrent une assistance adaptée aux besoins spécifiques de chaque patient, avec douceur et respect, pour garantir leur bien-être et leur confort au quotidien."
          image={serviceGardeMalade}
          primaryColor="#b46d2f"
        />

        <main className="flex-1 bg-background py-12">
          <div className="container max-w-4xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-primary/10 rounded-lg p-6 text-center">
                <h2 className="text-2xl font-bold text-primary mb-2">
                  FORMULAIRE DE RESERVATION GARDE MALADE
                </h2>
              </div>

              <div className="bg-card rounded-lg p-6 border shadow-sm space-y-6">
                <div>
                  <h3 className="text-xl font-bold bg-primary text-white p-3 rounded-lg mb-4">
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

                <div className="grid md:grid-cols-2 gap-6">
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

                  <div className="bg-primary/10 rounded-lg p-4 space-y-3">
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
                      <div className="text-2xl font-bold text-primary text-center border-2 border-primary rounded-lg p-3">
                        {totalPrice} DH
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold bg-primary text-white p-3 rounded-lg mb-4">
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
                  <h3 className="text-xl font-bold bg-primary text-white p-3 rounded-lg mb-4">
                    Lieu de la garde
                  </h3>
                  <RadioGroup
                    value={formData.careLocation}
                    onValueChange={(value) => setFormData({ ...formData, careLocation: value })}
                    className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded"
                  >
                    {["Domicile", "Clinique", "Hôpital"].map((location) => (
                      <div key={location} className="flex items-center space-x-2">
                        <RadioGroupItem value={location.toLowerCase()} id={`garde-${location}`} />
                        <Label htmlFor={`garde-${location}`}>{location}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <h3 className="text-xl font-bold bg-primary text-white p-3 rounded-lg mb-4">
                    Adresse du lieu de la garde ?
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
                      placeholder="Donnez-nous des repères pour faciliter votre garde malades proches du vôtre maison, ajoutez les points de repère"
                      value={formData.careAddress}
                      onChange={(e) => setFormData({ ...formData, careAddress: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="bg-primary/10 rounded-lg p-6">
                  <h3 className="text-xl font-bold bg-primary text-white p-3 rounded-lg mb-4">
                    Présentez-nous votre demande
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Âge :</Label>
                      <Input
                        placeholder="ans"
                        value={formData.patientAge}
                        onChange={(e) => setFormData({ ...formData, patientAge: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Sexe :</Label>
                      <RadioGroup
                        value={formData.patientGender}
                        onValueChange={(value) => setFormData({ ...formData, patientGender: value })}
                        className="flex gap-4 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="femme" id="patient-femme" />
                          <Label htmlFor="patient-femme">Femme</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="homme" id="patient-homme" />
                          <Label htmlFor="patient-homme">Homme</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div>
                      <Label>Mobilité :</Label>
                      <RadioGroup
                        value={formData.mobility}
                        onValueChange={(value) => setFormData({ ...formData, mobility: value })}
                        className="space-y-2 mt-2"
                      >
                        {["Adulte", "Personne Agée", "Autonome", "Besoin d'aide", "Alité(e)"].map((mob) => (
                          <div key={mob} className="flex items-center space-x-2">
                            <RadioGroupItem value={mob} id={`mob-${mob}`} />
                            <Label htmlFor={`mob-${mob}`}>{mob}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    <div>
                      <Label>Pathologie / problème de santé principal :</Label>
                      <Textarea
                        value={formData.healthIssues}
                        onChange={(e) => setFormData({ ...formData, healthIssues: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold bg-primary text-white p-3 rounded-lg mb-4">
                      Tâches à effectuer
                    </h3>
                    <div className="space-y-3 p-4 bg-muted/30 rounded">
                      {[
                        { key: "cases", label: "Cases à cocher" },
                        { key: "surveillance", label: "Surveillance générale / présence rassurante" },
                        { key: "aideToilette", label: "Aide à la toilette" },
                        { key: "aideHabillage", label: "Aide à l'habillage" },
                        { key: "preparerRepas", label: "Préparer repas" },
                        { key: "aideAlimentation", label: "Aide à l'alimentation" },
                        { key: "priseMedicaments", label: "Prise de médicaments (sur ordonnance)" },
                        { key: "accompagnementRDV", label: "Accompagnement aux RDV médicaux" },
                        { key: "entretenirLinge", label: "Entretenir le linge" },
                        { key: "menageLeger", label: "Ménage léger (pièce du malade, linge, etc.)" },
                        { key: "autre", label: "Autre(s) :" }
                      ].map((task) => (
                        <div key={task.key} className="flex items-center space-x-2">
                          <Checkbox
                            id={`task-${task.key}`}
                            checked={formData.careTasks[task.key as keyof typeof formData.careTasks]}
                            onCheckedChange={(checked) =>
                              setFormData({
                                ...formData,
                                careTasks: { ...formData.careTasks, [task.key]: checked }
                              })
                            }
                          />
                          <Label htmlFor={`task-${task.key}`}>{task.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold bg-primary text-white p-3 rounded-lg mb-4">
                      Vous souhaitez une personne...
                    </h3>
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded">
                      <Label htmlFor="overnight">Couchante</Label>
                      <Switch
                        id="overnight"
                        checked={formData.isOvernight}
                        onCheckedChange={(checked) => setFormData({ ...formData, isOvernight: checked })}
                      />
                      <Label htmlFor="overnight">Non couchante</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold bg-primary text-white p-3 rounded-lg mb-4">
                    Planning pour cette Garde ponctuelle
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
                          <RadioGroupItem value="morning" id="garde-morning" />
                          <Label htmlFor="garde-morning">Le matin (09h 00 - 12h 00)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="afternoon" id="garde-afternoon" />
                          <Label htmlFor="garde-afternoon">L'après midi (13h 00 - 18h 00)</Label>
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

                  <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-4 text-center">Nombre de jour</h4>
                    <div className="flex items-center justify-center gap-4 p-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                        onClick={decrementDays}
                      >
                        -
                      </Button>
                      <span className="text-xl font-semibold min-w-[60px] text-center">
                        {formData.numberOfDays} jour
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                        onClick={incrementDays}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold bg-primary text-white p-3 rounded-lg mb-4">
                    Autre précision
                  </h3>
                  <Textarea
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    className="p-4"
                    rows={4}
                  />
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

                <div className="text-center pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="px-12 bg-primary hover:bg-primary/90 text-white"
                  >
                    Confirmer ma réservation
                  </Button>
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

export default GardeMalade;
