import {
	Avatar, CloseButton, HoverCard, Select, Text,
} from "@mantine/core";
import {
	IconCheck,
} from "@tabler/icons-react";
import clsx from "clsx";
import {
	ComponentProps, FC, memo, useCallback, useState,
} from "react";
import { HoverAvatar } from "@core/shared/components/common";
import cls from "./UserSelect.module.scss";

interface UserSelectProps extends Omit<ComponentProps<typeof Select>, "data"> {
	data: {
		id: number;
		full_name: string;
		email: string;
		avatar: string | null;
	}[];
	value: string | null;
	onChange: (value: string | null) => void;
}

const iconProps = {
	stroke: 1.5,
	color: "currentColor",
	opacity: 0.6,
	size: 18,
};

const renderSelectOption = ({ option, checked }: any) => (
	<div className={cls.UserSelectOption}>
		<HoverAvatar src={option.avatar} />
		<div className={cls.UserSelectOption__info}>
			<Text size="sm">{option.label}</Text>
			<Text size="xs">{option.email}</Text>
		</div>
		{checked && <IconCheck className={cls.UserSelectOption__check} {...iconProps} />}
	</div>
);

export const UserSelect: FC<UserSelectProps> = memo(({
	className, data, value, onChange, ...otherProps
}) => {
	// const [value, setValue] = useState<string | null>(null);

	// const onChange = useCallback((value: string | null) => {
	// 	setValue(value);
	// }, []);

	const onClickClose = useCallback(() => {
		onChange(null);
	}, [onChange]);

	const dtoData = data.map((item) => ({
		value: item.id.toString(),
		label: item.full_name,
		email: item.email,
		avatar: item.avatar,
	}));

	return (
		<Select
			className={clsx(cls.UserSelect, {}, [className])}
			leftSection={value && <HoverAvatar src={data.find((item) => item.id === Number(value))?.avatar} />}
			size="md"
			searchable
			readOnly={!!value}
			rightSection={value ? <CloseButton style={{ pointerEvents: "all" }} onClick={onClickClose} /> : null}
			value={value}
			onChange={onChange}
			renderOption={renderSelectOption}
			{...otherProps}
			data={dtoData}
		/>
	);
});
