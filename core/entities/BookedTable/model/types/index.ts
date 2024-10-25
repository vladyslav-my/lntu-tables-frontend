export interface IBookedTableBody {
	table_id: number;
	guest_id: number;
	date_picker: string;
	time_picker: string | null;
	duration: number;
}

interface Table {
	id: number;
	number: number;
}

export interface IBookedTable {
	id: number;
	table: Table;
	user: User;
	user_accepted: boolean;
	guest: User;
	guest_accepted: boolean;
	is_guest: boolean;
	status: Status;
	date_start: string;
	time_to: string;
	time_from: string;
}

interface User {
	id: number;
	full_name: string;
	email: string;
	avatar: string | null;
	role: string;
}

export enum Status {
	pending = "pending",
	accepted = "accepted",
	during = "during",
	rejected = "rejected",
	timeout = "timeout",
}

type UpdateStatusActions = "decline" | "accept";

export interface UpdateStatusArg {
	bookedTableId: number;
	action: UpdateStatusActions;
}
