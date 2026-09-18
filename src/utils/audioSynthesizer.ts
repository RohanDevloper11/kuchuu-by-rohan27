// Cozy Web Audio API Ambient Music Player and Sound Effects

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private fadeInterval: number | null = null;
  private currentVolume = 0.30;
  private step = 0;

  // Romantic chord progression (Frequencies in Hz for warm dreamy chords: Cmaj9 -> Am9 -> Fmaj7 -> G6)
  private chords: number[][] = [
    [261.63, 329.63, 392.00, 493.88, 587.33], // C, E, G, B, D (Cmaj9)
    [220.00, 261.63, 329.63, 392.00, 440.00], // A, C, E, G, B (Am9)
    [174.61, 261.63, 329.63, 349.23, 440.00], // F, C, E, F, A (Fmaj7)
    [196.00, 246.94, 293.66, 392.00, 440.00]  // G, B, D, G, A (G6/9)
  ];

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Smooth volume transition helper
  public setVolumeSmooth(targetVolume: number, durationMs = 1500) {
    targetVolume = Math.max(0, Math.min(1, targetVolume));
    this.currentVolume = targetVolume;

    if (!this.customAudio) return;

    if (this.fadeInterval) {
      window.clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }

    const startVolume = this.customAudio.volume;
    const steps = 30;
    const stepInterval = durationMs / steps;
    const volumeDelta = (targetVolume - startVolume) / steps;
    let currentStep = 0;

    this.fadeInterval = window.setInterval(() => {
      if (!this.customAudio) {
        if (this.fadeInterval) window.clearInterval(this.fadeInterval);
        return;
      }
      currentStep++;
      const nextVol = Math.max(0, Math.min(1, startVolume + volumeDelta * currentStep));
      this.customAudio.volume = nextVol;

      if (currentStep >= steps) {
        this.customAudio.volume = targetVolume;
        if (this.fadeInterval) {
          window.clearInterval(this.fadeInterval);
          this.fadeInterval = null;
        }
      }
    }, stepInterval);
  }

  public getAudioInstance(url?: string): HTMLAudioElement | null {
    if (!this.customAudio && url) {
      this.customAudio = new Audio(url);
      this.customAudio.preload = 'auto';
      this.customAudio.loop = false; // Does not loop abruptly; finishes naturally
      this.customAudio.volume = 0.30;
    }
    return this.customAudio;
  }

  public isMusicPlaying() {
    return this.isPlaying;
  }

  // Starts the music from EXACTLY 1:09 (69 seconds) on first deliberate user click
  public startFromBeginning(customUrl: string, onStateChange?: (playing: boolean) => void): Promise<boolean> {
    const audio = this.getAudioInstance(customUrl);
    if (!audio) return Promise.resolve(false);

    audio.currentTime = 69; // Exactly 1 minute 09 seconds
    audio.volume = 0.05; // start low for smooth fade in
    audio.loop = false;

    // When the song finishes (first try or subsequent loops), restart and loop from 0:00
    audio.onended = () => {
      audio.currentTime = 0;
      audio.play().then(() => {
        this.isPlaying = true;
        onStateChange?.(true);
      }).catch((err) => {
        console.error("Audio loop error:", err);
        this.isPlaying = false;
        onStateChange?.(false);
      });
    };

    return audio.play()
      .then(() => {
        this.isPlaying = true;
        onStateChange?.(true);
        // Smoothly fade in to comfortable 30% volume over 1.5 seconds
        this.setVolumeSmooth(0.30, 1500);
        return true;
      })
      .catch((err) => {
        console.error("Audio playback error:", err);
        return false;
      });
  }

  // Toggle play/pause - preserves exact playback position (does NOT restart)
  public toggleMusic(customUrl?: string, onStateChange?: (playing: boolean) => void) {
    const audio = this.getAudioInstance(customUrl);
    if (audio) {
      if (this.isPlaying) {
        audio.pause();
        this.isPlaying = false;
        onStateChange?.(false);
      } else {
        audio.play().then(() => {
          this.isPlaying = true;
          onStateChange?.(true);
        }).catch((err) => {
          console.error("Audio resume error:", err);
        });
      }
      return;
    }

    // Synthesized fallback if audio file isn't present
    if (this.isPlaying) {
      this.stopSynthesizedMusic(onStateChange);
    } else {
      this.startSynthesizedMusic(onStateChange);
    }
  }

  public pauseMusic(onStateChange?: (playing: boolean) => void) {
    if (this.customAudio && this.isPlaying) {
      this.customAudio.pause();
    }
    this.stopSynthesizedMusic();
    this.isPlaying = false;
    onStateChange?.(false);
  }

  public resumeMusic(onStateChange?: (playing: boolean) => void) {
    if (this.customAudio && !this.isPlaying) {
      this.customAudio.play().then(() => {
        this.isPlaying = true;
        onStateChange?.(true);
      }).catch((err) => {
        console.error("Audio resume error:", err);
      });
    }
  }

  private startSynthesizedMusic(onStateChange?: (playing: boolean) => void) {
    this.initCtx();
    this.isPlaying = true;
    this.step = 0;
    onStateChange?.(true);

    const playNoteInArpeggio = () => {
      if (!this.isPlaying || !this.ctx) return;

      const chordIdx = Math.floor((this.step % 16) / 4);
      const noteIdx = this.step % 4;
      const currentChord = this.chords[chordIdx];
      const freq = currentChord[noteIdx % currentChord.length];

      this.playWarmPluck(freq, 0.08);

      // occasionally play a gentle bass note
      if (this.step % 8 === 0) {
        this.playWarmBass(currentChord[0] / 2, 0.12);
      }

      this.step++;
      this.timer = window.setTimeout(playNoteInArpeggio, 750);
    };

    playNoteInArpeggio();
  }

  private stopSynthesizedMusic(onStateChange?: (playing: boolean) => void) {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    onStateChange?.(false);
  }

  private playWarmPluck(freq: number, gainValue: number) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    // Soft sine with slight triangle blend for warm kalimba/rhodes timbre
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Warm lowpass filter to remove harsh highs
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(300, now + 1.2);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(gainValue, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 1.7);
  }

  private playWarmBass(freq: number, gainValue: number) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(gainValue, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 2.6);
  }

  // Sound effect: magical gentle chime
  public playChime() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const time = this.ctx!.currentTime + idx * 0.08;
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.04, time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.9);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(time);
        osc.stop(time + 1.0);
      });
    } catch {
      // Audio context policy
    }
  }

  // Sound effect: cute tactile pop
  public playPop() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // Ignore
    }
  }
}

export const romanticAudio = new RomanticAudioEngine();
