import { rtkApi } from "@core/shared/api/rtkApi";
import { ResponseData } from "../types/PageRegisterPageSchema";

export const registerPageApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		// example: build.query<ResponseData, void>({
		// 	providesTags: ["registerPage"],
		// 	query: () => ({
		// 		method: "GET",
		// 		url: "example",
		// 	}),
		// }),

		// example: build.mutation<any, any>({
		// 	invalidatesTags: ["ProfilePage"],
		// 	query: (data) => ({
		// 		url: "example",
		// 		method: "PATCH",
		// 		body: {
		// 			...data,
		// 		},

		// 	}),
		// }),
	}),
	overrideExisting: false,
});
