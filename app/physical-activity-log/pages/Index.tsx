import TrackActivitySection from "@/app/physical-activity-log/components/TrackActivitySection";
import LanguageSelector from "@/app/physical-activity-log/components/LanguageSelector";

const Index = () => {
  return (
    <main className="min-h-screen bg-background relative">
      <LanguageSelector />
      <TrackActivitySection />
    </main>
  );
};

export default Index;
