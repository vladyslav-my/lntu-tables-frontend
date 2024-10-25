import { fetchWithAuth } from "@core/shared/api/fetchWithAuth";

export const getBookedTables = async ({ tab }: { tab?: "my" | "his" | "current" }) => {
	return fetchWithAuth<any[]>("api/booked-tables", {
		method: "GET",
		params: {
			tab,
		},
	});
};
