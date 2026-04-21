import { useState } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import PainPointsSection from '@/components/PainPointsSection';
import WhyPhysioMantraSection from '@/components/WhyPhysioMantraSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import CoverageSection from '@/components/CoverageSection';
import PricingSection from '@/components/PricingSection';
import FinalCTASection from '@/components/FinalCTASection';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPainArea, setSelectedPainArea] = useState<string | undefined>();

  const handleOpenModal = () => {
    setSelectedPainArea(undefined);
    setIsModalOpen(true);
  };

  const handlePainAreaSelect = (area: string) => {
    setSelectedPainArea(area);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onOpenModal={handleOpenModal} />
      <HeroSection onOpenModal={handleOpenModal} />
      <PainPointsSection onSelectPainArea={handlePainAreaSelect} />
      <WhyPhysioMantraSection />
      <HowItWorksSection />
      <CoverageSection />
      <PricingSection onOpenModal={handleOpenModal} />
      <FinalCTASection onOpenModal={handleOpenModal} />
      <Footer />
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        preselectedPainArea={selectedPainArea}
      />
    </div>
  );
};

export default Index;
