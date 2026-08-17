import { CSSProperties } from "react";

export const PRESET_PROMPTS = [
	{
		label: "Support triage",
		prompt: "You are a support triage assistant. Classify this customer message by urgency (urgent, normal, low): {{input}}",
	},
	{
		label: "Sentiment classifier",
		prompt: "Classify the sentiment of the following product review as positive, negative, or neutral: {{input}}",
	},
	{
		label: "Text summarizer",
		prompt: "Summarize the following article in exactly two sentences: {{input}}",
	},
	{
		label: "Entity extractor",
		prompt: "Extract all person names, organizations, and locations mentioned in this text as a JSON object: {{input}}",
	},
];

export const themeVars: CSSProperties = {
	["--w-rjv-font-family" as string]: "var(--font-geist-mono, monospace)",
	["--w-rjv-background-color" as string]: "var(--surface)",
	["--w-rjv-color" as string]: "var(--foreground)",
	["--w-rjv-line-color" as string]: "var(--edge)",
	["--w-rjv-arrow-color" as string]: "var(--muted)",
	["--w-rjv-info-color" as string]: "var(--muted)",
	["--w-rjv-key-string" as string]: "var(--accent)",
	["--w-rjv-curlybraces-color" as string]: "var(--muted)",
	["--w-rjv-colon-color" as string]: "var(--muted)",
	["--w-rjv-brackets-color" as string]: "var(--muted)",
	["--w-rjv-quotes-color" as string]: "var(--accent)",
	["--w-rjv-quotes-string-color" as string]: "var(--success)",
	["--w-rjv-type-string-color" as string]: "var(--success)",
	["--w-rjv-type-int-color" as string]: "#f59e0b",
	["--w-rjv-type-float-color" as string]: "#f59e0b",
	["--w-rjv-type-boolean-color" as string]: "#f59e0b",
	["--w-rjv-type-null-color" as string]: "var(--muted)",
	["--w-rjv-copied-color" as string]: "var(--muted)",
	["--w-rjv-copied-success-color" as string]: "var(--success)",
};