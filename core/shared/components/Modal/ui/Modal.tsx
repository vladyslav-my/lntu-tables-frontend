import { animated, useTransition } from "@react-spring/web";
import clsx from "clsx";
import React, {
	FC, ReactNode,
	memo,
	useCallback,
	useEffect,
} from "react";
import { Overlay } from "../../Overlay";
import { Portal } from "../../Portal";
import CrossIcon from "../assets/cross.svg";
import cls from "./Modal.module.scss";

export interface ModalProps {
	className?: string;
	setIsOpen: (oppened: boolean) => void;
	children: ReactNode;
	isOpen: boolean;
}

export const Modal: FC<ModalProps> = memo(({
	className, setIsOpen, isOpen, children,
}) => {
	const transition = useTransition(isOpen, {
		from: {
			opacity: 0,
			transform: "translate(-50%, -50%) scale(0.7)",
		},
		enter: {
			opacity: 1,
			transform: "translate(-50%, -50%) scale(1)",
		},
		leave: {
			opacity: 0,
			transform: "translate(-50%, -50%) scale(0.7)",
		},
		config: {
			duration: 300,
			easing: (t) => t * t * (3 - 2 * t),
		},
	});

	const onClick = useCallback(() => {
		setIsOpen(false);
	}, [setIsOpen]);

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add(cls.overflowHidden);
		} else {
			document.body.classList.remove(cls.overflowHidden);
		}
	}, [isOpen]);

	return (
		<>
			<Overlay isOpen={isOpen} onClick={onClick} />
			{transition((styles, isOpen) => isOpen && (
				<Portal>
					<animated.div
						className={clsx(cls.Modal, [className])}
						style={styles}
					>
						<button
							aria-label="Close modal"
							className={clsx(cls.CloseButton, [cls.Modal__closeButton])}
							onClick={onClick}
						>
							<CrossIcon className={cls.CloseButton__icon} />
						</button>
						{children}
					</animated.div>
				</Portal>
			))}
		</>
	);
});
