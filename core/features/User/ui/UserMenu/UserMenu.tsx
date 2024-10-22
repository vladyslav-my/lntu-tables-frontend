import { Avatar, Menu, rem } from "@mantine/core";
import {
	IconSmartHome, IconLogout, IconArrowRight, IconArrowRightDashed,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useCallback } from "react";
import { userApi } from "@core/entities/User";
import cls from "./UserMenu.module.scss";

interface UserMenuProps {
	className?: string
}

export const UserMenu: FC<UserMenuProps> = ({ className }) => {
	const [logout, { isLoading, error }] = userApi.useLogoutMutation();
	const router = useRouter();

	const onClick = useCallback(() => {
		logout({}).then(() => {
			router.push("/login");
		});
	}, [logout, router]);

	return (
		<Menu shadow="md" width={200} position="bottom-end" transitionProps={{ transition: "fade", duration: 300 }}>
			<Menu.Target>
				<Avatar />
			</Menu.Target>
			<Menu.Dropdown styles={{ dropdown: { fontSize: rem(30) } }}>
				<Menu.Item
					href="/app/profile"
					className={cls.UserMenu__item}
					component={Link}
					leftSection={<IconSmartHome style={{ width: rem(16), height: rem(16) }} />}
					rightSection={<IconArrowRight className={cls.UserMenu__arrowIcon} style={{ width: rem(16), height: rem(16) }} />}
				>
					Profile
				</Menu.Item>
				<Menu.Item
					className={cls.UserMenu__item}
					onClick={onClick}
					leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} />}
					rightSection={<IconArrowRight className={cls.UserMenu__arrowIcon} style={{ width: rem(16), height: rem(16) }} />}
				>
					Logout
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
};
