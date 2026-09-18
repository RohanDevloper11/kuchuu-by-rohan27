import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';

export const ChapterEightSerious: React.FC = () => {
  return (
    <div id="serious" className="w-full h-full flex flex-col justify-between items-center text-center px-4 sm:px-6 py-2 select-none">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-1 max-w-md mx-auto"
      >
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#F4DCD6]/70 text-[11px] font-mono text-[#6E5A4E]">
          <Heart className="w-3 h-3 text-[#D9777F]" />
          <span>Chapter 08 • Heart to Heart</span>
        </span>
      </motion.div>

      {/* Centered Poetic Heartfelt Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-sm w-full mx-auto p-6 sm:p-8 rounded-3xl bg-[#FFFDF9]/90 border border-[#E8B4B8] polaroid-shadow paper-pattern space-y-4 my-auto relative"
      >
        <div className="w-10 h-10 rounded-full bg-[#F4DCD6]/70 text-[#D9777F] flex items-center justify-center mx-auto border border-[#E8B4B8]/40 shadow-xs">
          <Heart className="w-5 h-5 fill-[#D9777F]" />
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl text-[#4A3B32] font-medium tracking-wide">
          Okay Kuchuu...
        </h2>
        <p className="font-handwriting text-xl text-[#6E5A4E]">
          Ab thodi serious baat.
        </p>

        <div className="pt-2 space-y-2.5 font-sans text-sm sm:text-base text-[#4A3B32] leading-relaxed">
          <p className="text-[#6E5A4E] text-xs sm:text-sm">
            Main shayad har baar properly nahi bol pata...
          </p>
          <p className="font-serif text-xl sm:text-2xl text-[#C85A66] font-semibold">
            But you really matter to me.
          </p>
          <p className="font-handwriting text-2xl text-[#4A3B32]">
            Bahut.
          </p>
          <p className="text-xs text-[#6E5A4E] pt-1">
            Not because of some big dramatic reason.
          </p>
          <p className="font-serif italic text-xl sm:text-2xl text-[#4A3B32]">
            Bas... tum tum ho.
          </p>
          <p className="font-handwriting text-2xl text-[#D9777F] pt-1">
            And somehow... that's more than enough.
          </p>
        </div>
      </motion.div>

      <div className="text-[11px] font-handwriting text-[#6E5A4E] pt-0.5">
        (har ek word sach hai)
      </div>
    </div>
  );
};
