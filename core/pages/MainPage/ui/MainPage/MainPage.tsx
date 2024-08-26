"use server";

import clsx from "clsx";
import {
	FC,
} from "react";
import { Page } from "@core/widgets/Page";
import { TableItem } from "@core/features/Table";
import { TableItem as EntityTableItem } from "@core/entities/Table";
import { getTables } from "@core/entities/Table/server";
import { TablesList } from "../TablesList/TablesList";
import cls from "./MainPage.module.scss";

interface MainPageProps {
	className?: string;
}

export const MainPage: FC<MainPageProps> = async ({ className }) => {
	const tables = await getTables();

	return (
		<Page
			className={clsx(cls.MainPage, {}, [className])}
			title="Карта залу"
		>
			<TablesList tables={tables} />
		</Page>
	);
};
