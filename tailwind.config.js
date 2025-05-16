/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-blue-50',
    'bg-green-50',
    'bg-purple-50',
    'text-blue-600',
    'text-green-600',
    'text-purple-600',
    'from-blue-300',
    'to-blue-700',
    'from-emerald-300',
    'to-emerald-700',
    'from-violet-300',
    'to-violet-700',
    'bg-gradient-to-r',
    'scale-105',
    'opacity-0',
    'opacity-100',
    'translate-y-10',
    'translate-y-0',
    'translate-y-full',
    'pointer-events-none',
  ]
} 
