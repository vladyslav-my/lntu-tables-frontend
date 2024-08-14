import { AppDispatch, RootState } from "./config/store";
import { ThunkConfig } from "./config/types";
import StoreProvider, { store } from "./ui/StoreProvider";

export { StoreProvider, store };

export type {
	AppDispatch, RootState, ThunkConfig,
};
