import {
	CSSProperties,
	FC, forwardRef, memo, ReactNode, RefObject, useCallback, useEffect, useImperativeHandle, useRef,
} from "react";
import { Portal } from "../../Portal";

interface PositionedPortalElementProps {
	triggerRef: RefObject<HTMLElement>;
	triggerDependency?: any[];
	fullWidth?: boolean;
	position?: "left" | "right";
	children: ReactNode;
	style?: CSSProperties;
	gap?: number;
}

const PositionedPortalElementComponent: FC<PositionedPortalElementProps> = ({
	triggerRef,
	children,
	style,
	triggerDependency = [],
	fullWidth = false,
	position = "left",
	gap = 8,
}, ref) => {
	const dropdownRef = useRef<HTMLDivElement>(null);
	const resizeEventRef = useRef<any>();

	useImperativeHandle(ref, () => ({
		getDropdownElement: () => dropdownRef.current,
	}), []);

	const updatePosition = useCallback(() => {
		if (triggerRef.current && dropdownRef.current) {
			const triggerRect = triggerRef.current.getBoundingClientRect();
			dropdownRef.current.style.top = `${triggerRect.bottom + gap}px`;

			if (fullWidth) {
				dropdownRef.current.style.width = "auto";
			} else {
				dropdownRef.current.style.width = `${triggerRect.width}px`;
			}

			if (position === "left") {
				dropdownRef.current.style.left = `${triggerRect.left}px`;
			} else if (position === "right") {
				dropdownRef.current.style.left = `${triggerRect.right - dropdownRef.current.offsetWidth}px`;
			}
		}
	}, [fullWidth, position, triggerRef, ...triggerDependency]);

	useEffect(() => {
		updatePosition();
	}, [triggerRef, updatePosition]);

	useEffect(() => {
		const handleResize = () => {
			requestAnimationFrame(updatePosition);
		};

		resizeEventRef.current = window.addEventListener("resize", handleResize);
		return () => {
			if (resizeEventRef.current) {
				window.removeEventListener("resize", handleResize);
			}
		};
	}, [updatePosition]);

	return (
		<Portal>
			<div
				ref={dropdownRef}
				style={{
					position: "absolute", width: 0, height: 0, ...style,
				}}
			>
				{children}
			</div>
		</Portal>
	);
};

export const PositionedPortalElement = memo(forwardRef(PositionedPortalElementComponent));
