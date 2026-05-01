# Apple Eras UI

A personal site with switchable themes for Apple UI eras, from Aqua to Big Sur and beyond. Experience the evolution of Apple's design language with instant theme switching, authentic fonts, and period-appropriate visual effects.

## ✨ Features

- **6 Authentic Apple Themes**: Aqua, Brushed Metal, Leopard Glass, iOS 7 Flat, Big Sur, and Terminal
- **Instant Theme Switching**: Real-time font family, radius, shadow, and color changes
- **Keyboard Shortcuts**: `t` to cycle themes, `/` to open command palette  
- **Authentic Recreation**: Period-correct fonts (Lucida Grande → SF Pro Display/Text), textures, and effects
- **Modern Stack**: Next.js 15, TypeScript, Tailwind CSS 4
- **Accessibility First**: 4.5:1+ contrast ratio, focus indicators, reduced motion support
- **Zero-JavaScript Theming**: CSS variables power the entire system
- **🥚 Easter Eggs**: 14 hidden Apple references and deep cuts

## 🎨 Themes

| Era | Theme | Years | Font Family | Signature Elements |
|-----|-------|-------|-------------|-------------------|
| **Aqua** | Classic Mac OS X | 2001-2005 | Lucida Grande | Gel buttons, pinstripes, glossy surfaces |
| **Brushed Metal** | Industrial Mac | 2003-2005 | Lucida Grande | Metal textures, inset shadows |
| **Leopard Glass** | Translucent Era | 2007 | Lucida Grande | Glass effects, backdrop blur |
| **iOS 7 Flat** | Minimalist Revolution | 2013+ | Helvetica Neue | Ultra-thin borders, flat design |
| **Big Sur** | Modern macOS | 2020+ | SF Pro Display/Text | Rounded corners, soft shadows |
| **Terminal** | Retro Computing | Timeless | SF Mono | Green phosphor, blinking cursor |

## 🥚 Easter Eggs

Hidden Apple references throughout the site! All respect `prefers-reduced-motion` and are dismissible with Escape.

### Keyboard Triggers
- **`radar`** - Fake Feedback Assistant bug report (FB12345678)
- **`moof`** - Clarus the Dogcow skitters across screen with sound
- **`Alt + B`** - Spinning beachball cursor for 8 seconds
- **`timemachine`** - Fullscreen starfield with backup browser
- **`F9` or `xpose`** - Exposé effect (coming soon)
- **`F12` or `dashboard`** - Draggable Dashboard widgets
- **`sadmac`** - Classic Sad Mac error screen with beep
- **`hello`** - Handwritten script animation (iOS7/Big Sur only)
- **`Cmd+Opt+Esc` or `forcequit`** - Force Quit Applications dialog
- **`newton`** - "egg freckles" → "Eat up Martha" autocorrect
- **`↑↑↓↓←→←→BA`** - Konami code triggers startup chime
- **Hover Finder icon** - Finder face winks at you

### Terminal Commands
Visit `/terminal` and type these commands:
- `help` - Show all available commands
- `moof` - Summon Clarus
- `radar` - Open Feedback Assistant
- `timemachine` - Browse backups
- `sadmac` - System error
- `dashboard` - Widget manager
- `forcequit` - App manager
- `newton` - MessagePad demo
- `sherlock` - Elementary search
- `hello` - Handwritten greeting
- `clear` - Clear terminal

### Hidden References
- **Clarus the Dogcow** - Apple's iconic mascot from System 7
- **Radar numbers** - Apple's internal bug tracking system
- **"Eat up Martha"** - Famous Newton handwriting recognition fail
- **Sherlock vs Watson** - The search app rivalry that killed Watson
- **Force Quit dialog** - Classic Mac troubleshooting tool
- **System 7 startup** - Welcome to Macintosh screen and chime

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/apple-eras-ui.git
cd apple-eras-ui

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run test       # Run Vitest tests
```

## 🏗️ Architecture

### Token-Based Design System

All styling uses CSS variables defined in `src/styles/themes.css`:

```css
:root {
  --font-ui: system-ui, sans-serif;
  --radius: 12px;
  --btn-bg: var(--accent);
  /* ... */
}

:root[data-theme='aqua'] {
  --font-ui: "Lucida Grande", sans-serif;
  --radius: 8px;
  --btn-bg: linear-gradient(#6bb5ff, #2e86ff);
  /* ... */
}
```

### Component System

Components use Tailwind classes with CSS variable references:

```tsx
<Button className="bg-[var(--btn-bg)] text-[var(--btn-fg)] rounded-[var(--radius)]">
  Primary Button
</Button>
```

### Theme Switching

Themes are applied by setting `data-theme` on the `<html>` element:

```tsx
document.documentElement.setAttribute('data-theme', 'aqua');
```

### Easter Egg System

```tsx
// Trigger eggs programmatically
const { triggerEgg } = useEasterEggs();
triggerEgg('moof');

// Or via text/key detection
// Types "moof" anywhere → Clarus appears
// Press Alt+B → Beachball cursor
```

## 🧪 Testing

The project includes comprehensive tests for theme switching:

```bash
npm test
```

Tests verify:
- CSS variable changes when themes switch
- Component class application
- Font family and radius updates
- Accessibility compliance

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── terminal/          # Interactive terminal with Easter eggs
│   ├── layout.tsx         # Root layout with providers
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Button.tsx         # Primary button component
│   ├── Card.tsx           # Card variants
│   ├── WindowFrame.tsx    # Window chrome component
│   ├── ThemeProvider.tsx  # Theme context provider
│   ├── CommandPalette.tsx # Theme selector
│   ├── EasterEggProvider.tsx # Easter egg system
│   ├── FinderMark.tsx     # Winking Finder icon
│   └── eggs/              # Easter egg components
│       ├── Radar.tsx      # Feedback Assistant
│       ├── Moof.tsx       # Clarus the Dogcow
│       ├── Beachball.tsx  # Spinning cursor
│       ├── TimeMachine.tsx # Backup browser
│       ├── SadMac.tsx     # System error
│       ├── Dashboard.tsx  # Widget manager
│       └── ...            # More Easter eggs
├── lib/
│   └── easter-eggs.ts     # Easter egg registry
├── styles/
│   └── themes.css         # Theme token definitions
└── tests/                 # Test files
    ├── theme.test.ts      # Theme switching tests
    └── components.test.tsx # Component tests
```

## 🎯 Adding New Themes

1. **Define tokens** in `src/styles/themes.css`:

```css
:root[data-theme='your-theme'] {
  --font-ui: "Your Font", sans-serif;
  --bg: #your-bg-color;
  --radius: 8px;
  /* ... other tokens */
}
```

2. **Update TypeScript types** in `src/components/ThemeProvider.tsx`:

```tsx
export type ThemeId = 'aqua' | 'your-theme' | /* ... */;
```

3. **Add to theme list** in `src/components/CommandPalette.tsx`:

```tsx
const THEMES = [
  { id: 'your-theme', label: 'Your Theme', description: 'Description' },
  // ...
];
```

4. **Test** with the theme switcher!

## 🥚 Adding Easter Eggs

1. **Create component** in `src/components/eggs/YourEgg.tsx`
2. **Register trigger** in `src/lib/easter-eggs.ts`
3. **Add to provider** in `src/components/EasterEggProvider.tsx`
4. **Optional terminal command** in `src/app/terminal/page.tsx`

```tsx
// Example Easter egg
{
  id: 'youregg',
  trigger: /(^|[^a-z])youregg([^a-z]|$)/i,
  run: ({ enable }) => enable('youregg'),
}
```

## 🌐 Accessibility

- **Contrast**: All themes maintain 4.5:1+ contrast ratios
- **Focus**: Visible focus rings using theme accent colors  
- **Motion**: Respects `prefers-reduced-motion` (disables animations)
- **Keyboard**: Full keyboard navigation support
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Easter Eggs**: All dismissible with Escape key

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines and submit pull requests for any improvements.

---

**Press `t` to cycle themes • Press `/` to open command palette • Try typing `moof`**
