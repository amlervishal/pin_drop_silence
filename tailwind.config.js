/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Primary: ['Jost'],
        Secondary: ['Open Sans'],
        Logo: ['Playwrite CU'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Jost', 'Inter', 'sans-serif'],
      },
      colors: {
        cream: {
          DEFAULT: '#F5F2ED',
          dark: '#E8E4DD',
        },
        dark: {
          DEFAULT: '#1A1A1A',
          gray: '#2A2A2A',
        },
        muted: '#6B6B6B',
        border: '#D4D0C8',
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}