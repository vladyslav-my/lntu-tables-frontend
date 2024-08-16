"use client";

import clsx from "clsx";
import {
	FC,
	ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { Sidebar } from "@core/widgets/Sidebar";
import {
	Container,
	ContainerModifier,
} from "@core/shared/components/Container";
import cls from "./AppLayout.module.scss";

interface AppLayoutProps {
	children: ReactNode;
}

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
	const scrollableElementRef = useRef<HTMLDivElement>(null);
	const scrollbarRef = useRef<HTMLDivElement>(null);

	const [isDrag, setIsDrag] = useState(false);
	const [startY, setStartY] = useState(0);
	const [currentY, setCurrentY] = useState(0);
	const [scrollBarHeight, setScrollBarHeight] = useState(0);
	const [showScrollbar, setShowScrollbar] = useState(false);

	// Function to update the scrollbar's height and visibility
	const updateScrollbar = useCallback(() => {
		const scrollableElement = scrollableElementRef.current;
		const scrollbarContainer = scrollbarRef.current;

		if (scrollableElement && scrollbarContainer) {
			const contentHeight = scrollableElement.clientHeight;
			const totalHeight = scrollableElement.scrollHeight;
			const containerHeight = scrollbarContainer.clientHeight;

			const barHeight = Math.max((contentHeight / totalHeight) * containerHeight, 30); // minimum height for visibility
			setScrollBarHeight(barHeight);

			const shouldShowScrollbar = contentHeight < totalHeight;
			setShowScrollbar(shouldShowScrollbar);

			// Logging for debugging
			console.log("Content Height:", contentHeight);
			console.log("Total Height:", totalHeight);
			console.log("Container Height:", containerHeight);
			console.log("Scroll Bar Height:", barHeight);
			console.log("Show Scrollbar:", shouldShowScrollbar);
		}
	}, []);

	// Function to handle the scrolling of the content and update the scrollbar's position
	const onScroll = useCallback(() => {
		const scrollableElement = scrollableElementRef.current;
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

			// Logging for debugging
			console.log("ScrollTop:", scrollTop);
			console.log("Max ScrollTop:", maxScrollTop);
			console.log("Percentage:", percentage);
			console.log("Max Scrollbar Top:", maxScrollbarTop);
			console.log("New Y Position:", newY);
		}
	}, [scrollBarHeight]);

	// Touch Events
	const onTouchStart = useCallback((event: TouchEvent) => {
		setIsDrag(true);
		setStartY(event.touches[0].clientY);
	}, []);

	const onTouchMove = useCallback((event: TouchEvent) => {
		if (!isDrag) return;

		const scrollableElement = scrollableElementRef.current;
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
	}, [isDrag, startY, currentY, scrollBarHeight]);

	const onTouchEnd = useCallback(() => {
		setIsDrag(false);
	}, []);

	// Mouse Events
	const onMouseDown = useCallback((event: React.MouseEvent) => {
		setIsDrag(true);
		setStartY(event.clientY);
	}, []);

	const onMouseMove = useCallback((event: MouseEvent) => {
		if (!isDrag) return;

		const scrollableElement = scrollableElementRef.current;
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
	}, [isDrag, startY, currentY, scrollBarHeight]);

	const onMouseUp = useCallback(() => {
		setIsDrag(false);
	}, []);

	// Attach global mousemove and mouseup events when dragging
	useEffect(() => {
		if (isDrag) {
			window.addEventListener("mousemove", onMouseMove);
			window.addEventListener("mouseup", onMouseUp);
		} else {
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseup", onMouseUp);
		}

		// Cleanup on unmount
		return () => {
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseup", onMouseUp);
		};
	}, [isDrag, onMouseMove, onMouseUp]);

	// Update the scrollbar on initial render and whenever the content changes
	useEffect(() => {
		updateScrollbar();

		const scrollableElement = scrollableElementRef.current;
		if (scrollableElement) {
			scrollableElement.addEventListener("scroll", onScroll);
		}

		return () => {
			if (scrollableElement) {
				scrollableElement.removeEventListener("scroll", onScroll);
			}
		};
	}, [updateScrollbar, onScroll]);

	// Update the scrollbar when the window resizes
	useEffect(() => {
		window.addEventListener("resize", updateScrollbar);

		return () => {
			window.removeEventListener("resize", updateScrollbar);
		};
	}, [updateScrollbar]);

	return (
		<Container className={cls.AppLayout} modifier={ContainerModifier.APP}>
			<div className={cls.AppLayout__app}>
				<Sidebar className={cls.AppLayout__sidebar} />
				<main className={cls.AppLayout__main} ref={scrollableElementRef}>
					{children}
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
				</main>
			</div>
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
		</Container>
	);
};
