"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { FC, memo, useCallback } from "react";
import { userApi } from "@core/entities/User";
import { Button } from "@core/shared/components/Button";
import cls from "./LogoutButton.module.scss";

interface LogoutButtonProps {
	className?: string
}

export const LogoutButton: FC<LogoutButtonProps> = memo(({ className }) => {
	const [logout, { isLoading, error }] = userApi.useLogoutMutation();
	const router = useRouter();

	const onClick = useCallback(() => {
		logout({}).then(() => {
			router.push("/login");
		});
	}, [logout, router]);

	return (
		<Button
			isLoading={isLoading}
			onClick={onClick}
			className={clsx(cls.LogoutButton, {}, [className])}
		>
			Logout
		</Button>
	);
});
