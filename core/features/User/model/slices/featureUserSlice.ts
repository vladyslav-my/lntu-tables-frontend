import { PayloadAction } from "@reduxjs/toolkit";
import { createSliceWithThunk } from "@core/shared/lib/createSliceWithThunk";
import { FeatureUserSchema } from "../types";

const initialState: FeatureUserSchema = {
	isOpen: false,
};

export const featureUserSlice = createSliceWithThunk({
	name: "featureUser",
	initialState,
	reducers: (create) => ({
		setIsOpen: create.reducer((state, action: PayloadAction<boolean>) => {
			state.isOpen = action.payload;
		}),
	}),
});

export const {
	actions: featureUserActions,
	selectors: featureUserSelectors,
} = featureUserSlice;
