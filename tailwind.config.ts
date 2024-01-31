import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        primary: "#B0CBFF"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        'fade-in': {
          '0%': {opacity: '0'},
          '100%': {opacity: '1'},
        },
        // 'rotateGradient' :{
        //   '0%' {
        //     background-image: linear-gradient(45deg, #ff0000, #00ff00);
        //   }
        //   25% {
        //     background-image: linear-gradient(135deg, #ff0000, #00ff00);
        //   }
        //   50% {
        //     background-image: linear-gradient(225deg, #ff0000, #00ff00);
        //   }
        //   75% {
        //     background-image: linear-gradient(315deg, #ff0000, #00ff00);
        //   }
        //   100% {
        //     background-image: linear-gradient(45deg, #ff0000, #00ff00);
        //   }
        //   }
      },
      animation:{
        'fadeIn': "fade-in 1s ease-in-out",
      }
    },
  },
  plugins: [],
};
export default config;
