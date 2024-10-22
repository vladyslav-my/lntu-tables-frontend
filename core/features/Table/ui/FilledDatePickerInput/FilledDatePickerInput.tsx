import { DatePickerInput, DatesRangeValue, DateValue } from "@mantine/dates";
import clsx from "clsx";
import { ComponentProps, FC, useCallback } from "react";
import { formatDate } from "../../lib";
import cls from "./FilledDatePickerInput.module.scss";

interface FilledDatePickerInputProps extends Omit<ComponentProps<typeof DatePickerInput>, "onChange" | "value"> {
	onChange: (value?: string) => void;
	value?: string | null;
}

export const FilledDatePickerInput: FC<FilledDatePickerInputProps> = ({
	className, value, onChange, ...otherProps
}) => {
	const onChangeHandler = useCallback((value: DateValue | Date[] | DatesRangeValue) => {
		const custedValue = value as DateValue;
		const formattedDate = formatDate(custedValue);
		onChange(formattedDate);
	}, [onChange]);

	return (
		<DatePickerInput
			className={clsx(cls.FilledDatePickerInput, {}, [className])}
			size="md"
			label="Виберіть дату"
			placeholder="Виберіть дату"
			onChange={onChangeHandler}
			value={value ? new Date(value) : undefined}
			{...otherProps}
		/>
	);
};
