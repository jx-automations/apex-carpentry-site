export type StepId =
  | "projectType"
  | "propertyType"
  | "location"
  | "stage"
  | "timeline";

export type Answers = Partial<Record<StepId, string>>;

export interface EstimatorState {
  currentStep: number;
  answers: Answers;
  completed: boolean;
}

export type EstimatorAction =
  | { type: "SELECT_ANSWER"; step: StepId; value: string }
  | { type: "SET_LOCATION"; value: string }
  | { type: "GO_BACK" }
  | { type: "RESET" };

export interface EstimatorOption {
  label: string;
  value: string;
}

export interface EstimatorQuestion {
  id: StepId;
  question: string;
  type: "select" | "text";
  options?: EstimatorOption[];
}
