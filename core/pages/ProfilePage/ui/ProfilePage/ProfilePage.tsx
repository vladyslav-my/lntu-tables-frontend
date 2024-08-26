import clsx from "clsx";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { forwardRef } from "react";
import { Page } from "@core/widgets/Page";
import { $api } from "@core/shared/api/api";
import { Button } from "@core/shared/components/Button";
import cls from "./ProfilePage.module.scss";

async function fetchUserData() {
	"use server";

	const cookieStore = cookies();
	const sanctumToken = cookieStore.get("sanctum_token");

	if (!sanctumToken) {
		redirect("/login");
	}

	try {
		const response = await $api.get("api/users/me", {
			headers: {
				Authorization: `Bearer ${sanctumToken.value}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Failed to fetch user data", error);
		redirect("/login");
	}
}

export const ProfilePage = async () => {
	const data = await fetchUserData();
	return (
		<Page
			className={clsx(cls.ProfilePage, {}, [])}
			title="Мої дані"
		>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</Page>
	);
};
