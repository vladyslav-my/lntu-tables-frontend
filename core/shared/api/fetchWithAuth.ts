import { AxiosHeaders } from "axios";
import { unstable_cache, revalidateTag } from "next/cache";
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
	tags?: string[]; // Add support for cache tags
}

export const fetchWithAuth = async <T, B = any>(
	url: string,
	{
		method = "GET", params, body, headers, tags = [],
	}: FetchWithAuthArg<B>,
): Promise<T> => {
	const sanctumToken = getSanctumToken();

	try {
		// Wrap the API call with `unstable_cache` for tagging support
		const cachedResponse = await unstable_cache(
			async () => {
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
			},
			tags, // Associate tags with this cache
		)();

		return cachedResponse;
	} catch (error) {
		console.error(`Failed to fetch data from ${url}`, error);
		redirect("/login");
	}
};
