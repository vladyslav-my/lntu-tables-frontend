import clsx from "clsx";
import { FC, memo } from "react";
import cls from "./User.module.scss";

interface UserProps {
	className?: string;
}

export const User: FC<UserProps> = memo(({ className }) => {
	return (
		<div className={clsx(cls.User, [className])}>
			User
		</div>
	);
});
