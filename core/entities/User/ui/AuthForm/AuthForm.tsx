import clsx from "clsx";
import {
	FC, ReactNode, SyntheticEvent, memo, useMemo,
} from "react";
import LntuLogoIcon from "@core/shared/assets/lntu-logo.svg";
import { Button, LinkButton } from "@core/shared/components/Button";
import cls from "./AuthForm.module.scss";

interface AuthFormProps {
	className?: string;
	children?: ReactNode;
	onSubmit: (e: SyntheticEvent) => void;
	isLoading: boolean;
	modifier: AuthFormModifier;
	error?: {
		title: string;
		text: string;
	};
}

export enum AuthFormModifier {
	register = "register",
	login = "login",
}

export const AuthForm: FC<AuthFormProps> = memo(({
	className, children, onSubmit, isLoading, modifier, error,
}) => {
	const authType = useMemo(() => {
		if (modifier === AuthFormModifier.register) {
			return {
				link: {
					to: "/login",
					name: "Увійти",
				},
				submitName: "Зареєструватися",
			};
		}
		return {
			link: {
				to: "/register",
				name: "Реєстрація",
			},
			submitName: "Увійти",
		};
	}, [modifier]);

	return (
		<form className={clsx(cls.AuthForm, [className])} onSubmit={onSubmit}>
			<h1 className={cls.AuthForm__title}>{authType.submitName}</h1>
			<div className={clsx(cls.StatusError, [cls.AuthForm__statusError])}>
				<h2 className={cls.StatusError__title}>{error?.title}</h2>
				<p className={cls.StatusError__text}>{error?.text}</p>
			</div>
			<div className={cls.AuthForm__fields}>
				{children}
			</div>
			<div className={cls.AuthForm__buttons}>
				<Button
					isLoading={isLoading}
					type="submit"
					Icon={LntuLogoIcon}
					className={cls.AuthForm__submit}
				>
					{authType.submitName}
				</Button>
				<LinkButton
					href={authType.link.to}
				>
					{authType.link.name}
				</LinkButton>
			</div>
		</form>
	);
});
