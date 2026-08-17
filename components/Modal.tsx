"use client"

import { useEffect } from "react";
import { createPortal } from "react-dom";

type Props = {
	open: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
};

export function Modal({ open, onClose, title, children }: Props) {
	useEffect(() => {
		if (!open) return;
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", onKeyDown);
		// Prevent background scroll while the modal is open.
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.body.style.overflow = prevOverflow;
		};
	}, [open, onClose]);

	if (!open) return null;

	return createPortal(
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50"
			onClick={onClose}
		>
			<div
				className="w-full h-[85vh] bg-surface rounded-2xl border border-edge shadow-2xl flex flex-col overflow-hidden"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex items-center justify-between px-5 py-3 border-b border-edge shrink-0">
					<span className="text-sm font-medium text-foreground">{title}</span>
					<button
						onClick={onClose}
						type="button"
						aria-label="Close"
						className="text-muted hover:text-foreground transition text-lg leading-none cursor-pointer w-7 h-7 flex items-center justify-center rounded-lg hover:bg-surface-muted"
					>
						✕
					</button>
				</div>
				<div className="flex-1 min-h-0 p-4">{children}</div>
			</div>
		</div>,
		document.body
	);
}