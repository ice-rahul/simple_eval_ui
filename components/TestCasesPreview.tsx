"use client"

import { useContext } from "react";
import { EvalContext } from "@/context/evalContext";

type Props = {
  loading: boolean;
};

export function TestCasesPreview({ loading }: Props) {
  const { generatedTestCases } = useContext(EvalContext)
  const { testcases: testCases } = generatedTestCases

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
          <pre className="whitespace-pre-wrap wrap-break-word">
            {JSON.stringify(tc, undefined, 2)}
          </pre>
        </div>
      ))}
    </div>
  );
}