import clsx from "clsx";
import { FC, memo } from "react";
import { StoreProvider } from "@core/app/providers/StoreProvider";
import { Container, ContainerModifier } from "@core/shared/components/Container";
import { RegisterAuthForm } from "../RegisterAuthForm/RegisterAuthForm";
import cls from "./RegisterPage.module.scss";

interface RegisterPageProps {
	className?: string;
}

export const RegisterPage: FC<RegisterPageProps> = memo(({ className }) => {
	return (
		<div className={clsx(cls.RegisterPage, [className])}>
			<Container className={cls.RegisterPage__container} modifier={ContainerModifier.AUTH}>
				<RegisterAuthForm />
			</Container>
		</div>
	);
});
