import clsx from "clsx";
import Link from "next/link";
import {
	ComponentProps, FC, ReactNode, memo,
} from "react";
import cls from "../common/style.module.scss";

interface LinkButtonProps extends ComponentProps<typeof Link> {
	className?: string;
	children: ReactNode;
}

export const LinkButton: FC<LinkButtonProps> = memo(({
	className,
	children,
	...otherProps
}) => {
	return (
		<Link className={clsx(cls.Button, [className])} {...otherProps}>
			{children}
		</Link>
	);
});
