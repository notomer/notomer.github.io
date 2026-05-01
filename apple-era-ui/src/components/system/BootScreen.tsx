'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

export default function BootScreen() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const [skipHint, setSkipHint] = useState(false);
  const [hasPlayedChime, setHasPlayedChime] = useState(false);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const prefReducedRef = useRef(false);

  // Check reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      prefReducedRef.current = mediaQuery.matches;
    }
  }, []);

  const playChime = useCallback(() => {
    if (prefReducedRef.current || hasPlayedChime) return;
    setHasPlayedChime(true);
    
    try {
      const ctx = new AudioContext();
      const g = ctx.createGain();
      g.gain.value = 0.06;
      g.connect(ctx.destination);
      
      const notes = [196, 392, 784]; // G2, G3, G4-ish
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;
        osc.connect(g);
        osc.start(ctx.currentTime + i * 0.02);
        osc.stop(ctx.currentTime + 0.35 + i * 0.02);
      });
      
      setTimeout(() => {
        try {
          ctx.close();
        } catch (e) {
          // AudioContext might already be closed
        }
      }, 600);
    } catch (e) {
      // AudioContext not supported or blocked
      console.debug('Audio playback not available');
    }
  }, [hasPlayedChime]);

  const complete = useCallback((skipped = false) => {
    // Clear all timers
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    
    setProgress(100);
    localStorage.setItem('bootSeen', '1');
    
    // Play chime on first completion (if user interacted)
    if (skipped && !hasPlayedChime) {
      playChime();
    }
    
    // Brief hold at 100% for smoothness, then fade out
    const fadeTimeout = setTimeout(() => {
      setShow(false);
    }, prefReducedRef.current ? 0 : 240);
    
    timersRef.current.push(fadeTimeout);
  }, [playChime, hasPlayedChime]);

  // Handle bypass for returning users
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (localStorage.getItem('bootSeen') === '1') {
      // Quick micro-fade for returning users
      const bypassTimeout = setTimeout(() => {
        setShow(false);
      }, prefReducedRef.current ? 0 : 120);
      
      timersRef.current.push(bypassTimeout);
      return;
    }
  }, []);

  // Main boot sequence
  useEffect(() => {
    if (!show || localStorage.getItem('bootSeen') === '1') return;

    let currentProgress = 0;
    
    const progressStep = () => {
      // Simulate realistic progress with some randomness
      const increment = Math.max(1, 6 - Math.random() * 3);
      currentProgress = Math.min(90, currentProgress + increment);
      setProgress(currentProgress);
      
      if (currentProgress < 90) {
        const nextDelay = 120 + Math.random() * 120;
        const timer = setTimeout(progressStep, nextDelay);
        timersRef.current.push(timer);
      }
    };

    // Start progress after initial delay
    const startTimer = setTimeout(progressStep, 240);
    timersRef.current.push(startTimer);

    // Show skip hint after a moment
    const hintTimer = setTimeout(() => {
      setSkipHint(true);
    }, 900);
    timersRef.current.push(hintTimer);

    // Hard timeout safety net
    const safetyTimer = setTimeout(() => {
      complete(false);
    }, 3500);
    timersRef.current.push(safetyTimer);

    // Event handlers for skip functionality
    const handleKeyDown = (e: KeyboardEvent) => {
      complete(true);
    };

    const handlePointerDown = (e: PointerEvent) => {
      complete(true);
    };

    // Add global event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('pointerdown', handlePointerDown);

    // Cleanup function
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('pointerdown', handlePointerDown);
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [show, complete]);

  // Listen for app ready signal to complete from 90% to 100%
  useEffect(() => {
    if (!show || progress < 90) return;

    const checkAppReady = () => {
      // This will be triggered by the appReady() call from layout
      if (progress >= 90) {
        complete(false);
      }
    };

    // Check immediately in case appReady was already called
    checkAppReady();
  }, [show, progress, complete]);

  if (!show) return null;

  return (
    <div 
      className="fixed inset-0 z-[1000] grid place-items-center bg-[var(--boot-bg)] text-[var(--boot-fg)] transition-opacity duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Startup screen"
      style={{
        opacity: show ? 1 : 0,
        transition: prefReducedRef.current ? 'none' : 'opacity 180ms ease-out'
      }}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Logo - Apple-inspired but non-infringing */}
        <div aria-hidden="true" className="relative h-20 w-20">
          <svg 
            viewBox="0 0 100 100" 
            className="h-full w-full"
            fill="currentColor"
          >
            {/* Squircle background */}
            <rect 
              x="12" 
              y="12" 
              width="76" 
              height="76" 
              rx="22" 
              fill="currentColor" 
              opacity="0.12"
            />
            {/* Abstract leaf/teardrop shape */}
            <path 
              d="M50 22c10 0 18 8 18 18 0 14-18 30-18 30S32 54 32 40c0-10 8-18 18-18z" 
              fill="currentColor"
            />
            {/* Small highlight */}
            <circle 
              cx="45" 
              cy="35" 
              r="3" 
              fill="currentColor" 
              opacity="0.4"
            />
          </svg>
        </div>

        {/* Progress Bar */}
        <div className="w-[min(420px,80vw)]" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
          <div className="h-2 rounded-[var(--boot-progress-radius)] bg-[var(--boot-progress-bg)] overflow-hidden">
            <div 
              className="h-full rounded-[var(--boot-progress-radius)] bg-[var(--boot-progress-fg)] transition-[width] duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Skip Button / Hint */}
        <button
          className="text-xs leading-relaxed opacity-60 hover:opacity-100 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--boot-progress-fg)] focus-visible:opacity-100 min-h-[1.25rem]"
          onClick={() => complete(true)}
          aria-label="Skip startup sequence"
          tabIndex={skipHint ? 0 : -1}
        >
          {skipHint ? 'Press any key or click to skip' : '\u00A0'}
        </button>
      </div>
    </div>
  );
} 