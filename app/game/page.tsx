"use client"

import React from "react";
import Battlefield from "../components/Battlefield";
import EntityStatsHud from "../components/EntityStatsHud";
import GameLog from "../components/GameLog";
import { GlobalContextProvider } from "../Context/gameState";
import Entity from "@/src/entities/entity";
import { createGoblin, createPlayer } from "@/src/utils/entityFactory";
import { roll } from "@/src/utils/diceSimulator";

function Game() {
  const players: Entity[] = [
    createPlayer('Szidi'),
    createPlayer('Norbi'),
    createPlayer('Dani'),
    createPlayer('Isti'),
    createPlayer('Peti'),
  ]

  const goblins: Entity[] = [...Array(5)].map((_, index) => createGoblin(`Goblin-${index + 1}`))

  const entities = [...players, ...goblins].sort((a, b ) => roll('1d20') - roll('1d20'))

  return (
    <div className="h-screen flex">
      <GlobalContextProvider>
        <EntityStatsHud entities={entities} />
        <Battlefield entities={entities} />
        <GameLog />
      </GlobalContextProvider>
    </div>
  );
}

export default Game;
