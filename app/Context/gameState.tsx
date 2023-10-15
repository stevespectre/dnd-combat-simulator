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
  IDLE = 'Idle',
  ATTACK = 'Attacked:',
  MOVE = 'Moved towards:',
}

export enum ActionResult {
  HIT = 'Hit',
  CRITICAL = 'Critical',
  MISS = 'Miss',
  MOVED = 'Moved',
}

interface ContextType {
  action: Action;
  setAction: Dispatch<SetStateAction<Action>>;
}

const GlobalContext = createContext<ContextType | null>(null);

export const GlobalContextProvider = ({ children }: Props) => {
  const [action, setAction] = useState<Action>({
    type: ActionType.IDLE,
    source: '',
    target: '',
    roll: 0,
    result: ActionResult.MISS,
    value: 0,
  });

  return <GlobalContext.Provider value={{ action, setAction }}>{children}</GlobalContext.Provider>;
};

export const useGlobalContextProvider = () => {
  return useContext(GlobalContext);
};
