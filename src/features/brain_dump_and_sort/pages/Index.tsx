import BrainDumpApp from "../components/BrainDumpApp";
import { PremiumLayout } from "../../../components/shared/PremiumLayout";

const Index = () => {
  return (
    <PremiumLayout title="Brain Dump & Sort">
      <div className="w-full">
        <BrainDumpApp />
      </div>
    </PremiumLayout>
  );
};

export default Index;
