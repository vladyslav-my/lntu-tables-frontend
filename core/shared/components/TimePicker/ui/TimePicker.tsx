import { ActionIcon } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import clsx from "clsx";
import {
	FC, useCallback, useEffect, useRef,
} from "react";
import { secondsBetweenTimes, timeFromSeconds } from "../lib";
import cls from "./TimePicker.module.scss";

interface TimePickerProps {
	className?: string;
	bookedSlots: {
		startTime: string;
		endTime: string;
	}[];
}

export const TimePicker: FC<TimePickerProps> = ({ className, bookedSlots }) => {
	const rangeRef = useRef<HTMLInputElement>(null);
	const timeRef = useRef<HTMLInputElement>(null);

	const onChangeRange = useCallback((e: any) => {
		if (timeRef.current) {
			timeRef.current.value = timeFromSeconds(e.target.value, "8:00");
		}
	}, []);

	const onChangeTime = useCallback((e: any) => {
		if (rangeRef.current) {
			rangeRef.current.value = `${secondsBetweenTimes("8:00", e.target.value)}`;
		}
	}, []);

	useEffect(() => {
		secondsBetweenTimes("8:00", "19:00");
	}, []);

	const bookedSlotsItems = bookedSlots.map((slot) => {
		return (
			<div
				className={cls.TimePicker__bookedSlot}
				key={slot.startTime}
				style={{
					left: `${secondsBetweenTimes("8:00", slot.startTime) / secondsBetweenTimes("8:00", "19:00") * 100}%`,
					width: `${secondsBetweenTimes(slot.startTime, slot.endTime) / secondsBetweenTimes("8:00", "19:00") * 100}%`,
				}}
			/>
		);
	});

	return (
		<div className={cls.TimePicker}>
			<div className={cls.TimePicker__range}>
				<input
					className={cls.TimePicker__inputRange}
					ref={rangeRef}
					onChange={onChangeRange}
					type="range"
					min={0}
					max={secondsBetweenTimes("8:00", "19:00")}
					defaultValue={0}
				/>
				<div className={cls.TimePicker__bar}>
					<div className={cls.TimePicker__bookedSlots}>
						{bookedSlotsItems}
					</div>
				</div>
			</div>
			<TimeInput
				className={cls.TimePicker__inputTime}
				ref={timeRef}
				onChange={onChangeTime}
				type="time"
			/>
		</div>

	);
};
