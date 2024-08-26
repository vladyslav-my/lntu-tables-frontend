import { AppDispatch, RootState } from "./config/store";
import { ThunkConfig } from "./config/types";
import { Providers } from "./ui/Providers";
import StoreProvider, { store } from "./ui/StoreProvider";

export { StoreProvider, Providers, store };

export type {
	AppDispatch, RootState, ThunkConfig,
};
