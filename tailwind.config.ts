"""Tailwind configuration for glassmorphism + neon effects."""

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Neon colors
        neon: {
          cyan: '#00F0FF',
          purple: '#D946EF',
          pink: '#EC4899',
          green: '#10B981',
          blue: '#0EA5E9',
        },
      },
      boxShadow: {
        // Neon glow effects
        'neon-cyan': '0 0 20px rgba(0, 240, 255, 0.5)',
        'neon-purple': '0 0 20px rgba(217, 70, 239, 0.5)',
        'neon-pink': '0 0 20px rgba(236, 72, 153, 0.5)',
        'neon-green': '0 0 20px rgba(16, 185, 129, 0.5)',
        'neon-blue': '0 0 20px rgba(14, 165, 233, 0.5)',
        // Glass effect shadows
        'glass': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(0, 240, 255, 0.8)',
          },
        },
        'scan': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 2s linear infinite',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    // Custom glassmorphism plugin
    function ({ addComponents }: any) {
      addComponents({
        '.glass': {
          '@apply backdrop-blur-md bg-white/10 border border-white/20': {},
        },
        '.glass-sm': {
          '@apply backdrop-blur-sm bg-white/5 border border-white/10': {},
        },
        '.glass-lg': {
          '@apply backdrop-blur-lg bg-white/20 border border-white/30': {},
        },
        '.neon-text': {
          '@apply text-transparent bg-clip-text': {},
        },
        '.neon-border': {
          '@apply border-2 border-transparent': {},
        },
      });
    },
  ],
};

export default config;
