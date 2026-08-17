"use client"

import { useContext } from "react";
import { EvalContext } from "@/context/evalContext";
import { CopyButton } from "./CopyButton";

type Props = {
  loading: boolean;
};

export function EvaluationPreview({ loading }: Props) {
  const { evaluationReportHtml } = useContext(EvalContext);

  if (loading) {
    return <div className="text-sm text-muted py-8 text-center">Running evaluation…</div>;
  }

  if (!evaluationReportHtml) {
    return (
      <div className="text-sm text-muted py-8 text-center">
        No results yet. Run an evaluation to see the scored report here.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-end">
        <CopyButton label="Copy report HTML" getText={() => evaluationReportHtml} />
      </div>
      {/*
        The backend returns a full HTML document (<!DOCTYPE html>, <html>,
        <head>...) — that can't go into dangerouslySetInnerHTML (the browser
        silently mangles a nested <html> tag inside a <div>). An iframe with
        srcDoc renders it correctly and keeps the report's own styles fully
        isolated from this app's CSS.
      */}
      <iframe
        srcDoc={evaluationReportHtml}
        sandbox=""
        className="w-full rounded-xl border border-edge bg-white"
        style={{ height: 600 }}
        title="Evaluation report"
      />
    </div>
  );
}