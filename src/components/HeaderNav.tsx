import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Heart, Compass, ChevronDown } from 'lucide-react';
import { romanticAudio } from '../utils/audioSynthesizer';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderNavProps {
  secretsCount: number;
  totalSecrets: number;
  onSecretHeartClick: () => void;
  customAudioUrl?: string;
  onOpenSecretsModal: () => void;
  currentPage: number;
  totalPages: number;
  onNavigateToPage: (pageIndex: number) => void;
  chapterNames: string[];
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  secretsCount,
  totalSecrets,
  onSecretHeartClick,
  customAudioUrl: _customAudioUrl,
  onOpenSecretsModal,
  currentPage,
  totalPages,
  onNavigateToPage,
  chapterNames,
  isPlayingMusic,
  onToggleMusic
}) => {
  const [heartClicks, setHeartClicks] = useState(0);
  const [showNavDropdown, setShowNavDropdown] = useState(false);

  const handleHeartClick = () => {
    romanticAudio.playPop();
    const newCount = heartClicks + 1;
    setHeartClicks(newCount);
    onSecretHeartClick();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-13 px-3 sm:px-5 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#EADFD5]/70 flex items-center justify-between select-none">
      <div className="w-full max-w-4xl mx-auto flex items-center justify-between">
        {/* Left: Brand & Secret Heart */}
        <div className="flex items-center space-x-2">
          <button
            id="nav-secret-heart-btn"
            onClick={handleHeartClick}
            title="A tiny mysterious heart..."
            className="p-1 -ml-1 rounded-full text-[#D9777F] hover:bg-[#F4DCD6]/40 transition-transform active:scale-125"
          >
            <Heart className={`w-4 h-4 ${heartClicks > 0 ? 'fill-[#D9777F]' : ''}`} />
          </button>
          
          <div className="flex flex-col text-left">
            <span className="font-serif text-xs sm:text-sm font-semibold text-[#4A3B32] tracking-wide leading-tight">
              Vanshika Universe
            </span>
            <span className="text-[10px] font-handwriting text-[#D9777F] leading-none">
              from Rohuu with ❤️
            </span>
          </div>
        </div>

        {/* Center: Current Chapter pill dropdown trigger */}
        <div className="relative">
          <button
            id="chapters-menu-btn"
            onClick={() => {
              romanticAudio.playPop();
              setShowNavDropdown(!showNavDropdown);
            }}
            className="px-2.5 py-1 rounded-full text-xs font-mono text-[#6E5A4E] hover:text-[#4A3B32] bg-[#FFFDF9] hover:bg-[#F4DCD6]/30 flex items-center space-x-1.5 transition-colors border border-[#EADFD5] shadow-2xs"
          >
            <Compass className="w-3.5 h-3.5 text-[#D9777F]" />
            <span className="font-semibold text-[#D9777F]">{currentPage + 1}/{totalPages}</span>
            <span className="hidden sm:inline text-[#4A3B32] max-w-[120px] truncate">
              {chapterNames[currentPage]}
            </span>
            <ChevronDown className="w-3 h-3 text-[#8C7A6B]" />
          </button>

          {/* Jump to chapter dropdown */}
          <AnimatePresence>
            {showNavDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.95 }}
                className="absolute left-1/2 -translate-x-1/2 mt-1.5 w-56 bg-[#FFFDF9] rounded-2xl p-2 shadow-2xl border border-[#E8B4B8] text-xs font-sans space-y-0.5 z-50 max-h-72 overflow-y-auto paper-pattern"
              >
                <div className="px-2 py-1 text-[10px] font-mono text-[#A89F95] uppercase tracking-wider border-b border-[#EADFD5] mb-1">
                  Jump to Chapter
                </div>
                {chapterNames.map((name, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      romanticAudio.playPop();
                      onNavigateToPage(idx);
                      setShowNavDropdown(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      idx === currentPage
                        ? 'bg-[#F4DCD6] text-[#C85A66] font-semibold'
                        : 'text-[#4A3B32] hover:bg-[#FAF7F2] hover:text-[#D9777F]'
                    }`}
                  >
                    <span className="truncate">
                      <span className="font-mono text-[10px] mr-1.5 opacity-60">#{idx + 1}</span>
                      {name}
                    </span>
                    {idx === currentPage && <span className="text-[10px]">●</span>}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Secrets tracker + Music toggle */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {/* Secrets counter badge */}
          <button
            id="secrets-badge-btn"
            onClick={onOpenSecretsModal}
            className="flex items-center space-x-1 px-2 py-1 rounded-full bg-[#F4DCD6]/60 hover:bg-[#F4DCD6] text-[#6E5A4E] text-xs font-sans transition-all border border-[#E8B4B8]/40"
            title="Easter eggs found in this universe"
          >
            <Sparkles className="w-3 h-3 text-[#D9777F]" />
            <span className="font-mono font-bold text-[11px] text-[#4A3B32]">{secretsCount}/{totalSecrets}</span>
          </button>

          {/* Music Button */}
          <button
            id="music-toggle-btn"
            onClick={onToggleMusic}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer select-none ${
              isPlayingMusic
                ? 'bg-[#E8B4B8] text-[#4A3B32] shadow-xs soft-glow-pink'
                : 'bg-[#FAF7F2] text-[#6E5A4E] hover:text-[#4A3B32] border border-[#EADFD5]'
            }`}
            title={isPlayingMusic ? "Pause music" : "Resume music"}
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#C85A66] shrink-0" />
                <span className="font-serif italic text-[11px] whitespace-nowrap">♪ Dil Na Jaane Ya</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#A89F95] shrink-0" />
                <span className="font-sans text-[10px] text-[#8F889B] whitespace-nowrap">♪ music paused</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
