"use client";

import { setupListeners } from "@reduxjs/toolkit/query";
import {
	FC, ReactNode, useEffect, useRef,
} from "react";
import { Provider } from "react-redux";
import { AppStore, createReduxStore } from "../config/store";

interface StoreProviderProps {
	children: ReactNode;
}

export const store = createReduxStore();

const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
	const storeRef = useRef<AppStore | null>(null);

	if (!storeRef.current) {
		storeRef.current = createReduxStore();
	}

	useEffect(() => {
		if (storeRef.current != null) {
			const unsubscribe = setupListeners(storeRef.current.dispatch);
			return unsubscribe;
		}
	}, []);

	return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
