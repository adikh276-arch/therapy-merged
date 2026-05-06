import React from 'react';
import WelcomeIllustration from '../WelcomeIllustration';
import { PremiumIntro } from '../../../../components/shared/PremiumIntro';
import { Palette, History } from 'lucide-react';

interface Props {
  onBegin: () => void;
  onShowHistory: () => void;
}

const WelcomeScreen: React.FC<Props> = ({ onBegin, onShowHistory }) => (
  <div className="py-6">
    <PremiumIntro
      title="Your safe place is waiting"
      description="Build your own sanctuary through a series of gentle creative prompts. A blank canvas for your thoughts and feelings."
      onStart={onBegin}
      icon={<Palette size={32} />}
      benefits={[
        "Express yourself through color",
        "Create a visual grounding tool",
        "Safe, private, and personal"
      ]}
      duration="10-15 minutes"
    >
      <div className="flex justify-center mb-8">
        <WelcomeIllustration />
      </div>
      <div className="flex justify-center mt-4">
        <button 
          onClick={onShowHistory}
          className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest"
        >
          <History size={16} />
          View Past Collages
        </button>
      </div>
    </PremiumIntro>
  </div>
);

export default WelcomeScreen;
