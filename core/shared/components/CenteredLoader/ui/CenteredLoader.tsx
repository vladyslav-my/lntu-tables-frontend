import { Loader } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import cls from "./CenteredLoader.module.scss";

interface CenteredLoaderProps {
	className?: string
}

export const CenteredLoader: FC<CenteredLoaderProps> = ({ className }) => {
	return (
		<div className={clsx(cls.CenteredLoader, {}, [className])}>
			<Loader size="xl" variant="bars" />
		</div>
	);
};
