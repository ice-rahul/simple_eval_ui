"use client"

import React from 'react'

type MessageType = {
	role: "user" | "assistant";
	content: string;
}


function Home() {
	const [text, setText] = React.useState("");
	async function sendMessage(messages: MessageType[]) {
		const res = await fetch(`${process.env.NEXT_PUBLIC_SERVICE_URL}/chat`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ messages })
		});

		const reader = res.body?.getReader();
		const decoder = new TextDecoder();
		let fullText = "";

		while (true) {
			if (!reader) break;

			const { done, value } = await reader.read();
			if (done) break;
			const chunk = decoder.decode(value, { stream: true });
			fullText += chunk;
			// update your UI incrementally here, e.g.:
			setText(fullText);
		}
		return fullText;
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<button
				className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hover:cursor-pointer"
				onClick={() => sendMessage([{ "role": "user", "content": "Count to 10 slowly" }])}
			>
				Send Message
			</button>
			<div className="mt-4 p-4 bg-white rounded shadow">
				<p className="text-gray-800">{text}</p>
			</div>
		</div>
	)
}

export default Home