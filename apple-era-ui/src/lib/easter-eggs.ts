// Easter eggs registry for Apple-themed hidden features
type EggCtx = { 
  enable: (id: string, opts?: Record<string, unknown>) => void; 
  disable: (id: string) => void; 
};

type Egg = { 
  id: string; 
  trigger: RegExp | ((e: KeyboardEvent) => boolean); 
  run: (ctx: EggCtx) => void; 
};

export const eggs: Egg[] = [
  {
    id: 'radar',
    trigger: /(^|[^a-z])radar([^a-z]|$)/i,
    run: ({ enable }) => enable('radar'),
  },
  {
    id: 'moof',
    trigger: /(^|[^a-z])moof([^a-z]|$)/i,
    run: ({ enable }) => enable('moof'),
  },
  {
    id: 'beachball',
    trigger: (e) => (e.altKey && (e.key === 'b' || e.code === 'KeyB')),
    run: ({ enable }) => enable('beachball', { timeout: 8000 }),
  },
  {
    id: 'timemachine',
    trigger: /(^|[^a-z])timemachine([^a-z]|$)/i,
    run: ({ enable }) => enable('timemachine'),
  },
  {
    id: 'expose',
    trigger: (e) => e.key === 'F9' || /(^|[^a-z])xpose([^a-z]|$)/i.test(e.key),
    run: ({ enable }) => enable('expose'),
  },
  {
    id: 'dashboard',
    trigger: (e) => e.key === 'F12' || /(^|[^a-z])dashboard([^a-z]|$)/i.test(e.key),
    run: ({ enable }) => enable('dashboard'),
  },
  {
    id: 'sadmac',
    trigger: /(^|[^a-z])sadmac([^a-z]|$)/i,
    run: ({ enable }) => enable('sadmac'),
  },
  {
    id: 'hello',
    trigger: /(^|[^a-z])hello([^a-z]|$)/i,
    run: ({ enable }) => enable('hello'),
  },
  {
    id: 'forcequit',
    trigger: (e) => ((e.metaKey && e.altKey && e.key === 'Escape') || /(^|[^a-z])forcequit([^a-z]|$)/i.test(e.key)),
    run: ({ enable }) => enable('forcequit'),
  },
  {
    id: 'coverflow',
    trigger: /(^|[^a-z])coverflow([^a-z]|$)/i,
    run: ({ enable }) => enable('coverflow'),
  },
  {
    id: 'newton',
    trigger: /(^|[^a-z])newton([^a-z]|$)/i,
    run: ({ enable }) => enable('newton'),
  },
  {
    id: 'sherlock',
    trigger: /(^|[^a-z])sherlock([^a-z]|$)/i,
    run: ({ enable }) => enable('sherlock'),
  },
  {
    id: 'startup',
    trigger: (() => {
      // Konami code: ↑↑↓↓←→←→BA
      const sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
      let progress = 0;
      return (e: KeyboardEvent) => {
        if (e.code === sequence[progress]) {
          progress++;
          if (progress === sequence.length) {
            progress = 0;
            return true;
          }
        } else {
          progress = 0;
        }
        return false;
      };
    })(),
    run: ({ enable }) => enable('startup'),
  },
];

// Helper to check if user prefers reduced motion
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Helper to check if we're in an input field
export const isInInputField = (target: EventTarget | null): boolean => {
  if (!target || !(target instanceof Element)) return false;
  const tagName = target.tagName.toLowerCase();
  return ['input', 'textarea', 'select'].includes(tagName) || 
         target.getAttribute('contenteditable') === 'true';
}; 