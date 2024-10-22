import { rtkApi } from "@core/shared/api/rtkApi";
import { IBookedTableBody } from "../types";

export const bookedTableApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getAvailableTime: build.query<string[], { tableId?: number, date_picker?: string }>({
			query: ({ tableId, date_picker }) => ({
				url: `api/available-time/${tableId}`,
				method: "GET",
				params: {
					date_picker,
				},
			}),
			keepUnusedDataFor: 0.0001,
		}),
		saveBookedTable: build.mutation<string[], IBookedTableBody>({
			query: ({ table_id, ...data }) => ({
				url: `api/booked-tables/${table_id}`,
				method: "POST",
				data,
			}),
		}),
	}),
	overrideExisting: false,
});
