import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { ROHSIKA_CONFIG } from './config/rohsikaConfig';
import { OpeningSequence } from './components/OpeningSequence';
import { HeaderNav } from './components/HeaderNav';
import { ChapterOneConstellation } from './components/ChapterOneConstellation';
import { ChapterTwoUnnoticed } from './components/ChapterTwoUnnoticed';
import { ChapterThreeDatabase } from './components/ChapterThreeDatabase';
import { ChapterFourArchive } from './components/ChapterFourArchive';
import { ChapterFiveQuiz } from './components/ChapterFiveQuiz';
import { ChapterSixIfYouWere } from './components/ChapterSixIfYouWere';
import { ChapterSevenGifts } from './components/ChapterSevenGifts';
import { ChapterEightSerious } from './components/ChapterEightSerious';
import { SecretDoorAndLetter } from './components/SecretDoorAndLetter';
import { EasterEggsManager } from './components/EasterEggsManager';
import { FooterSection } from './components/FooterSection';
import { romanticAudio } from './utils/audioSynthesizer';

const CHAPTER_NAMES = [
  "Constellation",
  "Patidev Observations",
  "Kuchuu Database",
  "Secret Diary",
  "Relationship Quiz",
  "Agar Tum...",
  "Love Vouchers",
  "Heart to Heart",
  "The Secret Door",
  "Epilogue"
];

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [secretsFound, setSecretsFound] = useState<Set<string>>(new Set());
  const [heartClickCount, setHeartClickCount] = useState(0);
  const [celebrationActive, setCelebrationActive] = useState(false);
  const [isOpenTrackerModal, setIsOpenTrackerModal] = useState(false);
  const [signatureSecretModal, setSignatureSecretModal] = useState(false);
  const [heartSecretModal, setHeartSecretModal] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [musicError, setMusicError] = useState<string | null>(null);

  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const totalPages = CHAPTER_NAMES.length;

  // Start music deliberately from 1:09 (69s) when Vanshika taps "haan, chalao 🎧"
  const handleStartMusic = async (): Promise<boolean> => {
    setMusicError(null);
    const soundUrl = ROHSIKA_CONFIG.audioUrl || "/Video%20Project%205.mp3";
    try {
      const success = await romanticAudio.startFromBeginning(soundUrl, (playing) => {
        setIsPlayingMusic(playing);
      });
      if (!success) {
        setMusicError("Music nahi chala 😭 Tap karke ek baar aur try karo.");
      }
      return success;
    } catch (err) {
      console.error("Audio trigger failed:", err);
      setMusicError("Music nahi chala 😭 Tap karke ek baar aur try karo.");
      return false;
    }
  };

  // Toggle music button in the persistent header (Play/Pause/Resume without restarting from 0)
  const toggleMusicState = () => {
    if (isPlayingMusic) {
      romanticAudio.pauseMusic(setIsPlayingMusic);
    } else {
      if (romanticAudio.getAudioInstance(ROHSIKA_CONFIG.audioUrl)) {
        romanticAudio.resumeMusic(setIsPlayingMusic);
      } else {
        romanticAudio.toggleMusic(ROHSIKA_CONFIG.audioUrl, setIsPlayingMusic);
      }
    }
  };

  // Adjust volume smoothly based on the emotional depth of the current page
  // Chapters 8 and 9 (Serious Sanctuary & Final Love Letter) smoothly fade down to ~21%
  useEffect(() => {
    if (!hasEntered) return;
    if (currentPage >= 7) {
      // Emotional/Final section: calm, intimate, text is the hero, volume dips smoothly to 21%
      romanticAudio.setVolumeSmooth(0.21, 1500);
    } else {
      // Normal storytelling chapters: comfortable 30% background volume
      romanticAudio.setVolumeSmooth(0.30, 1500);
    }
  }, [currentPage, hasEntered]);

  const goToPage = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= totalPages) return;
    romanticAudio.playPop();
    setDirection(newIndex > currentPage ? 1 : -1);
    setCurrentPage(newIndex);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      goToPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      goToPage(currentPage - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!hasEntered) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        handleNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        handlePrevPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasEntered, currentPage]);

  // Touch swipe support (left/right gesture)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    // Trigger only if horizontal swipe is prominent (> 45px) and not mostly vertical
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        handleNextPage(); // Swiped left -> Next
      } else {
        handlePrevPage(); // Swiped right -> Prev
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const unlockSecret = (id: string) => {
    setSecretsFound(prev => new Set([...prev, id]));
  };

  const handleSecretHeartClick = () => {
    const nextCount = heartClickCount + 1;
    setHeartClickCount(nextCount);

    if (nextCount === 7) {
      unlockSecret('egg_heart_7');
      romanticAudio.playChime();
      setHeartSecretModal(true);
    }
  };

  const handleSignatureClick = () => {
    unlockSecret('egg_signature');
    romanticAudio.playPop();
    setSignatureSecretModal(true);
  };

  const handleFinalLetterFinished = () => {
    setCelebrationActive(true);
  };

  const handleHiddenStarClick = () => {
    unlockSecret('egg_hidden_star');
    romanticAudio.playChime();
    const hiddenStarAnchor = document.getElementById('footer-secret-star-anchor');
    if (hiddenStarAnchor) {
      hiddenStarAnchor.click();
    }
  };

  // Render the active chapter scene
  const renderCurrentScene = () => {
    switch (currentPage) {
      case 0:
        return <ChapterOneConstellation />;
      case 1:
        return <ChapterTwoUnnoticed observations={ROHSIKA_CONFIG.observations} />;
      case 2:
        return (
          <ChapterThreeDatabase
            diagnoses={ROHSIKA_CONFIG.databaseDiagnoses}
            herName={ROHSIKA_CONFIG.herName}
            nicknames={ROHSIKA_CONFIG.nicknames}
          />
        );
      case 3:
        return <ChapterFourArchive memories={ROHSIKA_CONFIG.memories} />;
      case 4:
        return <ChapterFiveQuiz questions={ROHSIKA_CONFIG.quizQuestions} />;
      case 5:
        return <ChapterSixIfYouWere items={ROHSIKA_CONFIG.ifYouWere} />;
      case 6:
        return <ChapterSevenGifts gifts={ROHSIKA_CONFIG.gifts} />;
      case 7:
        return <ChapterEightSerious />;
      case 8:
        return (
          <SecretDoorAndLetter
            config={ROHSIKA_CONFIG}
            onLetterFinished={handleFinalLetterFinished}
            onSignatureClick={handleSignatureClick}
          />
        );
      case 9:
        return (
          <FooterSection
            onSecretStarClick={handleHiddenStarClick}
            onRestartStory={() => goToPage(0)}
          />
        );
      default:
        return <ChapterOneConstellation />;
    }
  };

  return (
    <div
      className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#FAF7F2] text-[#4A3B32] font-sans select-none flex flex-col justify-between"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. Opening Sequence (shown until entered) */}
      {!hasEntered ? (
        <OpeningSequence
          herName={ROHSIKA_CONFIG.herName}
          onStartMusic={handleStartMusic}
          musicError={musicError}
          onEnter={() => {
            setHasEntered(true);
            setCurrentPage(0);
          }}
        />
      ) : (
        <>
          {/* Top Fixed Header */}
          <HeaderNav
            secretsCount={secretsFound.size}
            totalSecrets={7}
            onSecretHeartClick={handleSecretHeartClick}
            customAudioUrl={ROHSIKA_CONFIG.audioUrl}
            onOpenSecretsModal={() => setIsOpenTrackerModal(true)}
            currentPage={currentPage}
            totalPages={totalPages}
            onNavigateToPage={goToPage}
            chapterNames={CHAPTER_NAMES}
            isPlayingMusic={isPlayingMusic}
            onToggleMusic={toggleMusicState}
          />

          {/* Page-by-Page Main Fullscreen Viewport */}
          <main className="w-full flex-1 pt-13 pb-16 px-2 sm:px-4 flex items-center justify-center relative overflow-y-auto overflow-x-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentPage}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 50 : -50, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: direction > 0 ? -50 : 50, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                className="w-full h-full max-w-4xl mx-auto flex items-center justify-center relative my-auto py-1"
              >
                {renderCurrentScene()}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Bottom Persistent Navigation Bar */}
          <nav className="fixed bottom-0 left-0 right-0 z-40 h-13 px-4 bg-[#FAF7F2]/90 backdrop-blur-md border-t border-[#EADFD5]/70 flex items-center justify-between select-none">
            <div className="w-full max-w-4xl mx-auto flex items-center justify-between">
              {/* Back button */}
              <button
                id="story-prev-btn"
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="px-3 py-1.5 rounded-full text-xs font-mono text-[#6E5A4E] hover:text-[#4A3B32] hover:bg-[#F4DCD6]/30 disabled:opacity-20 disabled:pointer-events-none transition-all flex items-center space-x-1 active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </button>

              {/* Progress Dots */}
              <div className="flex items-center space-x-1.5">
                {CHAPTER_NAMES.map((name, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToPage(idx)}
                    title={`Go to ${name}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentPage
                        ? 'w-6 bg-[#D9777F] shadow-xs'
                        : idx < currentPage
                        ? 'w-2 bg-[#E8B4B8]'
                        : 'w-2 bg-[#EADFD5]'
                    }`}
                  />
                ))}
              </div>

              {/* Next button */}
              {currentPage < totalPages - 1 ? (
                <button
                  id="story-next-btn"
                  onClick={handleNextPage}
                  className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#E8B4B8] to-[#F7D6C8] text-[#4A3B32] font-semibold text-xs hover:opacity-95 shadow-xs transition-all flex items-center space-x-1 active:scale-95"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  id="story-restart-btn"
                  onClick={() => goToPage(0)}
                  className="px-3 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E8B4B8] text-[#D9777F] font-semibold text-xs hover:bg-[#F4DCD6]/30 shadow-xs transition-all flex items-center space-x-1 active:scale-95"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Replay</span>
                </button>
              )}
            </div>
          </nav>

          {/* Easter Eggs Listener & Floating Elements */}
          <EasterEggsManager
            secretsFound={secretsFound}
            onUnlockSecret={unlockSecret}
            celebrationActive={celebrationActive}
            isOpenTrackerModal={isOpenTrackerModal}
            onCloseTrackerModal={() => setIsOpenTrackerModal(false)}
          />

          {/* Secret 1 Modal (7 Heart clicks) */}
          {heartSecretModal && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
              onClick={() => setHeartSecretModal(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="max-w-sm w-full bg-[#FFFDF9] rounded-3xl p-6 polaroid-shadow border border-[#E8B4B8] text-center space-y-3 paper-pattern"
              >
                <div className="w-12 h-12 rounded-full bg-[#F4DCD6] text-[#D9777F] flex items-center justify-center mx-auto text-xl">
                  🫂
                </div>
                <h4 className="font-serif text-2xl text-[#4A3B32] font-semibold">
                  Okay detective...
                </h4>
                <p className="font-sans text-sm text-[#4A3B32]">
                  You found my secret. It took you 7 clicks to get here!
                </p>
                <p className="font-handwriting text-2xl text-[#D9777F]">
                  "Now come here. 🫂"
                </p>
                <button
                  onClick={() => setHeartSecretModal(false)}
                  className="px-5 py-2 rounded-full bg-[#E8B4B8] text-[#4A3B32] text-xs font-medium hover:bg-[#D9777F] hover:text-white transition-colors"
                >
                  Coming right away!
                </button>
              </div>
            </div>
          )}

          {/* Secret 3 Modal (Rohan's Signature) */}
          {signatureSecretModal && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
              onClick={() => setSignatureSecretModal(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="max-w-sm w-full bg-[#FFFDF9] rounded-3xl p-6 polaroid-shadow border border-[#E8B4B8] text-center space-y-3 paper-pattern"
              >
                <div className="w-12 h-12 rounded-full bg-[#F6D6AC]/50 text-[#6E5A4E] flex items-center justify-center mx-auto text-xl">
                  ✍️
                </div>
                <h4 className="font-serif text-xl text-[#4A3B32] font-semibold">
                  Engineering Quality Certificate
                </h4>
                <p className="font-mono text-sm text-[#4A3B32] py-2">
                  "Made with approximately 73% pure love and 27% cute shaitani."
                </p>
                <p className="font-handwriting text-lg text-[#D9777F]">
                  — Certified by Rohuu for Kuchuu
                </p>
                <button
                  onClick={() => setSignatureSecretModal(false)}
                  className="px-5 py-2 rounded-full bg-[#E8B4B8] text-[#4A3B32] text-xs font-medium hover:bg-[#D9777F] hover:text-white transition-colors"
                >
                  Fair enough 😂
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
