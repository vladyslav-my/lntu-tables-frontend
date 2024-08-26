import { animated, useTransition } from "@react-spring/web";
import clsx from "clsx";
import {
	FC, memo, ReactNode, useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Overlay } from "@core/shared/components/Overlay";
import { featureDrawerActions, featureDrawerSelectors } from "../../model/slices/featureDrawerSlice";
import cls from "./Drawer.module.scss";

interface DrawerProps {
	className?: string;
	children: ReactNode;
}

export const Drawer: FC<DrawerProps> = memo(({ className, children }) => {
	const isOpen = useSelector(featureDrawerSelectors.isOpen);

	const dispatch = useDispatch();

	const transition = useTransition(isOpen, {
		from: {
			left: "-100%",
		},
		enter: {
			left: "0%",
		},
		leave: {
			left: "-100%",
		},
		config: {
			duration: 300,
			easing: (t) => t * t * (3 - 2 * t),
		},
	});

	const onClick = useCallback(() => {
		dispatch(featureDrawerActions.setIsOpen(false));
	}, [dispatch]);

	return (
		<>
			<Overlay isOpen={isOpen} onClick={onClick} />
			{transition((styles, isOpen) => isOpen && (
				<animated.aside style={styles} className={clsx(cls.Drawer, [className])}>
					{children}
				</animated.aside>
			))}
		</>
	);
});
