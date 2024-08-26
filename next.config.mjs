import { readFileSync } from "fs";
import path from "path";
import withSvgr from "next-svgr";

/** @type {import('next').NextConfig} */
const nextConfig = {
	publicRuntimeConfig: {
		APP_URL: process.env.APP_URL,
	},
	reactStrictMode: true,
	sassOptions: {
		prependData: readFileSync(path.resolve("core/shared/scss/tools/index.scss"), {
			encoding: "utf8",
			flag: "r",
		}),
	},
};

export default withSvgr(nextConfig);
