"use client";
import React from 'react';

export function WindowFrame({ title, children }: { title?: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-ui bg-[var(--card-bg)] border border-[var(--card-border)] shadow-card overflow-hidden data-[theme=aqua]:bg-[image:var(--pinstripe)] data-[theme=brushed-metal]:bg-[image:var(--metal-noise)] data-[theme=brushed-metal]:bg-[length:160px_160px]">
      {/* Only show stoplights for non-terminal themes */}
      <div className="h-9 flex items-center gap-2 px-3 bg-[var(--chrome)] border-b border-[var(--card-border)] data-[theme=terminal]:hidden">
        <div className="flex gap-1.5" aria-hidden>
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#ffb3b3] to-[#ff5f57] shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#ffe3a1] to-[#ffbd2e] shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#a6f3b1] to-[#28c840] shadow-sm" />
        </div>
        <div className="flex-1 text-center font-ui font-semibold text-sm text-[var(--fg)] opacity-70" aria-live="polite">
          {title || ''}
        </div>
        <div className="w-10" />
      </div>
      <div className="p-4 md:p-6 text-[var(--fg)]">{children}</div>
    </div>
  );
} 