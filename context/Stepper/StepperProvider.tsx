import { FC, useReducer } from 'react';
import { StepperContext, Stepperreducer } from './'; //Cambiar Reducer a minúsculas

export interface StepperState {
  clientCreated: boolean;
  projectCreated: boolean;
}

const Stepper_INITIAL_STATE: StepperState = {
  clientCreated: false,
  projectCreated: false,
};

interface Props {
  children: any;
}

export const StepperProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    Stepperreducer,
    Stepper_INITIAL_STATE
  ); //Cambiar Reducer a minúsculas

  const setClientCreated = () => {
    dispatch({
      type: '[Stepper:CreateClient] - Action',
    });
  };

  const setProjectCreated = () => {
    dispatch({
      type: '[Stepper:CreateProject] - Action',
    });
  };

  return (
    <StepperContext.Provider
      value={{
        ...state,
        setClientCreated,
        setProjectCreated,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};
