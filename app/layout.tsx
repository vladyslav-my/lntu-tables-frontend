import "@core/shared/scss/layout/index.scss";

import { Metadata } from "next";
import { StoreProvider } from "@core/app/providers/StoreProvider";
import { Sidebar } from "@core/widgets/Sidebar";

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
		<StoreProvider>
			<html lang="en">
				<body>
					<Sidebar />
					<main>{children}</main>
				</body>
			</html>
		</StoreProvider>

	);
}
