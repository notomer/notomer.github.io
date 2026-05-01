"use client";
import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";

export type ThemeId = 'system' | 'aqua' | 'brushed-metal' | 'leopard-glass' | 'ios7-flat' | 'bigsur' | 'terminal';

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
  openPalette: () => void;
  closePalette: () => void;
  paletteOpen: boolean;
  previewTheme: (t: ThemeId | null) => void;
  cycleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: 'bigsur',
  setTheme: () => {},
  openPalette: () => {},
  closePalette: () => {},
  paletteOpen: false,
  previewTheme: () => {},
  cycleTheme: () => {},
});

const THEME_ORDER: ThemeId[] = ['aqua', 'brushed-metal', 'leopard-glass', 'ios7-flat', 'bigsur', 'terminal'];

function resolveSystemTheme(): ThemeId {
  try {
    const ua = navigator.userAgent || "";
    if (/iPhone|iPad|iPod/i.test(ua)) return 'ios7-flat';
    if (/Mac OS X/i.test(ua)) return 'bigsur';
    return 'bigsur';
  } catch {
    return 'bigsur';
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    if (typeof window === 'undefined') return 'bigsur';
    return (localStorage.getItem('theme') as ThemeId) || 'bigsur';
  });
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [hoverPreview, setHoverPreview] = useState<ThemeId | null>(null);

  const appliedTheme = useMemo<ThemeId>(() => {
    if (hoverPreview) return hoverPreview;
    if (theme === 'system') return resolveSystemTheme();
    return theme;
  }, [theme, hoverPreview]);

  const applyThemeToDom = useCallback((t: ThemeId) => {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-theme', t);
  }, []);

  useEffect(() => { applyThemeToDom(appliedTheme); }, [appliedTheme, applyThemeToDom]);

  const setTheme = useCallback((t: ThemeId) => {
    setThemeState(t);
    try { localStorage.setItem('theme', t); } catch {}
  }, []);

  const cycleTheme = useCallback(() => {
    const currentTheme = theme === 'system' ? resolveSystemTheme() : theme;
    const currentIndex = THEME_ORDER.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % THEME_ORDER.length;
    setTheme(THEME_ORDER[nextIndex]);
  }, [theme, setTheme]);

  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => { setPaletteOpen(false); setHoverPreview(null); }, []);
  const previewTheme = useCallback((t: ThemeId | null) => setHoverPreview(t), []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !paletteOpen) {
        e.preventDefault();
        openPalette();
      } else if (e.key === "t" && !paletteOpen) {
        e.preventDefault();
        cycleTheme();
      } else if (e.key === "Escape" && paletteOpen) {
        e.preventDefault();
        closePalette();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [paletteOpen, openPalette, closePalette, cycleTheme]);

  const value = useMemo(() => ({ 
    theme, 
    setTheme, 
    openPalette, 
    closePalette, 
    paletteOpen, 
    previewTheme, 
    cycleTheme 
  }), [theme, setTheme, openPalette, closePalette, paletteOpen, previewTheme, cycleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
} 