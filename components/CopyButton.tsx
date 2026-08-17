"use client"

import { useState } from "react";

type Props = {
	getText: () => string;
	label?: string;
	className?: string;
};

export function CopyButton({ getText, label = "Copy", className }: Props) {
	const [copied, setCopied] = useState(false);

	async function handleCopy() {
		try {
			await navigator.clipboard.writeText(getText());
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch {
			// Clipboard access can fail (permissions, insecure context) — fail silently,
			// the button simply won't show the "Copied!" confirmation.
		}
	}

	return (
		<button
			onClick={handleCopy}
			type="button"
			className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border border-edge text-muted hover:text-foreground hover:border-accent transition cursor-pointer ${className ?? ""}`}
		>
			{copied ? "Copied!" : label}
		</button>
	);
}