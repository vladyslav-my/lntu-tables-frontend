export interface EntityUserSchema {
	data?: ResponseData;
	isLoading: boolean;
	error?: string;
}

export interface ResponseData {
	data: any;
}

export interface UserToken {
	token: string;
}

export interface LoginBody {
	email: string;
	password: string;
}

export interface RegisterBody {
	name: string;
	last_name: string;
	phone_number: string;
	email: string;
	password: string;
	password_confirmation: string;
}
