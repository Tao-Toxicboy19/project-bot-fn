/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        80: "80%",
      },
    },
    colors: {
      darkPrimary: "#1976D2",
      lightPrimary: "#BBDEFB",
      primary: "#2196F3",
      text: "#FFFFFF",
      accent: "#FF4081",
      primaryText: "#212121",
      secondaryText: "#757575",
      divider: "#BDBDBD",
    },
  },
  plugins: [],
};
