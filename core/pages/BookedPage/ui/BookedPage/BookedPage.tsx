import clsx from "clsx";
import { FC } from "react";
import { Page } from "@core/widgets/Page";
import { BookedTables } from "../BookedTables/BookedTables";
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

			<BookedTables searchParams={searchParams} />
		</Page>
	);
};
