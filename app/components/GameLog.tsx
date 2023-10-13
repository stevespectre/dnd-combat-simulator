"use client";

import React, { useEffect } from "react";
import { useGlobalContextProvider } from "../Context/gameState";

function GameLog() {
  const { players } = useGlobalContextProvider();

  useEffect(() => {
    console.log("players", players);
  }, [players]);

  return (
    <div className="w-[200px] border-l border-blue-500 px-2 py-4">
      GameLog: {players}
    </div>
  );
}

export default GameLog;
