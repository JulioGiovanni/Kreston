import { createContext } from 'react';

interface ContextProps {
  clientCreated: boolean;
  projectCreated: boolean;
  setClientCreated: () => void;
  setProjectCreated: () => void;
}

export const StepperContext = createContext({} as ContextProps);
