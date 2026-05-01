"use client";
import { useEffect } from 'react';

const SadMacIcon = () => (
  <svg width="128" height="128" viewBox="0 0 64 64" className="text-[var(--fg)]">
    {/* Classic Sad Mac icon in pixel art style */}
    <rect width="64" height="64" fill="none" />
    
    {/* Monitor outline */}
    <rect x="8" y="8" width="48" height="36" fill="none" stroke="currentColor" strokeWidth="2" />
    
    {/* Screen */}
    <rect x="12" y="12" width="40" height="28" fill="currentColor" />
    
    {/* Face background */}
    <rect x="14" y="14" width="36" height="24" fill="var(--bg)" />
    
    {/* Error code */}
    <rect x="16" y="16" width="4" height="2" fill="currentColor" />
    <rect x="22" y="16" width="4" height="2" fill="currentColor" />
    <rect x="28" y="16" width="4" height="2" fill="currentColor" />
    <rect x="34" y="16" width="4" height="2" fill="currentColor" />
    <rect x="40" y="16" width="4" height="2" fill="currentColor" />
    <rect x="46" y="16" width="2" height="2" fill="currentColor" />
    
    {/* Sad eyes - X marks */}
    <rect x="20" y="22" width="2" height="2" fill="currentColor" />
    <rect x="24" y="22" width="2" height="2" fill="currentColor" />
    <rect x="22" y="20" width="2" height="2" fill="currentColor" />
    <rect x="22" y="24" width="2" height="2" fill="currentColor" />
    
    <rect x="38" y="22" width="2" height="2" fill="currentColor" />
    <rect x="42" y="22" width="2" height="2" fill="currentColor" />
    <rect x="40" y="20" width="2" height="2" fill="currentColor" />
    <rect x="40" y="24" width="2" height="2" fill="currentColor" />
    
    {/* Sad mouth */}
    <rect x="26" y="32" width="12" height="2" fill="currentColor" />
    <rect x="24" y="30" width="2" height="2" fill="currentColor" />
    <rect x="38" y="30" width="2" height="2" fill="currentColor" />
    
    {/* Base */}
    <rect x="24" y="44" width="16" height="8" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export default function SadMac({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    // Play classic Mac error beep sound
    try {
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.start();
      
      setTimeout(() => {
        oscillator.stop();
        audioContext.close();
      }, 350);
    } catch (e) {
      console.log('Audio context not available');
    }
  }, []);

  const handleRestart = () => {
    // Add a little flourish before closing
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center bg-[var(--bg)]">
      <div className="text-center">
        <div className="mb-8">
          <SadMacIcon />
        </div>
        
        <h1 className="text-2xl font-mono font-bold text-[var(--fg)] mb-4">
          System Error
        </h1>
        
        <div className="font-mono text-sm text-[var(--muted)] mb-8 space-y-2">
          <p>Sorry, a system error occurred.</p>
          <p>Error Type: 01</p>
          <p>ID = 0000420F</p>
          <p className="text-xs mt-4 opacity-70">
            (This is just a nostalgic recreation)
          </p>
        </div>
        
        <button
          onClick={handleRestart}
          className="px-6 py-3 bg-[var(--btn-bg)] text-[var(--btn-fg)] border border-[var(--btn-border)] rounded-ui font-ui font-bold shadow-btn transition hover:scale-[0.98]"
        >
          Restart
        </button>
        
        <div className="mt-6 text-xs font-mono text-[var(--muted)] opacity-50">
          To continue, click Restart or press any key.
        </div>
      </div>
    </div>
  );
} 