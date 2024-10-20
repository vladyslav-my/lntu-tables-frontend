export interface UserToken {
	token: string;
}

export interface ILoginBody {
	email: string;
	password: string;
}

export interface IRegisterBody {
	name: string;
	last_name: string;
	phone_number: string;
	email: string;
	password: string;
	password_confirmation: string;
}

export interface IUser {
	id: number;
	full_name: string;
	email: string;
	avatar: string | null;
}
