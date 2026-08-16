"use client"

import { useState } from "react";
import { EvaluationResult } from "./types";

type Props = {
  results: EvaluationResult[];
  loading: boolean;
};

export function EvaluationPreview({ results, loading }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (loading) {
    return <div className="text-sm text-muted py-8 text-center">Running evaluation…</div>;
  }

  if (results.length === 0) {
    return (
      <div className="text-sm text-muted py-8 text-center">
        No results yet. Run an evaluation to see scored test cases here.
      </div>
    );
  }

  const passCount = results.filter((r) => r.pass).length;
  const pct = Math.round((passCount / results.length) * 100);

  return (
    <div className="space-y-4">
      <div className="flex items-baseline gap-3 pb-3 border-b border-edge">
        <span className={`text-3xl font-extrabold ${pct >= 70 ? "text-success" : "text-danger"}`}>
          {passCount}/{results.length}
        </span>
        <span className="text-xs text-muted">{pct}% passed</span>
      </div>

      <div className="space-y-2">
        {results.map((r, i) => (
          <div key={i} className="rounded-xl border border-edge bg-surface-muted overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between gap-3 px-3.5 py-2.5 text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={`shrink-0 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${
                    r.pass
                      ? "text-success border-success"
                      : "text-danger border-danger"
                  }`}
                >
                  {r.pass ? "Pass" : "Fail"}
                </span>
                <span className="text-sm text-foreground truncate">{r.input}</span>
              </div>
              <span className="text-muted text-xs shrink-0">{openIndex === i ? "▾" : "▸"}</span>
            </button>

            {openIndex === i && (
              <div className="px-3.5 pb-3.5 space-y-2.5 border-t border-edge pt-3">
                <div>
                  <div className="text-[10px] uppercase tracking-wide text-muted mb-1">Expected</div>
                  <div className="text-xs text-foreground">{r.criteria}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wide text-muted mb-1">Model output</div>
                  <div className="text-xs font-mono text-foreground bg-surface rounded-lg p-2.5 whitespace-pre-wrap break-words">
                    {r.output}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wide text-muted mb-1">Grader reasoning</div>
                  <div className="text-xs text-foreground">{r.reasoning}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}