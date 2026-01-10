import React from "react";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesGrid from "@/components/ServicesGrid";
import AboutSection from "@/components/AboutSection";
import BookingSteps from "@/components/BookingSteps";
import TeamReviews from "@/components/TeamReviews";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";

const Entreprise = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesGrid type="entreprise" />
        <AboutSection />
        <BookingSteps />
        <WhyChooseUs />
        <TeamReviews />
      </main>
      <Footer />
    </div>
  );
};

export default Entreprise;
