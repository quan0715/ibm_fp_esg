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
      nextui({
        themes:{
          light:{
            colors:{
              default: "#FFFFFF",
              primary: {
                DEFAULT: "#1B53FF",
                100: "#B0CBFF",
                200: "#7FA3FF",
                300: "#4D7BFF",
                400: "#1B53FF",
                500: "#0033CC",
                600: "#002699",
                700: "#001966",
                800: "#000D33",
                900: "#000000",
              },
              foreground: "#000000",
              background: "#F5F5F5",
            }
          },
          dark:{
            colors:{
              default: "#272A2D",
              primary: {
                DEFAULT: "#B0CBFF",
                100: "#B0CBFF",
                200: "#7FA3FF",
                300: "#4D7BFF",
                400: "#1B53FF",
                500: "#0033CC",
                600: "#002699",
                700: "#001966",
                800: "#000D33",
                900: "#000000",
              },
              foreground: "#FFFFFF",
              background: "#131313",
            }
          }
        }
      })
  ],
};
export default config;
