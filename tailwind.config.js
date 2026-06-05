module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#0F1729',
        'navy-light': '#1A2341',
        'teal': '#00B4D8',
        'teal-light': '#48D1E1',
        'orange': '#FF6B35',
        'white': '#FFFFFF',
        'gray-50': '#F8F9FA',
        'gray-100': '#E9ECEF',
        'gray-200': '#DEE2E6',
        'gray-300': '#CED4DA',
        'gray-400': '#ADB5BD',
        'gray-500': '#6C757D',
        'gray-600': '#495057',
        'gray-700': '#343A40',
        'gray-800': '#212529',
        'gray-900': '#0F1729',
      },
      fontFamily: {
        'sans': ['Inter', 'Segoe UI', 'Roboto', 'sans-serif'],
        'display': ['Poppins', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
      },
      backgroundImage: {
        'gradient-navy-teal': 'linear-gradient(135deg, #0F1729 0%, #1A2341 50%, #00B4D8 100%)',
        'gradient-teal-navy': 'linear-gradient(135deg, #00B4D8 0%, #0F1729 100%)',
        'gradient-navy-blue': 'linear-gradient(135deg, #0F1729 0%, #1a3a52 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'glass-lg': '0 15px 50px rgba(0, 0, 0, 0.15)',
        'premium': '0 20px 60px rgba(0, 0, 0, 0.2)',
        'premium-lg': '0 30px 90px rgba(0, 0, 0, 0.25)',
      },
      backdropBlur: {
        'sm': '4px',
        'md': '12px',
        'lg': '20px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in': 'slideIn 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(20px)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      transitionDuration: {
        '2000': '2000ms',
      },
    },
  },
  plugins: [],
}
