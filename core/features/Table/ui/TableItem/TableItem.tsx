"use client";

import clsx from "clsx";
import { FC, useCallback, useState } from "react";
import { TableItem as EntityTableItem, Table } from "@core/entities/Table";
import { BookTableModal } from "../BookTableModal/BookTableModal";
import cls from "./TableItem.module.scss";

interface TableItemProps {
	className?: string;
	table: Table;
}

export const TableItem: FC<TableItemProps> = ({ className, table }) => {
	const [isOpenModal, setIsOpenModal] = useState(false);

	const onClick = useCallback(() => {
		setIsOpenModal(true);
	}, []);

	return (
		<>
			{isOpenModal && (
				<BookTableModal
					isOpen={isOpenModal}
					setIsOpen={setIsOpenModal}
					table={table}
				/>
			)}
			<EntityTableItem
				className={clsx(cls.TableItem, {}, [className])}
				onClick={onClick}
				number={table.number}
			/>
		</>

	);
};
