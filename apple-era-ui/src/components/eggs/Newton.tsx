"use client";
import { useState, useEffect } from 'react';

export default function Newton({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<'typing' | 'autocorrect' | 'fix'>('typing');
  const [text, setText] = useState('');

  useEffect(() => {
    const sequence = [
      { phase: 'typing', text: 'Eat up Martha', delay: 100 },
      { phase: 'autocorrect', text: 'Eat up Martha', delay: 1000 },
      { phase: 'fix', text: 'Eat up Martha', delay: 1500 },
    ];

    const timeouts: NodeJS.Timeout[] = [];
    let currentDelay = 0;

    // Type out "egg freckles" first
    const originalText = 'egg freckles';
    for (let i = 0; i <= originalText.length; i++) {
      timeouts.push(setTimeout(() => {
        setText(originalText.slice(0, i));
      }, currentDelay));
      currentDelay += 150;
    }

    // Pause, then autocorrect
    timeouts.push(setTimeout(() => {
      setPhase('autocorrect');
      setText('Eat up Martha');
    }, currentDelay + 500));

    // Show correction hint
    timeouts.push(setTimeout(() => {
      setPhase('fix');
    }, currentDelay + 2000));

    // Auto-close
    timeouts.push(setTimeout(() => {
      onClose();
    }, currentDelay + 4000));

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [onClose]);

  return (
    <div className="fixed bottom-8 right-8 z-[1000] max-w-sm">
      <div className="bg-[var(--surface)] backdrop-blur-[var(--blur)] border border-[var(--card-border)] rounded-ui shadow-card p-4 font-ui">
        {/* Newton device mockup */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-600 rounded border-2 border-gray-400 relative">
            <div className="absolute inset-1 bg-gray-100 rounded-sm"></div>
            <div className="absolute top-1 left-1 right-1 h-1 bg-gray-800 rounded-full"></div>
          </div>
          <div className="text-sm font-semibold text-[var(--fg)]">MessagePad Recognition</div>
        </div>

        {/* Handwriting area */}
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded p-3 mb-3 min-h-[60px]">
          <div className="text-lg font-mono text-[var(--fg)]">
            {text}
            <span className="animate-pulse">|</span>
          </div>
          
          {phase === 'autocorrect' && (
            <div className="mt-2 text-xs text-orange-600 font-ui">
              ⚠ Autocorrected from &quot;egg freckles&quot;
            </div>
          )}
          
          {phase === 'fix' && (
            <div className="mt-2 text-xs text-[var(--muted)] font-ui">
              ✓ Newton&apos;s infamous handwriting recognition at work
            </div>
          )}
        </div>

        {/* Newton info */}
        <div className="text-xs text-[var(--muted)] font-ui">
          <p>Apple Newton MessagePad (1993-1998)</p>
          <p className="opacity-70">
            Famous for creative interpretations of handwriting
          </p>
        </div>
      </div>
    </div>
  );
} 