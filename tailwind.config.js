/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx}",
    "./webroot/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        // Detective theme - dark noir palette
        detective: {
          bg: '#0f0f10',        // Deep dark background
          card: '#1a1a1b',      // Card background (Reddit dark)
          cardHover: '#222223', // Card hover state
          border: '#343536',    // Subtle borders
        },
        // Accent colors
        reddit: '#FF4500',      // Reddit orangered
        suspicious: '#FF6B35',  // Amber glow for selection
        correct: '#46D160',     // Success green
        incorrect: '#FF4B4B',   // Error red
        ai: '#9333EA',          // Electric purple for AI reveal
        // Text colors for dark theme
        textPrimary: '#D7DADC',   // Primary text
        textSecondary: '#818384', // Secondary text
        textMuted: '#6B6C6D',     // Muted text
      },
      boxShadow: {
        'suspicious': '0 0 20px rgba(255, 107, 53, 0.4)',
        'correct': '0 0 20px rgba(70, 209, 96, 0.4)',
        'ai': '0 0 20px rgba(147, 51, 234, 0.4)',
      },
    },
  },
  plugins: [],
}
