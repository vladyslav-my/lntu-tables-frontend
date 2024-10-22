export const formatDate = (date: Date | null) => {
	if (!date) {
		return undefined;
	}
	return date.toLocaleString("sv-SE", { timeZoneName: "short" }).split(" ")[0];
};
