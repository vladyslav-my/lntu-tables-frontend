import clsx from "clsx";
import { FC } from "react";
import { Page } from "@core/widgets/Page";
import cls from "./BookedPage.module.scss";

interface BookedPageProps {
	className?: string
}

export const BookedPage: FC<BookedPageProps> = ({ className }) => {
	return (
		<Page
			className={clsx(cls.BookedPage, {}, [className])}
		/>
	);
};
