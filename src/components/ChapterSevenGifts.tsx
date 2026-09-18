import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Heart, Sparkles, Check, ChevronLeft, ChevronRight, PackageOpen } from 'lucide-react';
import { GiftItem } from '../types';
import { romanticAudio } from '../utils/audioSynthesizer';

interface ChapterSevenGiftsProps {
  gifts: GiftItem[];
}

export const ChapterSevenGifts: React.FC<ChapterSevenGiftsProps> = ({ gifts }) => {
  const [currentGiftIndex, setCurrentGiftIndex] = useState(0);
  const [unwrappedIds, setUnwrappedIds] = useState<number[]>([1]);

  const activeGift = gifts[currentGiftIndex] || gifts[0];
  const isOpened = unwrappedIds.includes(activeGift.id);

  const handleUnwrap = (gift: GiftItem) => {
    romanticAudio.playPop();
    if (!unwrappedIds.includes(gift.id)) {
      setUnwrappedIds(prev => [...prev, gift.id]);
    }
    if (gift.id === 6) {
      romanticAudio.playChime();
    }
  };

  const handleNext = () => {
    romanticAudio.playPop();
    const nextIdx = (currentGiftIndex + 1) % gifts.length;
    setCurrentGiftIndex(nextIdx);
    const nextGift = gifts[nextIdx];
    if (!unwrappedIds.includes(nextGift.id)) {
      setUnwrappedIds(prev => [...prev, nextGift.id]);
    }
  };

  const handlePrev = () => {
    romanticAudio.playPop();
    const prevIdx = (currentGiftIndex - 1 + gifts.length) % gifts.length;
    setCurrentGiftIndex(prevIdx);
  };

  return (
    <div id="gifts" className="w-full h-full flex flex-col justify-between items-center text-center px-3 sm:px-4 py-1 select-none">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-1 max-w-md mx-auto"
      >
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#EADFD5]/70 text-[11px] font-mono text-[#6E5A4E]">
          <Gift className="w-3 h-3 text-[#D9777F]" />
          <span>Chapter 07 • Little Vouchers of Love</span>
        </span>

        <h2 className="font-serif text-2xl sm:text-3xl text-[#4A3B32] font-semibold leading-tight">
          Chhote Chhote Gifts
        </h2>
        <p className="font-handwriting text-xl sm:text-2xl text-[#D9777F] leading-none">
          Cozy little promises packaged just for you.
        </p>
      </motion.div>

      {/* Gift Selector Pills */}
      <div className="flex items-center justify-center space-x-1.5 py-1">
        {gifts.map((g, idx) => {
          const isSelected = idx === currentGiftIndex;
          const isUnwrapped = unwrappedIds.includes(g.id);
          return (
            <button
              key={g.id}
              onClick={() => {
                romanticAudio.playPop();
                setCurrentGiftIndex(idx);
                if (!unwrappedIds.includes(g.id)) {
                  setUnwrappedIds(prev => [...prev, g.id]);
                }
              }}
              className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition-all flex items-center space-x-1 ${
                isSelected
                  ? 'bg-[#E8B4B8] text-[#4A3B32] font-bold shadow-xs scale-105'
                  : isUnwrapped
                  ? 'bg-[#FAF7F2] border border-[#E8B4B8]/50 text-[#6E5A4E]'
                  : 'bg-[#FFFDF9] border border-[#EADFD5] text-[#A89F95]'
              }`}
            >
              <span>Box {idx + 1}</span>
              {isUnwrapped && <span className="w-1.5 h-1.5 rounded-full bg-[#D9777F]" />}
            </button>
          );
        })}
      </div>

      {/* Active Gift Presentation Card */}
      <div className="w-full max-w-sm mx-auto relative my-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGift.id}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.25 }}
            className="p-5 sm:p-6 rounded-2xl bg-[#FFFDF9] border border-[#E8B4B8] polaroid-shadow paper-pattern relative text-left"
          >
            {/* Washi ribbon on top */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#E8B4B8]/60 border border-white/80 rounded-xs -rotate-1 z-10" />

            {/* Top metadata */}
            <div className="flex items-center justify-between text-[11px] font-mono text-[#6E5A4E] mb-3 pb-2 border-b border-[#EADFD5]">
              <span className="flex items-center space-x-1 text-[#D9777F] font-bold">
                <PackageOpen className="w-3.5 h-3.5" />
                <span>VOUCHER #{activeGift.id}</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#F4DCD6] text-[#C85A66] text-[10px] uppercase font-bold">
                NO EXPIRY
              </span>
            </div>

            {/* Title */}
            <h3 className="font-serif text-lg sm:text-xl text-[#4A3B32] font-bold mb-2 leading-snug">
              {activeGift.title}
            </h3>

            {/* Description */}
            <p className="font-sans text-xs sm:text-sm text-[#5C4A3E] leading-relaxed mb-4">
              {activeGift.description}
            </p>

            {/* Voucher Stamp */}
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-dashed border-[#E8B4B8] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#8C7A6B] block">TERMS OF REDEMPTION:</span>
                <span className="font-handwriting text-sm sm:text-base text-[#D9777F]">
                  Redeemable anytime by Vanshika with 1 warm hug.
                </span>
              </div>
              <Heart className="w-4 h-4 text-[#E8B4B8] fill-[#E8B4B8] shrink-0 ml-2" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Previous / Next Gift Controls */}
        <div className="flex items-center justify-between mt-2.5 px-2">
          <button
            onClick={handlePrev}
            className="px-3 py-1.5 rounded-full bg-[#FAF7F2] border border-[#EADFD5] text-[11px] font-mono text-[#6E5A4E] hover:bg-[#F4DCD6]/40 flex items-center space-x-1 active:scale-95"
          >
            <ChevronLeft className="w-3 h-3" />
            <span>prev gift</span>
          </button>

          <span className="text-[11px] font-mono text-[#A89F95]">
            {currentGiftIndex + 1} / {gifts.length}
          </span>

          <button
            onClick={handleNext}
            className="px-3 py-1.5 rounded-full bg-[#FAF7F2] border border-[#EADFD5] text-[11px] font-mono text-[#6E5A4E] hover:bg-[#F4DCD6]/40 flex items-center space-x-1 active:scale-95"
          >
            <span>next gift</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="text-[11px] font-handwriting text-[#6E5A4E] pt-0.5">
        (all vouchers guaranteed and backed by Rohan)
      </div>
    </div>
  );
};
