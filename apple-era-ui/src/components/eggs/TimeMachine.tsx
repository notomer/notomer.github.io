"use client";
import { useState } from 'react';

const FAKE_BACKUPS = [
  'Today 3:42 PM',
  'Yesterday 11:23 PM', 
  'December 19, 2:14 AM',
  'December 18, 5:47 PM',
  'December 17, 9:33 AM',
  'December 16, 7:21 PM',
  'Last Week',
  'December 9, 4:12 PM',
];

export default function TimeMachine({ onClose }: { onClose: () => void }) {
  const [selectedBackup, setSelectedBackup] = useState(0);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && selectedBackup > 0) {
      setSelectedBackup(selectedBackup - 1);
    } else if (e.key === 'ArrowRight' && selectedBackup < FAKE_BACKUPS.length - 1) {
      setSelectedBackup(selectedBackup + 1);
    } else if (e.key === 'Enter') {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[1000] bg-black focus:outline-none" 
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      onClick={onClose}
    >
      {/* Starfield Background */}
      <div 
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 20% 30%, #fff, transparent),
            radial-gradient(1px 1px at 40% 70%, rgba(255,255,255,0.8), transparent),
            radial-gradient(2px 2px at 90% 40%, rgba(255,255,255,0.9), transparent),
            radial-gradient(1px 1px at 10% 80%, #fff, transparent),
            radial-gradient(2px 2px at 50% 20%, rgba(255,255,255,0.7), transparent),
            radial-gradient(1px 1px at 80% 90%, #fff, transparent),
            radial-gradient(1px 1px at 30% 10%, rgba(255,255,255,0.6), transparent)
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '300px 300px, 400px 400px, 200px 200px, 350px 350px, 250px 250px, 450px 450px, 180px 180px'
        }}
      />
      
      {/* Radial mask for tunnel effect */}
      <div 
        className="absolute inset-0 bg-black"
        style={{
          maskImage: 'radial-gradient(circle at 50% 60%, transparent 0%, transparent 30%, black 70%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 60%, transparent 0%, transparent 30%, black 70%)'
        }}
      />

      {/* Time Machine Interface */}
      <div className="relative h-full flex flex-col items-center justify-center">
        {/* Main backup card stack */}
        <div className="w-[min(800px,90vw)] h-[60vh] relative perspective-[1000px]">
          {FAKE_BACKUPS.map((backup, index) => {
            const offset = index - selectedBackup;
            const isSelected = index === selectedBackup;
            
            return (
              <div
                key={backup}
                className={`absolute inset-0 rounded-ui border transition-all duration-500 ${
                  isSelected 
                    ? 'bg-[var(--surface)] backdrop-blur-[var(--blur)] shadow-card border-[var(--card-border)] z-10' 
                    : 'bg-[var(--surface)]/20 border-[var(--card-border)]/50'
                }`}
                style={{
                  transform: `
                    translateX(${offset * 20}px) 
                    translateY(${offset * 10}px) 
                    rotateY(${offset * 5}deg) 
                    scale(${1 - Math.abs(offset) * 0.05})
                  `,
                  opacity: Math.max(0.3, 1 - Math.abs(offset) * 0.2),
                  zIndex: 100 - Math.abs(offset)
                }}
              >
                {isSelected && (
                  <div className="p-8 h-full flex flex-col items-center justify-center text-center">
                    <h2 className="text-3xl font-ui font-bold text-[var(--fg)] mb-4">
                      Time Machine
                    </h2>
                    <p className="text-xl font-ui text-[var(--muted)] mb-8">
                      {backup}
                    </p>
                    <div className="text-sm font-ui text-[var(--muted)] space-y-2">
                      <p>Use ← → arrows to browse backups</p>
                      <p>Press Enter or click to restore</p>
                      <p className="text-xs opacity-70">
                        Warning: This is just a demo. No actual time travel involved.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Timeline indicator */}
        <div className="mt-8 flex items-center gap-2">
          {FAKE_BACKUPS.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === selectedBackup 
                  ? 'bg-[var(--accent)] scale-125' 
                  : 'bg-[var(--muted)]/50'
              }`}
            />
          ))}
        </div>

        {/* Controls */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 px-4 py-2 rounded-ui bg-[var(--btn-bg)] text-[var(--btn-fg)] border border-[var(--btn-border)] shadow-btn font-ui text-sm transition hover:scale-[0.98]"
        >
          Return to Present
        </button>
      </div>
    </div>
  );
} 