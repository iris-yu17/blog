import type { Config } from 'tailwindcss';
const colors = require('tailwindcss/colors');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    darkMode: 'class',
    colors: {
      primary: 'rgba(var(--primary-rgba))',
      secondary: 'rgba(var(--secondary-rgba))',
      tertiary: 'rgba(var(--tertiary-rgba))',
      quaternary: 'rgba(var(--quaternary-rgba))',
      black: colors.black,
      green: {
        DEFAULT: 'rgba(var(--green-default-rgba))',
        background: 'rgba(var(--green-background-rgba))',
      },
      border: 'rgba(var(--border-rgba))',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        black: {
          DEFAULT: 'rgba(var(--black-default-rgba))',
          100: 'rgba(var(--black-100-rgba))',
          200: 'rgba(var(--black-200-rgba))',
          300: 'rgba(var(--black-300-rgba))',
          400: 'rgba(var(--black-400-rgba))',
        },
        white: {
          DEFAULT: 'rgba(var(--white-default-rgba))',
        },
        gray: {
          DEFAULT: 'rgba(var(--gray-default-rgba))',
          100: 'rgba(var(--gray-100-rgba))',
          200: 'rgba(var(--gray-200-rgba))',
          300: 'rgba(var(--gray-300-rgba))',
        },
        code: {
          100: 'rgba(var(--code-100-rgba))',
          200: 'rgba(var(--code-200-rgba))',
          300: 'rgba(var(--code-300-rgba))',
          400: 'rgba(var(--code-400-rgba))',
        },
      },
      fontFamily: {
        'rbtm': ['Roboto Mono', 'monospace'],
        'press': ['"Press Start 2P"', 'system-ui']
      }//改寫後的指令
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/line-clamp'), 'prettier-plugin-tailwindcss',
    require('@tailwindcss/typography')
  ],
};
export default config;
