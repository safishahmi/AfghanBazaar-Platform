const navy = {
  50: '#eef4fb',
  100: '#d9e6f5',
  200: '#b3ccea',
  300: '#7fa8d8',
  400: '#4a7fc2',
  500: '#1f62ad',
  600: '#0256a0',
  700: '#044a85',
  800: '#0a3d70',
  900: '#02326b',
  950: '#021f42',
};

const gold = {
  50: '#fff9e6',
  100: '#fff0c2',
  200: '#ffe086',
  300: '#ffd04d',
  400: '#fdca0f',
  500: '#f9a503',
  600: '#dd8a00',
  700: '#b06a00',
  800: '#7f4c00',
  900: '#4d2e00',
};

const slate = {
  50: '#f5f8fc',
  100: '#e9eff7',
  200: '#d3dfee',
  300: '#aebfd6',
  400: '#7d91ad',
  500: '#5b6f8c',
  600: '#44566f',
  700: '#34445a',
  800: '#222f42',
  900: '#131d2d',
  950: '#0a111c',
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: navy,
        accent: gold,
        navy,
        gold,
        slate,
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'drawer-start': {
          from: { opacity: '0', transform: 'translateX(-16px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 200ms ease-out',
        'drawer-start': 'drawer-start 250ms ease-out',
      },
    },
  },
  plugins: [],
};
