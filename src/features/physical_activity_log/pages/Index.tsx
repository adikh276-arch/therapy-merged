import TrackActivitySection from "../components/TrackActivitySection";
import LanguageSelector from "../components/LanguageSelector";

const Index = () => {
  return (
    <main className="min-h-screen bg-background relative">
      <LanguageSelector />
      <TrackActivitySection />
    </main>
  );
};

export default Index;
