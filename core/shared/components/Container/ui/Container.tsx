import clsx from "clsx";
import { FC, ReactNode, memo } from "react";
import cls from "./Container.module.scss";

interface ContainerProps {
	className?: string;
	children?: ReactNode;
	isDisabled?: boolean;
	modifier?: ContainerModifier;
}

export enum ContainerModifier {
	DEFAULT = "Container_default",
	AUTH = "Container_auth",
	APP = "Container_app",
}

export const Container: FC<ContainerProps> = memo(({
	className, children, isDisabled, modifier = ContainerModifier.DEFAULT,
}) => {
	return (
		<div className={clsx(cls.Container, [className, !isDisabled ? cls[modifier] : undefined])}>
			{children}
		</div>
	);
});
