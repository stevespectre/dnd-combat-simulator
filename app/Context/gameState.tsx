"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface Props {
  children: ReactNode;
}

interface ContextProps {
  players: string;
  setPlayers: Dispatch<SetStateAction<string>>;
}

const GlobalContext = createContext<ContextProps>({} as ContextProps);

export const GlobalContextProvider = ({ children }: Props) => {
  const [players, setPlayers] = useState<string>("");

  return (
    <GlobalContext.Provider value={{ players, setPlayers }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContextProvider = () => {
  return useContext(GlobalContext);
};
