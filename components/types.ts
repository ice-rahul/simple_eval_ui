export type TabNames = "Generate Test Cases" | "Evaluate" | "Generated Test Cases" | "Evaluated Test Cases";

export type TestCase = {
  input: string;
  criteria: string;
};

export type EvaluationResult = {
  input: string;
  criteria: string;
  output: string;
  pass: boolean;
  reasoning: string;
};