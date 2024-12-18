"use client";

import { Badge, Button } from "@mantine/core";
import clsx from "clsx";
import { revalidateTag } from "next/cache";
import { useRouter } from "next/navigation";
import { FC, useMemo } from "react";
import TableIcon from "@core/shared/assets/table.svg";
import { HoverAvatar } from "@core/shared/components/common";
import { bookedTableApi } from "../../model/services/bookedTableApi";
import { IBookedTable, Status } from "../../model/types";
import cls from "./BookedTable.module.scss";

interface BookedTableProps {
	className?: string;
	data: IBookedTable;
}

export const DisplayActionButtons = ({ className, data }: { className?: string; data: IBookedTable }) => {
	const router = useRouter();
	const [action, { isLoading, error }] = bookedTableApi.useUpdateStatusMutation();

	if (data.status === Status.rejected || data.status === Status.timeout) {
		return null;
	}
	return (
		<div className={clsx(cls.DisplayActionButtons, {}, [className])}>
			<Button
				variant="outline"
				size="md"
				color="red"
				loading={isLoading}
				onClick={() => { action({ bookedTableId: data.id, action: "decline" }); }}
			>
				{data.is_guest ? "Відхилити" : "Скасувати"}
			</Button>
			{data.is_guest && !(data.status === Status.accepted) && (
				<Button
					size="md"
					loading={isLoading}
					onClick={() => { action({ bookedTableId: data.id, action: "accept" }); }}
				>
					Прийняти
				</Button>
			)}
		</div>
	);
};

export const BookedTable: FC<BookedTableProps> = ({
	className, data,
}) => {
	const status = useMemo(() => {
		switch (data.status) {
			case "pending":
				return {
					message: "Очікується",
					color: "yellow",
				};
			case "accepted":
				return {
					message: "Прийнято",
					color: "green",
				};
			case "during":
				return {
					message: "Триває",
					color: "blue",
				};
			case "rejected":
				return {
					message: "Відмінено",
					color: "red",
				};
			case "timeout":
				return {
					message: "Завершено",
					color: "gray",
				};
			default:
				return {
					message: "Очікується",
					color: "yellow",
				};
		}
	}, [data.status]);

	return (
		<li className={clsx(cls.BookedTable, {}, [className])}>
			<div className={clsx(cls.BookedTable__box, [cls.BookedTable__box_1])}>
				<TableIcon className={cls.BookedTable__icon} />
				<h2 className={cls.BookedTable__title}>Cmолик {data.table.number}</h2>
			</div>
			<div className={clsx(cls.BookedTable__box, [cls.BookedTable__box_2])}>
				<div className={cls.BookedTable__date}>
					<span className={cls.BookedTable__dateStart}>{data.date_start} - {data.time_from}</span>
					<span className={cls.BookedTable__dateEnd}>{data.time_to}</span>
				</div>
				<div className={cls.BookedTable__users}>
					<span>Студент:</span>
					<div className={clsx(cls.User, [cls.Table__user])}>
						<HoverAvatar className={cls.User__avatar} avatarProps={{ size: "md" }} />
						<span className={cls.User__fullName}>{data.user.full_name}</span>
					</div>
					<span>Студент:</span>
					<div className={clsx(cls.User, [cls.BookedTable__user])}>
						<HoverAvatar className={cls.User__avatar} avatarProps={{ size: "md" }} />
						<span className={cls.User__fullName}>{data.guest.full_name}</span>
					</div>
				</div>
				<Badge className={cls.BookedTable__badge} size="xl" variant="outline" color={status.color}>{status.message}</Badge>
				<DisplayActionButtons className={cls.BookedTable__actions} data={data} />
			</div>
		</li>
	);
};
