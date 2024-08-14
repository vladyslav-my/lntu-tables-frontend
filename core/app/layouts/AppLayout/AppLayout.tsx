import clsx from "clsx";
import { FC, ReactNode } from "react";
import { Sidebar } from "@core/widgets/Sidebar";
import cls from "./AppLayout.module.scss";

interface AppLayoutProps {
	children: ReactNode;
}

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
	return (
		<div className={cls.AppLayout}>
			<Sidebar className={cls.AppLayout__sidebar} />
			<main className={cls.AppLayout__main}>
				{children}
			</main>
		</div>
	);
};
