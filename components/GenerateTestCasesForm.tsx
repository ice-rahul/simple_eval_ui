"use client"

import { PRESET_PROMPTS } from "@/constants/constants";
import { EvalContext } from "@/context/evalContext";
import { useContext, useEffect } from "react";

function extractVariables(prompt: string): string[] {
  const matches = prompt.match(/\{\{(.*?)\}\}/g) || [];
  const unique = Array.from(new Set(matches.map((m) => m.replace(/[{}]/g, "").trim())));
  return unique;
}

type Props = {
  onGenerate: () => void;
  loading: boolean;
  error: Error | null;
};

export function GenerateTestCasesForm({
  onGenerate,
  loading,
  error,
}: Props) {
  const { testCasesConfig, setTestCasesConfig } = useContext(EvalContext);
  const { prompt, numTestCases } = testCasesConfig
  const variables = extractVariables(prompt);

  useEffect(() => {
    if (JSON.stringify(variables) !== JSON.stringify(testCasesConfig.variables) && setTestCasesConfig) {
      setTestCasesConfig({ ...testCasesConfig, variables })
    }
  }, [variables, setTestCasesConfig, testCasesConfig])

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <span className="text-sm font-medium block">Try an example</span>
        <div className="flex flex-wrap gap-2">
          {PRESET_PROMPTS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() =>
                setTestCasesConfig?.({ ...testCasesConfig, prompt: preset.prompt })
              }
              className="text-xs font-medium px-2.5 py-1.5 rounded-full border border-edge text-muted hover:text-foreground hover:border-accent transition cursor-pointer"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="gen-prompt" className="text-sm font-medium block">
          Prompt
        </label>
        <textarea
          id="gen-prompt"
          rows={5}
          value={prompt}
          onChange={(e) => {
            setTestCasesConfig?.({ ...testCasesConfig, prompt: e.target.value });
          }}
          placeholder={"You are a support triage assistant. Classify this message: {{input}}"}
          className="w-full rounded-xl border border-edge bg-surface-muted px-4 py-3 text-foreground placeholder:text-muted outline-none transition focus:border-accent focus:ring-2 focus:ring-[rgb(var(--accent-rgb)/0.35)]"
        />
        <p className="text-xs text-muted">
          Use <code className="text-accent">{"{{variable}}"}</code> for parts that should change per test case.
        </p>
      </div>

      <div className="space-y-2">
        <span className="text-sm font-medium block">Detected variables</span>
        <div className="flex flex-wrap gap-2">
          {variables.length === 0 ? (
            <span className="text-xs text-muted">
              None yet — add <code className="text-accent">{"{{...}}"}</code> to your prompt.
            </span>
          ) : (
            variables.map((v) => (
              <span
                key={v}
                className="text-xs font-medium px-2.5 py-1 rounded-full bg-surface-muted border border-edge text-accent"
              >
                {v}
              </span>
            ))
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="num-cases" className="text-sm font-medium block w-fit">
          Number of test cases
        </label>
        <input
          id="num-cases"
          type="number"
          min={3}
          value={numTestCases}
          onChange={(e) => {
            setTestCasesConfig?.({ ...testCasesConfig, numTestCases: Number(e.target.value) });
          }}
          className="w-28 rounded-xl border border-edge bg-surface-muted px-4 py-2 text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-[rgb(var(--accent-rgb)/0.35)]"
        />
      </div>

      <button
        onClick={onGenerate}
        disabled={loading || !prompt.trim()}
        className="w-full rounded-xl bg-accent text-accent-foreground font-medium px-4 py-2.5 transition hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? "Generating…" : "Generate test cases"}
      </button>

      {error && <p className="text-xs text-danger">{error.message}</p>}
    </div>
  );
}