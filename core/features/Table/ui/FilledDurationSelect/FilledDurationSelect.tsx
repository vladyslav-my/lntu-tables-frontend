import { Select } from "@mantine/core";
import clsx from "clsx";
import { ComponentProps, FC } from "react";
import cls from "./FilledDurationSelect.module.scss";

interface FilledDurationSelectProps extends Omit<ComponentProps<typeof Select>, "onChange" | "value"> {
	value?: number;
	onChange: (value: number) => void;
}

export const FilledDurationSelect: FC<FilledDurationSelectProps> = ({
	className, value, onChange, ...otherProps
}) => {
	const onChangeHandler = (value: string | null) => {
		onChange(+value!);
	};

	return (
		<Select
			className={clsx(cls.FilledDurationSelect, {}, [className])}
			size="md"
			clearable
			label="Виберіть тривалість"
			placeholder="Виберіть тривалість"
			data={[
				{ value: "30", label: "30 хв" },
				{ value: "60", label: "1 год 30 хв" },
				{ value: "90", label: "1 год 30 хв" },
			]}
			value={value?.toString()}
			onChange={onChangeHandler}
			{...otherProps}
		/>
	);
};
