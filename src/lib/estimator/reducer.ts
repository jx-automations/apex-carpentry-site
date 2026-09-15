import { ESTIMATOR_QUESTIONS } from "./questions";
import { EstimatorAction, EstimatorState } from "./types";

export const initialEstimatorState: EstimatorState = {
  currentStep: 0,
  answers: {},
  completed: false,
};

const LAST_STEP = ESTIMATOR_QUESTIONS.length - 1;

export function estimatorReducer(
  state: EstimatorState,
  action: EstimatorAction
): EstimatorState {
  switch (action.type) {
    case "SELECT_ANSWER":
    case "SET_LOCATION": {
      const step =
        action.type === "SELECT_ANSWER"
          ? action.step
          : ESTIMATOR_QUESTIONS[state.currentStep].id;
      const answers = { ...state.answers, [step]: action.value };
      const isLastStep = state.currentStep >= LAST_STEP;
      return {
        ...state,
        answers,
        currentStep: isLastStep ? state.currentStep : state.currentStep + 1,
        completed: isLastStep,
      };
    }
    case "GO_BACK": {
      if (state.completed) {
        return { ...state, completed: false, currentStep: LAST_STEP };
      }
      return { ...state, currentStep: Math.max(0, state.currentStep - 1) };
    }
    case "RESET":
      return initialEstimatorState;
    default:
      return state;
  }
}

/**
 * The estimator is a qualification tool only. There is no verified Apex
 * Carpentry pricing data anywhere in the source material, so this
 * deliberately never returns a dollar figure or range. See the project plan
 * for why: inventing NZ construction pricing bands would be a fabricated
 * claim, which the brief explicitly rules out.
 */
export function getResultMessage(answers: EstimatorState["answers"]): string {
  const project = answers.projectType?.toLowerCase();
  if (project && project !== "not sure") {
    return `Your ${project.toLowerCase()} sounds like something worth discussing with Apex Carpentry. Send through your details and the team will follow up.`;
  }
  return "Your project sounds like something worth discussing with Apex Carpentry. Send through your details and the team will follow up.";
}
