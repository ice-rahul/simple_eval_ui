"use client"

import { useContext, useState } from "react";
import { EvalContext } from "@/context/evalContext";
import { CopyButton } from "./CopyButton";
import { DownloadButton } from "./DownloadButton";
import { Modal } from "./Modal";

type Props = {
  loading: boolean;
};

export function EvaluationPreview({ loading }: Props) {
  const { evaluationReportHtml } = useContext(EvalContext);
  const [expanded, setExpanded] = useState(false);

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
      <div className="flex items-center justify-end gap-2">
        <button
          onClick={() => setExpanded(true)}
          type="button"
          className="text-[11px] font-medium px-2.5 py-1 rounded-lg border border-edge text-muted hover:text-foreground hover:border-accent transition cursor-pointer"
        >
          Expand
        </button>
        <CopyButton label="Copy report HTML" getText={() => evaluationReportHtml} />
        <DownloadButton
          label="Download HTML"
          filename="evaluation-report.html"
          mimeType="text/html"
          getContent={() => evaluationReportHtml}
        />
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

      <Modal open={expanded} onClose={() => setExpanded(false)} title="Evaluation report">
        <iframe
          srcDoc={evaluationReportHtml}
          sandbox=""
          className="w-full h-full rounded-xl border border-edge bg-white"
          title="Evaluation report (expanded)"
        />
      </Modal>
    </div>
  );
}