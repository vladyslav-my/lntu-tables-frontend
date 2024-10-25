import { AxiosHeaders } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { $api } from "./api";

const getSanctumToken = (): string => {
	const cookieStore = cookies();
	const sanctumToken = cookieStore.get("sanctum_token");

	if (!sanctumToken) {
		redirect("/login");
	}

	return sanctumToken.value;
};

interface FetchWithAuthArg<B> {
	method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
	params?: B;
	body?: B;
	headers?: AxiosHeaders;
}

export const fetchWithAuth = async <T, B = any>(url: string, {
	method = "GET", params, body, headers,
}: FetchWithAuthArg<B>): Promise<T> => {
	const sanctumToken = getSanctumToken();

	try {
		const response = await $api.request<T>({
			url,
			method,
			params,
			headers: {
				Authorization: `Bearer ${sanctumToken}`,
				...headers,
			},
			data: body,
		});

		return response.data;
	} catch (error) {
		console.error(`Failed to fetch data from ${url}`, error);
		redirect("/login");
	}
};
