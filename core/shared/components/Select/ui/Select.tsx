import { Select as MantineSelect } from "@mantine/core";
import clsx from "clsx";
import {
	ComponentProps, FC, memo, useState,
} from "react";
import ArrowIcon from "@core/shared/assets/arrow.svg";
import cls from "./Select.module.scss";

interface SelectProps extends ComponentProps<typeof MantineSelect> {

}

export const Select: FC<SelectProps> = memo(({ styles, ...otherProps }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<MantineSelect
			styles={{ dropdown: { zIndex: undefined }, ...styles }}
			rightSection={(
				<ArrowIcon className={
					clsx(
						cls.Select__arrow,
						{ [cls.Select__arrow_open]: isOpen },
					)
				}
				/>
			)}
			dropdownOpened={isOpen}
			onDropdownOpen={() => setIsOpen(true)}
			onDropdownClose={() => setIsOpen(false)}
			{...otherProps}
		/>
	);
});
