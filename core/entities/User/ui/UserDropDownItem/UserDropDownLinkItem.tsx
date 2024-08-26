import { Url } from "url";
import clsx from "clsx";
import Link from "next/link";
import { FC, ReactNode, SVGProps } from "react";
import ArrowIcon from "@core/shared/assets/arrow.svg";
import cls from "./UserDropDownItem.module.scss";

interface UserDropDownLinkItemProps {
	className?: string;
	href: string;
	children?: ReactNode;
	onClick?: () => void;
	Icon?: FC<SVGProps<SVGSVGElement>>;
}

export const UserDropDownLinkItem: FC<UserDropDownLinkItemProps> = ({
	className, href, onClick, Icon, children,
}) => {
	return (
		<li className={clsx(cls.UserDropDownItem, [className])}>
			<Link className={cls.UserDropDownItem__link} onClick={onClick} href={href}>
				{Icon && <Icon className={cls.UserDropDownItem__icon} />}
				<span className={cls.UserDropDownItem__name}>{children}</span>
				<ArrowIcon className={cls.UserDropDownItem__arrowIcon} />
			</Link>
		</li>
	);
};
