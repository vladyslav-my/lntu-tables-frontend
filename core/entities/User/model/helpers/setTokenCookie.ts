import { setCookie } from "nookies";
import { SANCTUM_TOKEN } from "@core/shared/const";

export const setTokenCookie = (token: string, name = SANCTUM_TOKEN) => {
	return setCookie(null, name, token, {
		maxAge: 30 * 24 * 60 * 60,
		path: "/",
		// secure: true,
		// httpOnly: true,
		sameSite: "lax",
	});
};
