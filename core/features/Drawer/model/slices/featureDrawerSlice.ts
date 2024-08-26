import { PayloadAction } from "@reduxjs/toolkit";
import { createSliceWithThunk } from "@core/shared/lib/createSliceWithThunk";
import { FeatureDrawerSchema } from "../types";

const initialState: FeatureDrawerSchema = {
	isOpen: false,
};

export const featureDrawerSlice = createSliceWithThunk({
	name: "featureDrawer",
	initialState,
	reducers: (create) => ({
		setIsOpen: create.reducer((state, action: PayloadAction<boolean>) => {
			state.isOpen = action.payload;
		}),
	}),
	selectors: {
		isOpen: (state) => state.isOpen,
	},
});

export const { actions: featureDrawerActions, selectors: featureDrawerSelectors } = featureDrawerSlice;
