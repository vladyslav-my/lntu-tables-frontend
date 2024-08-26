import { MantineProvider, createTheme, MantineColorsTuple } from "@mantine/core";
import { FC, ReactNode } from "react";
import StoreProvider from "./StoreProvider";

interface ProvidersProps {
	children?: ReactNode;
}

export const Providers: FC<ProvidersProps> = ({ children }) => {
	const myColor: MantineColorsTuple = [
		"#eef1ff",
		"#ddddf4",
		"#b8b9e2",
		"#9192d1",
		"#7171c3",
		"#5c5cba",
		"#5151b7",
		"#4243a1",
		"#393b91",
		"#2f3281",
	];

	const theme = createTheme({
		colors: {
			myColor,
		},
	});
	return (
		<StoreProvider>
			<MantineProvider theme={theme}>
				{children}
			</MantineProvider>
		</StoreProvider>
	);
};
