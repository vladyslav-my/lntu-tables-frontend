import clsx from "clsx";
import { FC, memo } from "react";
import { Container, ContainerModifier } from "@core/shared/components/Container";
import { LoginAuthForm } from "../LoginAuthForm/LoginAuthForm";
import cls from "./LoginPage.module.scss";

interface LoginPageProps {
	className?: string;
}

export const LoginPage: FC<LoginPageProps> = memo(({ className }) => {
	return (
		<div className={clsx(cls.LoginPage, [className])}>
			<Container className={cls.LoginPage__container} modifier={ContainerModifier.AUTH}>
				<LoginAuthForm />
			</Container>
		</div>
	);
});
