import { RootState } from "@core/app/providers/StoreProvider";

export const data = (state: RootState) => state.pageRegisterPage.data;
export const isLoading = (state: RootState) => state.pageRegisterPage.isLoading;
export const error = (state: RootState) => state.pageRegisterPage.error;
