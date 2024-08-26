import clsx from "clsx";
import { FC, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrowIcon from "@core/shared/assets/arrow.svg";
import { featureDrawerActions, featureDrawerSelectors } from "../../model/slices/featureDrawerSlice";
import cls from "./ToggleDrawerButton.module.scss";

interface ToggleDrawerButtonProps {
	className?: string
}

export const ToggleDrawerButton: FC<ToggleDrawerButtonProps> = memo(({ className }) => {
	const dispatch = useDispatch();
	const isOpen = useSelector(featureDrawerSelectors.isOpen);

	const onClick = useCallback(() => {
		dispatch(featureDrawerActions.setIsOpen(!isOpen));
	}, [dispatch, isOpen]);

	return (
		<button
			className={clsx(cls.ToggleDrawerButton, {
				[cls.ToggleDrawerButton_open]: isOpen,
			}, [className])}
			onClick={onClick}
			aria-label="toggle drawer"
		>
			<ArrowIcon className={cls.ToggleDrawerButton__icon} />
		</button>
	);
});
