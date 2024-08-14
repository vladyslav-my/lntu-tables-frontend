import {
	Action,
	combineSlices, configureStore,
	ThunkAction,
} from "@reduxjs/toolkit";
import { $api } from "@core/shared/api/api";
import { rtkApi } from "@core/shared/api/rtkApi";
import { ExtraArgumentType } from "./types";

const rootReducer = combineSlices(
	{
		[rtkApi.reducerPath]: rtkApi.reducer,
	},
);

export const createReduxStore = () => {
	const extraArgument: ExtraArgumentType = {
		api: $api,
	};

	const store = configureStore({
		reducer: rootReducer,
		devTools: true,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware({
			thunk: { extraArgument },
		}).concat(rtkApi.middleware),
	});

	return store;
};
export type AppStore = ReturnType<typeof createReduxStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = AppStore["getState"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
ThunkReturnType,
RootState,
unknown,
Action
>;
