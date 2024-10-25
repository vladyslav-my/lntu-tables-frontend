import { BookedPage } from "@core/pages/BookedPage";

interface BookedProps {
	searchParams: { tab: "my" | "his" | "current" };
}

export default function Booked(props: BookedProps) {
	return <BookedPage {...props} />;
}
