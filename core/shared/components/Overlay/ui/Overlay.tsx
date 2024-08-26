import { animated, useTransition } from "@react-spring/web";
import clsx from "clsx";
import {
	FC, HTMLAttributes, ReactNode, memo,
} from "react";
import cls from "./Overlay.module.scss";

interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	isOpen: boolean;
}

export const Overlay: FC<OverlayProps> = memo(({
	className, isOpen, ...anotherProps
}) => {
	const transition = useTransition(isOpen, {
		config: { duration: 300, easing: (t) => t },
		from: {
			opacity: 0,
		},
		enter: {
			opacity: 1,
		},
		leave: {
			opacity: 0,
		},
	});

	return transition((styles, isOpen) => (
		isOpen && (
			<animated.div
				style={styles}
				className={clsx(cls.Overlay, [className])}
				{...anotherProps}
			/>
		)
	));
});
