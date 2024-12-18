"use client";

import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import {
	FC, memo, useMemo,
} from "react";
import { BookedTable, bookedTableApi } from "@core/entities/BookedTable";
import { CenteredLoader } from "@core/shared/components/CenteredLoader";
import cls from "./BookedTables.module.scss";

interface BookedTablesProps {
	className?: string;
	searchParams: {
		tab: "my" | "his" | "current";
	};
}

export const BookedTables: FC<BookedTablesProps> = memo(({ className }) => {
	const tab = useSearchParams().get("tab") as "my" | "his" | "current" | undefined;
	const { data, error, isLoading } = bookedTableApi.useGetBookedTablesQuery({ tab }, {
	});

	const bookedTablesItems = useMemo(() => {
		return data?.map((data) => (
			<BookedTable data={data} key={data.id} />
		));
	}, [data]);

	if (isLoading) {
		return <CenteredLoader />;
	}

	if (error) {
		return <div>error</div>;
	}

	return (
		<ul className={clsx(cls.BookedTables, {}, [className])}>
			{bookedTablesItems}
		</ul>
	);
});
