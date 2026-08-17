"use client"

import { useContext } from "react";
import { EvalContext } from "@/context/evalContext";
import JsonView from "@uiw/react-json-view";
import { CopyButton } from "./CopyButton";
import { themeVars } from "@/constants/constants";

type Props = {
  loading: boolean;
};

export function TestCasesPreview({ loading }: Props) {
  const { generatedTestCases } = useContext(EvalContext)
  const { testcases: testCases } = generatedTestCases
  const safeData = testCases && typeof testCases === "object" ? testCases : { value: testCases };

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
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted">
          {testCases.length} case{testCases.length === 1 ? "" : "s"}
        </span>
        <CopyButton label="Copy all" getText={() => JSON.stringify(testCases, null, 2)} />
      </div>

      {testCases.map((tc, i) => (
        <div key={i} className="rounded-xl border border-edge bg-surface-muted p-3.5 space-y-2">
          <div className="text-[10px] font-semibold tracking-wide text-accent uppercase">
            Case {String(i + 1).padStart(2, "0")}
          </div>
          <div
            className="[&>div]:p-2 [&>div]:rounded-lg"
            style={themeVars}
          >
            <JsonView
              value={safeData}
              displayDataTypes={false}
              enableClipboard
              collapsed={2}
            />
          </div>
        </div>
      ))}
    </div>
  );
}