"use client";
import React, { useState, useEffect } from 'react';
import { useEasterEggs } from '@/components/EasterEggProvider';

const INITIAL_LINES = [
  'Last login: Fri Dec 20 14:32:01 on ttys000',
  '~ % whoami',
  'omar',
  '~ % pwd', 
  '/Users/omar/website',
  '~ % ls',
  'about  projects  contact  theme.config.ts',
  '~ % cat README.md',
  '# Apple Eras UI',
  '',
  'A personal site with switchable themes for Apple UI eras.',
  'Switch themes with "t" or open command palette with "/".',
  '',
  '~ % curl -s https://wttr.in/?format=1',
  '🌤  +2°C',
  '~ % date',
  new Date().toLocaleString(),
  '~ % echo "Welcome to my terminal"',
  'Welcome to my terminal',
];

const EASTER_EGG_COMMANDS: Record<string, (triggerEgg: (id: string) => void) => string[]> = {
  help: () => [
    'Available commands:',
    '  help         - Show this help',
    '  clear        - Clear terminal',
    '  moof         - Summon Clarus the Dogcow',
    '  radar        - Open Feedback Assistant',
    '  timemachine  - Browse time machine backups',
    '  sadmac       - Show classic system error',
    '  dashboard    - Open Dashboard widgets',
    '  forcequit    - Show Force Quit dialog',
    '  newton       - Demo Newton handwriting recognition',
    '  sherlock     - Elementary search features',
    '  hello        - Handwritten greeting (iOS7/Big Sur only)',
    '',
    'Easter eggs:',
    '  Type any command name to trigger its effect',
    '  Try the Konami code: ↑↑↓↓←→←→BA',
    '  Press Alt+B for spinning beachball cursor',
  ],
  
  clear: () => [''],
  
  moof: (triggerEgg) => {
    triggerEgg('moof');
    return ['Summoning Clarus...', 'moof! 🐄'];
  },
  
  radar: (triggerEgg) => {
    triggerEgg('radar');
    return ['Opening Feedback Assistant...', 'Report ID: FB12345678'];
  },
  
  timemachine: (triggerEgg) => {
    triggerEgg('timemachine');
    return ['Entering Time Machine...', 'Use ← → to navigate backups'];
  },
  
  sadmac: (triggerEgg) => {
    triggerEgg('sadmac');
    return ['System error detected!', '💀 Displaying classic error screen...'];
  },
  
  dashboard: (triggerEgg) => {
    triggerEgg('dashboard');
    return ['Loading Dashboard widgets...', 'Drag widgets to rearrange them'];
  },
  
  forcequit: (triggerEgg) => {
    triggerEgg('forcequit');
    return ['Opening Force Quit Applications...', 'Select app to force quit'];
  },
  
  newton: (triggerEgg) => {
    triggerEgg('newton');
    return ['Newton MessagePad activated', 'Handwriting recognition: egg freckles → Eat up Martha'];
  },
  
  hello: (triggerEgg) => {
    triggerEgg('hello');
    return ['Drawing handwritten greeting...', '(Only visible in iOS7 or Big Sur themes)'];
  },
  
  sherlock: () => [
    'Elementary, my dear user.',
    '',
    'Sherlock vs Watson (2002-2004):',
    'The search app that started a rivalry...',
    'Watson developers were not amused.',
  ],
  
  coverflow: () => [
    'Cover Flow view activated!',
    '(This would show 3D project gallery)',
    'Press ESC to return to normal view',
  ],
};

export default function TerminalPage() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const [commandMode, setCommandMode] = useState(false);
  const [currentCommand, setCurrentCommand] = useState('');
  const { triggerEgg } = useEasterEggs();

  useEffect(() => {
    if (currentLineIndex < INITIAL_LINES.length) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => [...prev, INITIAL_LINES[currentLineIndex]]);
        setCurrentLineIndex(prev => prev + 1);
      }, currentLineIndex === 0 ? 500 : 800);

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowPrompt(true);
        setCommandMode(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex]);

  const executeCommand = (command: string) => {
    const cmd = command.trim().toLowerCase();
    
    // Add command to terminal
    setDisplayedLines(prev => [...prev, `~ % ${command}`]);
    
    if (cmd === 'clear') {
      setDisplayedLines([]);
      return;
    }
    
    if (EASTER_EGG_COMMANDS[cmd]) {
      const output = EASTER_EGG_COMMANDS[cmd](triggerEgg);
      setDisplayedLines(prev => [...prev, ...output]);
    } else if (cmd === '') {
      // Just add empty line for enter
    } else {
      setDisplayedLines(prev => [...prev, `zsh: command not found: ${command}`, 'Type "help" for available commands']);
    }
    
    setCurrentCommand('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!commandMode) return;
    
    if (e.key === 'Enter') {
      executeCommand(currentCommand);
    } else if (e.key === 'Backspace') {
      setCurrentCommand(prev => prev.slice(0, -1));
    } else if (e.key.length === 1) {
      setCurrentCommand(prev => prev + e.key);
    }
  };

  return (
    <div 
      className="min-h-screen bg-[var(--bg)] text-[var(--fg)] font-mono p-4 overflow-hidden focus:outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="max-w-4xl mx-auto">
        <div className="whitespace-pre-wrap leading-relaxed">
          {displayedLines.map((line, i) => (
            <div key={i} className="mb-1">
              {line.startsWith('~ %') ? (
                <div>
                  <span className="text-[var(--muted)]">omar@macbook</span>
                  <span className="text-[var(--fg)]">:</span>
                  <span className="text-[var(--accent)]">~</span>
                  <span className="text-[var(--fg)]">{line.slice(1)}</span>
                </div>
              ) : line.startsWith('#') ? (
                <div className="text-[var(--muted)] font-bold">{line}</div>
              ) : line.trim() === '' ? (
                <div className="h-4" />
              ) : (
                <div>{line}</div>
              )}
            </div>
          ))}
          
          {showPrompt && (
            <div className="flex items-center">
              <span className="text-[var(--muted)]">omar@macbook</span>
              <span className="text-[var(--fg)]">:</span>
              <span className="text-[var(--accent)]">~</span>
              <span className="text-[var(--fg)]"> % {currentCommand}</span>
              <span className="inline-block w-2 h-5 bg-[var(--fg)] blink ml-1"></span>
            </div>
          )}
        </div>
        
        <div className="fixed bottom-4 right-4 text-xs text-[var(--muted)] font-mono">
          <div>Press &quot;t&quot; to cycle themes • Press &quot;/&quot; for command palette</div>
          <div className="text-xs opacity-70 mt-1">Type &quot;help&quot; for Easter egg commands</div>
        </div>
      </div>
    </div>
  );
} 