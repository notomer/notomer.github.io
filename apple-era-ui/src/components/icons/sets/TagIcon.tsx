"use client";
import React from 'react';
export function TagIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20.59 13.41 12 22l-9-9 8.59-8.59A2 2 0 0 1 13 4h7v7a2 2 0 0 1-.41 1.41Z" />
      <circle cx="7.5" cy="14.5" r="1.5" />
    </svg>
  );
} 