module.exports = {
  content: [
    "./*.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#0f172a',
        'light': '#f8fafc',
        'primary': '#4361ee',
        'secondary': '#3a0ca3',
        'accent': '#f72585',
        'glass': 'rgba(255, 255, 255, 0.1)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.2)',
        'glow': '0 0 20px rgba(0, 240, 255, 0.3)',
      },
      backdropBlur: {
        'lg': '16px',
      },
      animation: {
        'floating': 'floating 6s ease-in-out infinite',
        'bounce': 'bounce 2s infinite',
        'marquee': 'marquee 20s linear infinite',
        'glitch': 'glitch 0.5s linear infinite',
      },
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        bounce: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-20px)' },
          '60%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.glass-card': {
          background: 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          'box-shadow': '0 8px 32px rgba(0, 0, 0, 0.2)',
        },
        '.gradient-text': {
          background: 'linear-gradient(90deg, #00F0FF, #5200FF, #FF00F5)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          color: 'transparent',
        },
        '.hexagon-button': {
          'clip-path': 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}