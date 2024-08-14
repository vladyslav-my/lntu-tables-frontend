/* eslint-disable @typescript-eslint/no-use-before-define */
import { NextRequest, NextResponse } from "next/server";
import { $api } from "@core/shared/api/api";

const CALLBACK_ROUTE = "/";
const PROTECTED_ROUTES = ["/dashboard", "/profile"];
const AUTH_ROUTES = {
	login: "/login",
	register: "/register",
};

export async function middleware(req: NextRequest) {
	const { cookies } = req;
	const token = cookies.get("sanctum_token")?.value;

	const isValidToken = await checkTokenValidity(token);

	const { pathname } = req.nextUrl;

	if (isValidToken && (pathname.startsWith(AUTH_ROUTES.login) || pathname.startsWith(AUTH_ROUTES.register))) {
		return NextResponse.redirect(new URL(CALLBACK_ROUTE, req.url));
	}

	if (!isValidToken && PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
		return NextResponse.redirect(new URL(AUTH_ROUTES.login, req.url));
	}

	return NextResponse.next();
}

async function checkTokenValidity(token: string | undefined) {
	if (!token) return false;

	try {
		const response = await $api.get<{ is_valid: boolean }>("api/auth/check-token", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data.is_valid;
	} catch (error) {
		console.error("Error checking token validity:", error);
		return false;
	}
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
