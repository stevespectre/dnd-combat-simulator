'use client';

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

interface Props {
  children: ReactNode;
}

interface Action {
  type?: ActionType;
  source?: string;
  target?: string;
  roll?: number;
  result?: ActionResult;
}

enum ActionType {
  IDLE = 'IDLE',
  ATTACK = 'ATTACK',
  DEATH = 'DEATH',
}

enum ActionResult {
  SUCCESSFUL = 'SUCCESSFUL',
  CRITICAL = 'CRITICAL',
  FAILED = 'FAILED',
}

interface ContextProps {
  action: Action;
  setAction: Dispatch<SetStateAction<Action>>;
}

const GlobalContext = createContext<ContextProps>({} as ContextProps);

export const GlobalContextProvider = ({ children }: Props) => {
  const [action, setAction] = useState<Action>({});

  return <GlobalContext.Provider value={{ action, setAction }}>{children}</GlobalContext.Provider>;
};

export const useGlobalContextProvider = () => {
  return useContext(GlobalContext);
};
