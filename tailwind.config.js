const renderSpacings = () => {
  const spacing = {
    full: "100%",
    fit: "fit-content",
  };
  // 0px --> 100px | 0px 5px 10px 15px,...
  for (let i = 0; i < 10; i += 0.5) {
    spacing[i] = `${i * 10}px`;
  }
  // 100px --> 1000px | 100px 110px 120px,...
  for (let i = 10; i < 100; i++) {
    spacing[i] = `${i * 10}px`;
  }
  return spacing;
};

const spacing = renderSpacings();

module.exports = {
  content: ["./src/**/*.{tsx,html,ts}"],
  darkMode: "class",
  theme: {
    screens: {
      md: "800px",
      sm: "600px",
    },
    colors: {
      primary: "#1a56db",
      primary: "#1a56db",
      black: "#171c26",
      white: "#ffffff",
      gray: "#6b7589",
      silver: "#a4abb8",
      "alice-blue": "#f3f5f7",
      danger: "red",
      "danger-light": "#ff080821",
      "light-dark": "#313744",
      transparent: "transparent",
    },
    fontSize: {
      DEFAULT: "16px",
      xs: "12px",
      sm: "13px",
      md: "14px",
      lg: "16px",
      xl: "18px",
      xxl: "22px",
      "3xl": "24px",
      "4xl": "28px",
      "5xl": "36px",
      "6xl": "48px",
    },
    fontWeight: {
      DEFAULT: 400,
      hairline: 100,
      "extra-light": 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      "extra-bold": 800,
      black: 900,
    },
    spacing,
    boxShadow: {
      md: "0px 2px 13px rgba(73, 72, 106, 0.18)",
      sm: "0px 5px 19px rgba(17, 12, 46, 0.23)",
    },
    maxWidth: {
      md: "800px",
      sm: "600px",
      45: "450px",
      20: "200px",
      10: "100px",
      15: "150px",
      full: "100%",
    },
    borderRadius: {
      4: "4px",
      5: "5px",
      8: "8px",
      15: "15px",
      full: "9999px",
    },
    extend: {
      gridTemplateColumns: {
        "auto-1fr": "auto 1fr",
        "1fr-auto": "1fr auto",
      },
      animation: {
        "spin-md": "spin 10s linear infinite",
        "spin-slow": "spin 30s linear infinite",
      },
      zIndex: {
        100: "100",
        110: 110,
      },
    },
  },
  variants: {
    extend: {
      borderColor: ["group-focus"],
      visibility: ["group-focus"],
      display: ["group-hover"],
      scale: ["group-hover"],
    },
  },
  plugins: [require("flowbite/plugin")],
};
