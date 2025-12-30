/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'i88-blue': {
          50: '#e8f7ff',
          100: '#c7ecff',
          200: '#8fd8ff',
          300: '#59c4ff',
          400: '#21b0ff',
          500: '#0096e6',
          600: '#0076b4',
          700: '#005483',
          800: '#003452',
          900: '#001c2e',
        },
        'i88-cyan': {
          50: '#e9fbff',
          100: '#c8f5ff',
          200: '#93eaff',
          300: '#5edfff',
          400: '#28d3ff',
          500: '#00b7e6',
          600: '#008eb4',
          700: '#006782',
          800: '#004152',
          900: '#001f2b',
        },
      },
      boxShadow: {
        glow: '0 20px 50px rgba(0, 163, 255, 0.35)',
        soft: '0 24px 60px rgba(4, 10, 24, 0.55)',
      },
      backdropBlur: {
        glass: '18px',
      },
      backgroundImage: {
        'glass-sheen': 'linear-gradient(120deg, rgba(255,255,255,0.25), rgba(255,255,255,0))',
        'portal-glow': 'radial-gradient(circle at 50% 50%, rgba(0,163,255,0.25), transparent 60%)',
      },
    },
  },
  plugins: [],
};
