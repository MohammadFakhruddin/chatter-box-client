// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mintblossom: {
          primary: "#5EEAD4",        // Mint Green
          secondary: "#F472B6",      // Orchid Pink
          accent: "#C4B5FD",         // Soft Violet
          neutral: "#1E293B",        // Slate Black
          "base-100": "#FFFBF0",     // Cream White
          info: "#38BDF8",           // Sky Blue
          success: "#84cc16",        // Lime Green
          warning: "#FACC15",        // Amber Yellow
          error: "#FB7185",          // Watermelon Red
        },
      },
    ],
    darkTheme: false, 
  },
}
