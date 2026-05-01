"use client";
import React, { useContext } from 'react';
import { ThemeContext, ThemeId } from './ThemeProvider';
import { WindowFrame } from './WindowFrame';

const THEMES: { id: ThemeId; label: string; description: string }[] = [
  { id: 'system', label: 'System', description: 'Follow system preference' },
  { id: 'aqua', label: 'Aqua', description: 'Mac OS X 10.0–10.4' },
  { id: 'brushed-metal', label: 'Brushed Metal', description: 'Mac OS X 10.3–10.4' },
  { id: 'leopard-glass', label: 'Leopard Glass', description: 'Mac OS X 10.5' },
  { id: 'ios7-flat', label: 'iOS 7 Flat', description: 'iOS 7+ minimalism' },
  { id: 'bigsur', label: 'Big Sur', description: 'macOS 11+ modern' },
  { id: 'terminal', label: 'Terminal', description: 'Retro green phosphor' },
];

export function CommandPalette() {
  const { paletteOpen, closePalette, setTheme, previewTheme, theme } = useContext(ThemeContext);

  const onHover = (id: ThemeId | null) => () => previewTheme(id);
  const onSelect = (id: ThemeId) => () => { setTheme(id); closePalette(); };

  if (!paletteOpen) return null;
  
  return (
    <div role="dialog" aria-modal className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20">
      <div className="absolute inset-0 bg-black/30" onClick={closePalette} aria-hidden />
      <div className="relative z-10 w-full max-w-lg">
        <WindowFrame title="Themes">
          <div className="space-y-2">
            {THEMES.map(t => (
              <button
                key={t.id}
                onMouseEnter={onHover(t.id)}
                onMouseLeave={onHover(null)}
                onClick={onSelect(t.id)}
                className={`w-full text-left rounded-ui p-3 transition-all bg-[var(--surface)] hover:bg-[var(--chrome)] border border-[var(--card-border)] ${
                  theme === t.id ? 'ring-2 ring-[var(--accent)] shadow-[0_0_0_1px_var(--accent)]' : ''
                }`}
              >
                <div className="text-sm font-ui font-semibold text-[var(--fg)]">{t.label}</div>
                <div className="text-xs text-[var(--muted)] font-ui">{t.description}</div>
              </button>
            ))}
          </div>
        </WindowFrame>
      </div>
    </div>
  );
} 