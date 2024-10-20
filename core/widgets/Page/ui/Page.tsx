"use client";

import clsx from "clsx";
import {
	FC, HTMLAttributes, ReactNode, forwardRef, memo,
} from "react";
import cls from "./Page.module.scss";

interface PageProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	title?: string;
	children: ReactNode;
	fixedContent?: ReactNode;
}

export const Page: FC<PageProps> = memo(({
	className, title, fixedContent, children, ...otherProps
}) => {
	return (
		<div className={clsx(cls.Page, {}, [className])} {...otherProps}>
			<div className={cls.Page__fixedContent}>
				{title && (
					<h1 className={cls.Page__title}>
						{title}
					</h1>
				)}
				{fixedContent}
			</div>

			<div className={cls.Page__content} id="scrollable-content">
				{children}
			</div>
		</div>
	);
});
