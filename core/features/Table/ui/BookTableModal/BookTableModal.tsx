"use client";

import { Button, Modal } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheckbox } from "@tabler/icons-react";
import clsx from "clsx";
import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { bookedTableApi, IBookedTableBody } from "@core/entities/BookedTable";
import { Table } from "@core/entities/Table";
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
		reValidateMode: "onSubmit",
		mode: "onSubmit",
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
		saveBookedTable(data).then(() => {
			close();
			notifications.show({
				title: "Столик успішно заброньовано",
				message: "Очікуйте на підтвердження бронювання",
				icon: <IconCheckbox size={64} />,
			});
		});
	};

	return (
		<Modal
			opened={opened}
			onClose={close}
			centered
			className={clsx(cls.BookTableModal, [className])}
			transitionProps={{ transition: "fade", duration: 400, timingFunction: "ease" }}
			style={styles}
			{...otherProps}
		>
			<h3 className={cls.BookTableModal__title}>Бронювання столика</h3>
			<p className={cls.BookTableModal__tableNumber}>Столик {table.number}</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="date_picker"
					control={control}
					rules={{
						required: "Дата є обов'язковою",
					}}
					render={({ field }) => (
						<FilledDatePickerInput
							{...field}
							error={errors.date_picker?.message}
						/>
					)}
				/>
				<Controller
					name="time_picker"
					control={control}
					rules={{
						required: "Час є обов'язковим",
					}}
					render={({ field }) => (
						<FilledAvailableTimeSelect
							{...field}
							error={errors.time_picker?.message}
							ownProps={{ tableId: table.id, date_picker: datePicker }}
						/>
					)}
				/>

				<Controller
					name="duration"
					control={control}
					rules={{
						required: "Тривалість є обов'язковою",
					}}
					render={({ field }) => (
						<FilledDurationSelect
							{...field}
							error={errors.duration?.message}
						/>
					)}
				/>

				<Controller
					name="guest_id"
					control={control}
					rules={{
						required: "Користувач є обов'язковим",
					}}
					render={({ field }) => (
						<FilledUserSelect
							{...field}
							error={errors.guest_id?.message}
						/>
					)}
				/>

				<Button type="submit" loading={isLoading}>Забронювати</Button>
			</form>
		</Modal>
	);
};
