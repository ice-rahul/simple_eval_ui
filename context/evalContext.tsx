import { createContext } from 'react';

export type DefaultEvalType = {
    testCasesConfig: {
        prompt: string,
        numTestCases: number,
        variables: string[],
    },
    evaluateConfig: {
        prompt: string,
        testCasesJson: string,
        additionalCriteria: string,
    },
    generatedTestCases: { testcases: unknown[] },
    evaluationReportHtml: string | null,
    setTestCasesConfig?: (config: { prompt: string, numTestCases: number, variables: string[] }) => void;
    setEvaluateConfig?: (config: { prompt: string, testCasesJson: string, additionalCriteria: string }) => void;
    setGeneratedTestCases?: (testcases: { testcases: unknown[] }) => void
    setEvaluationReportHtml?: (html: string | null) => void
}

export const defaultEvalContext: DefaultEvalType = {
    testCasesConfig: {
        prompt: "",
        numTestCases: 0,
        variables: [],
    },
    evaluateConfig: {
        prompt: "",
        testCasesJson: "",
        additionalCriteria: "",
    },
    generatedTestCases: { testcases: [] },
    evaluationReportHtml: null
}

export const EvalContext = createContext<DefaultEvalType>(defaultEvalContext);