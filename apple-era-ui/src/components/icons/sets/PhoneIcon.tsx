"use client";
import React from 'react';
export function PhoneIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.22 2h3a2 2 0 0 1 2 1.72c.12.9.32 1.77.59 2.6a2 2 0 0 1-.45 2.11L8 9a16 16 0 0 0 7 7l.57-.36a2 2 0 0 1 2.11-.45 12.62 12.62 0 0 0 2.6.59A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
} 