import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Feather, Heart, ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import { MemoryItem } from '../types';
import { romanticAudio } from '../utils/audioSynthesizer';

interface ChapterFourArchiveProps {
  memories: MemoryItem[];
}

export const ChapterFourArchive: React.FC<ChapterFourArchiveProps> = ({ memories: initialMemories }) => {
  const [memoriesList, setMemoriesList] = useState<MemoryItem[]>(initialMemories);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('unspoken thought');
  const [newDate, setNewDate] = useState('Aaj ka din ✨');
  const [newNote, setNewNote] = useState('');
  const [newCaption, setNewCaption] = useState('');

  const activeMemory = memoriesList[currentIndex] || memoriesList[0];

  const handleNextEntry = () => {
    romanticAudio.playPop();
    setCurrentIndex((currentIndex + 1) % memoriesList.length);
  };

  const handlePrevEntry = () => {
    romanticAudio.playPop();
    setCurrentIndex((currentIndex - 1 + memoriesList.length) % memoriesList.length);
  };

  const handleSaveNewEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newNote.trim()) return;

    const newEntry: MemoryItem = {
      id: `MEMORY_${Date.now()}`,
      category: newCategory.trim() || 'personal note',
      title: newTitle.trim(),
      date: newDate.trim() || 'Special Memory',
      note: newNote.trim(),
      caption: newCaption.trim() || 'Sirf tumhare liye likha 🤍',
      tag: 'New Entry'
    };

    setMemoriesList(prev => [newEntry, ...prev]);
    setCurrentIndex(0);
    setIsAddingEntry(false);
    setNewTitle('');
    setNewNote('');
    setNewCaption('');
    romanticAudio.playChime();
  };

  return (
    <div id="archive" className="w-full h-full flex flex-col justify-between items-center text-center px-3 sm:px-4 py-1 select-none">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-1 max-w-md mx-auto"
      >
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#F4DCD6]/70 border border-[#E8B4B8]/50 text-[11px] font-mono text-[#6E5A4E]">
          <BookOpen className="w-3 h-3 text-[#D9777F]" />
          <span>Chapter 04 • Secret Diary</span>
        </span>

        <h2 className="font-serif text-2xl sm:text-3xl text-[#4A3B32] font-semibold leading-tight">
          Vanshika's Diary
        </h2>
        <p className="font-handwriting text-xl sm:text-2xl text-[#D9777F] leading-none">
          "Kuch baatein sirf lafzon mein aati hain..."
        </p>
      </motion.div>

      {/* Entry Selector & Add Button */}
      <div className="flex items-center justify-between w-full max-w-sm px-2 text-[11px] font-mono text-[#6E5A4E]">
        <div className="flex items-center space-x-1">
          <span className="text-[#D9777F] font-bold">Entry #{currentIndex + 1}</span>
          <span className="text-[#A89F95]">of {memoriesList.length}</span>
        </div>

        <button
          onClick={() => {
            romanticAudio.playPop();
            setIsAddingEntry(true);
          }}
          className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-[#FFFDF9] border border-[#E8B4B8] text-[10px] font-mono text-[#6E5A4E] hover:text-[#C85A66] transition-colors shadow-2xs"
        >
          <Plus className="w-3 h-3 text-[#D9777F]" />
          <span>+ write note</span>
        </button>
      </div>

      {/* The Active Ruled Notebook Page */}
      <div className="w-full max-w-sm mx-auto relative my-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMemory.id}
            initial={{ opacity: 0, x: 20, rotate: 1 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: -20, rotate: -1 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Washi Tape Accent */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#F6D6AC]/70 border border-white/70 -rotate-1 z-10 shadow-xs backdrop-blur-xs rounded-xs" />

            {/* Notebook Page Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDF9] border border-[#E8B4B8] polaroid-shadow relative overflow-hidden paper-pattern text-left">
              {/* Classic Red Notebook Margin Line on Left */}
              <div className="absolute top-0 bottom-0 left-5 w-[1.5px] bg-[#E8B4B8]/40 pointer-events-none" />

              {/* Metadata */}
              <div className="pl-3.5 flex items-center justify-between text-[11px] font-mono text-[#8C7A6B] mb-2 pb-1.5 border-b border-[#EADFD5]">
                <span className="uppercase font-semibold text-[#D9777F]">
                  {activeMemory.category}
                </span>
                <span>{activeMemory.date || `Entry #${currentIndex + 1}`}</span>
              </div>

              {/* Title */}
              <div className="pl-3.5">
                <h3 className="font-serif text-lg sm:text-xl text-[#4A3B32] font-semibold leading-snug">
                  {activeMemory.title}
                </h3>

                {/* Ruled Notebook Note Content */}
                <div className="mt-2 text-xs sm:text-sm font-sans text-[#5C4A3E] leading-relaxed bg-[repeating-linear-gradient(transparent,transparent_21px,#F0E6DE_21px,#F0E6DE_22px)] pt-0.5 line-clamp-5">
                  {activeMemory.note}
                </div>
              </div>

              {/* Bottom Notebook Footnote */}
              <div className="pl-3.5 mt-3 pt-2 border-t border-dashed border-[#EADFD5] flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-[#D9777F] min-w-0 pr-2">
                  <Feather className="w-3.5 h-3.5 shrink-0 opacity-80" />
                  <span className="font-handwriting text-sm sm:text-base text-[#6E5A4E] truncate">
                    "{activeMemory.caption || 'For my Kuchuu 🤍'}"
                  </span>
                </div>
                <Heart className="w-3.5 h-3.5 text-[#E8B4B8] fill-[#E8B4B8] shrink-0" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Notebook Page Turn Controls */}
        <div className="flex items-center justify-between mt-2.5 px-2">
          <button
            onClick={handlePrevEntry}
            className="px-3 py-1.5 rounded-full bg-[#FAF7F2] border border-[#EADFD5] text-[11px] font-mono text-[#6E5A4E] hover:bg-[#F4DCD6]/40 flex items-center space-x-1 active:scale-95"
          >
            <ChevronLeft className="w-3 h-3" />
            <span>prev page</span>
          </button>

          {/* Mini page dots */}
          <div className="flex items-center space-x-1">
            {memoriesList.slice(0, 6).map((_, idx) => (
              <span
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-[#D9777F] w-3' : 'bg-[#EADFD5]'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNextEntry}
            className="px-3 py-1.5 rounded-full bg-[#FAF7F2] border border-[#EADFD5] text-[11px] font-mono text-[#6E5A4E] hover:bg-[#F4DCD6]/40 flex items-center space-x-1 active:scale-95"
          >
            <span>next page</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="text-[11px] font-handwriting text-[#6E5A4E] pt-0.5">
        (tumhari har baat yahan secretly saved hai)
      </div>

      {/* Add New Entry Modal */}
      <AnimatePresence>
        {isAddingEntry && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsAddingEntry(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full bg-[#FFFDF9] rounded-2xl p-5 border border-[#E8B4B8] paper-pattern text-left shadow-2xl"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#EADFD5] mb-3">
                <span className="font-mono text-xs font-semibold text-[#D9777F]">New Diary Page</span>
                <button
                  type="button"
                  onClick={() => setIsAddingEntry(false)}
                  className="p-1 text-[#6E5A4E] hover:text-[#4A3B32]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveNewEntry} className="space-y-2.5">
                <div>
                  <label className="block text-[10px] font-mono text-[#6E5A4E] uppercase mb-0.5">Title</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Raat ko baat karte waqt..."
                    className="w-full px-3 py-1.5 rounded-lg border border-[#EADFD5] bg-white text-xs font-sans text-[#4A3B32] focus:outline-none focus:border-[#E8B4B8]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-[#6E5A4E] uppercase mb-0.5">Note</label>
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Write what's in your heart..."
                    rows={3}
                    className="w-full px-3 py-1.5 rounded-lg border border-[#EADFD5] bg-white text-xs font-sans text-[#4A3B32] focus:outline-none focus:border-[#E8B4B8]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-[#6E5A4E] uppercase mb-0.5">Footnote</label>
                  <input
                    type="text"
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    placeholder="e.g. hamesha yaad rahega 🤍"
                    className="w-full px-3 py-1.5 rounded-lg border border-[#EADFD5] bg-white text-xs font-sans text-[#4A3B32] focus:outline-none focus:border-[#E8B4B8]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingEntry(false)}
                    className="px-3 py-1.5 text-xs text-[#6E5A4E] hover:text-[#4A3B32]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#E8B4B8] to-[#F7D6C8] text-[#4A3B32] font-semibold text-xs shadow-xs active:scale-95"
                  >
                    Save to Diary ✨
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
