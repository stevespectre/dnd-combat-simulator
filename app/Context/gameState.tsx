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
  turn: number;
  setTurn: Dispatch<SetStateAction<number>>;
  started: boolean;
  setStarted: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<ContextType | null>(null);

export const GlobalContextProvider = ({ children }: Props) => {
  const [action, setAction] = useState<Action>(null);
  const [turn, setTurn] = useState<number>(0);
  const [started, setStarted] = useState<boolean>(false);

  return <GlobalContext.Provider value={{ action, setAction, turn, setTurn, started, setStarted }}>{children}</GlobalContext.Provider>;
};

export const useGlobalContextProvider = () => {
  return useContext(GlobalContext);
};
