"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { FC, memo, useCallback } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
	AuthForm, AuthFormModifier, RegisterBody, userApi,
} from "@core/entities/User";
import { Input } from "@core/shared/components/Input";
import cls from "./RegisterAuthForm.module.scss";

interface RegisterAuthFormProps {
	className?: string
}

export const RegisterAuthForm: FC<RegisterAuthFormProps> = memo(({ className }) => {
	const [register, { isLoading, error }] = userApi.useRegisterMutation();
	const router = useRouter();

	const {
		handleSubmit, control, reset, formState: { errors },
	} = useForm<RegisterBody>({
		reValidateMode: "onBlur",
		mode: "onBlur",
	});

	const onSubmit: SubmitHandler<RegisterBody> = useCallback((data) => {
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
					<Input
						placeholder="Ім’я"
						withValidation
						error={errors.name?.message}
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
					<Input
						placeholder="Прізвище"
						withValidation
						error={errors.last_name?.message}
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
					<Input
						placeholder="Email"
						withValidation
						error={errors.email?.message}
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
						value: /^[0-9]{10}$/,
						message: "Невірний формат номеру телефону",
					},
				}}
				render={({ field }) => (
					<Input
						placeholder="Номер телефону"
						withValidation
						error={errors.phone_number?.message}
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
			<Controller
				name="password_confirmation"
				control={control}
				rules={{
					required: "Підтвердження паролю є обов’язковим",
					validate: (value) => value === control._formValues.password || "Паролі не співпадають",
				}}
				render={({ field }) => (
					<Input
						placeholder="Підтвердження паролю"
						type="password"
						withValidation
						error={errors.password_confirmation?.message}
						{...field}
					/>
				)}
			/>
		</AuthForm>
	);
});
