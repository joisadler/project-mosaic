import type { FeedbackPreferences } from "./preferences";

export type FeedbackKind = "confirmed" | "correct" | "incorrect" | "swipe" | "page" | "flip";
type FeedbackEffect = {
  notes: readonly number[];
  vibration: number;
  sweep?: { to: number; duration: number; peak: number };
};
const effects: Record<FeedbackKind, FeedbackEffect> = {
  swipe: { notes: [640], vibration: 0, sweep: { to: 160, duration: .15, peak: .035 } },
  page: { notes: [820], vibration: 0, sweep: { to: 260, duration: .11, peak: .028 } },
  flip: { notes: [460], vibration: 0, sweep: { to: 120, duration: .18, peak: .038 } },
  confirmed: { notes: [520, 780], vibration: 50 },
  correct: { notes: [660, 880], vibration: 50 },
  incorrect: { notes: [260, 220], vibration: 60 },
} as const;

export function requestVibration(duration: number): "unsupported" | "accepted" | "rejected" {
  if (typeof navigator.vibrate !== "function") return "unsupported";
  try { return navigator.vibrate(duration) ? "accepted" : "rejected"; }
  catch { return "rejected"; }
}

export function createFeedbackPlayer() {
  let context: AudioContext | null = null;
  let generation = 0;
  const voices = new Set<OscillatorNode>();

  const stop = () => {
    generation += 1;
    for (const voice of voices) {
      try { voice.stop(); } catch { /* Already ended. */ }
      voice.disconnect();
    }
    voices.clear();
    requestVibration(0);
  };

  return {
    stop,
    async play(kind: FeedbackKind, preferences: FeedbackPreferences): Promise<boolean> {
      stop();
      const request = generation;
      const effect = effects[kind];
      const sweep = effect.sweep;
      if (document.hidden) return false;
      if (preferences.haptics && effect.vibration > 0) requestVibration(effect.vibration);
      if (!preferences.sound) return true;
      if (sweep && navigator.userActivation?.hasBeenActive === false) return false;
      const requestedAt = performance.now();
      try {
        context ??= new AudioContext();
        if (context.state === "suspended") await context.resume();
        if (request !== generation || document.hidden || (sweep && performance.now() - requestedAt > 250)) return false;
        if (context.state !== "running") return false;
        const audio = context;
        const start = audio.currentTime;
        effect.notes.forEach((frequency, index) => {
          const oscillator = audio.createOscillator();
          const gain = audio.createGain();
          const time = start + index * 0.075;
          oscillator.type = "sine";
          oscillator.frequency.value = frequency;
          if (sweep) oscillator.frequency.exponentialRampToValueAtTime(sweep.to, time + sweep.duration - .01);
          gain.gain.setValueAtTime(0, time);
          gain.gain.linearRampToValueAtTime(sweep?.peak ?? 0.055, time + 0.008);
          gain.gain.exponentialRampToValueAtTime(0.001, time + ((sweep?.duration ?? .1) - .005));
          oscillator.connect(gain);
          gain.connect(audio.destination);
          voices.add(oscillator);
          oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); voices.delete(oscillator); };
          oscillator.start(time);
          oscillator.stop(time + (sweep?.duration ?? .1));
        });
        return true;
      } catch { return false; }
    },
    close() {
      stop();
      void context?.close().catch(() => undefined);
      context = null;
    },
  };
}
