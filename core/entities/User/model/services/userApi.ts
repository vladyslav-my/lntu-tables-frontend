import { destroyCookie } from "nookies";
import { rtkApi } from "@core/shared/api/rtkApi";
import { SANCTUM_TOKEN } from "@core/shared/const";
import { setTokenCookie } from "../helpers/setTokenCookie";
import { LoginBody, RegisterBody, UserToken } from "../types";

export const userApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		login: build.mutation({
			query: (body: LoginBody) => ({
				url: "api/auth/login",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				data: body,
			}),
			transformResponse: (response: UserToken) => {
				const { token } = response;
				if (token) {
					setTokenCookie(token);
				}
				return response;
			},
		}),

		register: build.mutation({
			query: (body: RegisterBody) => ({
				url: "api/auth/register",
				method: "POST",
				data: body,
			}),
			transformResponse: (response: UserToken) => {
				const { token } = response;
				if (token) {
					setTokenCookie(token);
				}
				return response;
			},
		}),

		logout: build.mutation({
			query: () => ({
				url: "api/auth/logout",
				method: "POST",
			}),
			transformResponse: (response: UserToken) => {
				destroyCookie(null, SANCTUM_TOKEN);
			},
		}),
	}),
	overrideExisting: false,
});
