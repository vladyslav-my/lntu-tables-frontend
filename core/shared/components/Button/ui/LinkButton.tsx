import clsx from "clsx";
import Link from "next/link";
import {
	ComponentProps, FC, ReactNode, memo,
} from "react";
import cls from "../common/style.module.scss";

interface LinkButtonProps extends ComponentProps<typeof Link> {
	className?: string;
	children: ReactNode;
	wide?: boolean;
}

export const LinkButton: FC<LinkButtonProps> = memo(({
	className,
	children,
	wide,
	...otherProps
}) => {
	return (
		<Link className={clsx(cls.Button, { [cls.Button_wide]: wide }, [className])} {...otherProps}>
			{children}
		</Link>
	);
});
