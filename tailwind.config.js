const { guessProductionMode } = require("@ngneat/tailwind");

module.exports = {
  prefix: '',
  purge: {
    enabled: guessProductionMode(),
    content: [
      './src/**/*.{html,ts}',
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'whitesmoke': '#f5f5f5',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
