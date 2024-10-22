"use client";

import { Modal } from "@mantine/core";
import clsx from "clsx";
import {
	FC,
	useEffect,
} from "react";
import {
	Controller, useForm,
} from "react-hook-form";
import { bookedTableApi, IBookedTableBody } from "@core/entities/BookedTable";
import { Table } from "@core/entities/Table";
import { Button } from "@core/shared/components/Button";
import { formatDate } from "../../lib";
import { FilledAvailableTimeSelect } from "../FilledAvailableTimeSelect/FilledAvailableTimeSelect";
import { FilledDatePickerInput } from "../FilledDatePickerInput/FilledDatePickerInput";
import { FilledDurationSelect } from "../FilledDurationSelect/FilledDurationSelect";
import { FilledUserSelect } from "../FilledUserSelect/FilledUserSelect";
import cls from "./BookTableModal.module.scss";

interface BookTableModalProps {
	className?: string;
	table: Table;
	opened: boolean;
	close: () => void;
	styles: any;
}

export const BookTableModal: FC<BookTableModalProps> = ({
	className, table, opened, close, styles, ...otherProps
}) => {
	const [saveBookedTable, { isLoading, error }] = bookedTableApi.useSaveBookedTableMutation();

	const {
		handleSubmit, control, reset, formState: { errors }, watch, setValue,
	} = useForm<IBookedTableBody>({
		reValidateMode: "onBlur",
		mode: "onBlur",
		defaultValues: {
			table_id: table.id,
			date_picker: formatDate(new Date()),
		},
	});

	const datePicker = watch("date_picker");

	useEffect(() => {
		if (datePicker) {
			setValue("time_picker", null);
		}
	}, [datePicker, setValue]);

	const onSubmit = (data: IBookedTableBody) => {
		console.log(data);
		// saveBookedTable(data);
	};

	return (
		<Modal
			opened={opened}
			onClose={close}
			centered
			className={clsx(cls.BookTableModal, [className])}
			transitionProps={{ duration: 0 }}
			style={styles}
			{...otherProps}
		>
			<h3 className={cls.BookTableModal__title}>Бронювання столику</h3>
			<p className={cls.BookTableModal__tableNumber}>Столик {table.number}</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="date_picker"
					control={control}
					rules={{
					}}
					render={({ field }) => (
						<FilledDatePickerInput
							{...field}
						/>
					)}
				/>
				<Controller
					name="time_picker"
					control={control}
					rules={{
					}}
					render={({ field }) => (
						<FilledAvailableTimeSelect
							{...field}
							ownProps={{ tableId: table.id, date_picker: datePicker }}
						/>
					)}
				/>

				<Controller
					name="duration"
					control={control}
					rules={{
					}}
					render={({ field }) => (
						<FilledDurationSelect
							{...field}
						/>
					)}
				/>

				<Controller
					name="guest_id"
					control={control}
					rules={{
					}}
					render={({ field }) => (
						<FilledUserSelect
							{...field}
						/>
					)}
				/>

				<Button type="submit" isLoading={isLoading}>Забронювати</Button>
			</form>
		</Modal>
	);
};
