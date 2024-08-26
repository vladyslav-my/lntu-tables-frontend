import { AppLayout } from "@core/app/layouts/AppLayout";

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
