import { FC, ReactNode } from "react";
import { MantineProvider } from "./MantineProvider";
import StoreProvider from "./StoreProvider";

interface ProvidersProps {
	children?: ReactNode;
}

export const Providers: FC<ProvidersProps> = ({ children }) => {
	return (
		<StoreProvider>
			<MantineProvider>
				{children}
			</MantineProvider>
		</StoreProvider>
	);
};
