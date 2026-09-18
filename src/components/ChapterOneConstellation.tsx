import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Star, Heart, CheckCircle2 } from 'lucide-react';
import { romanticAudio } from '../utils/audioSynthesizer';

interface StarThought {
  id: number;
  thought: string;
  sub: string;
  x: number; // percentage
  y: number; // percentage
  size: number;
}

const STAR_THOUGHTS: StarThought[] = [
  { id: 1, thought: "tumhari smile >>>", sub: "literally fixed my entire bad mood yesterday.", x: 20, y: 22, size: 24 },
  { id: 2, thought: "favorite notification: YOU", sub: "screen light up hote hi smile aa jaati hai.", x: 80, y: 20, size: 24 },
  { id: 3, thought: "gussa bhi cute lagta hai tumhara 😭", sub: "matlab koshish karti ho dangerous dikhne ki, but failed.", x: 50, y: 44, size: 28 },
  { id: 4, thought: "haan haan, bohot pyaari ho.", sub: "ab zyada hawa mein mat udna please.", x: 22, y: 72, size: 22 },
  { id: 5, thought: "don't let this compliment go to your head.", sub: "par sach mein... there's no one like you.", x: 78, y: 70, size: 22 },
  { id: 6, thought: "okay fine, you deserve it.", sub: "the world's most special Kuchuu award goes to you.", x: 50, y: 75, size: 24 }
];

export const ChapterOneConstellation: React.FC = () => {
  const [activeStar, setActiveStar] = useState<StarThought | null>(STAR_THOUGHTS[0]);
  const [discoveredStars, setDiscoveredStars] = useState<number[]>([1]);

  const handleStarClick = (star: StarThought) => {
    romanticAudio.playChime();
    setActiveStar(star);
    if (!discoveredStars.includes(star.id)) {
      setDiscoveredStars(prev => [...prev, star.id]);
    }
  };

  const allDiscovered = discoveredStars.length === STAR_THOUGHTS.length;

  return (
    <div id="constellation" className="w-full h-full flex flex-col justify-between items-center text-center px-3 sm:px-4 py-1 select-none">
      {/* Intro text */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-1 max-w-lg mx-auto"
      >
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#EADFD5]/60 text-[11px] font-mono text-[#6E5A4E]">
          <Sparkles className="w-3 h-3 text-[#D9777F]" />
          <span>Chapter 01 • The Cosmic Odds</span>
        </span>

        <h2 className="font-serif text-2xl sm:text-3xl text-[#4A3B32] font-medium leading-tight">
          Ek cheez samajh nahi aati...
        </h2>
        <p className="font-handwriting text-xl sm:text-2xl text-[#C85A66] leading-none">
          "itne saare logon mein... tum hi kyun?"
        </p>

        <p className="text-xs sm:text-sm text-[#6E5A4E] leading-relaxed max-w-sm mx-auto px-2">
          Maybe coincidence. Maybe meri kismat ko kuch toh sahi karna tha. <span className="font-handwriting text-[#D9777F] text-base">Best accident ever.</span>
        </p>
      </motion.div>

      {/* Interactive Constellation Sky Container */}
      <div className="w-full max-w-md mx-auto relative my-auto">
        <div className="text-[11px] font-mono text-[#6E5A4E] mb-1.5 flex items-center justify-between px-2">
          <span>✨ Tap each glowing star:</span>
          <span className={`font-semibold flex items-center space-x-1 ${allDiscovered ? 'text-[#3E7B54]' : 'text-[#D9777F]'}`}>
            {allDiscovered && <CheckCircle2 className="w-3 h-3 inline text-[#3E7B54]" />}
            <span>{discoveredStars.length}/{STAR_THOUGHTS.length} revealed</span>
          </span>
        </div>

        {/* Sky Box: Clear and unobstructed */}
        <div className="relative w-full h-[190px] sm:h-[220px] rounded-2xl starry-sky p-3 shadow-lg border border-[#4A3B32]/15 overflow-hidden">
          {/* Ambient starlight dust */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(232,180,184,0.18)_0%,transparent_60%)] pointer-events-none" />

          {/* Constellation SVG lines linking the stars */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
            <polyline
              points={`${STAR_THOUGHTS[0].x}%,${STAR_THOUGHTS[0].y}% ${STAR_THOUGHTS[2].x}%,${STAR_THOUGHTS[2].y}% ${STAR_THOUGHTS[1].x}%,${STAR_THOUGHTS[1].y}% ${STAR_THOUGHTS[4].x}%,${STAR_THOUGHTS[4].y}% ${STAR_THOUGHTS[5].x}%,${STAR_THOUGHTS[5].y}% ${STAR_THOUGHTS[3].x}%,${STAR_THOUGHTS[3].y}% ${STAR_THOUGHTS[0].x}%,${STAR_THOUGHTS[0].y}%`}
              fill="none"
              stroke="#F7D6C8"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />
          </svg>

          {/* Render interactive stars (No popups inside here, all stars 100% clickable!) */}
          {STAR_THOUGHTS.map((star) => {
            const isSelected = activeStar?.id === star.id;
            const isDiscovered = discoveredStars.includes(star.id);

            return (
              <button
                key={star.id}
                id={`constellation-star-${star.id}`}
                onClick={() => handleStarClick(star)}
                style={{ left: `${star.x}%`, top: `${star.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full group focus:outline-none z-10 transition-transform duration-300 active:scale-90"
                title={`Star ${star.id}: Click to reveal`}
              >
                <motion.div
                  animate={isSelected ? { scale: [1, 1.25, 1] } : { scale: [1, 1.12, 1] }}
                  transition={{ repeat: Infinity, duration: isSelected ? 1.6 : 3 }}
                  className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#FAF7F2] text-[#C85A66] shadow-[0_0_20px_#FAF7F2]'
                      : isDiscovered
                      ? 'bg-[#F7D6C8] text-[#4A3B32] shadow-[0_0_12px_#F7D6C8]'
                      : 'bg-[#FFFDF9]/60 text-[#FAF7F2] hover:bg-[#FAF7F2]'
                  }`}
                  style={{ width: `${star.size}px`, height: `${star.size}px` }}
                >
                  <Star className={`w-3 h-3 ${isSelected ? 'fill-[#C85A66]' : isDiscovered ? 'fill-[#4A3B32]' : ''}`} />
                </motion.div>

                {/* Pulsing ring around active star */}
                {isSelected && (
                  <motion.div
                    layoutId="activeStarRing"
                    className="absolute inset-0 rounded-full border border-[#FAF7F2]/70 animate-ping pointer-events-none"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Revealed Thought Card: Positioned OUTSIDE & BELOW the sky box so it NEVER covers any star */}
        <div className="w-full mt-2 min-h-[58px]">
          <AnimatePresence mode="wait">
            {activeStar && (
              <motion.div
                key={activeStar.id}
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="p-2.5 sm:p-3 rounded-xl bg-[#231E2D] border border-[#E8B4B8]/30 text-left shadow-lg flex items-center space-x-2.5"
              >
                <div className="p-1.5 rounded-full bg-[#E8B4B8]/20 text-[#E8B4B8] shrink-0">
                  <Heart className="w-3.5 h-3.5 fill-[#E8B4B8]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-handwriting text-lg sm:text-xl text-[#FAF7F2] leading-tight">
                    "{activeStar.thought}"
                  </p>
                  <p className="text-[11px] font-sans text-[#D3C5B8] leading-tight mt-0.5">
                    {activeStar.sub}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="text-[11px] font-handwriting text-[#D9777F] italic pt-1">
        tap any star to read my mind ✨
      </div>
    </div>
  );
};
