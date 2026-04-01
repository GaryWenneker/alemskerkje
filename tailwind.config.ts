import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        stone: {
          950: '#0c0a09',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'kenburns': 'kenBurns 20s ease-in-out infinite alternate',
        'ticket-modal-in': 'ticketModalIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'ticket-progress': 'ticketProgress 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1.0) translateX(0px) translateY(0px)' },
          '33%': { transform: 'scale(1.08) translateX(-15px) translateY(-8px)' },
          '66%': { transform: 'scale(1.05) translateX(10px) translateY(-5px)' },
          '100%': { transform: 'scale(1.12) translateX(-8px) translateY(5px)' },
        },
        ticketModalIn: {
          '0%': { opacity: '0', transform: 'translateY(40px) scale(0.97)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        ticketProgress: {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [typography],
}

export default config
