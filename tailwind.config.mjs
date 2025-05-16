/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.vue",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: [
    // Widths and heights for SVGs and other elements
    'w-8', 'h-8', 'w-6', 'h-6', 'w-5', 'h-5', 'w-2', 'h-2',
    'w-full', 'h-full', 'min-h-screen',
    // Text colors
    'text-blue-600', 'text-green-600', 'text-purple-600', 'text-gray-600', 'text-gray-700', 'text-gray-800',
    // Background colors
    'bg-blue-50', 'bg-green-50', 'bg-purple-50', 'bg-white', 'bg-gray-50',
    // Spacing
    'p-4', 'p-6', 'p-10',
    'px-5', 'py-5', 'px-12', 'py-10',
    'mt-4', 'mb-12', 'gap-2', 'gap-3', 'gap-4',
    // Flex utilities
    'flex', 'flex-1', 'items-center', 'justify-center', 'space-x-4',
    // Other utilities
    'rounded-lg', 'rounded-xl',
    'shadow-sm', 'shadow-lg',
    'transform', 'transition-all', 'duration-300', 'duration-500', 'duration-1000',
    'opacity-0', 'opacity-100',
    'cursor-pointer',
    'min-w-[200px]',
    // Hover states
    'hover:scale-105',
    'hover:shadow-lg',
    'hover:bg-blue-50',
    'hover:bg-emerald-50',
    'hover:bg-green-50',
    // Dynamic classes
    {
      pattern: /^(w|h)-/
    },
    {
      pattern: /(bg|text|border)-(blue|green|purple|gray|emerald|violet)-(50|100|200|300|400|500|600|700|800|900)/
    },
    {
      pattern: /^(m|p)[trbl]?-/
    }
  ],
  theme: {
    extend: {
      blur: {
        '2xl': '30px',
      },
      scale: {
        '3': '3',
      },
      animation: {
        'float': 'float 20s linear infinite alternate',
        'pulse-subtle': 'pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateX(0px) translateY(0px)' },
          '25%': { transform: 'translateX(20px) translateY(20px) rotate(30deg)' },
          '50%': { transform: 'translateX(40px) translateY(0px)' },
          '75%': { transform: 'translateX(20px) translateY(20px) rotate(-30deg)' },
          '100%': { transform: 'translateX(-10px) translateY(-10px)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
} 
