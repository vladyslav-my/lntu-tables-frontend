import clsx from "clsx";
import {
	ButtonHTMLAttributes, FC, ReactNode,
} from "react";
import { Loader } from "../../Loader";
import cls from "../common/style.module.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children?: ReactNode;
	Icon?: FC<React.SVGProps<SVGSVGElement>>;
	isLoading?: boolean;
	wide?: boolean;
}

export const Button: FC<ButtonProps> = ({
	className,
	children,
	Icon,
	isLoading,
	wide,
	...otherProps
}) => {
	return (
		<button
			className={clsx(cls.Button, { [cls.Button_wide]: wide }, [className])}
			{...otherProps}
		>
			{children}
			{isLoading ? <Loader className={cls.Button__loader} /> : Icon && <Icon className={cls.Button__icon} />}
		</button>
	);
};
