import { Url } from "url";
import clsx from "clsx";
import Link from "next/link";
import { FC, ReactNode, SVGProps } from "react";
import ArrowIcon from "@core/shared/assets/arrow.svg";
import cls from "./UserDropDownItem.module.scss";

interface UserDropDownButtonItemProps {
	className?: string;
	children?: ReactNode;
	onClick?: () => void;
	Icon?: FC<SVGProps<SVGSVGElement>>;
}

export const UserDropDownButtonItem: FC<UserDropDownButtonItemProps> = ({
	className, children, onClick, Icon,
}) => {
	return (
		<li className={clsx(cls.UserDropDownItem, [className])}>
			<button className={cls.UserDropDownItem__link} onClick={onClick}>
				{Icon && <Icon className={cls.UserDropDownItem__icon} />}
				<span className={cls.UserDropDownItem__name}>{children}</span>
				<ArrowIcon className={cls.UserDropDownItem__arrowIcon} />
			</button>
		</li>
	);
};
