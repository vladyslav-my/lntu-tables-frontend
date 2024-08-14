import clsx from "clsx";
import { FC } from "react";
import { LogoutButton } from "@core/features/User";
import cls from "./Sidebar.module.scss";

interface SidebarProps {
	className?: string
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
	return (
		<aside className={clsx(cls.Sidebar, {}, [className])}>
			<LogoutButton />
		</aside>
	);
};
