"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import {
	FC, memo, useCallback, useEffect, useState,
} from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
	AuthForm, AuthFormModifier, RegisterBody, userApi,
} from "@core/entities/User";
import { Input } from "@core/shared/components/Input";
import cls from "./LoginAuthForm.module.scss";

interface LoginAuthFormProps {
	className?: string
}

export const LoginAuthForm: FC<LoginAuthFormProps> = memo(({ className }) => {
	const [login, { isLoading, error }] = userApi.useLoginMutation();
	const [textError, setTextError] = useState<{ title: string; text: string }>();
	const router = useRouter();

	const {
		handleSubmit, control, reset, formState: { errors },
	} = useForm<RegisterBody>({
		reValidateMode: "onBlur",
		mode: "onBlur",
	});

	const onSubmit: SubmitHandler<RegisterBody> = useCallback((data) => {
		login(data).then(() => {
			router.push("/app/profile");
		});
	}, [login, router]);

	useEffect(() => {
		// @ts-ignore
		if (error?.status === 404) {
			setTextError({
				title: "Невірний логін чи пароль",
				text: "Переконайтеся, що дані введено вірно. Спробуйте ще раз.",
			});
		}
	}, [error]);

	return (
		<AuthForm
			className={clsx(cls.LoginAuthForm, [className])}
			isLoading={isLoading}
			error={textError}
			modifier={AuthFormModifier.login}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Controller
				name="email"
				control={control}
				rules={{
					required: "Email є обов’язковим",
					pattern: {
						value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
						message: "Невірний формат email",
					},
				}}
				render={({ field }) => (
					<Input
						placeholder="Email"
						withValidation
						error={errors.email?.message}
						{...field}
					/>
				)}
			/>
			<Controller
				name="password"
				control={control}
				rules={{
					required: "Пароль є обов’язковим",
					minLength: { value: 8, message: "Пароль повинен містити мінімум 8 символів" },
					maxLength: { value: 100, message: "Пароль повинен містити максимум 100 символів" },
				}}
				render={({ field }) => (
					<Input
						placeholder="Пароль"
						type="password"
						withValidation
						error={errors.password?.message}
						{...field}
					/>
				)}
			/>
		</AuthForm>
	);
});
