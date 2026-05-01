"use client";
import { useEffect, useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';

export default function Hello({ onClose }: { onClose: () => void }) {
  const { theme } = useContext(ThemeContext);

  // Only show in iOS7 or Big Sur themes
  const shouldShow = theme === 'ios7-flat' || theme === 'bigsur';

  useEffect(() => {
    if (!shouldShow) {
      onClose();
      return;
    }

    // Auto-close after animation completes
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [shouldShow, onClose]);

  if (!shouldShow) return null;

  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center bg-black/20 pointer-events-none">
      <div className="text-center">
        {/* Handwritten "hello." SVG path animation */}
        <svg
          width="300"
          height="120"
          viewBox="0 0 300 120"
          className="text-[var(--accent)]"
          style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))' }}
        >
          <defs>
            <style>{`
              .hello-path {
                stroke: currentColor;
                stroke-width: 3;
                stroke-linecap: round;
                stroke-linejoin: round;
                fill: none;
                stroke-dasharray: 1000;
                stroke-dashoffset: 1000;
                animation: write 2.5s ease-in-out forwards;
              }
              
              @keyframes write {
                to {
                  stroke-dashoffset: 0;
                }
              }
              
              .fade-out {
                animation: fadeOut 1s ease-out 2.5s forwards;
              }
              
              @keyframes fadeOut {
                to {
                  opacity: 0;
                  transform: scale(0.95);
                }
              }
            `}</style>
          </defs>
          
          {/* Handwritten "hello." path */}
          <g className="fade-out">
            <path
              className="hello-path"
              d="M20 60 L20 30 M20 45 L35 45 M35 30 L35 60 M50 50 Q55 45 60 50 Q65 55 70 50 Q75 45 80 50 L80 60 M95 50 Q100 45 105 50 Q110 55 115 50 Q120 45 125 50 L125 60 M140 60 Q145 55 150 60 Q155 65 160 60 Q165 55 170 60 M185 50 Q190 45 195 50 Q200 55 205 50 Q210 45 215 50 L215 60 M230 70 Q235 65 240 70 Q245 75 250 70 M255 70 L260 70"
              style={{ animationDelay: '0.2s' }}
            />
          </g>
        </svg>
        
        {/* Subtle iOS/Big Sur styling hint */}
        <div className="mt-4 text-sm text-[var(--muted)] font-ui opacity-60">
          {theme === 'ios7-flat' ? 'iOS 7 Script' : 'Modern Handwriting'}
        </div>
      </div>
    </div>
  );
} 