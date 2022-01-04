module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        cl1: '#5979DE',
        cl2: '#FDB88E',
        darkBlue: '#012970',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
