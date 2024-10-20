"use client";

import clsx from "clsx";
import {
	FC, useCallback, useEffect, useMemo, useRef, useState,
} from "react";
import { IUser, UserDropDownButtonItem } from "@core/entities/User";
import ArrowIcon from "@core/shared/assets/arrow-bottom.svg";
import AvatarImage from "@core/shared/assets/avatar.svg?url";
import CrossIcon from "@core/shared/assets/cross.svg";
import { AvatarPopover } from "@core/shared/components/AvatarPopover/ui/AvatarPopover";
import { Portal } from "@core/shared/components/Portal";
import { PositionedPortalElement } from "@core/shared/components/PositionedPortalElement";
import cls from "./UserSelect.module.scss";

interface UserSelectProps {
	className?: string;
	data: IUser[];
}

export const UserSelect: FC<UserSelectProps> = ({ className, data }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [value, setValue] = useState("");
	const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
	const focusedIndexRef = useRef<number>(-1);

	const dropdownRef = useRef<HTMLUListElement>(null);
	const summaryRef = useRef<HTMLDivElement>(null);

	const handleKeyNavigation = useCallback((e: KeyboardEvent) => {
		if (!dropdownRef.current || !isOpen) return;

		const listItems = Array.from(dropdownRef.current.querySelectorAll("li"));

		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				focusedIndexRef.current = (focusedIndexRef.current + 1) % listItems.length;
				listItems[focusedIndexRef.current]?.querySelector("button")?.focus();
				break;
			case "ArrowUp":
				e.preventDefault();
				focusedIndexRef.current = (focusedIndexRef.current - 1 + listItems.length) % listItems.length;
				listItems[focusedIndexRef.current]?.querySelector("button")?.focus();
				break;
			case "Escape":
				setIsOpen(false);
				summaryRef.current?.focus();
				break;
			default:
				break;
		}
	}, [isOpen]);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (summaryRef.current
				&& !summaryRef.current.contains(e.target as Node)
				&& dropdownRef.current
				&& !dropdownRef.current.contains(e.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		window.addEventListener("keydown", handleKeyNavigation);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			window.removeEventListener("keydown", handleKeyNavigation);
		};
	}, [handleKeyNavigation]);

	useEffect(() => {
		if (selectedUser) {
			setValue(selectedUser.full_name);
		} else {
			setValue("");
		}
	}, [selectedUser]);

	const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const onClickSelect = useCallback((user: IUser) => () => {
		setSelectedUser(user);
		setIsOpen((prev) => !prev);
	}, []);

	const onClickDeselect = useCallback(() => {
		setSelectedUser(null);
	}, []);

	const onFocus = useCallback(() => {
		if (!selectedUser) {
			setIsOpen(true);
		}
	}, [selectedUser]);

	const userItems = useMemo(() => {
		return data.map((user) => {
			return (
				<li className={cls.UserSelect__item}>
					<button className={cls.UserSelect__selectButton} onClick={onClickSelect(user)}>
						<AvatarPopover className={cls.UserSelect__avatar} src={AvatarImage}>
							<UserDropDownButtonItem>Profile</UserDropDownButtonItem>
						</AvatarPopover>
						<p className={cls.UserSelect__name}>{user.full_name}</p>
						<p className={cls.UserSelect__email}>{user.email}</p>
					</button>
				</li>
			);
		});
	}, [data, onClickSelect]);

	return (
		<div className={clsx(cls.UserSelect, {
			[cls.UserSelect_isNotSelected]: !selectedUser,
		}, [className])}
		>
			<div ref={summaryRef} className={cls.UserSelect__summary}>
				<AvatarPopover className={cls.UserSelect__avatar} src={AvatarImage}>
					<UserDropDownButtonItem>Profile</UserDropDownButtonItem>
				</AvatarPopover>
				<input
					type="text"
					className={cls.UserSelect__input}
					onChange={onChangeValue}
					value={value}
					onFocus={onFocus}
					disabled={!!selectedUser}
					placeholder="Виберіть користувача"
				/>
				<p className={clsx(cls.UserSelect__email, [cls.UserSelect__email_summary])}>{selectedUser?.email}</p>
				{!selectedUser
					? (
						<ArrowIcon className={clsx(
							cls.UserSelect__arrowIcon,
							{ [cls.UserSelect__arrowIcon_open]: isOpen },
						)}
						/>
					)
					: (
						<button
							className={cls.UserSelect__deselectButton}
							aria-label="deselect"
							type="button"
							onClick={onClickDeselect}
						>
							<CrossIcon className={cls.UserSelect__crossIcon} />
						</button>
					)}
			</div>
			<PositionedPortalElement
				triggerRef={summaryRef}
				triggerDependency={[isOpen]}
				style={{ zIndex: 999 }}
			>
				<ul
					className={clsx(
						cls.UserSelect__list,
						{ [cls.UserSelect__list_open]: isOpen },
					)}
					ref={dropdownRef}
				>
					{userItems}
				</ul>
			</PositionedPortalElement>
		</div>
	);
};
