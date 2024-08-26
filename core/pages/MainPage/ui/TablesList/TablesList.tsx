"use client";

import clsx from "clsx";
import { FC, useMemo } from "react";
import { TableItem } from "@core/features/Table";
import { Table } from "@core/entities/Table";
import cls from "./TablesList.module.scss";

interface TablesListProps {
	className?: string;
	tables: Table[]
}

export const TablesList: FC<TablesListProps> = ({ className, tables }) => {
	const tablesItems = useMemo(() => {
		return tables.map((table) => (
			<TableItem
				key={table.id}
				table={table}
			/>
		));
	}, [tables]);

	return (
		<ul className={clsx(cls.TablesList, {}, [className])}>
			{tablesItems}
		</ul>
	);
};
