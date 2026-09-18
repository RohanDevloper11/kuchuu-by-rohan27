import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Music, Cake, Sun, Palette, Compass, HeartHandshake } from 'lucide-react';
import { IfYouWereItem } from '../types';
import { romanticAudio } from '../utils/audioSynthesizer';

interface ChapterSixIfYouWereProps {
  items: IfYouWereItem[];
}

export const ChapterSixIfYouWere: React.FC<ChapterSixIfYouWereProps> = ({ items }) => {
  const [selectedId, setSelectedId] = useState<string>(items[0]?.id || 'dessert');

  const activeItem = items.find(i => i.id === selectedId) || items[0];

  const handleSelect = (id: string) => {
    romanticAudio.playPop();
    setSelectedId(id);
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'song': return <Music className="w-3.5 h-3.5" />;
      case 'dessert': return <Cake className="w-3.5 h-3.5" />;
      case 'season': return <Sun className="w-3.5 h-3.5" />;
      case 'color': return <Palette className="w-3.5 h-3.5" />;
      case 'place': return <Compass className="w-3.5 h-3.5" />;
      case 'constellation': return <Sparkles className="w-3.5 h-3.5" />;
      case 'feeling': return <HeartHandshake className="w-3.5 h-3.5" />;
      default: return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div id="if-you-were" className="w-full h-full flex flex-col justify-between items-center text-center px-3 sm:px-4 py-1 select-none">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-1 max-w-md mx-auto"
      >
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#F4DCD6]/70 text-[11px] font-mono text-[#6E5A4E]">
          <Sparkles className="w-3 h-3 text-[#D9777F]" />
          <span>Chapter 06 • Poetic Metaphors</span>
        </span>

        <h2 className="font-serif text-2xl sm:text-3xl text-[#4A3B32] font-semibold leading-tight">
          Agar tum...
        </h2>
        <p className="font-handwriting text-xl sm:text-2xl text-[#D9777F] leading-none">
          If you were a piece of this universe...
        </p>
      </motion.div>

      {/* Categories Pills */}
      <div className="flex flex-wrap justify-center gap-1.5 max-w-sm py-1">
        {items.map((item) => {
          const isSelected = item.id === selectedId;

          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`px-3 py-1 rounded-full text-xs font-sans transition-all duration-150 flex items-center space-x-1.5 ${
                isSelected
                  ? 'bg-[#E8B4B8] text-[#4A3B32] font-medium shadow-xs scale-105'
                  : 'bg-[#FFFDF9] text-[#6E5A4E] border border-[#EADFD5] hover:bg-[#FAF7F2]'
              }`}
            >
              <span>{getIcon(item.id)}</span>
              <span>{item.category}</span>
            </button>
          );
        })}
      </div>

      {/* Active Answer Reveal Box */}
      <div className="w-full max-w-sm mx-auto relative my-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="p-5 sm:p-6 rounded-2xl bg-[#FFFDF9] border border-[#E8B4B8] polaroid-shadow text-center space-y-3 paper-pattern relative"
          >
            {/* Washi tape */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#F4DCD6]/80 rounded-xs border border-white/60 -rotate-1" />

            <span className="text-[11px] font-mono text-[#6E5A4E] uppercase tracking-wider block">
              If Vanshika was {activeItem.category}...
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#C85A66] font-bold">
              {activeItem.rohanAnswer}
            </h3>

            <p className="font-sans text-xs sm:text-sm text-[#5C4A3E] leading-relaxed max-w-xs mx-auto">
              {activeItem.explanation}
            </p>

            <div className="pt-2 border-t border-[#EADFD5] flex items-center justify-center space-x-1 font-handwriting text-base text-[#D9777F]">
              <span>— Rohan's verdict without a second thought</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="text-[11px] font-handwriting text-[#6E5A4E] pt-0.5">
        (tap each metaphor category above to reveal)
      </div>
    </div>
  );
};
