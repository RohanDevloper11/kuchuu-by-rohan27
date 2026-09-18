import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MailOpen, Eye, Heart, Feather, ChevronLeft, ChevronRight } from 'lucide-react';
import { romanticAudio } from '../utils/audioSynthesizer';
import { RohsikaConfig } from '../types';

interface ChapterTwoUnnoticedProps {
  observations: RohsikaConfig['observations'];
}

export const ChapterTwoUnnoticed: React.FC<ChapterTwoUnnoticedProps> = ({ observations }) => {
  const [currentObsIndex, setCurrentObsIndex] = useState(0);
  const [openedIds, setOpenedIds] = useState<string[]>([observations[0]?.id || 'obs_1']);
  const [showFullNote, setShowFullNote] = useState(false);

  const currentObs = observations[currentObsIndex] || observations[0];
  const isOpened = openedIds.includes(currentObs.id);

  const handleNextObs = () => {
    romanticAudio.playPop();
    const nextIdx = (currentObsIndex + 1) % observations.length;
    setCurrentObsIndex(nextIdx);
    const nextObs = observations[nextIdx];
    if (!openedIds.includes(nextObs.id)) {
      setOpenedIds(prev => [...prev, nextObs.id]);
    }
  };

  const handlePrevObs = () => {
    romanticAudio.playPop();
    const prevIdx = (currentObsIndex - 1 + observations.length) % observations.length;
    setCurrentObsIndex(prevIdx);
  };

  const handleSelectIndex = (idx: number) => {
    romanticAudio.playPop();
    setCurrentObsIndex(idx);
    const obs = observations[idx];
    if (!openedIds.includes(obs.id)) {
      setOpenedIds(prev => [...prev, obs.id]);
    }
  };

  return (
    <div id="unnoticed" className="w-full h-full flex flex-col justify-between items-center text-center px-3 sm:px-4 py-1 select-none">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-1 max-w-md mx-auto"
      >
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#F4DCD6]/70 text-[11px] font-mono text-[#6E5A4E]">
          <Eye className="w-3 h-3 text-[#D9777F]" />
          <span>Chapter 02 • Patidev Observations</span>
        </span>

        <h2 className="font-serif text-2xl sm:text-3xl text-[#4A3B32] font-medium leading-tight">
          Kuch cheezein tum notice nahi karti...
        </h2>
        <p className="font-handwriting text-xl sm:text-2xl text-[#D9777F] leading-none">
          ...but Patidev karta hai.
        </p>
      </motion.div>

      {/* Note Tabs Bar */}
      <div className="flex items-center justify-center space-x-1.5 overflow-x-auto py-1 max-w-full">
        {observations.map((obs, idx) => {
          const isSelected = idx === currentObsIndex;
          const isRead = openedIds.includes(obs.id);
          return (
            <button
              key={obs.id}
              onClick={() => handleSelectIndex(idx)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition-all duration-200 flex items-center space-x-1 ${
                isSelected
                  ? 'bg-[#E8B4B8] text-[#4A3B32] font-bold shadow-xs scale-105'
                  : isRead
                  ? 'bg-[#FAF7F2] border border-[#E8B4B8]/50 text-[#6E5A4E]'
                  : 'bg-[#FFFDF9] border border-[#EADFD5] text-[#A89F95]'
              }`}
            >
              <span>#{idx + 1}</span>
              {isRead && <span className="w-1.5 h-1.5 rounded-full bg-[#D9777F]" />}
            </button>
          );
        })}
      </div>

      {/* Interactive Envelope Card */}
      <div className="w-full max-w-sm mx-auto relative my-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentObs.id}
            initial={{ opacity: 0, x: 20, rotate: 1 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: -20, rotate: -1 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Washi tape sticker */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#E8B4B8]/50 backdrop-blur-xs rounded-xs rotate-1 z-10 border-t border-b border-dashed border-[#FAF7F2]/80" />

            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDF9] border border-[#E8B4B8] polaroid-shadow paper-pattern text-left relative overflow-hidden">
              {/* Top line */}
              <div className="flex items-center justify-between text-[11px] font-mono text-[#6E5A4E] mb-2 pb-2 border-b border-[#EADFD5]">
                <span className="flex items-center space-x-1">
                  <Feather className="w-3 h-3 text-[#D9777F]" />
                  <span>Observation #{currentObsIndex + 1} of {observations.length}</span>
                </span>
                <span className="flex items-center space-x-1 text-[#D9777F]">
                  <MailOpen className="w-3.5 h-3.5" />
                  <span>unfolded</span>
                </span>
              </div>

              {/* Preview Title */}
              <h3 className="font-serif text-lg sm:text-xl text-[#4A3B32] font-semibold leading-snug">
                {currentObs.preview}
              </h3>

              {/* Main Content */}
              <p className="mt-2 text-xs sm:text-sm font-sans text-[#5C4A3E] leading-relaxed">
                {currentObs.content}
              </p>

              {/* Annotation Footnote */}
              {currentObs.annotation && (
                <div className="mt-3 pt-2.5 border-t border-[#EADFD5] flex items-center justify-between bg-[#F4DCD6]/20 p-2 rounded-xl">
                  <p className="font-handwriting text-base sm:text-lg text-[#C85A66] leading-tight">
                    "{currentObs.annotation}"
                  </p>
                  <Heart className="w-3.5 h-3.5 text-[#E8B4B8] fill-[#E8B4B8] shrink-0 ml-2" />
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Note Flip Arrows */}
        <div className="flex items-center justify-between mt-2.5 px-2">
          <button
            onClick={handlePrevObs}
            className="px-3 py-1.5 rounded-full bg-[#FAF7F2] border border-[#EADFD5] text-[11px] font-mono text-[#6E5A4E] hover:bg-[#F4DCD6]/40 flex items-center space-x-1 active:scale-95"
          >
            <ChevronLeft className="w-3 h-3" />
            <span>prev note</span>
          </button>

          <span className="text-[11px] font-mono text-[#A89F95]">
            {currentObsIndex + 1} / {observations.length}
          </span>

          <button
            onClick={handleNextObs}
            className="px-3 py-1.5 rounded-full bg-[#FAF7F2] border border-[#EADFD5] text-[11px] font-mono text-[#6E5A4E] hover:bg-[#F4DCD6]/40 flex items-center space-x-1 active:scale-95"
          >
            <span>next note</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="text-[11px] font-handwriting text-[#6E5A4E] pt-0.5">
        (Rohan quiet note: you look gorgeous even when you're sleepy)
      </div>
    </div>
  );
};

