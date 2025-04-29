/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0284c7", // Electric blue
        dark: "#0f172a",    // Dark background
        darker: "#020617",  // Darker background
      },
      fontFamily: {
        sans: ['Poppins', 'Montserrat', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 0px #0284c7' },
          '100%': { boxShadow: '0 0 15px #0284c7' },
        },
        pulse: {
          '0%, 100%': { 
            opacity: 1,
            transform: 'scale(1)',
            boxShadow: '0 0 0 0 rgba(2, 132, 199, 0.7)' 
          },
          '50%': { 
            opacity: 0.95,
            transform: 'scale(1.05)',
            boxShadow: '0 0 0 10px rgba(2, 132, 199, 0)' 
          },
        },
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0px)' },
        },
      },
    },
  },
  plugins: [],
}