import React, { useState, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { fabric } from 'fabric';
import WelcomeScreen from './screens/WelcomeScreen';
import CanvasScreen from './screens/CanvasScreen';
import NameSaveScreen from './screens/NameSaveScreen';
import GroundingScreen from './screens/GroundingScreen';
import HistoryDrawer from './HistoryDrawer';
import { PremiumLayout } from '../../../components/shared/PremiumLayout';

export interface SavedCollage {
  id: string;
  name: string;
  reflection: string;
  imageDataURL: string;
  date: string;
}

const SafePlaceApp: React.FC = () => {
  const [screen, setScreen] = useState(0); // 0=welcome,1-5=prompts,6=save,7=grounding
  const [showHistory, setShowHistory] = useState(false);
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const [savedCollage, setSavedCollage] = useState<SavedCollage | null>(null);

  const handleSave = useCallback((name: string, reflection: string) => {
    if (!canvasRef.current) return;
    const imageDataURL = canvasRef.current.toDataURL({ format: 'png', quality: 1 });
    const collage: SavedCollage = {
      id: Date.now().toString(),
      name,
      reflection,
      imageDataURL,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('safe-place-collages') || '[]');
    existing.push(collage);
    localStorage.setItem('safe-place-collages', JSON.stringify(existing));
    setSavedCollage(collage);
    setScreen(7);
  }, []);

  const getCanvasDataURL = useCallback(() => {
    if (!canvasRef.current) return '';
    return canvasRef.current.toDataURL({ format: 'png', quality: 1 });
  }, []);

  const reset = () => {
    setScreen(0);
    setSavedCollage(null);
  };

  return (
    <PremiumLayout 
      title="Safe Space Canvas" 
      subtitle={screen > 0 && screen < 6 ? `Step ${screen} of 5` : undefined}
      onBack={screen > 0 ? () => setScreen(0) : undefined}
      onReset={screen > 0 ? reset : undefined}
      showBack={screen === 0}
    >
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {screen === 0 && (
            <motion.div key="welcome" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <WelcomeScreen
                onBegin={() => setScreen(1)}
                onShowHistory={() => setShowHistory(true)}
              />
            </motion.div>
          )}
          {screen >= 1 && screen <= 5 && (
            <motion.div key="canvas" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
              <CanvasScreen
                promptIndex={screen - 1}
                canvasRef={canvasRef}
                onNext={() => setScreen(s => s + 1)}
                onFinish={() => setScreen(6)}
              />
            </motion.div>
          )}
          {screen === 6 && (
            <motion.div key="save" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <NameSaveScreen
                getCanvasDataURL={getCanvasDataURL}
                onSave={handleSave}
              />
            </motion.div>
          )}
          {screen === 7 && savedCollage && (
            <motion.div key="grounding" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <GroundingScreen
                collage={savedCollage}
                onClose={() => setScreen(0)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showHistory && (
        <HistoryDrawer onClose={() => setShowHistory(false)} />
      )}
    </PremiumLayout>
  );
};

export default SafePlaceApp;
