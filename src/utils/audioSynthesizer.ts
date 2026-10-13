/**
 * Web Audio API synthesizer for realistic physical camera sound effects
 * Shutter release, dial clicks, video REC start/stop beeps, focus ring ratchet
 */

class CameraAudio {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  /**
   * Mechanical shutter sound (Mirror slap + shutter curtain double transient)
   */
  playShutterRelease(shutterSpeedS: number = 0.01) {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // 1. First transient: Mirror Flip up
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(140, now);
      osc1.frequency.exponentialRampToValueAtTime(40, now + 0.04);
      gain1.gain.setValueAtTime(0.4, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.05);

      // Noise burst for mechanical slap
      const bufferSize = this.ctx.sampleRate * 0.03;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(1200, now);
      noiseFilter.Q.setValueAtTime(2.0, now);
      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.6, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.03);
      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      whiteNoise.start(now);

      // 2. Second transient: Curtain closure after exposure time (capped between 0.03s and 0.4s for audible feedback)
      const curtainDelay = Math.min(0.35, Math.max(0.035, shutterSpeedS));
      const curtainTime = now + curtainDelay;

      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(220, curtainTime);
      osc2.frequency.exponentialRampToValueAtTime(60, curtainTime + 0.05);
      gain2.gain.setValueAtTime(0.35, curtainTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, curtainTime + 0.05);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(curtainTime);
      osc2.stop(curtainTime + 0.06);

      const curtainNoise = this.ctx.createBufferSource();
      curtainNoise.buffer = noiseBuffer;
      const curtainNoiseGain = this.ctx.createGain();
      curtainNoiseGain.gain.setValueAtTime(0.4, curtainTime);
      curtainNoiseGain.gain.exponentialRampToValueAtTime(0.01, curtainTime + 0.025);
      curtainNoise.connect(noiseFilter);
      curtainNoise.start(curtainTime);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  /**
   * Tactile Dial step click (subtle mechanical tooth tick)
   */
  playDialClick() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.008);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.008);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.01);
    } catch {
      // Ignored
    }
  }

  /**
   * Video REC start (Blackmagic high pitch confirmation beep)
   */
  playRecStart() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Ignored
    }
  }

  /**
   * Video REC stop (Double descending beep)
   */
  playRecStop() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      
      const beep = (startTime: number, freq: number) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.12, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.06);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.07);
      };

      beep(now, 1000);
      beep(now + 0.09, 750);
    } catch {
      // Ignored
    }
  }

  /**
   * Lens autofocus confirm chirp
   */
  playFocusLock() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2400, now);
      osc.frequency.setValueAtTime(2800, now + 0.04);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.11);
    } catch {
      // Ignored
    }
  }
}

export const cameraAudio = new CameraAudio();
