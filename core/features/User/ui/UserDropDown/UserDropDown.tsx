import {
	FC, memo, useCallback, useEffect, useRef, useState,
} from "react";
import { UserDropDownLinkItem } from "@core/entities/User";
import { AvatarPopover } from "@core/shared/components/AvatarPopover/ui/AvatarPopover";
import { LogoutButton } from "../LogoutButton/LogoutButton";
import cls from "./UserDropDown.module.scss";

interface UserDropDownProps {
	className?: string;
}

export const UserDropDown: FC<UserDropDownProps> = memo(({ className }) => {
	return (
		<AvatarPopover>
			<UserDropDownLinkItem href="/profile">
				Profile
			</UserDropDownLinkItem>
			<LogoutButton />
		</AvatarPopover>
	);
});
