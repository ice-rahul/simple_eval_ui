import { createContext } from 'react';

type DefaultEvalType = {
    testCasesConfig: {
        prompt: string,
        numTestCases: number,
        variables: string[],
    },
    evaluateConfig: {
        prompt: string,
        testCasesJson: string,
        additionalCriteria: string,
    }
    setTestCasesConfig?: (config: { prompt: string, numTestCases: number, variables: string[] }) => void;
    setEvaluateConfig?: (config: { prompt: string, testCasesJson: string, additionalCriteria: string }) => void;
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
    }
}

export const EvalContext = createContext<DefaultEvalType>(defaultEvalContext);