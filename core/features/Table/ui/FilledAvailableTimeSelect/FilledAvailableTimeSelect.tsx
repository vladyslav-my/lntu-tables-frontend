import { Select } from "@mantine/core";
import clsx from "clsx";
import { ComponentProps, FC, useCallback } from "react";
import { bookedTableApi } from "@core/entities/BookedTable";
import cls from "./FilledAvailableTimeSelect.module.scss";

interface FilledAvailableTimeSelectProps extends ComponentProps<typeof Select> {
	ownProps: {
		tableId: number;
		date_picker: string;
	}
}

export const FilledAvailableTimeSelect: FC<FilledAvailableTimeSelectProps> = ({ className, ownProps, ...otherProps }) => {
	const { data, refetch, error } = bookedTableApi.useGetAvailableTimeQuery({
		tableId: ownProps.tableId,
		date_picker: ownProps.date_picker,
	}, {
		skip: !ownProps.date_picker,
		refetchOnMountOrArgChange: true,
	});

	const checkErrors = useCallback(() => {
		if (error) {
			return "Сталася непередбачувана помилка";
		}

		if (!data?.length) {
			return true;
		}

		return false;
	}, [data?.length, error]);

	return (
		<Select
			className={clsx(cls.FilledAvailableTimeSelect, {}, [className])}
			size="md"
			clearable
			label="Виберіть доступний час"
			placeholder={data?.length ? "Виберіть доступний час" : "Немає доступних годин"}
			disabled={!data?.length}
			error={checkErrors()}
			data={!error ? data : []}
			{...otherProps}
		/>
	);
};