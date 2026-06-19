// Tiny sound generator helpers using the Web Audio API.
// Audio is created on demand (after user interaction) so it works on mobile.

export function playTone({
  type = 'sine',
  frequency = 440,
  durationMs = 90,
  gain = 0.06,
  detune = 0
} = {}) {
  // Web Audio must be created after a user gesture.
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;

  const ctx = new AudioCtx();

  const osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.value = frequency;
  osc.detune.value = detune;

  const g = ctx.createGain();
  g.gain.value = 0;

  const now = ctx.currentTime;
  const duration = durationMs / 1000;

  // Smooth envelope
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(gain, now + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(g);
  g.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration + 0.01);

  // Close context shortly after.
  osc.onended = () => {
    try {
      ctx.close();
    } catch (_) {}
  };
}

export function playClickX() {
  // X: slightly higher pitch than O
  playTone({ type: 'triangle', frequency: 640, durationMs: 70, gain: 0.05 });
}

export function playClickO() {
  // O: slightly lower pitch than X
  playTone({ type: 'triangle', frequency: 520, durationMs: 70, gain: 0.05 });
}

export function playWin() {
  // Winning: quick rising chord/tones
  playTone({ type: 'sine', frequency: 523.25, durationMs: 90, gain: 0.06 }); // C5
  setTimeout(() => playTone({ type: 'sine', frequency: 659.25, durationMs: 110, gain: 0.06 }), 70); // E5
  setTimeout(() => playTone({ type: 'sine', frequency: 783.99, durationMs: 130, gain: 0.06 }), 145); // G5
}

export function playDraw() {
  // Draw: gentle descending tones
  playTone({ type: 'sine', frequency: 440, durationMs: 110, gain: 0.05 });
  setTimeout(() => playTone({ type: 'sine', frequency: 392, durationMs: 120, gain: 0.05 }), 85);
  setTimeout(() => playTone({ type: 'sine', frequency: 349.23, durationMs: 140, gain: 0.05 }), 180);
}

