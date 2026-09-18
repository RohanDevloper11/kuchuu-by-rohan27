import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, RefreshCw, ShieldAlert, Cpu, Heart, CheckCircle2 } from 'lucide-react';
import { romanticAudio } from '../utils/audioSynthesizer';
import { DatabaseDiagnosis } from '../types';

interface ChapterThreeDatabaseProps {
  diagnoses: DatabaseDiagnosis[];
  herName: string;
  nicknames: string[];
}

export const ChapterThreeDatabase: React.FC<ChapterThreeDatabaseProps> = ({
  diagnoses,
  herName,
  nicknames
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [scanCount, setScanCount] = useState(1);

  const activeDiagnosis = diagnoses[currentIdx] || diagnoses[0];

  const handleGenerateNickname = () => {
    romanticAudio.playPop();
    setIsScanning(true);
    let counter = 0;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % diagnoses.length);
      counter++;
      if (counter > 8) {
        clearInterval(interval);
        const randomChoice = Math.floor(Math.random() * diagnoses.length);
        setCurrentIdx(randomChoice);
        setIsScanning(false);
        setScanCount(c => c + 1);
        romanticAudio.playChime();
      }
    }, 90);
  };

  return (
    <div id="database" className="w-full h-full flex flex-col justify-between items-center text-center px-3 sm:px-4 py-1 select-none">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-1 max-w-md mx-auto"
      >
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#EADFD5]/70 text-[11px] font-mono text-[#6E5A4E]">
          <Cpu className="w-3 h-3 text-[#D9777F]" />
          <span>Chapter 03 • System Diagnostics</span>
        </span>

        <h2 className="font-mono text-xl sm:text-2xl text-[#4A3B32] font-semibold tracking-tight leading-tight">
          KU CHUU DATABASE™
        </h2>
        <p className="font-handwriting text-lg sm:text-xl text-[#D9777F] leading-none">
          Official Vanshika Security & Affection Terminal
        </p>
      </motion.div>

      {/* Retro-Cute Terminal Window */}
      <div className="w-full max-w-sm mx-auto rounded-2xl bg-[#1C1A24] border border-[#3E384D] shadow-xl overflow-hidden font-mono text-xs text-[#E6E1E8] my-auto">
        {/* Mac-style Window Titlebar */}
        <div className="px-3 py-2 bg-[#15131C] border-b border-[#2D2838] flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF7B89]/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F6D6AC]/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#A8E6CF]/80 inline-block" />
            <span className="ml-1.5 text-[10px] text-[#8F889B] font-mono">
              maalkin_headquaters_v27.sys
            </span>
          </div>
          <div className="flex items-center space-x-1 text-[#8F889B] text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>LIVE_MONITOR</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-3.5 sm:p-4 space-y-3">
          {/* Status logs */}
          <div className="text-[11px] text-[#8F889B] text-left flex items-center justify-between">
            <span className="text-[#A8E6CF] flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3 shrink-0" />
              <span>Subject: {herName}</span>
            </span>
            <span className="text-[10px] text-[#8F889B]">Tap alias below:</span>
          </div>

          {/* Nicknames Badges */}
          <div className="flex flex-wrap gap-1.5 justify-center">
            {nicknames.map((nick) => {
              const targetIdx = diagnoses.findIndex(
                (d) => d.nickname.toLowerCase() === nick.toLowerCase()
              );
              const isActive = activeDiagnosis.nickname.toLowerCase() === nick.toLowerCase();
              return (
                <button
                  key={nick}
                  type="button"
                  onClick={() => {
                    if (targetIdx !== -1) {
                      setCurrentIdx(targetIdx);
                      romanticAudio.playChime();
                    }
                  }}
                  className={`px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#E8B4B8] text-[#1C1A24] font-bold ring-1 ring-[#FAF7F2] scale-105'
                      : 'bg-[#2D2838] text-[#D3C5B8] hover:bg-[#3D364A]'
                  }`}
                >
                  {nick}
                </button>
              );
            })}
          </div>

          {/* Diagnostic Monitor Card */}
          <div className="p-3 rounded-xl bg-[#15131C] border border-[#2D2838] text-left space-y-2">
            <div className="flex items-center justify-between border-b border-[#2D2838] pb-1.5">
              <div className="flex items-center space-x-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-[#FF7B89]" />
                <span className="text-[10px] text-[#8F889B]">PROTOCOL:</span>
              </div>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#FF7B89]/20 text-[#FF7B89]">
                {activeDiagnosis.alertLevel}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeDiagnosis.nickname}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="space-y-1.5 text-left"
              >
                <p className="text-xs sm:text-sm font-bold text-[#FAF7F2] font-mono tracking-wide truncate">
                  &gt;&gt; {activeDiagnosis.detectionText}
                </p>
                <p className="text-[11px] text-[#F6D6AC] pl-1.5 border-l border-[#F6D6AC] line-clamp-2 leading-tight">
                  {activeDiagnosis.attribute1}
                </p>
                <p className="text-[11px] text-[#F7D6C8] pl-1.5 border-l border-[#F7D6C8] line-clamp-2 leading-tight">
                  {activeDiagnosis.attribute2}
                </p>
                <div className="pt-1.5 border-t border-[#2D2838] text-[11px] text-[#A8E6CF] font-mono flex items-center space-x-1.5">
                  <span className="text-[#FF7B89] font-bold">DO:</span>
                  <span className="truncate">{activeDiagnosis.systemAction}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Action button */}
          <div className="pt-1 flex items-center justify-between gap-2">
            <button
              id="generate-nickname-btn"
              onClick={handleGenerateNickname}
              disabled={isScanning}
              className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-[#E8B4B8] to-[#F7D6C8] text-[#1C1A24] font-medium font-sans text-xs hover:opacity-95 active:scale-95 transition-all flex items-center justify-center space-x-1.5 shadow-sm disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Scanning...' : "Generate today's name"}</span>
            </button>

            <span className="text-[10px] text-[#8F889B] font-mono shrink-0">
              Scans: #{scanCount}
            </span>
          </div>
        </div>
      </div>

      <div className="text-[11px] font-handwriting text-[#6E5A4E] pt-0.5">
        (100% certified cute diagnosis by Rohan)
      </div>
    </div>
  );
};
