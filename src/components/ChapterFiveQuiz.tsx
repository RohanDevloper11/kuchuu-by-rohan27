import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Check, Award, ArrowRight, RotateCcw, Heart, Sparkles } from 'lucide-react';
import { QuizQuestion } from '../types';
import { romanticAudio } from '../utils/audioSynthesizer';

interface ChapterFiveQuizProps {
  questions: QuizQuestion[];
}

export const ChapterFiveQuiz: React.FC<ChapterFiveQuizProps> = ({ questions }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ [qId: number]: number }>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = questions[currentQIndex];

  const handleSelectOption = (idx: number) => {
    romanticAudio.playPop();
    setSelectedOptionIndex(idx);
    setAnswers(prev => ({ ...prev, [currentQ.id]: idx }));
  };

  const handleNext = () => {
    romanticAudio.playPop();
    setSelectedOptionIndex(null);
    if (currentQIndex + 1 < questions.length) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
      romanticAudio.playChime();
    }
  };

  const handleRestart = () => {
    romanticAudio.playPop();
    setCurrentQIndex(0);
    setSelectedOptionIndex(null);
    setAnswers({});
    setIsCompleted(false);
  };

  return (
    <div id="quiz" className="w-full h-full flex flex-col justify-between items-center text-center px-3 sm:px-4 py-1 select-none">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-1 max-w-md mx-auto"
      >
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#EADFD5]/70 text-[11px] font-mono text-[#6E5A4E]">
          <HelpCircle className="w-3 h-3 text-[#D9777F]" />
          <span>Chapter 05 • Relationship Quiz</span>
        </span>

        <h2 className="font-serif text-2xl sm:text-3xl text-[#4A3B32] font-semibold leading-tight">
          Chalo Roshika ki Mummy Ji...
        </h2>
        <p className="font-handwriting text-xl sm:text-2xl text-[#D9777F] leading-none">
          dekhte hain Rohan ko kitna jaanti ho.
        </p>
      </motion.div>

      {/* Quiz Card */}
      <div className="w-full max-w-sm mx-auto rounded-2xl bg-[#FFFDF9] border border-[#E8B4B8] polaroid-shadow p-4 sm:p-5 paper-pattern my-auto text-left relative overflow-hidden">
        {!isCompleted ? (
          <div className="space-y-3">
            {/* Progress Indicator */}
            <div className="flex items-center justify-between text-[11px] font-mono text-[#6E5A4E] pb-2 border-b border-[#EADFD5]">
              <span>Q{currentQIndex + 1} of {questions.length}</span>
              <div className="flex space-x-1">
                {questions.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === currentQIndex
                        ? 'bg-[#D9777F]'
                        : i < currentQIndex
                        ? 'bg-[#E8B4B8]'
                        : 'bg-[#EADFD5]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question Title */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="space-y-2.5"
              >
                <h3 className="font-serif text-base sm:text-lg text-[#4A3B32] font-semibold leading-snug">
                  {currentQ.question}
                </h3>

                {/* Options list */}
                <div className="space-y-1.5">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = selectedOptionIndex === idx;

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        className={`w-full text-left p-2.5 rounded-xl border text-xs font-sans transition-all duration-150 flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#F4DCD6]/80 border-[#D9777F] text-[#4A3B32] font-medium shadow-2xs'
                            : 'bg-[#FAF7F2]/70 border-[#EADFD5] text-[#4A3B32] hover:border-[#E8B4B8]'
                        }`}
                      >
                        <span className="line-clamp-2 leading-tight">{opt.label}</span>
                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                          isSelected
                            ? 'border-[#D9777F] bg-[#D9777F] text-white'
                            : 'border-[#D3C5B8] bg-white'
                        }`}>
                          {isSelected && <Check className="w-2.5 h-2.5" />}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Reaction Box */}
                {selectedOptionIndex !== null && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8B4B8] flex items-center space-x-2"
                  >
                    <span className="text-base shrink-0">💬</span>
                    <div className="min-w-0 flex-1">
                      <p className="font-handwriting text-base sm:text-lg text-[#C85A66] leading-tight truncate">
                        "{currentQ.options[selectedOptionIndex].rohanResponse}"
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Next button */}
                <div className="flex justify-end pt-1">
                  <button
                    onClick={handleNext}
                    disabled={selectedOptionIndex === null}
                    className="px-4 py-1.5 rounded-full bg-[#E8B4B8] text-[#4A3B32] font-sans font-medium text-xs hover:bg-[#D9777F] hover:text-white transition-all disabled:opacity-40 disabled:pointer-events-none flex items-center space-x-1.5 active:scale-95"
                  >
                    <span>{currentQIndex + 1 === questions.length ? 'See Result 🏆' : 'Next →'}</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          /* Quiz Final Result Card */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-2 space-y-3"
          >
            <div className="w-12 h-12 rounded-full bg-[#F4DCD6] text-[#D9777F] flex items-center justify-center mx-auto shadow-sm">
              <Award className="w-6 h-6" />
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-[#6E5A4E] uppercase tracking-widest">
                Official Test Results
              </span>
              <h3 className="font-serif text-lg sm:text-xl text-[#4A3B32] font-bold">
                Roshika Compatibility Certificate
              </h3>
              <p className="font-handwriting text-base text-[#D9777F]">
                Awarded to: Rohan & Roshika ki Mummy Ji (Vanshika)
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8B4B8] text-center space-y-1.5 text-xs text-[#4A3B32]">
              <div className="flex items-center justify-center space-x-1 text-[#D9777F]">
                <Heart className="w-3.5 h-3.5 fill-[#D9777F]" />
                <span className="font-mono font-bold text-sm">100% MATCH SCORE</span>
                <Heart className="w-3.5 h-3.5 fill-[#D9777F]" />
              </div>
              <p className="font-sans text-[11px] leading-relaxed text-[#6E5A4E]">
                "Diagnosis confirms: Chahe kuch bhi select karo, result toh yahi nikalna tha ki we are made for each other."
              </p>
            </div>

            <div className="flex justify-center pt-1">
              <button
                onClick={handleRestart}
                className="inline-flex items-center space-x-1 px-3 py-1 rounded-full border border-[#EADFD5] text-[11px] font-mono text-[#6E5A4E] hover:bg-[#FAF7F2]"
              >
                <RotateCcw className="w-3 h-3" />
                <span>retry quiz</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>

      <div className="text-[11px] font-handwriting text-[#6E5A4E] pt-0.5">
        (Rohan approved: 100% correct answers only)
      </div>
    </div>
  );
};
