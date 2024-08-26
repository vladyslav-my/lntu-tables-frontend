"use client";

import clsx from "clsx";
import {
	FC, useCallback, useEffect, useRef, useState,
} from "react";
import cls from "./Scrollbar.module.scss";

interface ScrollbarProps {
	scrollableRef: React.RefObject<HTMLDivElement>;
}

export const Scrollbar: FC<ScrollbarProps> = ({ scrollableRef }) => {
	const scrollbarRef = useRef<HTMLDivElement>(null);
	const [isDrag, setIsDrag] = useState(false);
	const [startY, setStartY] = useState(0);
	const [currentY, setCurrentY] = useState(0);
	const [scrollBarHeight, setScrollBarHeight] = useState(0);
	const [showScrollbar, setShowScrollbar] = useState(false);

	const updateScrollbar = useCallback(() => {
		console.log(scrollableRef.current, "render");
		const scrollableElement = scrollableRef.current;
		const scrollbarContainer = scrollbarRef.current;

		if (scrollableElement && scrollbarContainer) {
			const contentHeight = scrollableElement.clientHeight;
			const totalHeight = scrollableElement.scrollHeight;
			const containerHeight = scrollbarContainer.clientHeight;

			const barHeight = Math.max((contentHeight / totalHeight) * containerHeight, 30); // minimum height for visibility
			setScrollBarHeight(barHeight);

			const shouldShowScrollbar = contentHeight < totalHeight;
			console.log("contentHeight", contentHeight, "totalHeight", totalHeight);
			setShowScrollbar(shouldShowScrollbar);
		}
	}, [scrollableRef, scrollbarRef]);

	const onScroll = useCallback(() => {
		const scrollableElement = scrollableRef.current;
		const scrollbarContainer = scrollbarRef.current;

		if (scrollableElement && scrollbarContainer) {
			const scrollTop = scrollableElement.scrollTop;
			const scrollHeight = scrollableElement.scrollHeight;
			const clientHeight = scrollableElement.clientHeight;
			const maxScrollTop = scrollHeight - clientHeight;
			const percentage = scrollTop / maxScrollTop;
			const maxScrollbarTop = scrollbarContainer.clientHeight - scrollBarHeight;
			const newY = percentage * maxScrollbarTop;

			setCurrentY(newY);
		}
	}, [scrollableRef, scrollbarRef, scrollBarHeight]);

	const onTouchStart = useCallback((event: TouchEvent) => {
		setIsDrag(true);
		setStartY(event.touches[0].clientY);
	}, []);

	const onTouchMove = useCallback((event: TouchEvent) => {
		if (!isDrag) return;

		const scrollableElement = scrollableRef.current;
		const scrollbarContainer = scrollbarRef.current;

		if (scrollableElement && scrollbarContainer) {
			const diffY = event.touches[0].clientY - startY;
			const containerHeight = scrollbarContainer.clientHeight;
			const maxY = containerHeight - scrollBarHeight;

			const newCurrentY = Math.min(Math.max(currentY + diffY, 0), maxY);
			setCurrentY(newCurrentY);

			const newScrollTop = (newCurrentY / maxY) * (scrollableElement.scrollHeight - scrollableElement.clientHeight);
			scrollableElement.scrollTop = newScrollTop;
			setStartY(event.touches[0].clientY);
		}
	}, [isDrag, startY, currentY, scrollBarHeight, scrollableRef]);

	const onTouchEnd = useCallback(() => {
		setIsDrag(false);
	}, []);

	const onMouseDown = useCallback((event: React.MouseEvent) => {
		setIsDrag(true);
		setStartY(event.clientY);
	}, []);

	const onMouseMove = useCallback((event: MouseEvent) => {
		if (!isDrag) return;

		const scrollableElement = scrollableRef.current;
		const scrollbarContainer = scrollbarRef.current;

		if (scrollableElement && scrollbarContainer) {
			const diffY = event.clientY - startY;
			const containerHeight = scrollbarContainer.clientHeight;
			const maxY = containerHeight - scrollBarHeight;

			const newCurrentY = Math.min(Math.max(currentY + diffY, 0), maxY);
			setCurrentY(newCurrentY);

			const newScrollTop = (newCurrentY / maxY) * (scrollableElement.scrollHeight - scrollableElement.clientHeight);
			scrollableElement.scrollTop = newScrollTop;
			setStartY(event.clientY);
		}
	}, [isDrag, startY, currentY, scrollBarHeight, scrollableRef, scrollbarRef]);

	const onMouseUp = useCallback(() => {
		setIsDrag(false);
	}, []);

	useEffect(() => {
		if (isDrag) {
			window.addEventListener("mousemove", onMouseMove);
			window.addEventListener("mouseup", onMouseUp);
		} else {
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseup", onMouseUp);
		}

		return () => {
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseup", onMouseUp);
		};
	}, [isDrag, onMouseMove, onMouseUp]);

	useEffect(() => {
		updateScrollbar();

		const scrollableElement = scrollableRef.current;
		if (scrollableElement) {
			scrollableElement.addEventListener("scroll", onScroll);
		}

		return () => {
			if (scrollableElement) {
				scrollableElement.removeEventListener("scroll", onScroll);
			}
		};
	}, [updateScrollbar, onScroll, scrollableRef, scrollbarRef]);

	useEffect(() => {
		window.addEventListener("resize", updateScrollbar);

		return () => {
			window.removeEventListener("resize", updateScrollbar);
		};
	}, [scrollableRef, updateScrollbar]);

	return (
		<div
			className={clsx(
				cls.Scrollbar,
				{ [cls.Scrollbar_visible]: showScrollbar },
			)}
			ref={scrollbarRef}
		>
			<div
				className={cls.Scrollbar__this}
				onTouchStart={onTouchStart as any}
				onTouchMove={onTouchMove as any}
				onTouchEnd={onTouchEnd as any}
				onMouseDown={onMouseDown}
				style={{
					transform: `translateY(${currentY}px)`,
					height: `${scrollBarHeight}px`,
				}}
			/>
		</div>
	);
};
