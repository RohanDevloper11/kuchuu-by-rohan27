import React from 'react';
import { motion } from 'motion/react';
import { Heart, Star, RotateCcw } from 'lucide-react';
import { romanticAudio } from '../utils/audioSynthesizer';

interface FooterSectionProps {
  onSecretStarClick: () => void;
  onRestartStory?: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onSecretStarClick, onRestartStory }) => {
  return (
    <div className="w-full h-full flex flex-col justify-between items-center text-center px-4 sm:px-6 py-2 select-none">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-1 max-w-md mx-auto"
      >
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#F4DCD6]/70 text-[11px] font-mono text-[#6E5A4E]">
          <Heart className="w-3 h-3 text-[#D9777F]" />
          <span>Epilogue • Infinite Universe</span>
        </span>
      </motion.div>

      {/* Centered Epilogue Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-sm w-full mx-auto p-6 sm:p-7 rounded-3xl bg-[#FFFDF9]/90 border border-[#E8B4B8] polaroid-shadow paper-pattern space-y-4 my-auto relative text-center"
      >
        {/* Soft icon cluster */}
        <div className="flex items-center justify-center space-x-2 text-[#D9777F]">
          <Heart className="w-4 h-4 fill-[#D9777F]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8B4B8]" />
          <Heart className="w-3.5 h-3.5 fill-[#E8B4B8]" />
        </div>

        <div className="space-y-1">
          <p className="font-handwriting text-2xl text-[#D9777F] leading-tight">
            "Bas aise hi rehna mere saath, Kuchuu."
          </p>
        </div>

        <p className="text-xs font-sans text-[#6E5A4E] max-w-xs mx-auto leading-relaxed pt-1">
          made with love by Rohan ❤️
        </p>

        {/* Secret 4: The hidden golden star */}
        <div className="pt-2 flex flex-col items-center justify-center space-y-1">
          <button
            id="hidden-star-easter-egg-btn"
            onClick={onSecretStarClick}
            className="p-2 text-[#F6D6AC] hover:text-[#D9777F] transition-colors group"
            title="A tiny mysterious celestial sparkle..."
          >
            <Star className="w-5 h-5 fill-[#F6D6AC] hover:fill-[#D9777F] group-hover:scale-125 transition-transform" />
          </button>
          <span className="text-[10px] font-mono text-[#A89F95]">
            (tap the little golden star...)
          </span>
        </div>

        {/* Restart Story button */}
        {onRestartStory && (
          <div className="pt-3 border-t border-[#EADFD5]">
            <button
              onClick={() => {
                romanticAudio.playPop();
                onRestartStory();
              }}
              className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E8B4B8] text-xs font-mono text-[#6E5A4E] hover:text-[#D9777F] hover:bg-[#F4DCD6]/30 transition-all active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#D9777F]" />
              <span>restart the journey</span>
            </button>
          </div>
        )}

        <p className="text-[10px] font-mono text-[#A89F95]">
          Vanshika Universe • v1.0 forever
        </p>
      </motion.div>

      <div className="text-[11px] font-handwriting text-[#6E5A4E] pt-0.5">
        (hamesha ke liye reserved)
      </div>
    </div>
  );
};
