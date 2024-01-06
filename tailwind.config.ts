import type { Config } from 'tailwindcss';
const colors = require('tailwindcss/colors')

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
      black: colors.black,
      accent: {
        DEFAULT: 'rgba(var(--accent-default-rgba))',
        background: 'rgba(var(--accent-background-rgba))',
      },
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
        },
      }
    },
  },
  plugins: [require('flowbite/plugin'), 'prettier-plugin-tailwindcss'],
};
export default config;
