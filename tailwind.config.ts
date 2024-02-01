import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      // colors:{
      //   primary: "#B0CBFF"
      // },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        'fade-in': {
          '0%': {opacity: '0'},
          '100%': {opacity: '1'},
        },
      },
      animation:{
        'fadeIn': "fade-in 1s ease-in-out",
      }
    },
  },
  plugins: [
      nextui()
  ],
};
export default config;
