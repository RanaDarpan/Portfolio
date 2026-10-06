import { useCallback } from 'react';

// Create a global AudioContext to bypass limitations and speed up synthesis
let audioCtx: AudioContext | null = null;

export const useSound = () => {
  const playClick = useCallback(() => {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      // Resume context if suspended (common in browsers to prevent auto-play)
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      // Synthesize a very short, high-fidelity mechanical "pop" / "click"
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, audioCtx.currentTime); 
      oscillator.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.05);

      gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);

      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 0.05);
    } catch (e) {
      console.error("Audio Context failed", e);
    }
  }, []);

  return { playClick };
};
