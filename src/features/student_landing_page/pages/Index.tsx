import { useState } from "react";
import Hero from "@/components/Hero";
import WhatYouDo from "@/components/WhatYouDo";
import WhoCanApply from "@/components/WhoCanApply";
import Earnings from "@/components/Earnings";
import TrainingSupport from "@/components/TrainingSupport";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ApplicationModal from "@/components/ApplicationModal";

import Navbar from "@/components/Navbar";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <Navbar onApplyClick={() => setIsModalOpen(true)} />
      <Hero onApplyClick={() => setIsModalOpen(true)} />
      <WhatYouDo />
      <WhoCanApply />
      <Earnings />
      <TrainingSupport />
      <HowItWorks />
      <FAQ />
      <FinalCTA onApplyClick={() => setIsModalOpen(true)} />
      <Footer />
      <ApplicationModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </main>
  );
};

export default Index;
