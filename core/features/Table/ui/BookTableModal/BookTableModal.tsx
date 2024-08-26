"use client";

import { ComboboxItem } from "@mantine/core";
import { Calendar, DateInput } from "@mantine/dates";
import clsx from "clsx";
import {
	Dispatch, FC, SetStateAction, useEffect,
	useState,
} from "react";
import { Table } from "@core/entities/Table";
import { userApi } from "@core/entities/User";
import { Button } from "@core/shared/components/Button";
import { Modal } from "@core/shared/components/Modal";
import { Select } from "@core/shared/components/Select";
import { TimePicker } from "@core/shared/components/TimePicker";
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
	const [value, setValue] = useState<ComboboxItem | null>(null);

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
			<Select
				classNames={{ dropdown: cls.Select__dropdown }}
				styles={{ dropdown: { zIndex: undefined } }}
				placeholder="Оберіть тривалість"
				data={[
					{ value: "30", label: "30 хв" },
					{ value: "60", label: "1 год" },
					{ value: "90", label: "1 год 30 хв" },
				]}
			/>
			<Select
				classNames={{ dropdown: cls.Select__dropdown }}
				styles={{ dropdown: { zIndex: undefined } }}
				label="Введіть ПІБ"
				placeholder="Pick value"
				nothingFoundMessage={isLoading ? "Loading..." : "No options found"}
				data={usersData.map((option) => ({ value: `${option.id}`, label: option.full_name }))}
				searchable
				onSearchChange={setSearch}
				searchValue={search}
				disabled={isLoading}
			/>
			<DateInput
				className={cls.DateInput}
				popoverProps={{ zIndex: 10000 }}
				clearable
				valueFormat="YYYY MMM DD"
				label="Date input"
				placeholder="Date input"
			/>
			<TimePicker bookedSlots={[{ startTime: "10:00", endTime: "11:00" },
				{ startTime: "12:00", endTime: "14:00" }]}
			/>

			<Button>Забронювати</Button>
		</Modal>
	);
};
