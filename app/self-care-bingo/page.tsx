'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation, I18nextProvider } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RefreshCw, Check, Sparkles, Award, Moon, Coffee, PhoneOff, Bath, Wind, Activity, Music, MessageCircle, FileText, Book, Smile, Droplets, Phone, Utensils, TreePine, Star, Trash2, Palette, Flower2, Sunset, SmilePlus, Bed, Music4 } from "lucide-react";
import i18n, { loadLocale } from './i18n';
import { PremiumLayout } from '@/components/shared/PremiumLayout';
import { PremiumIntro } from '@/components/shared/PremiumIntro';
import { PremiumComplete } from '@/components/shared/PremiumComplete';

interface Tile {
  emoji?: string;
  icon?: React.ReactNode;
  translationKey: string;
  defaultText: string;
}

const BINGO_TILES: Tile[] = [
  { icon: <Activity className="w-5 h-5" />, translationKey: "tiles.walk", defaultText: "Take a Walk" },
  { icon: <Droplets className="w-5 h-5" />, translationKey: "tiles.water", defaultText: "Drink Water" },
  { icon: <Phone className="w-5 h-5" />, translationKey: "tiles.friend", defaultText: "Call a Friend" },
  { icon: <FileText className="w-5 h-5" />, translationKey: "tiles.gratitudes", defaultText: "Write Gratitudes" },
  { icon: <Moon className="w-5 h-5" />, translationKey: "tiles.nap", defaultText: "Power Nap" },
  { icon: <Activity className="w-5 h-5" />, translationKey: "tiles.stretch", defaultText: "Gentle Stretching" },
  { icon: <Utensils className="w-5 h-5" />, translationKey: "tiles.cook", defaultText: "Cook Healthy Meal" },
  { icon: <Music className="w-5 h-5" />, translationKey: "tiles.music", defaultText: "Listen to Music" },
  { icon: <Wind className="w-5 h-5" />, translationKey: "tiles.breathing", defaultText: "Deep Breathing" },
  { icon: <Book className="w-5 h-5" />, translationKey: "tiles.read", defaultText: "Read a Book" },
  { icon: <Bath className="w-5 h-5" />, translationKey: "tiles.bath", defaultText: "Warm Bath" },
  { icon: <TreePine className="w-5 h-5" />, translationKey: "tiles.journal", defaultText: "Nature Journaling" },
  { icon: <Star className="w-5 h-5" />, translationKey: "tiles.free_space", defaultText: "FREE SPACE" },
  { icon: <Trash2 className="w-5 h-5" />, translationKey: "tiles.declutter", defaultText: "Declutter Room" },
  { icon: <Palette className="w-5 h-5" />, translationKey: "tiles.recipe", defaultText: "Creative Hobbies" },
  { icon: <Flower2 className="w-5 h-5" />, translationKey: "tiles.meditation", defaultText: "Meditation" },
  { icon: <Smile className="w-5 h-5" />, translationKey: "tiles.mask", defaultText: "Skincare Mask" },
  { icon: <PhoneOff className="w-5 h-5" />, translationKey: "tiles.unplug", defaultText: "Unplug Tech" },
  { icon: <MessageCircle className="w-5 h-5" />, translationKey: "tiles.compliment", defaultText: "Give Compliment" },
  { icon: <Sunset className="w-5 h-5" />, translationKey: "tiles.sunset", defaultText: "Watch Sunset" },
  { icon: <SmilePlus className="w-5 h-5" />, translationKey: "tiles.smile", defaultText: "Smile at Mirror" },
  { icon: <Coffee className="w-5 h-5" />, translationKey: "tiles.kindness", defaultText: "Kind Act" },
  { icon: <Bed className="w-5 h-5" />, translationKey: "tiles.sleep", defaultText: "Sleep 8 Hours" },
  { icon: <Activity className="w-5 h-5" />, translationKey: "tiles.yoga", defaultText: "10m Yoga Flow" },
  { icon: <Music4 className="w-5 h-5" />, translationKey: "tiles.dance", defaultText: "Freestyle Dance" },
];

const BINGO_LETTERS = [
  { letter: "B", color: "text-rose-500 bg-rose-50 " },
  { letter: "I", color: "text-blue-500 bg-blue-50 " },
  { letter: "N", color: "text-amber-500 bg-amber-50 " },
  { letter: "G", color: "text-emerald-500 bg-emerald-50 " },
  { letter: "O", color: "text-indigo-500 bg-indigo-50 " },
];

const WINNING_LINES = [
  // rows
  [0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 17, 18, 19], [20, 21, 22, 23, 24],
  // cols
  [0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22], [3, 8, 13, 18, 23], [4, 9, 14, 19, 24],
  // diagonals
  [0, 6, 12, 18, 24], [4, 8, 12, 16, 20],
];

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  angle: number;
  speed: number;
  rotation: number;
}

function SelfCareBingoInner() {
  const { t } = useTranslation(undefined, { i18n });
  const [screen, setScreen] = useState<'intro' | 'board' | 'win'>('intro');
  const [completed, setCompleted] = useState<Set<number>>(() => new Set([12])); // FREE SPACE
  const [wonLines, setWonLines] = useState<Set<number>>(() => new Set());
  const [confettiParticles, setConfettiParticles] = useState<Particle[]>([]);

  // Sync lang URL parameter
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      loadLocale(lang);
    }
  }, []);

  // Zero-Dependency Canvas/State Confetti Explosion Emitter
  const triggerConfetti = useCallback(() => {
    const colors = ['#E11D48', '#2563EB', '#D97706', '#059669', '#4F46E5', '#EC4899'];
    const list: Particle[] = [];
    for (let i = 0; i < 70; i++) {
      list.push({
        id: Math.random(),
        x: Math.random() * 100, // horizontal start percent
        y: -10, // top start offset
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 6,
        angle: Math.random() * 360,
        speed: Math.random() * 4 + 2,
        rotation: Math.random() * 360,
      });
    }
    setConfettiParticles(list);
  }, []);

  // Animate confetti falling
  useEffect(() => {
    if (confettiParticles.length > 0) {
      const interval = setInterval(() => {
        setConfettiParticles((prev) =>
          prev
            .map((p) => ({
              ...p,
              y: p.y + p.speed,
              rotation: p.rotation + 4,
            }))
            .filter((p) => p.y < 110)
        );
      }, 30);
      return () => clearInterval(interval);
    }
  }, [confettiParticles]);

  const handleTileClick = (idx: number) => {
    if (idx === 12) return; // FREE SPACE is locked as completed

    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }

      // Check winning lines
      let wonLineFound = false;
      const updatedWonLines = new Set<number>();
      WINNING_LINES.forEach((line, lineIdx) => {
        if (line.every((pos) => next.has(pos))) {
          updatedWonLines.add(lineIdx);
          wonLineFound = true;
        }
      });

      if (wonLineFound) {
        triggerConfetti();
        // Redirect to win screen after 1.5s delay for confetti appreciation
        setTimeout(() => {
          setScreen('win');
        }, 1500);
      }

      setWonLines(updatedWonLines);
      return next;
    });
  };

  const handleResetBoard = () => {
    setCompleted(new Set([12]));
    setWonLines(new Set());
    setConfettiParticles([]);
    setScreen('board');
  };

  const progress = completed.size;
  const progressPercent = (progress / 25) * 100;

  return (
    <PremiumLayout
      title={t('app_title', 'Self Care Bingo')}
      icon={<Trophy className="w-6 h-6 text-primary animate-pulse" />}
      onBack={screen !== 'intro' ? () => setScreen('intro') : undefined}
      onReset={screen !== 'intro' ? handleResetBoard : undefined}
      exitOnBack={screen === 'intro'}
    >
      {/* Zero-Dependency Floating Confetti Canvas overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
        {confettiParticles.map((p) => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              transform: `rotate(${p.rotation}deg)`,
              borderRadius: p.size % 2 === 0 ? '50%' : '20%',
              transition: 'top 0.03s linear, transform 0.03s linear',
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-xl mx-auto flex flex-col px-3 sm:px-6 py-4 min-h-[70vh] text-center">
        <AnimatePresence mode="wait">
          {/* SCREEN 1: INTRO */}
          {screen === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full flex-1 flex flex-col"
            >
              <PremiumIntro
                title={t('app_title', 'Self Care Bingo')}
                description={t(
                  'app_description',
                  'Play BINGO by logging healthy self-care tasks. Fill a vertical, horizontal, or diagonal line of 5 to win!'
                )}
                onStart={() => setScreen('board')}
                icon={<Sparkles size={32} />}
                benefits={[
                  t('tip1_title', 'Complete daily wellness activities'),
                  t('tip2_title', 'Build positive streaks of self-compassion'),
                ]}
                duration={t('app_duration', 'Ongoing')}
              />
            </motion.div>
          )}

          {/* SCREEN 2: BINGO BOARD */}
          {screen === 'board' && (
            <motion.div
              key="board"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              className="space-y-6 text-left w-full pb-20"
            >
              {/* Progress panel */}
              <div className="bg-white border border-white/60 rounded-[2rem] p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-black text-slate-700 text-xs uppercase tracking-widest">
                    <Trophy size={14} className="text-primary" />
                    {t('activities_logged', 'Tiles Completed')}
                  </div>
                  <span className="text-primary font-black text-base tabular-nums">
                    {progress}
                    <span className="text-slate-300 text-xs">/25</span>
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>

              {/* B-I-N-G-O letters grid */}
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {BINGO_LETTERS.map(({ letter, color }) => (
                  <div
                    key={letter}
                    className={`font-black text-sm py-2.5 rounded-2xl text-center border border-white/60  shadow-sm ${color}`}
                  >
                    {letter}
                  </div>
                ))}
              </div>

              {/* 5x5 Grid */}
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {BINGO_TILES.map((tile, idx) => {
                  const isCompleted = completed.has(idx);
                  const isFreeSpace = idx === 12;
                  const label = t(tile.translationKey, tile.defaultText);

                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTileClick(idx)}
                      className={`relative aspect-square rounded-xl sm:rounded-2xl border flex flex-col items-center justify-center p-1 sm:p-2 text-center transition-all duration-300 group ${
                        isCompleted
                          ? isFreeSpace
                            ? 'bg-gradient-to-r from-primary to-sky-400 border-none border-slate-900 text-white shadow-md'
                            : 'bg-emerald-50  border-emerald-100  text-emerald-600 '
                          : 'bg-white  border-white/60  text-slate-700  hover:border-primary/45 shadow-sm'
                      }`}
                    >
                      <span className="text-xl mb-0.5 group-hover:scale-110 transition-transform">
                        {tile.icon || tile.emoji}
                      </span>
                      <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-tight leading-tight ${
                        isCompleted ? 'opacity-40' : 'opacity-100'
                      }`}>
                        {label}
                      </span>

                      <AnimatePresence>
                        {isCompleted && !isFreeSpace && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-emerald-500 rounded-full flex items-center justify-center text-white border border-white shadow-md"
                          >
                            <Check size={9} strokeWidth={4} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  );
                })}
              </div>

              {/* Reset button */}
              <div className="pt-2">
                <button
                  onClick={handleResetBoard}
                  className="w-full bg-white text-slate-400 py-4.5 rounded-2xl font-black text-base border border-white/60 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <RefreshCw size={18} strokeWidth={3} />
                  {t('new_board', 'Reset Bingo Board')}
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 3: WIN SCREEN */}
          {screen === 'win' && (
            <motion.div
              key="win"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full flex-1 flex flex-col"
            >
              <PremiumComplete
                title={t('app_title', 'Self Care Bingo')}
                message={t(
                  'complete_message',
                  'Congratulations! You aligned an entire row/column/diagonal of positive self-care activities today.'
                )}
                onRestart={handleResetBoard}
                icon={<Award size={48} className="text-primary animate-pulse" />}
                  shareEmoji=""
                  shareContent={"I just completed 'Self-Care Bingo' on TherapyMantra — a guided self-care challenge that genuinely helped me. Try it! \n\n Android: https://play.google.com/store/apps/details?id=org.mantracare.therapy\n iOS: https://apps.apple.com/pk/app/therapymantra/id1607643888"}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PremiumLayout>
  );
}

export default function SelfCareBingoPage() {
  return (
    <I18nextProvider i18n={i18n}>
      <SelfCareBingoInner />
    </I18nextProvider>
  );
}