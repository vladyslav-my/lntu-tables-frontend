export function secondsBetweenTimes(startTime: string, endTime: string) {
	// Разделяем время на часы и минуты
	const [startHours, startMinutes] = startTime.split(":").map(Number);
	const [endHours, endMinutes] = endTime.split(":").map(Number);

	// Преобразуем время в секунды с начала дня
	const startSeconds = (startHours * 3600) + (startMinutes * 60);
	const endSeconds = (endHours * 3600) + (endMinutes * 60);

	// Возвращаем разницу в секундах
	return endSeconds - startSeconds;
}

export function timeFromSeconds(seconds: number, startTime: string) {
	const [startHours, startMinutes] = startTime.split(":").map(Number);
	const startSeconds = (startHours * 3600) + (startMinutes * 60);

	const hours = Math.floor(seconds / 3600) + startHours;
	const minutes = Math.floor(((seconds + startSeconds) % 3600) / 60);

	const formattedHours = hours.toString().padStart(2, "0");
	const formattedMinutes = minutes.toString().padStart(2, "0");

	return `${formattedHours}:${formattedMinutes}`;
}
