module.exports = {
  important: true,
  // purge: ["./src/**/*.js", "./src/**/**/*.js"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    screens: {
      'xs': '280px', //iphone 8
      // => @media (min-width: 280) { ... }
      'sm': '376px', //iPhone 8+
      // => @media (min-width: 376) { ... }
      'md': '769px', //iPad
      // => @media (min-width: 769px) { ... }
      'lg': '1201px', //Desktop
      // => @media (min-width: 1201px) { ... }
      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        dark: "rgba(0,0,0,.87);",
        dark_mode_light: "#f9fafb",
        gray_theme: "rgb(249, 250, 252)",
        // [`blue-theme`]: "#185ADB",
        [`blue-theme`]: "#222260",
        [`dark-theme`]: "#212321",
        [`purple-theme`]: "rgb( 117, 95, 211)",
        [`pink-theme`]: "rgb(234, 83, 172)",
        [`gray-theme`]: "#f7f9fa",
        [`green-theme`]: "rgb(106, 201, 119)",
        [`yellow-theme`]: "#FDCE00",
        // [`green-theme`]: "#70D700",
        [`green-mint-theme`]: "rgb( 70, 220, 216)",
      },
      height: {
        "280px": "280px",
        84: "336px",
        22: "88px",
        90: "360px",
        100: "400px",
        114: "460px",
        140: "520px",
        "11/12": "91.666667%",
        "max-content": "max-content",
      },
      width: {
        22: "88px",
        84: "336px",
        114: "460px",
      },
      maxHeight: {
        "max-content": "max-content",
        "max-avatar-user": "112px",
        "max-h-40": "160px",
      },
      maxWidth: {
        "max-avatar-user": "112px",
        56: "224px",
        "max-w-1/2": "50%",
        "max-w-1/3": "30%",
        "max-w-9/10": "90%",
        "max-w-114": "460px",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "2rem",
          sm: "2rem",
          md: "2.5rem",
          lg: "2.5rem",
          xl: "3rem",
          "2xl": "6rem",
        },
      },
      minHeight: {
        0: "0",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        full: "100%",
        16: "64px",
        22: "88px",
      },
      borderRadius: {
        "4xl": "32px",
      },
    },
  },
  plugins: [],
}
