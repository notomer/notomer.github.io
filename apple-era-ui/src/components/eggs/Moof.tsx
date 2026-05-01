"use client";
import { useEffect } from 'react';

const Clarus = () => (
  <svg width="96" height="96" viewBox="0 0 64 64" className="drop-shadow-lg"
       style={{ filter: 'drop-shadow(0 6px 12px rgba(0,0,0,.25))' }}>
    {/* Clarus the Dogcow - simplified pixel art style */}
    <rect width="64" height="64" fill="none" />
    {/* Body */}
    <rect x="18" y="28" width="28" height="20" fill="currentColor" rx="2" />
    {/* Head */}
    <rect x="26" y="12" width="12" height="18" fill="currentColor" rx="6" />
    {/* Ears */}
    <rect x="22" y="14" width="6" height="8" fill="currentColor" rx="3" />
    <rect x="36" y="14" width="6" height="8" fill="currentColor" rx="3" />
    {/* Legs */}
    <rect x="20" y="45" width="4" height="12" fill="currentColor" rx="2" />
    <rect x="28" y="45" width="4" height="12" fill="currentColor" rx="2" />
    <rect x="32" y="45" width="4" height="12" fill="currentColor" rx="2" />
    <rect x="40" y="45" width="4" height="12" fill="currentColor" rx="2" />
    {/* Tail */}
    <rect x="44" y="32" width="8" height="4" fill="currentColor" rx="2" />
    {/* Spots */}
    <circle cx="24" cy="35" r="2" fill="var(--bg)" />
    <circle cx="38" cy="38" r="2" fill="var(--bg)" />
    {/* Eyes */}
    <circle cx="30" cy="20" r="1.5" fill="var(--bg)" />
    <circle cx="34" cy="20" r="1.5" fill="var(--bg)" />
  </svg>
);

export default function Moof({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    // Play a simple "moof" sound using Web Audio API
    try {
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(420, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(320, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.18);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.start();
      
      setTimeout(() => {
        oscillator.stop();
        audioContext.close();
      }, 200);
    } catch (e) {
      // Audio context failed, continue silently
      console.log('Audio context not available');
    }

    // Auto-close after animation
    const timer = setTimeout(onClose, 1600);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="pointer-events-none fixed top-20 left-10 z-[1001] text-[var(--accent)]">
      {/* CSS Animation for Clarus to skitter across screen */}
      <style jsx>{`
        @keyframes moof {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 1;
          }
          20% {
            transform: translate(10vw, -5vh) rotate(5deg) scale(1.1);
            opacity: 1;
          }
          100% {
            transform: translate(120vw, -40vh) rotate(25deg) scale(0.8);
            opacity: 0;
          }
        }
        .moof-animation {
          animation: moof 1.2s ease-in-out forwards;
        }
      `}</style>
      
      <div className="moof-animation">
        <Clarus />
        <div className="mt-1 font-mono text-sm text-[var(--fg)] text-center">moof!</div>
      </div>
    </div>
  );
} 