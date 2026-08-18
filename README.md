# Verification Lab — Prompt Eval UI

A browser-based tool for evaluating AI prompts: describe a task, auto-generate a golden test dataset, run your prompt against it, and see LLM-as-judge scored results — all with your own Claude API key, no setup and no account.

Built as a zero-friction alternative to CLI-first eval tools: paste a key, describe what you're testing, and get a scored report in a couple of minutes.

## What it does

**1. Generate test cases**
Describe a task in plain language (optionally with a few extra constraints and a target case count) and the app calls Claude to generate a realistic, varied golden dataset — including edge cases — for you to evaluate against.

**2. Evaluate a prompt**
Write the prompt you want to test, using `{{variable}}` placeholders that map to your test case inputs. Run it, and each case is scored by an LLM-as-judge grader against its own success criteria.

**3. Inspect results**
- Test cases render in a collapsible, syntax-highlighted JSON viewer (`@uiw/react-json-view`), with copy and download-as-JSON built in.
- The evaluation report comes back as a full HTML document (scores, pass/fail breakdown, per-case reasoning) rendered in a sandboxed iframe, with copy, download, and an expand-to-modal view for a closer look.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**, theming via CSS custom properties (light/dark aware)
- **TanStack Query** for mutation state (loading/error handling on generate & evaluate)
- **React Context + `useState`** for shared app state (prompt config, generated test cases, evaluation report) — deliberately grouped into a couple of config objects rather than many independent `useState` calls, to avoid re-render sprawl
- **`react-resizable-panels`** for a draggable split between the form and preview panes, with automatic vertical stacking on narrow viewports (`useMediaQuery`)
- **`@uiw/react-json-view`** for the test case viewer, **`@uiw/react-textarea-code-editor`** for the test-case JSON editor — both chosen over hand-rolled versions since they're maintained, React 19-compatible, and better-tested than a bespoke implementation would be for this scope
- Custom `Modal`, `CopyButton`, and `DownloadButton` components (dependency-free — small, well-defined problems that didn't need a library)

## Getting started

```bash
npm install
npm run dev
```

Requires a running instance of the companion backend ([`python_chat`](https://github.com/ice-rahul/python_chat)) for the `/generate-testcases` and `/evaluate` endpoints. Point the frontend at it via an environment variable:

```bash
# .env.local
NEXT_PUBLIC_SERVICE_URL=http://localhost:8000
```

Then open [http://localhost:3000](http://localhost:3000), paste a Claude API key (kept in memory only — never sent anywhere but the backend, which forwards it straight to Anthropic), and start generating test cases.

## Notes on scope

- Currently a two-endpoint flow (generate, then evaluate) — no CI-gating or exit-code integration yet.
- Dataset generation is request/response today rather than streamed; an SSE-based version that streams each test case in as it's generated (rather than waiting on the full batch) is scoped but not yet wired into this UI.
- The API key lives in component state for the session only; nothing is persisted to storage.
