import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@core/shared/scss/layout/index.scss";

import { ColorSchemeScript } from "@mantine/core";
import { Metadata } from "next";
import { Providers } from "@core/app/providers/StoreProvider";

export const metadata: Metadata = {
	title: "LNTU tables",
	description: "Booking system for LNTU students",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<ColorSchemeScript />
			</head>
			<body>
				<Providers>
					{children}
				</Providers>
			</body>
		</html>

	);
}
