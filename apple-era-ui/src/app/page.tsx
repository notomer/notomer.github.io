"use client";
import React, { useContext } from 'react';
import Link from 'next/link';
import { WindowFrame } from '@/components/WindowFrame';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ThemeContext } from '@/components/ThemeProvider';

export default function Home() {
  const { openPalette } = useContext(ThemeContext);

  return (
    <div className="min-h-screen bg-[var(--bg)] py-8">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-ui font-bold text-[var(--fg)] mb-2">Apple Eras UI</h1>
          <p className="text-[var(--muted)] font-ui">Switchable themes for every Apple design era</p>
          <p className="text-sm text-[var(--muted)] font-ui mt-2">
            Press &quot;t&quot; to cycle themes • Press &quot;/&quot; for command palette
          </p>
        </header>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <WindowFrame title="Components">
            <p className="text-sm text-[var(--muted)] mb-3 font-ui">Reusable UI components that adapt to every theme.</p>
            <div className="flex gap-2 flex-wrap">
              <Button variant="primary" aria-label="Primary button">Primary</Button>
              <Button variant="secondary" aria-label="Secondary button">Secondary</Button>
              <Button variant="ghost" aria-label="Ghost button">Ghost</Button>
            </div>
          </WindowFrame>

          <WindowFrame title="Card Variants">
            <div className="grid gap-3 sm:grid-cols-2">
              <Card title="Glass Card" variant="glass">
                Frosted glass surface with blur.
              </Card>
              <Card title="Flat Card" variant="flat">
                Standard surface using theme tokens.
              </Card>
              <Card title="Metal Card" variant="metal">
                Brushed metal texture for retro themes.
              </Card>
              <Card title="Badges">
                <div className="flex gap-2 flex-wrap">
                  <span className="px-2 py-1 rounded-full text-xs bg-[var(--accent)]/20 text-[var(--fg)] border border-[var(--accent)]/40 font-ui">Accent</span>
                  <span className="px-2 py-1 rounded-full text-xs bg-[var(--surface)] text-[var(--fg)] border border-[var(--card-border)] font-ui">Surface</span>
                </div>
              </Card>
            </div>
          </WindowFrame>

          <WindowFrame title="Themes">
            <p className="text-sm text-[var(--muted)] mb-3 font-ui">Experience every Apple design era with instant theme switching.</p>
            <div className="flex gap-2 flex-wrap">
              <Button variant="secondary" onClick={openPalette} aria-label="Open theme switcher">Open Theme Switcher</Button>
              <Link href="/terminal" className="inline-flex items-center justify-center px-4 py-2 font-ui text-sm border rounded-ui transition bg-transparent text-[var(--fg)] border-[var(--card-border)] hover:bg-[var(--surface)]">
                Terminal Demo
              </Link>
            </div>
          </WindowFrame>

          <WindowFrame title="Features">
            <ul className="space-y-2 text-sm font-ui">
              <li className="flex items-center text-[var(--fg)]">
                <span className="text-[var(--accent)] mr-2">•</span>
                6 authentic Apple UI themes
              </li>
              <li className="flex items-center text-[var(--fg)]">
                <span className="text-[var(--accent)] mr-2">•</span>
                Real-time font and radius switching
              </li>
              <li className="flex items-center text-[var(--fg)]">
                <span className="text-[var(--accent)] mr-2">•</span>
                Keyboard shortcuts (t, /)
              </li>
              <li className="flex items-center text-[var(--fg)]">
                <span className="text-[var(--accent)] mr-2">•</span>
                Accessibility focused (≥4.5:1 contrast)
              </li>
              <li className="flex items-center text-[var(--fg)]">
                <span className="text-[var(--accent)] mr-2">•</span>
                Respects prefers-reduced-motion
              </li>
            </ul>
          </WindowFrame>
        </div>

        <div className="my-8" />
      </div>
    </div>
  );
}
