import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Star, Mail, X, AlertTriangle } from 'lucide-react';
import { romanticAudio } from '../utils/audioSynthesizer';

interface EasterEggsManagerProps {
  secretsFound: Set<string>;
  onUnlockSecret: (secretId: string) => void;
  celebrationActive: boolean;
  isOpenTrackerModal: boolean;
  onCloseTrackerModal: () => void;
}

export const EasterEggsManager: React.FC<EasterEggsManagerProps> = ({
  secretsFound,
  onUnlockSecret,
  celebrationActive,
  isOpenTrackerModal,
  onCloseTrackerModal,
}) => {
  const [activeModalMessage, setActiveModalMessage] = useState<{
    title: string;
    body: string;
    sub?: string;
  } | null>(null);

  const [bubuRain, setBubuRain] = useState(false);
  const [typedBuffer, setTypedBuffer] = useState('');

  // Keyboard typing detection for "kuchuu" and "bubu"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input field
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      const char = e.key.toLowerCase();
      if (/^[a-z]$/.test(char)) {
        const nextBuffer = (typedBuffer + char).slice(-10);
        setTypedBuffer(nextBuffer);

        if (nextBuffer.endsWith('kuchuu')) {
          onUnlockSecret('egg_kuchuu');
          romanticAudio.playChime();
          setActiveModalMessage({
            title: "Secret Unlocked: Kuchuu Code",
            body: "Aapne secret keyword type kiya! Rohan will make late-night maggi & hot chocolate for Kuchuu anytime on demand, no questions asked! 🍜☕",
            sub: "Coupon valid for eternity."
          });
        } else if (nextBuffer.endsWith('bubu')) {
          onUnlockSecret('egg_bubu');
          triggerBubuCelebration();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [typedBuffer, onUnlockSecret]);

  const triggerBubuCelebration = () => {
    romanticAudio.playChime();
    setBubuRain(true);
    setActiveModalMessage({
      title: "Bubu Alert Triggered! 🧸",
      body: "Emergency cuddling protocol initiated. Warning: Extreme cuteness detected on screen!",
      sub: "Bubu detected by system."
    });
    setTimeout(() => setBubuRain(false), 5000);
  };

  // Secret 4: Hidden Star
  const handleHiddenStarClick = () => {
    onUnlockSecret('egg_hidden_star');
    romanticAudio.playChime();
    setActiveModalMessage({
      title: "Hidden Star Discovered ✨",
      body: "Rohan definitely didn't put this here accidentally.",
      sub: "He knew you'd look into every corner."
    });
  };

  // Secret 5: "don't touch"
  const handleDontTouchClick = () => {
    onUnlockSecret('egg_dont_touch');
    romanticAudio.playPop();
    setActiveModalMessage({
      title: "ALERT: DISOBEDIENCE! 🚨",
      body: "WHY DID YOU TOUCH IT 😭... Par mujhe pata tha tum zaroor click karogi, meri shaitaan!",
      sub: "Zero percent surprised."
    });
  };

  // Secret 6: Hidden Envelope
  const handleHiddenEnvelopeClick = () => {
    onUnlockSecret('egg_envelope');
    romanticAudio.playChime();
    setActiveModalMessage({
      title: "Secret Envelope 💌",
      body: "Bas ek reminder...",
      sub: "You are deeply, completely, and endlessly loved."
    });
  };

  const allSecretsList = [
    { id: 'egg_heart_7', name: '7 Heart Taps', hint: 'Tap the header heart repeatedly' },
    { id: 'egg_kuchuu', name: 'The Kuchuu Password', hint: 'Type "kuchuu" on keyboard or tap badge' },
    { id: 'egg_signature', name: "Rohan's Signature", hint: 'Click the signature at the letter ending' },
    { id: 'egg_hidden_star', name: 'Golden Hidden Star', hint: 'A lonely tiny star floating in the footer' },
    { id: 'egg_dont_touch', name: '"don\'t touch" Button', hint: 'A mischievous button daring you to press it' },
    { id: 'egg_envelope', name: 'Floating Secret Envelope', hint: 'A tiny wax envelope tucked in the corner' },
    { id: 'egg_bubu', name: 'Bubu Cuddle Burst', hint: 'Type "bubu" on keyboard or tap Bubu badge' },
  ];

  return (
    <>
      {/* Floating Gentle Celebration Particles (Active on celebration) */}
      {(celebrationActive || bubuRain) && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(24)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-[#D9777F]"
              style={{
                left: `${(i * 13) % 96}%`,
                top: `-20px`,
                fontSize: `${16 + (i % 4) * 6}px`,
              }}
              animate={{
                y: ['0vh', '105vh'],
                rotate: [0, (i % 2 === 0 ? 360 : -360)],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 4 + (i % 4),
                repeat: Infinity,
                delay: i * 0.25,
                ease: 'linear',
              }}
            >
              {bubuRain ? (i % 2 === 0 ? '🧸' : '🤍') : (i % 3 === 0 ? '✨' : i % 2 === 0 ? '🤍' : '🌸')}
            </motion.div>
          ))}
        </div>
      )}

      {/* Secret 5: Floating mischievous "don't touch" button */}
      <div className="fixed bottom-4 left-4 z-30">
        <button
          id="secret-dont-touch-btn"
          onClick={handleDontTouchClick}
          className="px-2.5 py-1 rounded-full bg-[#FAF7F2]/80 backdrop-blur-xs border border-[#EADFD5] text-[10px] font-mono text-[#A89F95] hover:text-[#C85A66] hover:border-[#E8B4B8] transition-colors shadow-xs"
          title="Do not click this button"
        >
          don't touch.
        </button>
      </div>

      {/* Secret 6: Floating Wax-Sealed Mini Envelope in Bottom Right */}
      <div className="fixed bottom-4 right-4 z-30">
        <button
          id="secret-envelope-btn"
          onClick={handleHiddenEnvelopeClick}
          className="p-2.5 rounded-full bg-[#FFFDF9] border border-[#E8B4B8] text-[#D9777F] shadow-md hover:scale-110 active:scale-95 transition-transform group"
          title="A tiny mysterious letter..."
        >
          <Mail className="w-4 h-4 group-hover:rotate-6 transition-transform" />
        </button>
      </div>

      {/* Easter Egg Message Modal */}
      <AnimatePresence>
        {activeModalMessage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
            onClick={() => setActiveModalMessage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full bg-[#FFFDF9] rounded-3xl p-6 polaroid-shadow border border-[#E8B4B8] text-center space-y-3 paper-pattern"
            >
              <div className="w-10 h-10 rounded-full bg-[#F4DCD6] text-[#D9777F] flex items-center justify-center mx-auto">
                <Sparkles className="w-5 h-5" />
              </div>

              <h4 className="font-serif text-xl text-[#4A3B32] font-semibold">
                {activeModalMessage.title}
              </h4>

              <p className="font-sans text-sm text-[#4A3B32] leading-relaxed">
                {activeModalMessage.body}
              </p>

              {activeModalMessage.sub && (
                <p className="font-handwriting text-lg text-[#D9777F]">
                  "{activeModalMessage.sub}"
                </p>
              )}

              <div className="pt-2">
                <button
                  onClick={() => setActiveModalMessage(null)}
                  className="px-5 py-1.5 rounded-full bg-[#E8B4B8] text-[#4A3B32] text-xs font-medium hover:bg-[#D9777F] hover:text-white transition-colors"
                >
                  Got it! 🤍
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Secrets Tracker Modal */}
      <AnimatePresence>
        {isOpenTrackerModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs"
            onClick={onCloseTrackerModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-[#FFFDF9] rounded-3xl p-6 sm:p-7 polaroid-shadow border border-[#E8B4B8] text-left paper-pattern space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#EADFD5]">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-[#D9777F]" />
                  <h3 className="font-serif text-xl text-[#4A3B32] font-semibold">
                    Secret Easter Eggs
                  </h3>
                </div>
                <button onClick={onCloseTrackerModal} className="text-sm text-[#6E5A4E]">
                  ✕
                </button>
              </div>

              <p className="text-xs font-sans text-[#6E5A4E]">
                Rohan hid 7 little secrets in this universe. Can you uncover all of them?
              </p>

              <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
                {allSecretsList.map((item) => {
                  const isFound = secretsFound.has(item.id);

                  return (
                    <div
                      key={item.id}
                      className={`p-3 rounded-2xl border text-xs font-sans transition-all flex items-center justify-between ${
                        isFound
                          ? 'bg-[#F4DCD6]/40 border-[#E8B4B8] text-[#4A3B32]'
                          : 'bg-[#FAF7F2]/50 border-[#EADFD5] text-[#A89F95]'
                      }`}
                    >
                      <div>
                        <p className={`font-medium ${isFound ? 'text-[#4A3B32]' : 'text-[#6E5A4E]'}`}>
                          {isFound ? `✨ ${item.name}` : `🔒 ${item.name}`}
                        </p>
                        <p className="text-[11px] text-[#6E5A4E] mt-0.5">
                          {isFound ? 'Discovered!' : item.hint}
                        </p>
                      </div>

                      {/* Touch trigger for mobile users if keyboard not available */}
                      {!isFound && item.id === 'egg_kuchuu' && (
                        <button
                          onClick={() => {
                            onUnlockSecret('egg_kuchuu');
                            romanticAudio.playChime();
                            setActiveModalMessage({
                              title: "Secret Unlocked: Kuchuu Code",
                              body: "Rohan will make late-night maggi & hot chocolate for Kuchuu anytime on demand! 🍜☕",
                              sub: "Always approved."
                            });
                          }}
                          className="text-[10px] font-mono underline text-[#D9777F]"
                        >
                          tap code
                        </button>
                      )}

                      {!isFound && item.id === 'egg_bubu' && (
                        <button
                          onClick={() => {
                            onUnlockSecret('egg_bubu');
                            triggerBubuCelebration();
                          }}
                          className="text-[10px] font-mono underline text-[#D9777F]"
                        >
                          tap bubu
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 text-center">
                <p className="text-[11px] font-mono text-[#6E5A4E]">
                  Found: {secretsFound.size} / 7 secrets
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Secret 4 Hidden Star placed gracefully in footer */}
      <div id="footer-secret-star-anchor" className="hidden" onClick={handleHiddenStarClick} />
    </>
  );
};
