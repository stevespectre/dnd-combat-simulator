'use client';

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

interface Props {
  children: ReactNode;
}

export interface Action {
  type: ActionType;
  source: string;
  target: string;
  roll: number;
  result: ActionResult;
  value: number;
}

export enum ActionType {
  ATTACK = 'Attacked:',
}

export enum ActionResult {
  HIT = 'Hit',
  CRITICAL = 'Critical',
  MISS = 'Miss',
}

interface ContextType {
  action: Action;
  setAction: Dispatch<SetStateAction<Action>>;
}

const GlobalContext = createContext<ContextType | null>(null);

export const GlobalContextProvider = ({ children }: Props) => {
  const [action, setAction] = useState<Action>(null);

  return <GlobalContext.Provider value={{ action, setAction }}>{children}</GlobalContext.Provider>;
};

export const useGlobalContextProvider = () => {
  return useContext(GlobalContext);
};
