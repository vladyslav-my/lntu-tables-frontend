import { rtkApi } from "@core/shared/api/rtkApi";
import { IBookedTableBody, UpdateStatusArg } from "../types";

export const bookedTableApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getBookedTables: build.query<any[], { tab?: "my" | "his" | "current" }>({
			providesTags: ["bookedTables"],
			query: ({ tab }) => ({
				url: "api/booked-tables",
				method: "GET",
				params: {
					tab,
				},
			}),
		}),

		getAvailableTime: build.query<string[], { tableId?: number, date_picker?: string }>({
			query: ({ tableId, date_picker }) => ({
				url: `api/available-time/${tableId}`,
				method: "GET",
				params: {
					date_picker,
				},
			}),
		}),
		saveBookedTable: build.mutation<string[], IBookedTableBody>({
			query: ({ table_id, ...data }) => ({
				url: `api/booked-tables/${table_id}`,
				method: "POST",
				data,
			}),
		}),

		updateStatus: build.mutation<{ message: string }, UpdateStatusArg>({
			invalidatesTags: ["bookedTables"],
			query: ({ bookedTableId, action }) => ({
				url: `api/booked-tables/${bookedTableId}/${action}`,
				method: "PATCH",
			}),
		}),
	}),
	overrideExisting: false,
});
