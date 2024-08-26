"use client";

import clsx from "clsx";
import {
	FC, memo,
} from "react";
import TableIcon from "@core/shared/assets/table.svg";
import { Button } from "@core/shared/components/Button";
import cls from "./TableItem.module.scss";

interface TablesProps {
	className?: string;
	number: number;
	onClick?: () => void;
}

export const TableItem: FC<TablesProps> = memo(({ className, number, onClick }) => {
	return (
		<li className={clsx(cls.TableItem, [className])}>
			<TableIcon className={cls.TableItem__icon} />
			<h2 className={cls.TableItem__title}>Столик {number}</h2>
			<Button
				className={cls.TableItem__button}
				onClick={onClick}
				wide
			>
				Забронювати
			</Button>
		</li>
	);
});
