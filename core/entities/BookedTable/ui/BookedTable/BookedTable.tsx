"use client";

import { Badge, Button } from "@mantine/core";
import clsx from "clsx";
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

	if (data.status === Status.during || data.status === Status.pending) {
		return (
			<div className={clsx(cls.DisplayActionButtons, {}, [className])}>
				<Button
					variant="outline"
					color="red"
					loading={isLoading}
					onClick={() => { action({ bookedTableId: data.id, action: "decline" }); router.refresh(); }}
				>
					{data.is_guest ? "Відхилити" : "Скасувати"}
				</Button>
				{data.is_guest && (
					<Button
						loading={isLoading}
						onClick={() => { action({ bookedTableId: data.id, action: "accept" }); router.refresh(); }}
					>
						Прийняти
					</Button>
				)}
			</div>
		);
	}

	return null;
};

export const BookedTable: FC<BookedTableProps> = ({
	className, data,
}) => {
	const status = useMemo(() => {
		switch (data.status) {
			case "pending":
				return "Очікується";
			case "accepted":
				return "Прийнято";
			case "during":
				return "Триває";
			case "rejected":
				return "Скасовано";
			case "timeout":
				return "Завершено";
			default:
				return "Очікується";
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
				<Badge className={cls.BookedTable__badge}>{status}</Badge>
				<DisplayActionButtons className={cls.BookedTable__actions} data={data} />
			</div>
		</li>
	);
};
