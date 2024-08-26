import clsx from "clsx";
import Link from "next/link";
import { FC, memo } from "react";
import LogoIcon from "@core/shared/assets/lntu-logo-2.svg";
import cls from "./Logo.module.scss";

interface LogoProps {
	className?: string;
}

export const Logo: FC<LogoProps> = memo(({
	className,
}) => {
	return (
		<Link className={clsx(cls.Logo, [className])} aria-label="logo" href="/">
			<LogoIcon className={cls.Logo__icon} />
		</Link>
	);
});
