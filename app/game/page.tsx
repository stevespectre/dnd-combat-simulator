"use client"

import React from "react";
import Battlefield from "../components/Battlefield";
import EntityStatsHud from "../components/EntityStatsHud";
import GameLog from "../components/GameLog";
import { GlobalContextProvider } from "../Context/gameState";
import Player from "@/entities/player";
import Goblin from "@/entities/goblin";

function Game() {
  const players = [
    new Player('Józsi'),
    new Player('Béla'),
    new Player('Norbi'),
    new Player('Szidi'),
    new Player('Dani'),
  ]

  const goblins = [
    new Goblin(),
    new Goblin(),
    new Goblin(),
    new Goblin(),
    new Goblin(),
  ]

  return (
    <div className="h-screen flex">
      <GlobalContextProvider>
        <EntityStatsHud />
        <Battlefield players={players} enemies={goblins} />
        <GameLog />
      </GlobalContextProvider>
    </div>
  );
}

export default Game;
