import axios from "axios";
import { parseCookies } from "nookies";

export const $api = axios.create({
	baseURL: process.env.APP_URL || process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
	withXSRFToken: true,
	headers: {
		"Content-Type": "application/json",
	},
});

$api.interceptors.request.use(
	(config) => {
		const token = parseCookies().sanctum_token;

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
);

$api.interceptors.response.use(
	(config) => {
		const token = parseCookies().sanctum_token;

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		// if (error.response.data.message === "Token has expired") {}

		return Promise.reject(error);
	},
);
