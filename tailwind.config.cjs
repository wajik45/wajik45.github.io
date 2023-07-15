/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      './index.html',
      './assets/js/main.js'
   ],
   darkMode: "class",
   theme: {
      fontFamily: {
         "open-sans": "Open Sans",
      },
      extend: {
         screens: {
            "m-xl": { "max": "1279px" },
            "m-lg": { "max": "1023px" },
            "m-md": { "max": "767px" },
            "m-sm": { "max": "639px" },
         },
         colors: {
            "biru-tua": "#031225",
            "merah-sedeng": "#962845",
         },
         boxShadow: {
            "dikit-be": "0 0 60px 0 rgba(0, 0, 0, 0.5)",
         },
      },
   },
   plugins: [],
};
