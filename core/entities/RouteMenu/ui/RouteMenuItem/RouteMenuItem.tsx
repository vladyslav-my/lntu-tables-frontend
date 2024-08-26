import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, ReactNode, SVGProps } from "react";
import ArrowIcon from "@core/shared/assets/arrow.svg";
import cls from "./RouteMenuItem.module.scss";

interface RouteMenuItemProps {
	className?: string;
	href: string;
	children?: ReactNode;
	Icon?: FC<SVGProps<SVGSVGElement>>;
}

export const RouteMenuItem: FC<RouteMenuItemProps> = ({
	className, children, href, Icon,
}) => {
	const pathname = usePathname();

	return (
		<li className={clsx(cls.RouteMenuItem, {
			[cls.RouteMenuItem_active]: pathname === href,
		}, [className])}
		>
			<Link className={cls.RouteMenuItem__link} href={href}>
				{Icon && <Icon className={cls.RouteMenuItem__icon} />}
				<span className={cls.RouteMenuItem__name}>{children}</span>
				<ArrowIcon className={cls.RouteMenuItem__arrowIcon} />
			</Link>
		</li>
	);
};
