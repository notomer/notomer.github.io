"use client";
import React, { useContext } from 'react';
import Link from 'next/link';
import { ThemeContext } from './ThemeProvider';
import { PaletteIcon } from './icons/PaletteIcon';
import { Button } from './Button';
import FinderMark from './FinderMark';

export function NavBar() {
  const { openPalette, cycleTheme } = useContext(ThemeContext);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 h-12 flex items-center px-4 md:px-6 bg-[var(--chrome)] backdrop-blur-[var(--blur)] border-b border-[var(--card-border)]">
      <div className="flex-1 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 font-ui font-bold text-[var(--fg)] hover:text-[var(--accent)] transition-colors">
          <FinderMark />
          <span>Apple Eras UI</span>
        </Link>
        <div className="hidden md:flex items-center gap-4 text-sm font-ui">
          <Link href="/about" className="text-[var(--muted)] hover:text-[var(--fg)] transition-colors">
            About
          </Link>
          <Link href="/terminal" className="text-[var(--muted)] hover:text-[var(--fg)] transition-colors">
            Terminal
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          aria-label="Cycle Themes (t)"
          onClick={cycleTheme}
          className="hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-ui text-[var(--muted)] hover:text-[var(--fg)] hover:bg-[var(--surface)] transition-all"
          title="Cycle themes (t)"
        >
          <span className="text-xs font-mono">t</span>
        </button>
        <Button
          variant="ghost"
          aria-label="Open Theme Palette (/)"
          onClick={openPalette}
          className="text-xs"
        >
          <PaletteIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Themes</span>
          <kbd className="hidden md:inline ml-1 px-1 py-0.5 text-xs bg-[var(--surface)] text-[var(--muted)] rounded border border-[var(--card-border)]">/</kbd>
        </Button>
      </div>
    </nav>
  );
} 