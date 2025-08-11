/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0B0B0F',
        surface: '#0E0E13',
        neon: {
          red: '#FF2B2B',
          deep: '#D91515',
          dark: '#8E0F0F',
          white: '#FFFFFF',
        }
      },
      boxShadow: {
        'neon-red-sm': '0 0 12px rgba(255,43,43,.6), 0 0 24px rgba(217,21,21,.35)',
        'neon-red': '0 0 18px rgba(255,43,43,.75), 0 0 42px rgba(217,21,21,.45), 0 0 64px rgba(142,15,15,.35)',
        'neon-white': '0 0 14px rgba(255,255,255,.7), 0 0 38px rgba(255,255,255,.35)',
      },
      dropShadow: {
        'logo-red': ['0 0 12px rgba(255,43,43,.85)', '0 0 40px rgba(217,21,21,.45)'],
        'logo-white': ['0 0 10px rgba(255,255,255,.9)', '0 0 28px rgba(255,255,255,.4)'],
      },
      backgroundImage: {
        'radial-red': 'radial-gradient(60% 60% at 60% 30%, rgba(255,43,43,.18) 0%, rgba(255,43,43,0) 70%)',
        'radial-white': 'radial-gradient(40% 40% at 50% 70%, rgba(255,255,255,.12) 0%, rgba(255,255,255,0) 70%)',
        'noise': "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22 viewBox=%220 0 160 160%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%221%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.02%22/></svg>')",
      },
      fontFamily: {
        display: ['Poppins', 'system-ui', 'ui-sans-serif', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: { xl2: '1.25rem' },
      transitionTimingFunction: { 'out-glow': 'cubic-bezier(.2,.6,.2,1)' },
    },
  },
  plugins: [],
}
