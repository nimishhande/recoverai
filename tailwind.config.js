/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#0066FF',      // Pure Tech Blue
        secondary: '#00D1FF',    // Cyan Sky
        accent: '#5E5CE6',       // Electric Indigo (Apple-like)
        dark: '#05070A',         // Deep Night Black
        surface: '#0d1117',      // Elevated Layer
        silver: '#E5E7EB',       // Crisp White/Silver
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'noise': "url('https://grainy-gradients.vercel.app/noise.svg')",
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'blue-glow': '0 0 15px rgba(0, 102, 255, 0.2)',
      },
      backdropBlur: {
        'glass': '8px',
      },
      animation: {
        'slow-spin': 'spin 12s linear infinite',
        'subtle-float': 'subtle-float 4s ease-in-out infinite',
      },
      keyframes: {
        'subtle-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
