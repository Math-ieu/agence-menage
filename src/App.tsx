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
import { Analytics } from "@vercel/analytics/react"
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Analytics />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/entreprise" element={<Entreprise />} />
          <Route path="/services/menage-standard" element={<MenageRegulier />} />
          <Route path="/services/grand-menage" element={<GrandMenage />} />
          <Route path="/services/garde-malade" element={<GardeMalade />} />
          <Route path="/services/menage-bureaux" element={<MenageBureaux />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
