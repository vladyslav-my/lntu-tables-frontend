"use server";

import { revalidateTag } from "next/cache";

export async function revalidateDataTag() {
	revalidateTag("booked-tables");
}
