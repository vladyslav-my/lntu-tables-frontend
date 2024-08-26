import clsx from "clsx";
import { FC, memo, useCallback } from "react";
import { useMediaQuery } from "react-responsive";
import { Drawer } from "@core/features/Drawer";
import { Logo } from "@core/shared/components/Logo";
import { Devices } from "@core/shared/const/devices";
import { RoutesList } from "../RoutesList/RoutesList";
import cls from "./Sidebar.module.scss";

interface SidebarProps {
	className?: string;
	matchMedia?: boolean;
}

export const Sidebar: FC<SidebarProps> = memo(({ className }) => {
	const isTablet = useMediaQuery({ maxWidth: Devices.TABLET });

	const Content = useCallback(() => {
		return (
			<>
				<Logo className={cls.Sidebar__logo} />
				<RoutesList className={cls.Sidebar__routesList} />
			</>
		);
	}, []);

	if (isTablet) {
		return (
			<Drawer
				className={clsx(cls.Sidebar, {}, [className])}
			>
				<Content />
			</Drawer>
		);
	}

	return (
		<aside className={clsx(cls.Sidebar, {}, [className])}>
			<Content />
		</aside>
	);
});
