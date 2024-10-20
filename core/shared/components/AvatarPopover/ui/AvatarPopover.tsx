import clsx from "clsx";
import Image from "next/image";
import {
	FC, memo, ReactNode, useCallback, useEffect, useRef, useState,
} from "react";
import AvatarImage from "@core/shared/assets/avatar.svg?url";
import { PositionedPortalElement } from "../../PositionedPortalElement";
import cls from "./AvatarPopover.module.scss";

interface AvatarPopoverProps {
	className?: string;
	src?: string;
	children: ReactNode;
}

export const AvatarPopover: FC<AvatarPopoverProps> = memo(({ className, src, children }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownButtonRef = useRef<HTMLButtonElement>(null);
	const avatarPopoverRef = useRef<HTMLDivElement>(null);

	const onClick = useCallback((e: MouseEvent) => {
		e.stopPropagation();
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
		<div className={clsx(cls.AvatarPopover, [className])} ref={avatarPopoverRef}>
			<button
				className={cls.AvatarPopover__button}
				aria-label="open avatar popover"
				onClick={onClick}
				ref={dropdownButtonRef}
			>
				<Image
					className={cls.AvatarPopover__image}
					src={AvatarImage}
					alt="Avatar"
				/>
			</button>
			<PositionedPortalElement
				triggerRef={dropdownButtonRef}
				style={{ zIndex: 999 }}
				fullWidth
				position="right"
			>
				<ul className={clsx(cls.AvatarPopover__list, {
					[cls.AvatarPopover__list_open]: isOpen,
				})}
				>
					{children}
				</ul>
			</PositionedPortalElement>
		</div>
	);
});
