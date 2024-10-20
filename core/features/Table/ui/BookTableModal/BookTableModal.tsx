"use client";

import clsx from "clsx";
import {
	Dispatch, FC, SetStateAction, useEffect,
	useState,
} from "react";
import { Table } from "@core/entities/Table";
import { userApi } from "@core/entities/User";
import { Button } from "@core/shared/components/Button";
import { Modal } from "@core/shared/components/Modal";
import { Select, UserSelect } from "@core/shared/components/Selects";
import cls from "./BookTableModal.module.scss";

interface BookTableModalProps {
	className?: string;
	table: Table;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	isOpen: boolean;
}

export const BookTableModal: FC<BookTableModalProps> = ({
	className, table, isOpen, setIsOpen,
}) => {
	const [search, setSearch] = useState();
	const { data: usersData = [], error, isLoading } = userApi.useGetUsersQuery({ search });

	console.log(usersData);

	useEffect(() => {

	}, [search]);

	return (
		<Modal
			className={clsx(cls.BookTableModal, [className])}
			setIsOpen={setIsOpen}
			isOpen={isOpen}
		>
			<h3 className={cls.BookTableModal__title}>Бронювання столику</h3>
			<p className={cls.BookTableModal__tableNumber}>Столик {table.number}</p>
			<UserSelect
				className={cls.BookTableModal__userSelect}
				data={usersData}
			/>
			<Select placeholder="Оберіть тривалість" options={[{ id: 1, slug: "1 час" }, { id: 2, slug: "2 часа" }, { id: 3, slug: "3 часа" }]} />
			<Button>Забронювати</Button>
		</Modal>
	);
};
