import clsx from "clsx";
import { FC, memo } from "react";
import { RouteMenuItem, routesMenuModal } from "@core/entities/RouteMenu";
import cls from "./RoutesList.module.scss";

interface RoutesListProps {
	className?: string
}

export const RoutesList: FC<RoutesListProps> = memo(({ className }) => {
	const routesItems = routesMenuModal.map((routes) => (
		<RouteMenuItem
			className={cls.RoutesList__item}
			key={routes.href}
			href={routes.href}
		>
			{routes.name}
		</RouteMenuItem>
	));

	return (
		<ul className={clsx(cls.RoutesList, {}, [className])}>
			{routesItems}
		</ul>
	);
});
