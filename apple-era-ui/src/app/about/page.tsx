"use client";
import React from 'react';
import Link from 'next/link';
import { WindowFrame } from '@/components/WindowFrame';

import { Card } from '@/components/Card';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] py-8">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-ui font-bold text-[var(--fg)] mb-2">About</h1>
          <p className="text-[var(--muted)] font-ui">The story behind Apple Eras UI</p>
        </header>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mb-8">
          <WindowFrame title="The Project">
            <div className="space-y-4 text-[var(--fg)] font-ui">
              <p>
                Apple Eras UI is a tribute to Apple&apos;s design evolution, from the iconic Aqua interface 
                of Mac OS X to the modern minimalism of Big Sur and beyond.
              </p>
              <p>
                Each theme authentically recreates the visual language of its era, complete with 
                period-appropriate fonts, shadows, textures, and interaction patterns.
              </p>
              <p>
                Built with Next.js, TypeScript, and Tailwind CSS, this project demonstrates 
                how CSS variables can power sophisticated theming systems.
              </p>
            </div>
          </WindowFrame>

          <WindowFrame title="Design Philosophy">
            <ul className="space-y-3 text-[var(--fg)] font-ui">
              <li className="flex items-start">
                <span className="text-[var(--accent)] mr-2 mt-1">•</span>
                <div>
                  <strong>Authentic Recreation:</strong> Every detail matters, from Lucida Grande in Aqua to SF Pro in Big Sur.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--accent)] mr-2 mt-1">•</span>
                <div>
                  <strong>Instant Switching:</strong> Themes change immediately without page reloads or flicker.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--accent)] mr-2 mt-1">•</span>
                <div>
                  <strong>Accessibility First:</strong> All themes maintain proper contrast and focus indicators.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--accent)] mr-2 mt-1">•</span>
                <div>
                  <strong>Performance:</strong> CSS variables enable zero-JavaScript theme switching.
                </div>
              </li>
            </ul>
          </WindowFrame>
        </div>

        <Card variant="glass" className="mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-ui font-bold text-[var(--fg)] mb-4">Timeline of Apple UI</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-sm font-ui">
              <div className="text-center">
                <div className="font-bold text-[var(--accent)]">2001-2005</div>
                <div className="text-[var(--fg)]">Aqua</div>
                <div className="text-[var(--muted)]">Mac OS X 10.0-10.4</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-[var(--accent)]">2003-2005</div>
                <div className="text-[var(--fg)]">Brushed Metal</div>
                <div className="text-[var(--muted)]">Mac OS X 10.3-10.4</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-[var(--accent)]">2007</div>
                <div className="text-[var(--fg)]">Leopard Glass</div>
                <div className="text-[var(--muted)]">Mac OS X 10.5</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-[var(--accent)]">2013</div>
                <div className="text-[var(--fg)]">iOS 7 Flat</div>
                <div className="text-[var(--muted)]">iOS 7+</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-[var(--accent)]">2020</div>
                <div className="text-[var(--fg)]">Big Sur</div>
                <div className="text-[var(--muted)]">macOS 11+</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-[var(--accent)]">Retro</div>
                <div className="text-[var(--fg)]">Terminal</div>
                <div className="text-[var(--muted)]">Green phosphor</div>
              </div>
            </div>
          </div>
        </Card>

        <div className="text-center">
          <Link href="/" className="inline-flex items-center justify-center px-4 py-2 font-ui text-sm border rounded-ui transition bg-[var(--btn-bg)] text-[var(--btn-fg)] border-[var(--btn-border)] shadow-btn">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 