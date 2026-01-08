import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createWhatsAppLink, formatContactMessage } from "@/lib/whatsapp";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        whatsappNumber: "",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const whatsappMessage = formatContactMessage(formData);
        const whatsappLink = createWhatsAppLink("212600000000", whatsappMessage); // Target number
        window.open(whatsappLink, "_blank");
        toast.success("Votre message a été préparé pour WhatsApp.");
    };

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-primary/5 py-16 px-4">
                    <div className="container max-w-5xl text-center">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-primary mb-6">Contactez-nous</h1>
                        <p className="text-xl md:text-2xl font-bold text-slate-800 mb-4 max-w-3xl mx-auto">
                            Nous sommes à votre écoute
                        </p>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Pour toute question, demande de devis personnalisé ou information complémentaire,
                            n'hésitez pas à nous envoyer un message.
                        </p>
                    </div>
                </section>

                {/* Form Section */}
                <section className="py-16 px-4 bg-slate-50">
                    <div className="container max-w-4xl">
                        <div className="bg-white p-6 md:p-12 rounded-3xl shadow-xl border border-slate-100">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-bold text-slate-800 mb-2">Ecrivez-nous</h2>
                                <p className="text-slate-500">Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="font-semibold text-slate-700">Nom*</Label>
                                        <Input
                                            id="name"
                                            required
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="border-slate-200 h-12 rounded-xl focus:ring-primary focus:border-primary transition-all"
                                            placeholder="Votre nom"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="font-semibold text-slate-700">Email*</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            className="border-slate-200 h-12 rounded-xl focus:ring-primary focus:border-primary transition-all"
                                            placeholder="votre@email.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="font-semibold text-slate-700">Numéro de téléphone*</Label>
                                        <div className="flex gap-3">
                                            <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-600 flex items-center shrink-0">
                                                +212
                                            </div>
                                            <Input
                                                id="phone"
                                                required
                                                placeholder="6XXXXXXXX"
                                                value={formData.phoneNumber}
                                                onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                                                className="border-slate-200 h-12 rounded-xl focus:ring-primary focus:border-primary transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="whatsapp" className="font-semibold text-slate-700">Numéro whatsapp</Label>
                                        <div className="flex gap-3">
                                            <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-600 flex items-center shrink-0">
                                                +212
                                            </div>
                                            <Input
                                                id="whatsapp"
                                                placeholder="6XXXXXXXX"
                                                value={formData.whatsappNumber}
                                                onChange={e => setFormData({ ...formData, whatsappNumber: e.target.value })}
                                                className="border-slate-200 h-12 rounded-xl focus:ring-primary focus:border-primary transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message" className="font-semibold text-slate-700">Message*</Label>
                                    <Textarea
                                        id="message"
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                        className="border-slate-200 rounded-2xl resize-none focus:ring-primary focus:border-primary transition-all p-4"
                                        placeholder="Comment pouvons-nous vous aider ?"
                                    />
                                </div>

                                <div className="flex justify-center pt-6">
                                    <Button
                                        type="submit"
                                        className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-base font-bold shadow-lg shadow-primary/20 h-auto rounded-full w-full md:w-auto md:min-w-[250px] transition-all hover:scale-105 active:scale-95"
                                    >
                                        Envoyez
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Contact;
