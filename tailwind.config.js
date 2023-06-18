/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    fontSize: {
      'z-sm': ['12px', '16px'],
      'z-md': ['14px', '18px'],
      'z-base': ['16px', '24px'],
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
