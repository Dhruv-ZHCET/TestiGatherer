/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "masonry-1": "repeat(1, minmax(0, 1fr))",
        "masonry-2": "repeat(2, minmax(0, 1fr))",
        "masonry-3": "repeat(3, minmax(0, 1fr))",
        "masonry-4": "repeat(4, minmax(0, 1fr))",
        "masonry-5": "repeat(5, minmax(0, 1fr))",
      },
    },
  },
  variants: {},
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".masonry": {
          columnCount: 1,
          columnGap: "1rem",
        },
        "@screen sm": {
          ".masonry-sm": {
            columnCount: 2,
          },
        },
        "@screen md": {
          ".masonry-md": {
            columnCount: 3,
          },
        },
        "@screen lg": {
          ".masonry-lg": {
            columnCount: 4,
          },
        },
        "@screen xl": {
          ".masonry-xl": {
            columnCount: 5,
          },
        },
      });
    },
  ],
};
