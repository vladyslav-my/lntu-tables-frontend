"use client";

import { Input, TextInput } from "@mantine/core";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { FC, memo, useCallback } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import {
	AuthForm, AuthFormModifier, IRegisterBody, userApi,
} from "@core/entities/User";
// import { Input } from "@core/shared/components/Input";
import cls from "./RegisterAuthForm.module.scss";

interface RegisterAuthFormProps {
	className?: string
}

export const RegisterAuthForm: FC<RegisterAuthFormProps> = memo(({ className }) => {
	const [register, { isLoading, error }] = userApi.useRegisterMutation();
	const router = useRouter();

	const {
		handleSubmit, control, reset, formState: { errors },
	} = useForm<IRegisterBody>({
		reValidateMode: "onBlur",
		mode: "onBlur",
	});

	const onSubmit: SubmitHandler<IRegisterBody> = useCallback((data) => {
		register(data)
			.then(() => {
				router.push("/app/profile");
			})
			.catch((e) => {
				// console.log(e);
			});
	}, [register, router]);

	return (
		<AuthForm
			className={clsx(cls.RegisterAuthForm, [className])}
			isLoading={isLoading}
			modifier={AuthFormModifier.register}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Controller
				name="name"
				control={control}
				rules={{
					required: "Ім’я є обов’язковим",
					minLength: { value: 2, message: "Ім’я повинно містити мінімум 2 символи" },
					maxLength: { value: 30, message: "Ім’я повинно містити максимум 30 символів" },
				}}
				render={({ field }) => (
					<TextInput
						placeholder="Ім’я"
						error={errors.name?.message}
						size="md"
						{...field}
					/>
				)}
			/>
			<Controller
				name="last_name"
				control={control}
				rules={{
					required: "Прізвище є обов’язковим",
					minLength: { value: 2, message: "Прізвище повинно містити мінімум 2 символи" },
					maxLength: { value: 30, message: "Прізвище повинно містити максимум 30 символів" },
				}}
				render={({ field }) => (
					<TextInput
						placeholder="Прізвище"
						error={errors.last_name?.message}
						size="md"
						{...field}
					/>
				)}
			/>
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
					<TextInput
						placeholder="Email"
						error={errors.email?.message}
						size="md"
						{...field}
					/>
				)}
			/>
			<Controller
				name="phone_number"
				control={control}
				rules={{
					required: "Номер телефону є обов’язковим",
					pattern: {
						value: /^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
						message: "Невірний формат номеру телефону",
					},
				}}
				render={({ field }) => (
					<TextInput
						component={IMaskInput}
						placeholder="Номер телефону"
						error={errors.phone_number?.message}
						// @ts-ignore
						mask="+38 (000) 000-00-00"
						size="md"
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
					<TextInput
						placeholder="Пароль"
						type="password"
						error={errors.password?.message}
						size="md"
						{...field}
					/>
				)}
			/>
			<Controller
				name="password_confirmation"
				control={control}
				rules={{
					required: "Підтвердження паролю є обов’язковим",
					validate: (value) => value === control._formValues.password || "Паролі не співпадають",
				}}
				render={({ field }) => (
					<TextInput
						placeholder="Підтвердження паролю"
						type="password"
						error={errors.password_confirmation?.message}
						size="md"
						{...field}
					/>
				)}
			/>
		</AuthForm>
	);
});
