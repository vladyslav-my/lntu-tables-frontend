import { em } from "@mantine/core";
import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./**/*.{jsx,tsx}"],
	theme: {
		screens: {
			xs: em(480),
			sm: em(768),
			md: em(992),
			lg: em(1200),
			xl: em(1440),
		},
		colors: {
		},
		fontFamily: {
			sans: ["Rubik", "sans-serif"],
		},
		extend: {
			spacing: {

			},
			borderRadius: {
			},
		},
	},
	darkMode: "class",
};
export default config;
