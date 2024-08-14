"use client";

import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { LogoutButton } from "@core/features/User";
import { $api } from "@core/shared/api/api";
import cls from "./MainPage.module.scss";

interface MainPageProps {
	className?: string
}

const data = {
	bookedSlots: [
		{
			startTime: "8:00",
			endTime: "9:00",
		},
		{
			startTime: "10:00",
			endTime: "11:00",
		},

		{
			startTime: "12:00",
			endTime: "14:00",
		},
		{
			startTime: "16:00",
			endTime: "16:30",
		},
	],
};

const getData = async () => {
	const response = await $api.get("api/users/me");

	return response.data;
};

export const MainPage: FC<MainPageProps> = ({ className }) => {
	const [data, setData] = useState();

	useEffect(() => {
		getData().then(setData);
	}, []);

	return (
		<div className={clsx(cls.MainPage, {}, [className])}>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
};
