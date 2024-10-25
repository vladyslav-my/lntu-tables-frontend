import { Loader } from "@mantine/core";
import clsx from "clsx";
import { FC, Suspense } from "react";
import { Page } from "@core/widgets/Page";
import { CenteredLoader } from "@core/shared/components/CenteredLoader";
import { Content } from "../Content/Content";
import { TabsController } from "../TabsController/TabsController";
import cls from "./BookedPage.module.scss";

interface BookedPageProps {
	className?: string;
	searchParams: { tab: "my" | "his" | "current" };
}

export const BookedPage: FC<BookedPageProps> = async ({ searchParams }) => {
	return (
		<Page
			className={clsx(cls.BookedPage)}
			fixedContent={<TabsController initialTab={searchParams.tab} />}
		>

			<Suspense key={searchParams.tab} fallback={<CenteredLoader />}>
				<Content searchParams={searchParams} />
			</Suspense>
		</Page>
	);
};
