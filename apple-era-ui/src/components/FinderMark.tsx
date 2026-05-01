"use client";
import { useState } from 'react';

export default function FinderMark() {
  const [isWinking, setIsWinking] = useState(false);

  const handleHover = () => {
    if (!isWinking) {
      setIsWinking(true);
      setTimeout(() => setIsWinking(false), 800);
    }
  };

  return (
    <span 
      className="inline-block h-6 w-6 relative group cursor-pointer"
      onMouseEnter={handleHover}
      title="Finder"
    >
      {/* Base Finder icon */}
      <div className="absolute inset-0 rounded-[4px] bg-gradient-to-br from-[#4a9eff] to-[#0066cc] transition-all duration-300 group-hover:from-[#5aafff] group-hover:to-[#1976d2]" />
      
      {/* Finder face */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 16 16" className="text-white">
          {/* Eyes */}
          <circle 
            cx="5" 
            cy="6" 
            r="1" 
            fill="currentColor" 
            className={`transition-all duration-200 ${isWinking ? 'scale-y-0' : 'scale-y-100'}`}
          />
          <circle 
            cx="11" 
            cy="6" 
            r="1" 
            fill="currentColor"
          />
          
          {/* Wink line when winking */}
          {isWinking && (
            <line
              x1="4"
              y1="6"
              x2="6"
              y2="6"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeLinecap="round"
              className="animate-pulse"
            />
          )}
          
          {/* Smile */}
          <path
            d="M 6 10 Q 8 12 10 10"
            stroke="currentColor"
            strokeWidth="0.8"
            fill="none"
            strokeLinecap="round"
            className={`transition-all duration-300 ${isWinking ? 'stroke-yellow-300' : ''}`}
          />
        </svg>
      </div>
      
      {/* Subtle glow when winking */}
      {isWinking && (
        <div className="absolute inset-0 rounded-[4px] bg-gradient-to-br from-yellow-400/30 to-orange-400/30 animate-pulse" />
      )}
      
      <span className="sr-only">Finder - Click to wink!</span>
    </span>
  );
} 