"use client"

type Props = {
	getContent: () => string;
	filename: string;
	mimeType?: string;
	label?: string;
	className?: string;
};

export function DownloadButton({
	getContent,
	filename,
	mimeType = "application/octet-stream",
	label = "Download",
	className,
}: Props) {
	function handleDownload() {
		const blob = new Blob([getContent()], { type: mimeType });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		// Release the object URL on the next tick — revoking immediately can
		// interrupt the download in some browsers (notably Firefox/Safari).
		setTimeout(() => URL.revokeObjectURL(url), 0);
	}

	return (
		<button
			onClick={handleDownload}
			type="button"
			className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border border-edge text-muted hover:text-foreground hover:border-accent transition cursor-pointer ${className ?? ""}`}
		>
			{label}
		</button>
	);
}