'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { FinderIcon } from './icons/Finder';
import { TerminalIcon } from './icons/Terminal';

interface DockItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
}

const dockItems: DockItem[] = [
  {
    id: 'finder',
    icon: FinderIcon,
    label: 'Open Finder',
    path: '/'
  },
  {
    id: 'terminal',
    icon: TerminalIcon,
    label: 'Open Terminal',
    path: '/terminal'
  }
];

export function Dock() {
  const router = useRouter();
  const pathname = usePathname();
  const dockRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !dockRef.current) return;
    
    const rect = dockRef.current.getBoundingClientRect();
    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    });
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setMousePosition({ x: 0, y: 0 });
  };

  const getIconScale = (index: number): number => {
    if (prefersReducedMotion || hoveredIndex === null) return 1;
    
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 1.12;
    if (distance === 1) return 1.06;
    return 1;
  };

  const handleItemClick = (item: DockItem) => {
    router.push(item.path);
  };

  const isActive = (path: string): boolean => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const shouldShowReflection = () => {
    if (typeof document === 'undefined') return false;
    const theme = document.documentElement.getAttribute('data-theme');
    return theme === 'aqua' || theme === 'leopard-glass' || theme === 'bigsur';
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div
        ref={dockRef}
        className="backdrop-blur-[var(--dock-blur)] bg-[var(--dock-bg)] border border-[var(--dock-border)] shadow-[var(--dock-shadow)] rounded-[var(--dock-radius)] px-3 py-2"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-end gap-3">
          {dockItems.map((item, index) => {
            const IconComponent = item.icon;
            const scale = getIconScale(index);
            const active = isActive(item.path);
            
            return (
              <div key={item.id} className="relative flex flex-col items-center">
                {/* Main icon button */}
                <button
                  onClick={() => handleItemClick(item)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  className="group relative grid place-items-center h-14 w-14 rounded-2xl transition-transform will-change-transform focus-visible:outline-2 focus-visible:outline-[var(--dock-indicator)] focus-visible:outline-offset-2"
                  style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'bottom center'
                  }}
                  aria-label={item.label}
                  role="button"
                >
                  {/* Base shadow */}
                  <div className="absolute -bottom-0.5 h-1 w-6 rounded-full blur-md opacity-40 bg-black/25" />
                  
                  {/* Icon container */}
                  <div className="relative">
                    <IconComponent />
                    
                    {/* Reflection effect for supported themes */}
                    {shouldShowReflection() && (
                      <div 
                        className="absolute top-full left-0 right-0 h-8 opacity-25 [transform:scaleY(-1)] [mask-image:linear-gradient(to-bottom,rgba(0,0,0,.6),transparent)]"
                        style={{
                          opacity: prefersReducedMotion ? 0.1 : 0.25
                        }}
                      >
                        <IconComponent className="scale-75" />
                      </div>
                    )}
                  </div>
                </button>
                
                {/* Active indicator dot */}
                {active && (
                  <span 
                    className="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-[var(--dock-indicator)] transition-opacity"
                    style={{
                      opacity: prefersReducedMotion ? 1 : (scale > 1 ? 0.8 : 1)
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 