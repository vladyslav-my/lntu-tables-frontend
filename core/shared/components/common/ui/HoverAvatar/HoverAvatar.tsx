import { Avatar, HoverCard } from "@mantine/core";
import { ComponentProps, FC } from "react";

interface HoverAvatarProps {
	className?: string;
	src?: string | null;
	avatarProps?: ComponentProps<typeof Avatar>;
}

export const HoverAvatar: FC<HoverAvatarProps> = ({ className, src, avatarProps }) => {
	return (
		<HoverCard shadow="md" withArrow openDelay={200} closeDelay={200}>
			<HoverCard.Target>
				<Avatar className={className} size="sm" src={src} radius="xl" {...avatarProps} />
			</HoverCard.Target>
			<HoverCard.Dropdown>
				<Avatar size="xl" src={src} />
			</HoverCard.Dropdown>
		</HoverCard>
	);
};
