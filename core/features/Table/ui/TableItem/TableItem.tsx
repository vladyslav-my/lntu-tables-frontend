"use client";

import { Transition } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import clsx from "clsx";
import { FC } from "react";
import { TableItem as EntityTableItem, Table } from "@core/entities/Table";
import { BookTableModal } from "../BookTableModal/BookTableModal";
import cls from "./TableItem.module.scss";

interface TableItemProps {
	className?: string;
	table: Table;
}

export const TableItem: FC<TableItemProps> = ({ className, table }) => {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Transition
				mounted={opened}
				transition="fade"
				duration={400}
				timingFunction="ease"
			>
				{(styles) => (
					<BookTableModal
						opened={opened}
						close={close}
						table={table}
						styles={styles}
					/>
				)}
			</Transition>
			<EntityTableItem
				className={clsx(cls.TableItem, {}, [className])}
				onClick={open}
				number={table.number}
			/>
		</>

	);
};
