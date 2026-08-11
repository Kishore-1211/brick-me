/** @type {import('tailwindcss').Config} */
// Premium brand palette:
//   plum   #321E48  — primary + dark surfaces (sidebar, headings, buttons)
//   steel  #43637E  — secondary (muted text, secondary accents)
//   teal   #65DCD5  — vivid accent (active states, highlights, links)
//   mint   #D9FFF4  — light tint (subtle backgrounds)
// Remaps the scales the app already uses so the whole UI adopts the palette:
//   indigo -> plum, slate -> steel, gray -> cool neutral (bg tinted mint, headings plum)
const plum = {
  50: '#F4F1F7',
  100: '#E6DEEE',
  200: '#C9BAD6',
  300: '#A88FBB',
  400: '#7A5699',
  500: '#4E2F72',
  600: '#321E48', // deep plum — primary
  700: '#29193B',
  800: '#20132E',
  900: '#170D21',
};

const teal = {
  50: '#EAFBF9',
  100: '#CFF6F1',
  200: '#A6EEE7',
  300: '#7FE6DD',
  400: '#65DCD5', // bright teal — accent
  500: '#3FC5BC',
  600: '#26A69D', // readable teal for text/links on white
  700: '#1E837C',
  800: '#1A6862',
  900: '#175450',
};

const steel = {
  50: '#F1F4F7',
  100: '#DFE6EC',
  200: '#C0CDD8',
  300: '#93A8B9',
  400: '#6B8299',
  500: '#43637E', // slate blue
  600: '#375267',
  700: '#2C4152',
  800: '#243544',
  900: '#1B2836',
};

const mint = {
  50: '#F4FFFB',
  100: '#D9FFF4', // light mint
  200: '#B6F5E6',
  300: '#8FE9D6',
  400: '#65DCD5',
  500: '#3FC5BC',
};

// Cool neutral — remaps `gray`. bg tinted toward mint, headings toward plum.
const neutral = {
  50: '#F4FAF8',
  100: '#EBF0F1',
  200: '#DCE3E7',
  300: '#C4CDD4',
  400: '#94A1AC',
  500: '#5F6E7B',
  600: '#465264',
  700: '#38334E',
  800: '#2A2140',
  900: '#321E48',
};

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        indigo: plum,
        slate: steel,
        gray: neutral,
        plum,
        teal,
        steel,
        mint,
      },
    },
  },
  plugins: [],
}
