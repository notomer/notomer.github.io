"use client";
import { useEffect } from 'react';

export default function Startup({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    // Play classic Mac startup chime using Web Audio API
    try {
      const audioContext = new AudioContext();
      
      // Create the classic C major chord
      const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
      const oscillators: OscillatorNode[] = [];
      const gainNodes: GainNode[] = [];
      
      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
        
        // Stagger the chord slightly for more authentic sound
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.1, audioContext.currentTime + 0.01 + (index * 0.02));
        gainNode.gain.exponentialRampToValueAtTime(0.05, audioContext.currentTime + 0.5);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.5);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.start();
        
        oscillators.push(oscillator);
        gainNodes.push(gainNode);
      });
      
      // Stop all oscillators after chord completes
      setTimeout(() => {
        oscillators.forEach(osc => osc.stop());
        audioContext.close();
      }, 2000);
      
    } catch (e) {
      console.log('Audio context not available');
    }

    // Auto-close after animation
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[1000] bg-black grid place-items-center">
      {/* Classic Mac startup screen */}
      <div className="text-center">
        {/* Happy Mac icon */}
        <div className="mb-8">
          <svg width="128" height="128" viewBox="0 0 64 64" className="text-white">
            {/* Monitor outline */}
            <rect x="8" y="8" width="48" height="36" fill="none" stroke="currentColor" strokeWidth="2" />
            {/* Screen */}
            <rect x="12" y="12" width="40" height="28" fill="currentColor" />
            {/* Face background */}
            <rect x="14" y="14" width="36" height="24" fill="black" />
            
            {/* Happy eyes */}
            <circle cx="23" cy="22" r="2" fill="currentColor" />
            <circle cx="41" cy="22" r="2" fill="currentColor" />
            
            {/* Happy smile */}
            <path d="M 26 28 Q 32 34 38 28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
            
            {/* Base */}
            <rect x="24" y="44" width="16" height="8" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        
        {/* Startup text with fade-in animation */}
        <div className="space-y-4">
          <div 
            className="text-2xl font-mono text-white animate-[fadeIn_1s_ease-in_0.5s_both]"
          >
            Welcome to Macintosh
          </div>
          
          <div className="text-sm text-gray-400 font-mono animate-[fadeIn_1s_ease-in_1.5s_both]">
            System 7.0 • 1991
          </div>
          
          <div className="text-xs text-gray-500 font-mono animate-[fadeIn_1s_ease-in_2s_both]">
            Konami code activated!
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
} 