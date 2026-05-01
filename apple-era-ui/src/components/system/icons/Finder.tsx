'use client';

import { useState, useEffect } from 'react';

interface FinderIconProps {
  className?: string;
}

export function FinderIcon({ className = "" }: FinderIconProps) {
  const [isTerminalTheme, setIsTerminalTheme] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      if (typeof document !== 'undefined') {
        const theme = document.documentElement.getAttribute('data-theme');
        setIsTerminalTheme(theme === 'terminal');
      }
    };

    checkTheme();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    if (typeof document !== 'undefined') {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`relative h-12 w-12 rounded-xl overflow-hidden bg-[var(--dock-icon-bg)] ${className}`}>
      {/* Gloss overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-xl [background:var(--dock-icon-gloss)]" />
      
      {/* Finder icon SVG */}
      <svg
        viewBox="0 0 48 48"
        className="absolute inset-0 h-full w-full text-[var(--dock-icon-stroke)]"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Two-tone face design */}
        <defs>
          <linearGradient id="finder-face-left" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5AA7FF" />
            <stop offset="100%" stopColor="#2E86FF" />
          </linearGradient>
          <linearGradient id="finder-face-right" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8AC8FF" />
            <stop offset="100%" stopColor="#5AA7FF" />
          </linearGradient>
          <linearGradient id="finder-terminal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {isTerminalTheme ? (
          /* Terminal theme - minimalist outline version */
          <>
            <rect 
              x="4" 
              y="4" 
              width="40" 
              height="40" 
              rx="8" 
              fill="none" 
              stroke="var(--dock-icon-stroke)" 
              strokeWidth="1.5"
            />
            
            {/* Center divider */}
            <line
              x1="24"
              y1="12"
              x2="24"
              y2="36"
              stroke="var(--dock-icon-stroke)"
              strokeWidth="1"
            />
            
            {/* Eyes */}
            <circle cx="18" cy="20" r="2" fill="var(--dock-icon-stroke)" />
            <circle cx="30" cy="20" r="2" fill="var(--dock-icon-stroke)" />
            
            {/* Smile */}
            <path
              d="M16 28 Q24 32 32 28"
              stroke="var(--dock-icon-stroke)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </>
        ) : (
          /* Rich themes - full colored version */
          <>
            {/* Background circle/square based on theme */}
            <rect x="4" y="4" width="40" height="40" rx="8" fill="currentColor" fillOpacity="0.1" />
            
            {/* Left face */}
            <path
              d="M12 12 L24 12 L24 36 L12 36 Z"
              fill="url(#finder-face-left)"
            />
            
            {/* Right face */}
            <path
              d="M24 12 L36 12 L36 36 L24 36 Z"
              fill="url(#finder-face-right)"
            />
            
            {/* Center divider */}
            <line
              x1="24"
              y1="12"
              x2="24"
              y2="36"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
            />
            
            {/* Eyes */}
            <circle cx="18" cy="20" r="2" fill="white" />
            <circle cx="30" cy="20" r="2" fill="white" />
            
            {/* Smile */}
            <path
              d="M16 28 Q24 32 32 28"
              stroke="white"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </>
        )}
      </svg>
    </div>
  );
} 