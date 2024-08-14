import { AppLayout } from "@core/app/layouts/AppLayout/AppLayout";
import { Sidebar } from "@core/widgets/Sidebar";

export default function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<AppLayout>
			{children}
		</AppLayout>
	);
}
