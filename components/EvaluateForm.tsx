"use client"

import { useContext, useMemo } from "react";
import { TestCase } from "./types";
import { EvalContext } from "@/context/evalContext";

type Props = {
  onEvaluate: () => void;
  loading: boolean;
  error: Error | null;
};

export function EvaluateForm({
  onEvaluate,
  loading,
  error,
}: Props) {
  const { evaluateConfig, setEvaluateConfig } = useContext(EvalContext)
  const { prompt, testCasesJson, additionalCriteria } = evaluateConfig
  const parsedTestCases = useMemo(() => {
    try {
      return JSON.parse(testCasesJson)
    } catch {
      return null
    }
  }, [testCasesJson])

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="eval-prompt" className="text-sm font-medium block">
          Prompt
        </label>
        <textarea
          id="eval-prompt"
          rows={5}
          value={prompt}
          onChange={(e) => {
            setEvaluateConfig?.({ ...evaluateConfig, prompt : e.target.value})
          }}
          placeholder={"You are a support triage assistant. Classify this message: {{input}}"}
          className="w-full rounded-xl border border-edge bg-surface-muted px-4 py-3 text-foreground placeholder:text-muted outline-none transition focus:border-accent focus:ring-2 focus:ring-[rgb(var(--accent-rgb)/0.35)]"
        />
        <p className="text-xs text-muted">
          Same prompt used in &ldquo;Generate Test Cases&rdquo; carries over automatically — edit freely here.
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="eval-cases" className="text-sm font-medium block">
          Test cases (JSON)
        </label>
        <textarea
          id="eval-cases"
          rows={7}
          value={testCasesJson}
          onChange={(e) => {
            setEvaluateConfig?.({...evaluateConfig, testCasesJson: e.target.value})
          }}
          placeholder='[{"input": "...", "criteria": "..."}]'
          className="w-full rounded-xl border border-edge bg-surface-muted px-4 py-3 font-mono text-xs text-foreground placeholder:text-muted outline-none transition focus:border-accent focus:ring-2 focus:ring-[rgb(var(--accent-rgb)/0.35)]"
        />
        <p className="text-xs text-muted">
          {parsedTestCases
            ? `${parsedTestCases.length} test case${parsedTestCases.length === 1 ? "" : "s"} ready.`
            : "Generate test cases first, or paste your own JSON array here."}
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="extra-criteria" className="text-sm font-medium block">
          Additional acceptance criteria <span className="text-muted font-normal">(optional)</span>
        </label>
        <textarea
          id="extra-criteria"
          rows={2}
          value={additionalCriteria}
          onChange={(e) => {
            setEvaluateConfig?.({...evaluateConfig, additionalCriteria: e.target.value})
          }}
          placeholder="e.g. never mention pricing, always respond in under 3 sentences"
          className="w-full rounded-xl border border-edge bg-surface-muted px-4 py-3 text-foreground placeholder:text-muted outline-none transition focus:border-accent focus:ring-2 focus:ring-[rgb(var(--accent-rgb)/0.35)]"
        />
      </div>

      <button
        onClick={onEvaluate}
        disabled={loading || !prompt.trim() || !parsedTestCases || parsedTestCases.length === 0}
        className="w-full rounded-xl bg-accent text-accent-foreground font-medium px-4 py-2.5 transition hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? "Evaluating…" : "Run evaluation"}
      </button>

      {error && <p className="text-xs text-danger">{error.message}</p>}
    </div>
  );
}