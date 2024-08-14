import { PayloadAction } from "@reduxjs/toolkit";
import { ThunkConfig } from "@core/app/providers/StoreProvider";
import { createSliceWithThunk } from "@core/shared/lib/createSliceWithThunk";
// import { EntityUserSchema } from "../types/EntityUserSchema";

const initialState: EntityUserSchema = {
	data: undefined,
	isLoading: false,
	// error: undefined,
};

export const entityUserSlice = createSliceWithThunk({
	name: "entityUser",
	initialState,
	reducers: (create) => ({
		// example: create.reducer((state, action: PayloadAction<boolean>) => {
		// }),

		// example: create.asyncThunk<any, void, ThunkConfig<string>>(
		// 	async (_, {
		// 		extra, rejectWithValue,
		// 	}) => {
		// 		try {
		// 			const response = await extra.api.get<any>("example", {
		// 			});

		// 			return response.data;
		// 		} catch (error: any) {
		// 			return rejectWithValue(error.response.data);
		// 		}
		// 	},
		// 	{
		// 		pending: (state) => {
		// 			state.isLoading = true;
		// 		},
		// 		fulfilled: (state, action) => {
		// 			state.isLoading = false;
		// 			state.error = undefined;
		// 		},
		// 		rejected: (state, action: any) => {
		// 			state.isLoading = false;
		// 			state.error = action.payload;
		// 		},
		// 	},
		// ),
	}),
});

export const { actions: entityUserActions } = entityUserSlice;
