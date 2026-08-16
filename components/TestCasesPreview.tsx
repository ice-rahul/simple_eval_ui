"use client"

import { TestCase } from "./types";

type Props = {
  testCases: TestCase[];
  loading: boolean;
};

export function TestCasesPreview({ testCases, loading }: Props) {
  if (loading) {
    return (
      <div className="text-sm text-muted py-8 text-center">Generating test cases…</div>
    );
  }

  if (testCases.length === 0) {
    return (
      <div className="text-sm text-muted py-8 text-center">
        No test cases yet. Fill in the prompt on the left and generate some.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {testCases.map((tc, i) => (
        <div key={i} className="rounded-xl border border-edge bg-surface-muted p-3.5 space-y-1.5">
          <div className="text-[10px] font-semibold tracking-wide text-accent uppercase">
            Case {String(i + 1).padStart(2, "0")}
          </div>
          <div className="text-sm text-foreground">{tc.input}</div>
          <div className="text-xs text-muted">expects: {tc.criteria}</div>
        </div>
      ))}
    </div>
  );
}