import { readFileSync } from "fs";
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
	publicRuntimeConfig: {
		APP_URL: process.env.APP_URL,
	},
	webpack(config) {
		const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"));

		config.module.rules.push(
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/,
			},
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
				use: ["@svgr/webpack"],
			},
		);

		fileLoaderRule.exclude = /\.svg$/i;

		return config;
	},
	reactStrictMode: true,
	sassOptions: {
		prependData: readFileSync(path.resolve("core/shared/scss/tools/index.scss"), {
			encoding: "utf8",
			flag: "r",
		}),
	},
};

export default nextConfig;
