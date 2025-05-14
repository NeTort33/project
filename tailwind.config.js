/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF1E5',
          100: '#FFE4CC',
          200: '#FFC999',
          300: '#FFAD66',
          400: '#FF9233',
          500: '#FF6B00', 
          600: '#CC5500',
          700: '#994000',
          800: '#662B00',
          900: '#331500',
        },
        secondary: {
          50: '#E5F6FF',
          100: '#CCE9FF',
          200: '#99D3FF',
          300: '#66BDFF',
          400: '#33A7FF',
          500: '#00A3FF', 
          600: '#0082CC',
          700: '#006299',
          800: '#004166',
          900: '#002133',
        },
        dark: {
          100: '#3A3A3C',
          200: '#303032',
          300: '#252527',
          400: '#1F1F21',
          500: '#18181B', 
          600: '#121214',
          700: '#0D0D0F',
          800: '#090909',
          900: '#050505',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 15px rgba(0, 0, 0, 0.1)',
        hover: '0 8px 25px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
};