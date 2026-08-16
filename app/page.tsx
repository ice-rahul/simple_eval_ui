"use client"

import { TabsPanel } from "@/components/Tabs";
import { TabNames } from "@/components/types";
import { useState } from "react";


export default function Home() {
  const [activeTab, setActiveTab] = useState<TabNames>("Evaluate");
  const [activePreviewTab, setActivePreviewTab] = useState<TabNames>("Evaluate");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Generate Test Cases":
        return <div>
          <div>
            prompt
          </div>
          <div>
            variables
          </div>
          <div>
            number of test cases
          </div>
          <button>Generate</button>
        </div>;
      case "Evaluate":
        return <div>
          <div>
            prompt with/without variables
          </div>
          <div>
            test cases
          </div>
          <div>
            additional acceptance criteria if any
          </div>
          <button>Evaluate</button>
        </div>;
      default:
        return null;
    }
  }

  const renderPreviewContent = () => {
    switch (activePreviewTab) {
      case "Generated Test Cases":
        return <div>
          <div>
            prompt
          </div>
          <div>
            variables
          </div>
          <div>
            number of test cases
          </div>
          <button>Generate</button>
        </div>;
      case "Evaluated Test Cases":
        return <div>
          <div>
            prompt with/without variables
          </div>
          <div>
            test cases
          </div>
          <div>
            additional acceptance criteria if any
          </div>
          <button>Evaluate</button>
        </div>;
      default:
        return null;
    }
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
          <div className="px-4 py-2 space-y-6 bg-surface">
            {/* API key */}
            <div className="space-y-2">
              <label htmlFor="apiKey" className="text-sm font-medium block">
                Claude Anthropic key
              </label>
              <input
                id="apiKey"
                type="password"
                // onChange={handleApiKey}
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
          <div className="px-4 py-2 space-y-6 bg-surface flex-1">
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
