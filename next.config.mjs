import { readFileSync } from "fs";
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
	publicRuntimeConfig: {
		APP_URL: process.env.APP_URL,
	},
	reactStrictMode: true,
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ["@svgr/webpack"],
		});

		return config;
	},
	sassOptions: {
		prependData: readFileSync(path.resolve("core/shared/scss/tools/index.scss"), {
			encoding: "utf8",
			flag: "r",
		}),
	},
};

export default nextConfig;
