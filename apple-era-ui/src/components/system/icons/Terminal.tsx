'use client';

import { useState, useEffect } from 'react';

interface TerminalIconProps {
  className?: string;
}

export function TerminalIcon({ className = "" }: TerminalIconProps) {
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
      
      {/* Terminal icon SVG */}
      <svg
        viewBox="0 0 48 48"
        className="absolute inset-0 h-full w-full text-[var(--dock-icon-stroke)]"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="terminal-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2c3e50" />
            <stop offset="100%" stopColor="#1a252f" />
          </linearGradient>
          <linearGradient id="terminal-screen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f1419" />
            <stop offset="100%" stopColor="#0a0e13" />
          </linearGradient>
        </defs>
        
        {isTerminalTheme ? (
          /* Terminal theme - minimalist outline version */
          <>
            <rect 
              x="6" 
              y="6" 
              width="36" 
              height="36" 
              rx="6" 
              fill="none"
              stroke="var(--dock-icon-stroke)"
              strokeWidth="1.5"
            />
            
            {/* Simple prompt */}
            <text
              x="14"
              y="30"
              fontSize="8"
              fill="var(--dock-icon-stroke)"
              fontFamily="monospace"
            >
              &gt;_
            </text>
          </>
        ) : (
          /* Rich themes - full detailed version */
          <>
            {/* Terminal window background */}
            <rect 
              x="6" 
              y="6" 
              width="36" 
              height="36" 
              rx="6" 
              fill="url(#terminal-bg)"
            />
            
            {/* Title bar */}
            <rect 
              x="6" 
              y="6" 
              width="36" 
              height="8" 
              rx="6"
              fill="rgba(255,255,255,0.15)"
            />
            <rect 
              x="6" 
              y="12" 
              width="36" 
              height="2" 
              fill="rgba(255,255,255,0.1)"
            />
            
            {/* Traffic lights */}
            <circle cx="12" cy="10" r="1.5" fill="#ff5f57" />
            <circle cx="16" cy="10" r="1.5" fill="#ffbd2e" />
            <circle cx="20" cy="10" r="1.5" fill="#28ca42" />
            
            {/* Terminal content area */}
            <rect 
              x="8" 
              y="16" 
              width="32" 
              height="24" 
              rx="2" 
              fill="url(#terminal-screen)"
            />
            
            {/* Terminal prompt symbols */}
            <g>
              {/* Prompt character ">" */}
              <path
                d="M12 24 L16 26 L12 28"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-400"
              />
              
              {/* Underscore cursor "_" */}
              <rect
                x="18"
                y="27"
                width="6"
                height="1.5"
                fill="currentColor"
                className="text-green-400 animate-pulse"
              />
            </g>
            
            {/* Optional code lines for richer themes */}
            <g>
              <rect x="12" y="20" width="12" height="1" fill="rgba(255,255,255,0.3)" />
              <rect x="12" y="22" width="8" height="1" fill="rgba(255,255,255,0.2)" />
              <rect x="12" y="32" width="16" height="1" fill="rgba(255,255,255,0.25)" />
              <rect x="12" y="34" width="10" height="1" fill="rgba(255,255,255,0.2)" />
            </g>
          </>
        )}
      </svg>
    </div>
  );
} 