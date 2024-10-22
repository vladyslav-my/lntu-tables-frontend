"use client";

import { Button, UnstyledButton } from "@mantine/core";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import {
	ComponentProps, FC, memo, useCallback,
} from "react";
import { userApi } from "@core/entities/User";
import cls from "./LogoutButton.module.scss";

interface LogoutButtonProps {
	className?: string;
}

export const LogoutButton: FC<LogoutButtonProps> = memo(({ className, ...otherProps }) => {
	const [logout, { isLoading, error }] = userApi.useLogoutMutation();
	const router = useRouter();

	const onClick = useCallback(() => {
		logout({}).then(() => {
			router.push("/login");
		});
	}, [logout, router]);

	return (
		<Button
			variant="subtle"
			loading={isLoading}
			onClick={onClick}
			className={clsx(cls.LogoutButton, {}, [className])}
			{...otherProps}
		>
			Logout
		</Button>
	);
});
