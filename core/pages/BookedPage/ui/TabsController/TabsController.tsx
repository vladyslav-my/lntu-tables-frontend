"use client";

import { Tabs } from "@mantine/core";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import cls from "./TabsController.module.scss";

interface TabsControllerProps {
	className?: string;
	initialTab: "current" | "my" | "his";
}

export const TabsController: FC<TabsControllerProps> = ({ className, initialTab }) => {
	const router = useRouter();

	const handleTabChange = (newTab: string | null | undefined) => {
		if (newTab) {
			router.push(`/app/booked?tab=${newTab}`);
		}
	};

	return (
		<Tabs
			className={clsx(cls.TabsController, {}, [className])}
			color="violet"
			variant="pills"
			onChange={handleTabChange}
			value={initialTab}
		>
			<Tabs.List>
				<Tabs.Tab value="current">Поточні бронювання</Tabs.Tab>
				<Tabs.Tab value="my">Мої запити</Tabs.Tab>
				<Tabs.Tab value="his">Отримані запити</Tabs.Tab>
			</Tabs.List>
		</Tabs>
	);
};
