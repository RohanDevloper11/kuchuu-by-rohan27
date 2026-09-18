import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { romanticAudio } from '../utils/audioSynthesizer';

interface OpeningSequenceProps {
  onEnter: () => void;
  herName: string;
  onStartMusic: () => Promise<boolean>;
  musicError: string | null;
}

export const OpeningSequence: React.FC<OpeningSequenceProps> = ({ onEnter, herName, onStartMusic, musicError }) => {
  const [step, setStep] = useState(0);
  const [isLoadingMusic, setIsLoadingMusic] = useState(false);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    // Smooth, cinematic progressive typing/reveal steps
    timers.push(setTimeout(() => setStep(1), 1200)); // "psst..."
    timers.push(setTimeout(() => setStep(2), 2600)); // "Vanshika?"
    timers.push(setTimeout(() => setStep(3), 4200)); // "Kuchuu?"
    timers.push(setTimeout(() => setStep(4), 5800)); // "haan tum hi. (doodle)"
    timers.push(setTimeout(() => setStep(5), 7600)); // "Ek chhoti si cheez banayi hai..."
    timers.push(setTimeout(() => setStep(6), 9400)); // "Thodi cute hai. Thodi stupid hai. Thodi si meri hai."
    timers.push(setTimeout(() => setStep(7), 11600)); // "Actually... puri ki puri tumhari hai."
    timers.push(setTimeout(() => setStep(8), 13200)); // Music invitation card appears

    return () => {
      timers.forEach(t => clearTimeout(t));
    };
  }, []);

  const handleSkipOrFastForward = () => {
    if (step < 8) {
      setStep(8);
    }
  };

  const handleStartWithMusic = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoadingMusic(true);
    romanticAudio.playChime();
    await onStartMusic();
    setIsLoadingMusic(false);
    onEnter();
  };

  const handleSkipMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    romanticAudio.playPop();
    onEnter();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#121016] text-[#FAF7F2] flex flex-col items-center justify-center px-6 selection:bg-[#E8B4B8]/30 cursor-pointer select-none"
      onClick={handleSkipOrFastForward}
    >
      {/* Subtle background ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,180,184,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Floating stardust dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#FFFDF9]"
            style={{
              width: (i % 3) + 2 + 'px',
              height: (i % 3) + 2 + 'px',
              left: `${(i * 19) % 95}%`,
              top: `${(i * 27) % 90}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-md w-full text-center flex flex-col items-center space-y-6 z-10" onClick={(e) => e.stopPropagation()}>
        {/* The tiny glowing point */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-2.5 h-2.5 rounded-full bg-[#E8B4B8] soft-glow-pink mb-4"
        />

        <div className="min-h-[220px] flex flex-col items-center justify-center space-y-4">
          <AnimatePresence mode="wait">
            {step >= 1 && (
              <motion.p
                key="psst"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-handwriting text-2xl text-[#E8B4B8]/90 tracking-wide"
              >
                psst...
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step >= 2 && (
              <motion.h1
                key="name"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9 }}
                className="font-serif text-3xl sm:text-4xl text-[#FAF7F2] font-normal tracking-wide"
              >
                {herName}?
              </motion.h1>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step >= 3 && (
              <motion.div
                key="kuchuu"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-handwriting text-3xl text-[#F7D6C8] italic"
              >
                Kuchuu?
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step >= 4 && (
              <motion.div
                key="haan"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="flex items-center space-x-2 text-sm font-sans text-[#D3C5B8] tracking-wider uppercase pt-1"
              >
                <span>haan tum hi</span>
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  (⁠◜⁠‿⁠◝⁠)⁠♡
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step >= 5 && (
              <motion.div
                key="smallthing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-base text-[#FAF7F2]/90 font-sans font-light leading-relaxed pt-3"
              >
                Ek chhoti si cheez banayi hai tumhare liye.
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step >= 6 && (
              <motion.div
                key="descriptions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="font-handwriting text-xl sm:text-2xl text-[#E8B4B8] space-y-1"
              >
                <p>Thodi cute hai.</p>
                <p>Thodi stupid hai.</p>
                <p>Thodi si meri hai.</p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step >= 7 && (
              <motion.div
                key="actually"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="pt-2"
              >
                <p className="text-xs text-[#A89F95] font-sans tracking-widest uppercase">Actually...</p>
                <p className="font-serif text-2xl sm:text-3xl text-[#FFFDF9] italic font-normal mt-1">
                  puri ki puri tumhari hai.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Romantic Music Invitation */}
        <AnimatePresence>
          {step >= 8 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="pt-3 max-w-xs mx-auto space-y-3"
            >
              <div className="space-y-1 text-center">
                <p className="text-xs sm:text-sm font-handwriting text-[#FAF7F2]/90 text-lg">
                  Ek chhoti si request, Kuchuu... 🤍
                </p>
                <p className="font-serif italic text-base sm:text-lg text-[#E8B4B8]">
                  Music on karogi?
                </p>
              </div>

              {/* Music Start Button */}
              <div className="flex flex-col items-center space-y-2 pt-1">
                <button
                  id="music-start-invitation-btn"
                  onClick={handleStartWithMusic}
                  disabled={isLoadingMusic}
                  className="group relative inline-flex items-center justify-center space-x-3 px-8 py-3.5 rounded-full bg-[#FAF7F2] text-[#1B1824] font-medium text-sm hover:bg-[#E8B4B8] hover:text-[#1B1824] transition-all duration-300 shadow-xl shadow-[#E8B4B8]/25 active:scale-95 cursor-pointer"
                >
                  <span className="font-sans text-base">haan, chalao 🎧</span>
                  <Sparkles className="w-4 h-4 text-[#C85A66] animate-pulse group-hover:rotate-12 transition-transform" />
                </button>

                {/* Soft option to enter without sound if needed */}
                <button
                  id="enter-silent-btn"
                  onClick={handleSkipMusic}
                  className="text-[11px] font-sans text-[#A89F95] hover:text-[#FAF7F2] transition-colors pt-1 underline underline-offset-4 decoration-[#A89F95]/40 cursor-pointer"
                >
                  (ya bina music ke andar aana hai →)
                </button>
              </div>

              {/* User-friendly audio error notice if browser or device blocked */}
              {musicError && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-2 rounded-xl bg-red-900/30 border border-red-500/30 text-[11px] text-[#F7D6C8] text-center font-sans"
                >
                  Music nahi chala 😭<br />
                  Tap karke ek baar aur try karo.
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Soft tap hint if waiting */}
        {step < 8 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 3 }}
            className="text-[11px] text-[#A89F95] font-sans tracking-wide pt-4"
          >
            (tap anywhere to skip ahead)
          </motion.p>
        )}
      </div>
    </div>
  );
};
