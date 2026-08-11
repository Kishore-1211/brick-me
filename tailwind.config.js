/** @type {import('tailwindcss').Config} */
// Brand palette: Red + Terracotta + warm (sand/stone) gray.
// We remap the scales the app already uses so the whole UI adopts the palette
// from one place:
//   indigo -> red        (primary accents: buttons, links, active nav, focus rings)
//   slate  -> warm stone  (the sidebar / dark surfaces)
//   gray   -> warm sand   (neutral text, borders, backgrounds; dark shades = headings)
// Plus `terracotta` (secondary accent) and `sand` are available as named colours.
const red = {
  50: '#FCF3F1',
  100: '#F8E2DE',
  200: '#F0C5BD',
  300: '#E39F92',
  400: '#D4705B',
  500: '#C74C36',
  600: '#C0392B', // primary red — matches the logo "me"
  700: '#9C2E23',
  800: '#7C251C',
  900: '#651E17',
};

const terracotta = {
  50: '#FCF3EE',
  100: '#F7E1D5',
  200: '#EEC3AC',
  300: '#E19E7C',
  400: '#D27E58',
  500: '#C4633F', // terracotta
  600: '#B0512F',
  700: '#8F4026',
  800: '#723422',
  900: '#5E2C1E',
};

// Warm charcoal/stone — used for the sidebar (remaps `slate`).
const stone = {
  50: '#F6F4F2',
  100: '#E9E4E0',
  200: '#D6CEC7',
  300: '#B8ADA3',
  400: '#9C8F84',
  500: '#6F645B',
  600: '#544B44',
  700: '#403833',
  800: '#2E2823',
  900: '#241F1B',
};

// Warm sand neutral — remaps `gray` (dark shades = warm near-black headings).
const sand = {
  50: '#F7F5F2',
  100: '#EFEBE6',
  200: '#E2DBD3',
  300: '#CDC3B8',
  400: '#A99E92',
  500: '#7A6F64',
  600: '#5A5049',
  700: '#433B35',
  800: '#2E2823',
  900: '#241F1B',
};

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        indigo: red,
        slate: stone,
        gray: sand,
        red,
        terracotta,
        stone,
        sand,
      },
    },
  },
  plugins: [],
}
