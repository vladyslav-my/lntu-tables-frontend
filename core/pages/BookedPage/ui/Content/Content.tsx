import { Loader } from "@mantine/core";
import clsx from "clsx";
import { FC, Suspense, useTransition } from "react";
import { BookedTable, bookedTableApi } from "@core/entities/BookedTable";
import { getBookedTables } from "@core/entities/BookedTable/server";
import cls from "./Content.module.scss";

interface ContentProps {
	className?: string;
	searchParams: any;
}

export const Content: FC<ContentProps> = async ({ className, searchParams }) => {
	const data = await getBookedTables({
		tab: searchParams.tab,
	});

	return (
		<div className={clsx(cls.Content, {}, [className])}>
			{data.map((data) => (
				<BookedTable data={data} key={data.id} />
			))}

			{/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
		</div>
	);
};
