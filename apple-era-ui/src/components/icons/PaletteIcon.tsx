"use client";
import React from 'react';

export function PaletteIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3a9 9 0 1 0 0 18h1.5a2.5 2.5 0 0 0 0-5H12a1.5 1.5 0 0 1-1.5-1.5V12a9 9 0 0 1 1.5-9Z" />
      <circle cx="7.5" cy="10.5" r="1" />
      <circle cx="10.5" cy="7.5" r="1" />
      <circle cx="14.5" cy="7.5" r="1" />
      <circle cx="16.5" cy="10.5" r="1" />
    </svg>
  );
} 