import { StepperState } from './';

type StepperActionType =
  | { type: '[Stepper:CreateClient] - Action' }
  | { type: '[Stepper:CreateProject] - Action' };

export const Stepperreducer = (
  state: StepperState,
  action: StepperActionType
): StepperState => {
  switch (action.type) {
    case '[Stepper:CreateClient] - Action':
      return {
        ...state,
        clientCreated: true,
      };
    case '[Stepper:CreateProject] - Action':
      return {
        ...state,
        projectCreated: true,
      };

    default:
      return state;
  }
};
