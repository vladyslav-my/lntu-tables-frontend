import clsx from "clsx";
import {
	ComponentProps, FC, useCallback, useState,
} from "react";
import { userApi } from "@core/entities/User";
import { UserSelect } from "@core/shared/components/Selects";
import cls from "./FilledUserSelect.module.scss";

interface FilledUserSelectProps extends Omit<ComponentProps<typeof UserSelect>, "data" | "value" | "onChange"> {
	onChange: (value: number) => void;
	value: number | null;
}

export const FilledUserSelect: FC<FilledUserSelectProps> = ({
	className, onChange, value, ...otherProps
}) => {
	const [search, setSearch] = useState("");
	const { data: usersData = [], error, isLoading } = userApi.useGetUsersQuery({ search });

	const onSearchChange = useCallback((value: string) => {
		setSearch(value);
	}, []);

	const onChangeHandler = useCallback((value: string | null) => {
		onChange(+value!);
	}, [onChange]);

	return (
		<UserSelect
			className={clsx(cls.FilledUserSelect, {}, [className])}
			searchValue={search}
			label="Пошук користувача"
			placeholder="Пошук користувача"
			onSearchChange={onSearchChange}
			nothingFoundMessage="Користувачів не знайдено"
			error={!!error}
			{...otherProps}
			data={usersData}
			onChange={onChangeHandler}
			value={value ? value.toString() : null}
		/>
	);
};
