"use client";

import clsx from "clsx";
import {
	FC, ReactNode, useEffect, useRef,
} from "react";
import { useMediaQuery } from "react-responsive";
import { Sidebar } from "@core/widgets/Sidebar";
import { ToggleDrawerButton } from "@core/features/Drawer";
import { ThemeSwitcher } from "@core/features/ThemeSwitcher";
import { UserDropDown } from "@core/features/User";
import { Container, ContainerModifier } from "@core/shared/components/Container";
import { Scrollbar } from "@core/shared/components/Scrollbar";
import { Devices } from "@core/shared/const/devices";
import cls from "./AppLayout.module.scss";

interface AppLayoutProps {
	children: ReactNode;
}

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
	const scrollableRef = useRef<any>(null);
	const isTablet = useMediaQuery({ maxWidth: Devices.TABLET });

	useEffect(() => {
		scrollableRef.current = document.querySelector("#scrollable-content");
	}, []);

	return (
		<Container
			className={cls.AppLayout}
			modifier={
				isTablet
					? ContainerModifier.DEFAULT
					: ContainerModifier.APP
			}
		>
			<div className={cls.AppLayout__app}>
				<Sidebar className={cls.AppLayout__sidebar} />
				<header className={clsx(cls.Header, cls.AppLayout__header)}>
					<ThemeSwitcher />
					{isTablet && <ToggleDrawerButton className={cls.Header__toggleDrawerButton} />}
					<UserDropDown className={cls.Header__userDropDown} />
				</header>
				<main className={cls.AppLayout__main}>
					{children}
				</main>
				{!isTablet && <Scrollbar scrollableRef={scrollableRef} />}
			</div>
		</Container>
	);
};
