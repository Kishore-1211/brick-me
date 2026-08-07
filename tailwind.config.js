/** @type {import('tailwindcss').Config} */
// Brand palette from the Brickme logo: deep navy ("Brick") + brick red ("me").
// We remap the scales the app already uses so the whole UI adopts the brand
// colours without touching every component:
//   indigo -> brick red (all accents: buttons, links, active nav, focus rings)
//   slate  -> navy       (the sidebar)
//   gray   -> navy-tinted neutral (dark shades = navy headings/text)
const brick = {
  50: '#FBF3F2',
  100: '#F7E3E0',
  200: '#EEC5BF',
  300: '#E29E94',
  400: '#D46F60',
  500: '#C74B39',
  600: '#C0392B', // primary — matches the "me" in the logo
  700: '#9E2E24',
  800: '#7E251D',
  900: '#671F19',
};

const navy = {
  50: '#EEF1F6',
  100: '#D9DFEA',
  200: '#B7C1D6',
  300: '#AAB4C9',
  400: '#7E8CA8',
  500: '#41506E',
  600: '#2E3C58',
  700: '#22304A',
  800: '#1A2740',
  900: '#141F36', // deep navy — matches the "Brick" in the logo
};

const grayNavy = {
  50: '#F6F7F9',
  100: '#EDEFF3',
  200: '#DFE3EA',
  300: '#C7CDD9',
  400: '#97A0B2',
  500: '#657084',
  600: '#48536A',
  700: '#333E56',
  800: '#20293F',
  900: '#141F36', // headings share the brand navy
};

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        indigo: brick,
        slate: navy,
        gray: grayNavy,
        brick,
        navy,
      },
    },
  },
  plugins: [],
}
