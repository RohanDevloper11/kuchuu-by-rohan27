import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KeyRound, Sparkles, Heart, ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react';
import { romanticAudio } from '../utils/audioSynthesizer';
import { RohsikaConfig } from '../types';

interface SecretDoorAndLetterProps {
  config: RohsikaConfig;
  onLetterFinished: () => void;
  onSignatureClick: () => void;
}

export const SecretDoorAndLetter: React.FC<SecretDoorAndLetterProps> = ({
  onLetterFinished,
  onSignatureClick
}) => {
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0); // 0 to 6 (7 screens)
  const [hasFinishedOnce, setHasFinishedOnce] = useState(false);

  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const totalSteps = 7;

  const handleOpenDoor = () => {
    romanticAudio.playChime();
    setIsDoorOpen(true);
    setActiveStep(0);
  };

  const nextStep = () => {
    romanticAudio.playPop();
    if (activeStep < totalSteps - 1) {
      const next = activeStep + 1;
      setActiveStep(next);
      if (next === totalSteps - 1 && !hasFinishedOnce) {
        setHasFinishedOnce(true);
        romanticAudio.playChime();
        onLetterFinished();
      }
    }
  };

  const prevStep = () => {
    romanticAudio.playPop();
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        nextStep();
      } else {
        prevStep();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  return (
    <div id="secret-door" className="w-full h-full flex flex-col justify-between items-center text-center px-3 sm:px-4 py-1 select-none">
      {!isDoorOpen ? (
        /* The Mysterious Glowing Door */
        <div className="w-full h-full flex flex-col justify-between items-center my-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-1 max-w-md mx-auto"
          >
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#F4DCD6]/70 text-[11px] font-mono text-[#6E5A4E]">
              <KeyRound className="w-3 h-3 text-[#D9777F]" />
              <span>Chapter 09 • Restricted Access</span>
            </span>

            <h2 className="font-serif text-2xl sm:text-3xl text-[#4A3B32] font-semibold leading-tight">
              Wait...
            </h2>
            <p className="font-handwriting text-xl sm:text-2xl text-[#D9777F] leading-none">
              Ek cheez aur hai.
            </p>
          </motion.div>

          {/* Door Frame Graphic */}
          <div className="my-auto">
            <div className="w-36 h-48 sm:w-44 sm:h-56 rounded-t-full bg-gradient-to-b from-[#2B2338] to-[#171320] border-4 border-[#F7D6C8] shadow-2xl relative flex flex-col items-center justify-center text-white overflow-hidden group mx-auto">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(246,214,172,0.3)_0%,transparent_60%)]" />
              
              <div className="px-2.5 py-1 rounded-md bg-[#FAF7F2]/10 border border-[#FAF7F2]/20 backdrop-blur-xs text-[10px] font-mono text-[#F6D6AC] uppercase tracking-wider z-10">
                Only Kuchuu Allowed
              </div>

              <div className="mt-3 p-2.5 rounded-full bg-[#FAF7F2]/10 text-[#F6D6AC] z-10 group-hover:scale-110 transition-transform">
                <KeyRound className="w-5 h-5 text-[#F7D6C8]" />
              </div>

              <div className="absolute bottom-2.5 text-[10px] font-handwriting text-[#E8B4B8]">
                Tap below to open
              </div>
            </div>
          </div>

          <div className="space-y-2 pb-2">
            <button
              id="open-secret-door-btn"
              onClick={handleOpenDoor}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D9777F] to-[#C85A66] text-white font-sans font-medium text-xs sm:text-sm hover:opacity-95 active:scale-95 transition-all shadow-md shadow-[#D9777F]/30 flex items-center space-x-1.5 mx-auto"
            >
              <span>open the sanctuary door</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
            <div className="text-[11px] font-handwriting text-[#6E5A4E]">
              (sirf tumhare liye khulega yeh darwaza)
            </div>
          </div>
        </div>
      ) : (
        /* The Sanctuary: 7-Step Emotional Journey */
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="w-full h-full max-h-[calc(100vh-140px)] flex flex-col justify-between items-center rounded-2xl starry-sky p-3 sm:p-4 text-center text-[#FAF7F2] border border-[#E8B4B8]/30 shadow-2xl relative overflow-hidden my-auto"
        >
          {/* Subtle celestial background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,180,184,0.12)_0%,transparent_70%)] pointer-events-none" />

          {/* Particles: Reduced during deeply emotional screens (3, 4, 5) for complete focus on the words; soft glow on screen 6 */}
          {activeStep < 3 && (
            <div className="absolute inset-0 pointer-events-none opacity-40">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"
                  style={{
                    left: `${(i * 19) % 94}%`,
                    top: `${(i * 27) % 92}%`,
                    animationDuration: `${2.5 + (i % 3)}s`
                  }}
                />
              ))}
            </div>
          )}

          {/* Final Screen Subtle Floating Hearts */}
          {activeStep === 6 && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: -30, opacity: [0, 0.7, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3.5 + (i % 2),
                    delay: i * 0.45,
                    ease: "easeInOut"
                  }}
                  className="absolute text-[#E8B4B8]"
                  style={{
                    left: `${15 + (i * 11)}%`,
                    bottom: '15%'
                  }}
                >
                  <Heart className="w-3.5 h-3.5 fill-[#E8B4B8]/60" />
                </motion.div>
              ))}
            </div>
          )}

          {/* Sanctuary Top Progress Indicator */}
          <div className="w-full max-w-sm mx-auto flex items-center justify-between text-[11px] font-mono text-[#F7D6C8]/70 px-2 pt-1 border-b border-[#FAF7F2]/10 pb-1.5 z-10 shrink-0">
            <span className="uppercase tracking-widest text-[9px] text-[#A89F95]">
              Sanctuary of Vanshika
            </span>
            <div className="flex items-center space-x-1">
              {[...Array(totalSteps)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    romanticAudio.playPop();
                    setActiveStep(idx);
                    if (idx === totalSteps - 1 && !hasFinishedOnce) {
                      setHasFinishedOnce(true);
                      onLetterFinished();
                    }
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeStep
                      ? 'w-4 bg-[#E8B4B8]'
                      : idx < activeStep
                      ? 'w-1.5 bg-[#E8B4B8]/50'
                      : 'w-1.5 bg-[#FAF7F2]/20'
                  }`}
                  title={`Part ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Center: The Emotional Reveal Screen */}
          <div className="w-full max-w-sm mx-auto flex-1 min-h-0 flex flex-col justify-center items-center my-auto px-2 py-1 relative z-10 overflow-y-auto">
            <AnimatePresence mode="wait">
              {/* SCREEN 1: Vanshika... 🤍 */}
              {activeStep === 0 && (
                <motion.div
                  key="step-0"
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="space-y-4 text-center my-auto"
                >
                  <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#F7D6C8]/80">
                    sunno na...
                  </span>

                  <h2 className="font-serif text-3xl sm:text-4xl text-[#FFFDF9] font-normal tracking-wide">
                    Vanshika... 🤍
                  </h2>

                  <p className="font-handwriting text-xl sm:text-2xl text-[#E8B4B8] max-w-xs mx-auto leading-relaxed pt-1">
                    ek chhota sa sach bolna tha tumse...
                  </p>
                </motion.div>
              )}

              {/* SCREEN 2: Kitne saare naam... TUM */}
              {activeStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="space-y-3.5 text-center my-auto max-w-xs"
                >
                  <p className="font-handwriting text-xl sm:text-2xl text-[#F6D6AC]">
                    Kitne saare naam hain tumhare...
                  </p>

                  <div className="p-3 rounded-2xl bg-[#FAF7F2]/5 border border-[#FAF7F2]/10 space-y-1.5">
                    <p className="font-handwriting text-lg sm:text-xl text-[#E8B4B8] leading-snug">
                      Kuchuu • Bubu • Rasmalai • Kajukatli • Mera pyaara sa bachaa • Rohsika ki Mummy Ji
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm font-sans text-[#D3C5B8] leading-relaxed pt-1">
                    but mere liye in sab ke peeche sirf ek hi person hai...
                  </p>

                  <h3 className="font-serif text-3xl sm:text-4xl text-[#FFFDF9] font-semibold tracking-wider text-glow-subtle">
                    TUM. ❤️
                  </h3>
                </motion.div>
              )}

              {/* SCREEN 3: Pata nahi kab hua... */}
              {activeStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="space-y-3 text-center my-auto max-w-xs"
                >
                  <h3 className="font-handwriting text-2xl sm:text-3xl text-[#F7D6C8] leading-snug">
                    Pata nahi kab hua...<br />
                    kaise hua...<br />
                    bas ho gaya.
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#D3C5B8] leading-relaxed pt-1">
                    Somewhere between the teasing, the stupid jokes, the random conversations, the good mornings, the good nights...
                  </p>

                  <p className="font-serif italic text-sm sm:text-base text-[#F6D6AC] leading-relaxed pt-1">
                    aur un chhoti chhoti baaton ke beech... tum meri life ka woh part ban gayi jiske bina sab kuch thoda incomplete sa lagta hai.
                  </p>
                </motion.div>
              )}

              {/* SCREEN 4: Main har baar express nahi kar pata... */}
              {activeStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="space-y-3.5 text-center my-auto max-w-xs"
                >
                  <p className="font-sans text-xs sm:text-sm text-[#D3C5B8] leading-relaxed">
                    Kuchuu, main shayad har baar perfectly express nahi kar pata...
                  </p>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#FFFDF9] font-normal leading-snug">
                    but main tumse bahut pyaar karta hoon.
                  </h3>

                  <p className="font-handwriting text-2xl sm:text-3xl text-[#E8B4B8] pt-1">
                    Sach mein. Bahut zyada. 🥺❤️
                  </p>
                </motion.div>
              )}

              {/* SCREEN 5: Kabhi mujhe chhodke mat jaana... */}
              {activeStep === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="space-y-2.5 text-left my-auto max-w-xs p-4 rounded-2xl bg-[#171320]/60 border border-[#FAF7F2]/10"
                >
                  <p className="font-handwriting text-xl text-[#F7D6C8]">
                    Aur ek baat...
                  </p>
                  <h3 className="font-serif text-lg sm:text-xl text-[#FFFDF9] font-semibold leading-tight">
                    Kabhi mujhe chhodke mat jaana.
                  </h3>

                  <p className="font-sans text-[11px] sm:text-xs text-[#D3C5B8] leading-relaxed">
                    Main ye isliye nahi bol raha kyunki mujhe tumpe doubt hai... bas tum mere liye itni important ho ki tumhe khone ka thought bhi mujhe andar se dara deta hai.
                  </p>

                  <p className="font-sans text-[11px] sm:text-xs text-[#E6E1E8] leading-relaxed">
                    Mera bharosa kabhi mat todna, Kuchuu... aur agar kabhi mujhse koi galti ho jaaye, toh please mujhe samjha dena, mujhse baat kar lena... bas mujhse door mat jaana.
                  </p>

                  <p className="font-handwriting text-sm sm:text-base text-[#E8B4B8] leading-snug pt-1 border-t border-[#FAF7F2]/10">
                    Main bhi promise karta hoon, jitna ho sake tumhe samajhne ki, respect karne ki, khush rakhne ki aur tumhara saath dene ki poori koshish karunga. 🤍
                  </p>
                </motion.div>
              )}

              {/* SCREEN 6: Mujhe bas HUM chahiye */}
              {activeStep === 5 && (
                <motion.div
                  key="step-5"
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="space-y-3 text-center my-auto max-w-xs"
                >
                  <p className="font-sans text-xs text-[#A89F95]">
                    Mujhe perfect relationship nahi chahiye...
                  </p>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#FFFDF9] font-medium leading-tight">
                    Mujhe bas HUM chahiye.
                  </h3>

                  <p className="font-handwriting text-lg sm:text-xl text-[#E8B4B8] leading-relaxed">
                    Thodi si nok jhok, thodi si masti, bohot saara pyaar, aur tumhara mere saath rehna. 🫶🏻
                  </p>

                  <div className="p-2.5 rounded-xl bg-[#FAF7F2]/5 border border-[#FAF7F2]/10 space-y-1 text-xs font-sans text-[#D3C5B8] leading-relaxed">
                    <p>
                      Pata hai? Tum meri favorite person ho. Aur main har baar tumhe choose karna chahta hoon.
                    </p>
                    <p className="font-serif italic text-xs text-[#F6D6AC]">
                      Aaj bhi. Kal bhi. Aur har us din bhi jab hum dono thode pagal honge. 😂❤️
                    </p>
                  </div>
                </motion.div>
              )}

              {/* SCREEN 7 — FINAL: Bas aise hi rehna... I LOVE YOU */}
              {activeStep === 6 && (
                <motion.div
                  key="step-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="space-y-3 text-center my-auto max-w-xs"
                >
                  <p className="font-handwriting text-xl sm:text-2xl text-[#F6D6AC] leading-tight">
                    Bas aise hi rehna mere saath, Kuchuu.
                  </p>

                  <div className="w-10 h-10 rounded-full bg-[#E8B4B8]/20 text-[#E8B4B8] flex items-center justify-center mx-auto my-1 animate-pulse">
                    <Heart className="w-5 h-5 fill-[#E8B4B8]" />
                  </div>

                  <p className="font-mono text-[10px] text-[#A89F95] uppercase tracking-widest">
                    Aur haan...
                  </p>

                  <h2 className="font-serif text-3xl sm:text-4xl text-[#FFFDF9] font-normal leading-none tracking-wide text-glow-subtle">
                    I love you.
                  </h2>

                  <p className="font-handwriting text-2xl sm:text-3xl text-[#E8B4B8] italic leading-tight">
                    Bahut bahut bahut zyada. ❤️
                  </p>

                  {/* Clickable Rohan Signature */}
                  <div className="pt-2 border-t border-[#FAF7F2]/10">
                    <button
                      id="rohan-signature-btn"
                      onClick={onSignatureClick}
                      className="font-handwriting text-2xl sm:text-3xl text-[#F7D6C8] hover:text-[#FFFDF9] transition-colors p-1 cursor-pointer active:scale-95 inline-block"
                      title="Click my signature..."
                    >
                      — Tumhara Rohan ❤️
                    </button>
                    <p className="text-[10px] font-mono text-[#8F889B] mt-0.5">
                      (tap my signature for a secret note)
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Navigation for Sanctuary steps */}
          <div className="w-full max-w-sm mx-auto flex items-center justify-between pt-2.5 pb-1.5 border-t border-[#FAF7F2]/15 z-20 px-2 shrink-0 bg-[#171320]/80 backdrop-blur-xs">
            {/* Back button */}
            {activeStep > 0 ? (
              <button
                onClick={prevStep}
                className="px-3 py-1.5 rounded-full text-xs font-mono text-[#FAF7F2]/80 hover:text-white flex items-center space-x-1 transition-colors active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>back</span>
              </button>
            ) : (
              <button
                onClick={() => setIsDoorOpen(false)}
                className="px-3 py-1.5 rounded-full text-[11px] font-mono text-[#A89F95] hover:text-[#FAF7F2] transition-colors cursor-pointer"
              >
                ← close door
              </button>
            )}

            {/* Next / Continue Action Button */}
            {activeStep === 0 && (
              <button
                onClick={nextStep}
                className="px-4 py-2 rounded-full bg-[#E8B4B8] text-[#171320] font-sans font-semibold text-xs sm:text-sm hover:bg-[#F7D6C8] transition-all flex items-center space-x-1.5 shadow-md shadow-[#E8B4B8]/30 active:scale-95 cursor-pointer"
              >
                <span>ek baat bolun? 🥺</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}

            {activeStep === 1 && (
              <button
                onClick={nextStep}
                className="px-4 py-2 rounded-full bg-[#E8B4B8] text-[#171320] font-sans font-semibold text-xs sm:text-sm hover:bg-[#F7D6C8] transition-all flex items-center space-x-1.5 shadow-md shadow-[#E8B4B8]/30 active:scale-95 cursor-pointer"
              >
                <span>aur pata hai? →</span>
              </button>
            )}

            {activeStep === 2 && (
              <button
                onClick={nextStep}
                className="px-4 py-2 rounded-full bg-[#E8B4B8] text-[#171320] font-sans font-semibold text-xs sm:text-sm hover:bg-[#F7D6C8] transition-all flex items-center space-x-1.5 shadow-md shadow-[#E8B4B8]/30 active:scale-95 cursor-pointer"
              >
                <span>aage suno... →</span>
              </button>
            )}

            {activeStep === 3 && (
              <button
                onClick={nextStep}
                className="px-4 py-2 rounded-full bg-[#E8B4B8] text-[#171320] font-sans font-semibold text-xs sm:text-sm hover:bg-[#F7D6C8] transition-all flex items-center space-x-1.5 shadow-md shadow-[#E8B4B8]/30 active:scale-95 cursor-pointer"
              >
                <span>ek aur baat... →</span>
              </button>
            )}

            {activeStep === 4 && (
              <button
                onClick={nextStep}
                className="px-4 py-2 rounded-full bg-[#E8B4B8] text-[#171320] font-sans font-semibold text-xs sm:text-sm hover:bg-[#F7D6C8] transition-all flex items-center space-x-1.5 shadow-md shadow-[#E8B4B8]/30 active:scale-95 cursor-pointer"
              >
                <span>promise? 🤍 →</span>
              </button>
            )}

            {activeStep === 5 && (
              <button
                onClick={nextStep}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-[#D9777F] to-[#C85A66] text-white font-sans font-semibold text-xs sm:text-sm hover:opacity-95 transition-all flex items-center space-x-1.5 shadow-md shadow-[#D9777F]/40 active:scale-95 cursor-pointer"
              >
                <span>aur aakhri mein... ❤️</span>
              </button>
            )}

            {activeStep === 6 && (
              <button
                onClick={() => {
                  romanticAudio.playPop();
                  setActiveStep(0);
                }}
                className="px-3 py-1.5 rounded-full border border-[#FAF7F2]/20 text-[#E8B4B8] text-[11px] font-mono hover:bg-[#FAF7F2]/10 transition-colors flex items-center space-x-1 active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>read again</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
