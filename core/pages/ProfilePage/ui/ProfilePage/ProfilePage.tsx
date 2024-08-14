import clsx from "clsx";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { $api } from "@core/shared/api/api";
import cls from "./ProfilePage.module.scss";

async function fetchUserData() {
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
		<div className={clsx(cls.ProfilePage, {}, [])}>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
};
