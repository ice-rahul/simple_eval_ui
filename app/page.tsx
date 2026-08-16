"use client"

import { EvaluateForm } from "@/components/EvaluateForm";
import { EvaluationPreview } from "@/components/EvaluationPreview";
import { GenerateTestCasesForm } from "@/components/GenerateTestCasesForm";
import { TabsPanel } from "@/components/Tabs";
import { TestCasesPreview } from "@/components/TestCasesPreview";
import { TabNames } from "@/components/types";
import { EvalContext } from "@/context/evalContext";
import useEvaluatePromptMutation from "@/hooks/useEvaluatePromptMutation";
import useGenerateTestCaseMutation from "@/hooks/useGenerateTestCaseMutation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo, useState } from "react";


function HomeInner() {
  const [activeTab, setActiveTab] = useState<TabNames>("Generate Test Cases");
  const [activePreviewTab, setActivePreviewTab] = useState<TabNames>("Generated Test Cases");
  const { mutate: generateTestCase, isPending: testCaseLoading, error: testCaseError } = useGenerateTestCaseMutation()
  const { mutate: evaluatePrompt, isPending: evaluationLoading, error: evaluationError } = useEvaluatePromptMutation()
  const [apiKey, setApiKey] = useState("")

  const renderTabContent = () => {
    switch (activeTab) {
      case "Generate Test Cases":
        return <GenerateTestCasesForm onGenerate={() => {
          generateTestCase(apiKey)
        }} loading={testCaseLoading} error={testCaseError} />;
      case "Evaluate":
        return <EvaluateForm onEvaluate={() => {
          evaluatePrompt()
        }} loading={evaluationLoading} error={evaluationError} />;
      default:
        return null;
    }
  }

  const renderPreviewContent = () => {
    switch (activePreviewTab) {
      case "Generated Test Cases":
        return <TestCasesPreview loading={false} />;
      case "Evaluated Test Cases":
        return <EvaluationPreview results={[]} loading={false} />;
      default:
        return null;
    }
  }

  const handleApiKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey?.(e.target.value)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <main className="flex-1 w-full mx-auto flex flex-col">
        {/* ---- Header ---- */}
        <header className="text-center space-y-3 flex p-4 items-center justify-between">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Eval your <span className="text-accent">AI Prompts</span>
          </h1>
          <p className="text-muted ">
            Tell us what are you expecting your AI to do, and we will evaluate it for you.
          </p>
        </header>

        {/* ---- Card ---- */}
        <section className=" border border-edge shadow-xl shadow-black/5 flex bg-background gap-0.5">
          <div className="px-4 py-2 space-y-6 bg-surface w-1/2">
            {/* API key */}
            <div className="space-y-2">
              <label htmlFor="apiKey" className="text-sm font-medium block">
                Claude Anthropic key
              </label>
              <input
                id="apiKey"
                type="password"
                onChange={handleApiKey}
                placeholder="Paste your API key"
                className="w-full rounded-xl border border-edge bg-surface-muted px-4 py-3 text-foreground placeholder:text-muted outline-none transition focus:border-accent focus:ring-2 focus:ring-[rgb(var(--accent-rgb)/0.35)]"
              />
              <p className="text-xs text-muted leading-relaxed">
                Your key is never stored anywhere; it is only used to generate
                your test cases and evaluations. Get one from{" "}
                <a
                  className="text-accent hover:underline underline-offset-2"
                  href="https://platform.claude.com/settings/workspaces/default/keys"
                  target="_blank"
                  rel="noreferrer"
                >
                  Claude
                </a>
                .
              </p>
            </div>

            <div className="border-t border-edge" />

            <TabsPanel tabNames={["Generate Test Cases", "Evaluate"]} activeTab={activeTab} onTabClick={setActiveTab} >
              {renderTabContent()}
            </TabsPanel>
          </div>
          <div className="px-4 py-2 space-y-6 bg-surface flex-1 w-1/2">
            Preview
            <TabsPanel tabNames={["Generated Test Cases", "Evaluated Test Cases"]} activeTab={activePreviewTab} onTabClick={setActivePreviewTab} >
              {renderPreviewContent()}
            </TabsPanel>
          </div>
        </section>
      </main>

      <footer className="py-6 text-center text-xs text-muted">
        Powered by Claude <span className="text-accent border rounded-4xl px-2 py-1 font-bold text-xs">haiku-4-5</span>
      </footer>
    </div>
  );
}


export default function Home() {
  const queryClient = new QueryClient()
  const [testCasesConfig, setTestCasesConfig] = useState({
    prompt: "",
    numTestCases: 3,
    variables: [] as string[],
  });

  const [evaluateConfig, setEvaluateConfig] = useState({
    prompt: "",
    testCasesJson: "",
    additionalCriteria: "",
  });

  const [generatedTestCases, setGeneratedTestCases] = useState<{ testcases: unknown[] }>({ testcases: [] })

  // Memoize so the context value only gets a new identity when the
  // state it wraps actually changes — otherwise every render of Home
  // creates a new object and re-renders every consumer for no reason.
  const value = useMemo(
    () => ({
      testCasesConfig,
      evaluateConfig,
      generatedTestCases,
      setTestCasesConfig,
      setEvaluateConfig,
      setGeneratedTestCases
    }),
    [testCasesConfig, evaluateConfig, generatedTestCases]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <EvalContext.Provider value={value}>
        <HomeInner />
      </EvalContext.Provider>
    </QueryClientProvider>
  );
}