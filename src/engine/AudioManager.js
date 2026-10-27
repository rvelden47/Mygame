export class AudioManager {
  constructor() {
    this.musicAudio = new Audio();
    this.musicAudio.loop = true;

    this.sfxAudio = new Audio();

    this.musicVolume = 0.5;
    this.sfxVolume = 1.0;

    // Web Audio API context for synthesized sounds
    this.audioCtx = null;
  }

  initWebAudio() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
  }

  playMusic(url, fadeDuration = 1000) {
    if (this.musicAudio.src.includes(url)) {
      if (this.musicAudio.paused) {
        this.musicAudio.play().catch(e => console.warn("Audio autoplay prevented", e));
      }
      return;
    }

    // fade out current music
    if (!this.musicAudio.paused) {
        this.fadeOutMusic(fadeDuration / 2, () => {
            this.startNewMusic(url, fadeDuration / 2);
        });
    } else {
        this.startNewMusic(url, fadeDuration);
    }
  }

  startNewMusic(url, fadeDuration) {
    this.musicAudio.src = url;
    this.musicAudio.volume = 0;
    this.musicAudio.play().catch(e => console.warn("Audio autoplay prevented", e));

    // fade in
    const steps = 20;
    const stepTime = fadeDuration / steps;
    const volStep = this.musicVolume / steps;

    let currentVol = 0;
    const fadeInterval = setInterval(() => {
        currentVol += volStep;
        if (currentVol >= this.musicVolume) {
            currentVol = this.musicVolume;
            clearInterval(fadeInterval);
        }
        this.musicAudio.volume = currentVol;
    }, stepTime);
  }

  fadeOutMusic(duration, callback) {
    const steps = 20;
    const stepTime = duration / steps;
    const volStep = this.musicAudio.volume / steps;

    let currentVol = this.musicAudio.volume;
    const fadeInterval = setInterval(() => {
        currentVol -= volStep;
        if (currentVol <= 0) {
            currentVol = 0;
            clearInterval(fadeInterval);
            this.musicAudio.pause();
            if (callback) callback();
        }
        this.musicAudio.volume = currentVol;
    }, stepTime);
  }

  stopMusic() {
    this.musicAudio.pause();
    this.musicAudio.currentTime = 0;
  }

  playSound(url) {
    this.sfxAudio.src = url;
    this.sfxAudio.volume = this.sfxVolume;
    this.sfxAudio.play().catch(e => console.warn("SFX autoplay prevented", e));
  }

  playSynthesizedClick() {
    this.initWebAudio();
    if (!this.audioCtx) return;

    if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
    }

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.audioCtx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.5, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.1);
  }
}
