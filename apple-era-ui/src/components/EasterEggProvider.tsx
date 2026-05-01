"use client";
import { useEffect, useRef, useState, createContext, useContext } from 'react';
import { eggs, prefersReducedMotion, isInInputField } from '@/lib/easter-eggs';
import Radar from './eggs/Radar';
import Moof from './eggs/Moof';
import Beachball from './eggs/Beachball';
import TimeMachine from './eggs/TimeMachine';
import SadMac from './eggs/SadMac';
import Dashboard from './eggs/Dashboard';
import Hello from './eggs/Hello';
import ForceQuit from './eggs/ForceQuit';
import Newton from './eggs/Newton';
import Startup from './eggs/Startup';

interface EasterEggContextType {
  triggerEgg: (id: string, opts?: Record<string, unknown>) => void;
  isEggActive: (id: string) => boolean;
}

const EasterEggContext = createContext<EasterEggContextType | null>(null);

export const useEasterEggs = () => {
  const context = useContext(EasterEggContext);
  if (!context) {
    throw new Error('useEasterEggs must be used within EasterEggProvider');
  }
  return context;
};

export default function EasterEggProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<Record<string, Record<string, unknown> & { on: boolean }>>({});
  const buffer = useRef(''); // collect typed chars

  const enable = (id: string, opts?: Record<string, unknown>) => {
    if (prefersReducedMotion() && ['beachball', 'moof', 'hello', 'startup'].includes(id)) {
      return; // Skip motion-heavy eggs if user prefers reduced motion
    }
    setActive((a) => ({ ...a, [id]: { ...opts, on: true } }));
  };

  const disable = (id: string) => {
    setActive((a) => { 
      const n = { ...a }; 
      delete n[id]; 
      return n; 
    });
  };

  const triggerEgg = (id: string, opts?: Record<string, unknown>) => {
    enable(id, opts);
  };

  const isEggActive = (id: string) => {
    return !!active[id]?.on;
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Global escape handler
      if (e.key === 'Escape') { 
        Object.keys(active).forEach(disable); 
        return; 
      }

      // Don't trigger eggs when typing in input fields
      if (isInInputField(e.target)) {
        return;
      }

      // Collect typed text (letters/spaces only), limit length
      if (e.key.length === 1) { 
        buffer.current = (buffer.current + e.key).slice(-32); 
      }

      // Check triggers
      for (const egg of eggs) {
        const t = egg.trigger;
        const triggered = typeof t === 'function' ? t(e) : t.test(buffer.current);
        
        if (triggered) {
          egg.run({ enable, disable }); 
          break;
        }
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  return (
    <EasterEggContext.Provider value={{ triggerEgg, isEggActive }}>
      {children}
      
      {/* Easter Egg Mounters */}
      {active['radar'] && <Radar onClose={() => disable('radar')} />}
      {active['moof'] && <Moof onClose={() => disable('moof')} />}
      {active['beachball'] && (
        <Beachball 
          timeout={active['beachball']?.timeout as number || 8000} 
          onDone={() => disable('beachball')} 
        />
      )}
      {active['timemachine'] && <TimeMachine onClose={() => disable('timemachine')} />}
      {active['sadmac'] && <SadMac onClose={() => disable('sadmac')} />}
      {active['dashboard'] && <Dashboard onClose={() => disable('dashboard')} />}
      {active['hello'] && <Hello onClose={() => disable('hello')} />}
      {active['forcequit'] && <ForceQuit onClose={() => disable('forcequit')} />}
      {active['newton'] && <Newton onClose={() => disable('newton')} />}
      {active['startup'] && <Startup onClose={() => disable('startup')} />}
    </EasterEggContext.Provider>
  );
} 