import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        ui: ['var(--font-ui)'],
        mono: ['var(--font-mono)'],
      },
      boxShadow: {
        card: 'var(--card-shadow)',
        btn: 'var(--btn-shadow)',
      },
      borderRadius: {
        ui: 'var(--radius)',
      },
    },
  },
}

export default config 