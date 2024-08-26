import clsx from "clsx";
import Image from "next/image";
import {
	FC, memo, useCallback, useEffect, useRef, useState,
} from "react";
import { UserDropDownLinkItem } from "@core/entities/User";
import { LogoutButton } from "../LogoutButton/LogoutButton";
import cls from "./UserDropDown.module.scss";

interface UserDropDownProps {
	className?: string;
}

export const UserDropDown: FC<UserDropDownProps> = memo(({ className }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownButtonRef = useRef<HTMLButtonElement>(null);

	const onClick = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (dropdownButtonRef.current && !dropdownButtonRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};

		const onKeydown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		window.addEventListener("keydown", onKeydown);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			window.removeEventListener("keydown", onKeydown);
		};
	}, []);

	return (
		<div className={clsx(cls.UserDropDown, [className])}>
			<button
				className={cls.UserDropDown__button}
				aria-label="user drop down"
				onClick={onClick}
				ref={dropdownButtonRef}
			>
				<Image
					className={cls.UserDropDown__image}
					src=""
					alt=""
				/>
			</button>
			<ul className={clsx(cls.UserDropDown__list, {
				[cls.UserDropDown__list_open]: isOpen,
			})}
			>
				<UserDropDownLinkItem href="/profile">
					Profile
				</UserDropDownLinkItem>
				<LogoutButton />
			</ul>
		</div>
	);
});
