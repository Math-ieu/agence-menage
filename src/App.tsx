import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Entreprise from "./pages/Entreprise";
import NotFound from "./pages/NotFound";
import MenageRegulier from "./pages/services/MenageRegulier";
import GrandMenage from "./pages/services/GrandMenage";
import GardeMalade from "./pages/services/GardeMalade";
import MenageBureaux from "./pages/services/MenageBureaux";
import GrandMenageBureaux from "./pages/services/GrandMenageBureaux";
import MenageDemenagement from "./pages/services/MenageDemenagement";
import MenageAirbnb from "./pages/services/MenageAirbnb";
import MenageFinChantier from "./pages/services/MenageFinChantier";
import MenageFinChantierEntreprise from "./pages/services/MenageFinChantierEntreprise";
import PlacementEntreprise from "./pages/services/PlacementEntreprise";
import EspaceEmploye from "./pages/EspaceEmploye";
import Contact from "./pages/Contact";
import { Analytics } from "@vercel/analytics/react"
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppSidebar from "./components/WhatsAppSidebar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <WhatsAppSidebar />
        <Analytics />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/entreprise" element={<Entreprise />} />
          <Route path="/espace-employe" element={<EspaceEmploye />} />
          <Route path="/contact" element={<Contact />} />

          {/* Particulier Services */}
          <Route path="/services/particulier/menage-standard" element={<MenageRegulier />} />
          <Route path="/services/particulier/grand-menage" element={<GrandMenage />} />
          <Route path="/services/particulier/menage-demenagement" element={<MenageDemenagement />} />
          <Route path="/services/particulier/menage-airbnb" element={<MenageAirbnb />} />
          <Route path="/services/particulier/menage-fin-chantier" element={<MenageFinChantier />} />
          <Route path="/services/particulier/garde-malade" element={<GardeMalade />} />

          {/* Entreprise Services */}
          <Route path="/services/entreprise/menage-bureaux" element={<MenageBureaux />} />
          <Route path="/services/entreprise/grand-menage-bureaux" element={<GrandMenageBureaux />} />
          <Route path="/services/entreprise/menage-fin-chantier" element={<MenageFinChantierEntreprise />} />
          <Route path="/services/entreprise/placement" element={<PlacementEntreprise />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
