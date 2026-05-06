import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SavedCollage } from '../SafePlaceApp';

interface Props {
  collage: SavedCollage;
  onClose: () => void;
}

const DURATIONS = [
  { label: '1 min', seconds: 60 },
  { label: '3 min', seconds: 180 },
  { label: '5 min', seconds: 300 },
];

const PHASES = ['Breathe in', 'Hold', 'Let go'];
const PHASE_DURATIONS = [4000, 4000, 6000]; // ms

const GroundingScreen: React.FC<Props> = ({ collage, onClose }) => {
  const [selectedDuration, setSelectedDuration] = useState(1); // index
  const [isActive, setIsActive] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const phaseTimerRef = useRef<ReturnType<typeof setTimeout>>();

  // Start automatically
  useEffect(() => {
    setIsActive(true);
    const duration = DURATIONS[selectedDuration].seconds * 1000;
    timerRef.current = setTimeout(() => {
      setIsActive(false);
      setIsDone(true);
    }, duration);

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [selectedDuration]);

  // Phase cycling
  useEffect(() => {
    if (!isActive) return;

    const cyclePhase = (idx: number) => {
      setPhaseIndex(idx);
      phaseTimerRef.current = setTimeout(() => {
        cyclePhase((idx + 1) % 3);
      }, PHASE_DURATIONS[idx]);
    };

    cyclePhase(0);
    return () => { if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current); };
  }, [isActive]);

  const handleDurationChange = (idx: number) => {
    setSelectedDuration(idx);
    setIsDone(false);
    setIsActive(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    // Restart
    setTimeout(() => setIsActive(true), 100);
  };

  return (
    <div
      className="flex flex-col items-center px-6 py-6 relative"
      style={{ minHeight: 600, backgroundColor: '#F4F8F0' }}
    >
      {/* Back button */}
      <button
        onClick={onClose}
        className="absolute top-4 left-4 text-lg font-inter"
        style={{ color: '#888780' }}
      >
        ←
      </button>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-lg font-inter"
        style={{ color: '#B4B2A9' }}
      >
        ×
      </button>

      {/* Header */}
      <h1 className="font-lora font-semibold text-xl mt-6 mb-1" style={{ color: '#2C2C2A' }}>
        You're here. You're safe.
      </h1>
      <p className="font-inter text-[13px] mb-4" style={{ color: '#888780' }}>
        {collage.name}
      </p>

      {/* Collage preview */}
      <img
        src={collage.imageDataURL}
        alt={collage.name}
        className="w-full object-cover rounded-lg mb-6"
        style={{ height: 130, border: '0.5px solid #E9E7E0' }}
      />

      {/* Breathing circles */}
      <div className="relative flex items-center justify-center mb-4" style={{ width: 120, height: 120 }}>
        <div
          className="absolute rounded-full breathe-cycle"
          style={{
            width: 100, height: 100,
            border: '2px solid #5DCAA5', opacity: 0.2,
            inset: 0, margin: 'auto',
          }}
        />
        <div
          className="absolute rounded-full breathe-cycle"
          style={{
            width: 74, height: 74,
            border: '2px solid #5DCAA5', opacity: 0.45,
            inset: 0, margin: 'auto',
            animationDelay: '0.2s',
          }}
        />
        <div
          className="absolute rounded-full breathe-cycle flex items-center justify-center"
          style={{
            width: 48, height: 48,
            border: '2px solid #5DCAA5', opacity: 0.9,
            inset: 0, margin: 'auto',
            animationDelay: '0.4s',
          }}
        >
          <span className="font-lora italic text-[10px] whitespace-nowrap" style={{ color: '#1D9E75' }}>
            {isActive ? PHASES[phaseIndex] : '...'}
          </span>
        </div>
      </div>

      <p className="font-inter text-xs mb-6" style={{ color: '#888780' }}>
        4 · hold · 4 · let go · 6
      </p>

      {/* Duration pills */}
      <div className="flex gap-2 mb-6">
        {DURATIONS.map((d, i) => (
          <button
            key={d.label}
            onClick={() => handleDurationChange(i)}
            className="font-inter text-xs px-4 py-2 rounded-full transition-all"
            style={{
              backgroundColor: i === selectedDuration ? '#E1F5EE' : '#fff',
              border: `0.5px solid ${i === selectedDuration ? '#5DCAA5' : '#D3D1C7'}`,
              color: i === selectedDuration ? '#0F6E56' : '#888780',
            }}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Done message */}
      <AnimatePresence>
        {isDone && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="font-lora italic text-sm text-center"
            style={{ color: '#3B6D11' }}
          >
            Well done for showing up for yourself today.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GroundingScreen;
